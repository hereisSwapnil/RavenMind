import { characters, type Character } from "@/data/characters";
import { questions, type Question } from "@/data/questions";

// Answer scores: how strongly an answer implies the trait is TRUE
export const ANSWER_WEIGHTS: Record<string, number> = {
    Yes: 1.0,
    "Probably Yes": 0.75,
    "Don't Know": 0.5,
    "Probably Not": 0.25,
    No: 0.0,
};

// Multipliers applied to a candidate's weight when their trait value
// matches (or doesn't match) the answer's implied probability.
//
// The floor of 0.05 (instead of the previous 0.08) gives stronger
// separation after each answer, letting the engine converge faster
// without completely eliminating candidates from a single answer.
function traitMultiplier(traitValue: boolean | null, answerScore: number): number {
    if (traitValue === null) return 1.0; // unknown — no penalty or bonus

    const FLOOR = 0.05;
    if (traitValue === true) {
        // trait=true + "Yes"(1.0) → 1.0,  trait=true + "No"(0.0) → 0.05
        return FLOOR + (1 - FLOOR) * answerScore;
    } else {
        // trait=false + "No"(0.0) → 1.0,  trait=false + "Yes"(1.0) → 0.05
        return FLOOR + (1 - FLOOR) * (1 - answerScore);
    }
}

interface CandidateWeight {
    character: Character;
    weight: number;
}

export class AkinatorEngine {
    private candidates: CandidateWeight[];
    private askedQuestions: Set<string>;
    private answerHistory: Array<{ questionId: string; answer: string }>;
    private availableQuestions: Question[];

    constructor() {
        this.candidates = characters.map((c) => ({ character: c, weight: 1.0 }));
        this.askedQuestions = new Set();
        this.answerHistory = [];
        this.availableQuestions = [...questions];
    }

    /** Reset the engine for a new game */
    reset() {
        this.candidates = characters.map((c) => ({ character: c, weight: 1.0 }));
        this.askedQuestions = new Set();
        this.answerHistory = [];
        this.availableQuestions = [...questions];
    }

    /** Returns the normalised total weight of all candidates */
    private totalWeight(): number {
        return this.candidates.reduce((sum, c) => sum + c.weight, 0);
    }

    /**
     * Information gain selector:
     * Pick the question that most evenly splits the current weighted candidates.
     * Ideal split: 50% would answer YES, 50% would answer NO by weight.
     * We maximise entropy = -p*log2(p) - (1-p)*log2(1-p).
     *
     * When multiple questions have similar entropy (within 1% of best),
     * we prefer non-house questions early on to avoid a boring sequence
     * of "Is your character a Stark? Lannister? Targaryen? ..."
     */
    getBestQuestion(): Question | null {
        const remaining = this.availableQuestions.filter(
            (q) => !this.askedQuestions.has(q.id)
        );
        if (remaining.length === 0) return null;

        const total = this.totalWeight();
        if (total === 0) return remaining[0];

        // Score every remaining question
        const scored: Array<{ question: Question; entropy: number }> = [];

        for (const q of remaining) {
            // Weight of candidates where trait = true
            const trueWeight = this.candidates.reduce((sum, cw) => {
                const val = cw.character.traits[q.traitKey];
                if (val === true) return sum + cw.weight;
                if (val === null) return sum + cw.weight * 0.5; // unknown → partial
                return sum;
            }, 0);

            const p = trueWeight / total;
            if (p === 0 || p === 1) continue; // question is useless

            // Binary entropy
            const entropy = -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
            scored.push({ question: q, entropy });
        }

        if (scored.length === 0) return remaining[0]; // fallback

        scored.sort((a, b) => b.entropy - a.entropy);
        const bestEntropy = scored[0].entropy;

        // Among questions within 1% of best entropy, prefer broader
        // (non-house-specific) questions early to feel more natural
        const HOUSE_TRAITS = new Set([
            "isStark", "isLannister", "isTargaryen", "isBaratheon",
            "isTyrell", "isMartell", "isGreyjoy", "isBolton",
        ]);

        const topTier = scored.filter((s) => s.entropy >= bestEntropy * 0.99);

        // Early game: prefer non-house questions when tied
        if (this.answerHistory.length < 4) {
            const nonHouse = topTier.find(
                (s) => !HOUSE_TRAITS.has(s.question.traitKey)
            );
            if (nonHouse) return nonHouse.question;
        }

        return topTier[0].question;
    }

    /**
     * Apply a user's answer to re-weight candidates.
     * Internal flag `record` controls whether this mutates history
     * (false during replay in undoLastAnswer).
     */
    private applyAnswerInternal(
        questionId: string,
        answer: string,
        record: boolean
    ): void {
        const question = questions.find((q) => q.id === questionId);
        if (!question) return;

        const score = ANSWER_WEIGHTS[answer] ?? 0.5;

        if (record) {
            this.askedQuestions.add(questionId);
            this.answerHistory.push({ questionId, answer });
        }

        this.candidates = this.candidates.map((cw) => {
            const traitVal = cw.character.traits[question.traitKey];
            const multiplier = traitMultiplier(traitVal, score);
            return { ...cw, weight: cw.weight * multiplier };
        });

        // Prune effectively-zero candidates (weight < 0.01% of max)
        const maxWeight = Math.max(...this.candidates.map((c) => c.weight));
        if (maxWeight > 0) {
            this.candidates = this.candidates.filter(
                (c) => c.weight > maxWeight * 0.0001
            );
        }
    }

    /** Apply a user's answer to filter/re-weight candidates */
    applyAnswer(questionId: string, answer: string): void {
        this.applyAnswerInternal(questionId, answer, true);
    }

    /**
     * Called when the user says the current guess is wrong.
     * Removes that character from candidates and compresses the gap
     * between remaining candidates so the engine can make a fresh guess.
     */
    markWrongGuess(): void {
        const topGuess = this.getGuess();
        if (!topGuess) return;

        // Remove the wrong guess entirely
        this.candidates = this.candidates.filter(
            (c) => c.character.id !== topGuess.id
        );

        // Re-normalise: compress the weight gap so we don't immediately
        // re-trigger isConfident for the next candidate
        const maxW = Math.max(...this.candidates.map((c) => c.weight), 0.001);
        this.candidates = this.candidates.map((cw) => ({
            ...cw,
            weight: Math.pow(cw.weight / maxW, 0.5) * maxW,
        }));
    }

    /**
     * Undo the last answer by replaying all previous answers from scratch.
     * Uses applyAnswerInternal with record=false to avoid corrupting history.
     */
    undoLastAnswer(): void {
        if (this.answerHistory.length === 0) return;
        const last = this.answerHistory.pop()!;
        this.askedQuestions.delete(last.questionId);

        // Replay from scratch without recording
        this.candidates = characters.map((c) => ({ character: c, weight: 1.0 }));
        for (const entry of this.answerHistory) {
            this.applyAnswerInternal(entry.questionId, entry.answer, false);
        }
    }

    /** Top candidate sorted by weight */
    getTop(n = 3): CandidateWeight[] {
        return [...this.candidates]
            .sort((a, b) => b.weight - a.weight)
            .slice(0, n);
    }

    /** Best guess: the top-weighted candidate */
    getGuess(): Character | null {
        const top = this.getTop(1);
        return top.length > 0 ? top[0].character : null;
    }

    /**
     * Is the engine confident enough to make a guess?
     *
     * Thresholds tuned so the Raven asks ~10–20 questions (like real Akinator):
     *   - Never guess before 8 questions
     *   - Only 1 candidate left AND at least 6 questions asked
     *   - Top candidate is >= 15x the second AND at least 8 questions asked
     *   - Top candidate has >= 90% of total weight AND at least 10 questions asked
     */
    isConfident(): boolean {
        if (this.candidates.length === 0) return false;

        // Only 1 candidate — but still wait for a minimum number of questions
        if (this.candidates.length === 1 && this.answerHistory.length >= 6)
            return true;

        // Never guess before 8 questions regardless of weights
        if (this.answerHistory.length < 8) return false;

        const top = this.getTop(2);
        const topWeight = top[0].weight;
        const secondWeight = top[1]?.weight ?? 0;

        // Top is overwhelmingly ahead of second place (15x gap)
        if (secondWeight > 0 && topWeight >= secondWeight * 15) return true;

        // Top holds >= 90% of all remaining probability mass, with enough questions
        const total = this.totalWeight();
        if (
            this.answerHistory.length >= 10 &&
            total > 0 &&
            topWeight / total >= 0.9
        )
            return true;

        return false;
    }

    /**
     * Detects suspicious player behaviour and returns a warning string,
     * or null if the player seems genuine.
     *
     * Detected patterns (mirrors real Akinator warnings):
     * - "random"      -> > 50% of answers are "Don't Know"
     * - "contrarian"  -> > 65% of answers are "No" or "Probably Not"
     * - "cheating"    -> 10+ questions asked but confidence < 20% (answers contradict)
     */
    getPlayerWarning(): "random" | "contrarian" | "cheating" | null {
        const n = this.answerHistory.length;
        if (n < 5) return null; // not enough data yet

        const dontKnowCount = this.answerHistory.filter(
            (a) => a.answer === "Don't Know"
        ).length;
        const negativeCount = this.answerHistory.filter(
            (a) => a.answer === "No" || a.answer === "Probably Not"
        ).length;

        if (dontKnowCount / n > 0.5) return "random";
        if (negativeCount / n > 0.65) return "contrarian";

        if (n >= 10 && this.confidencePercent < 20) return "cheating";

        return null;
    }

    /** Has the engine run out of useful questions without a confident guess? */
    hasGivenUp(): boolean {
        const remaining = this.availableQuestions.filter(
            (q) => !this.askedQuestions.has(q.id)
        );
        return remaining.length === 0 && !this.isConfident();
    }

    /** Number of questions asked so far */
    get questionCount(): number {
        return this.answerHistory.length;
    }

    /** Confidence percentage (0-100) for display */
    get confidencePercent(): number {
        if (this.candidates.length === 0) return 0;
        const total = this.totalWeight();
        if (total === 0) return 0;
        const topWeight = this.getTop(1)[0]?.weight ?? 0;
        return Math.min(100, Math.round((topWeight / total) * 100));
    }
}
