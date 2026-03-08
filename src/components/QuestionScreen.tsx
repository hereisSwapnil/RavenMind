import { motion, AnimatePresence } from "framer-motion";
import RavenCharacter, { type RavenMood } from "./RavenCharacter";
import AnswerButton from "./AnswerButton";
import SpeechBubble from "./SpeechBubble";

type PlayerWarning = "random" | "contrarian" | "cheating" | null;

interface QuestionScreenProps {
  question: string;
  questionNumber: number;
  confidence: number; // 0–100
  playerWarning: PlayerWarning;
  onAnswer: (answer: string) => void;
}

const moodCycle: RavenMood[] = [
  "thinking",
  "confident",
  "neutral",
  "arms-crossed",
  "reading",
  "surprised",
];

const answers = [
  { label: "Yes", variant: "primary" as const },
  { label: "Probably Yes", variant: "secondary" as const },
  { label: "Don't Know", variant: "muted" as const },
  { label: "Probably Not", variant: "secondary" as const },
  { label: "No", variant: "muted" as const },
];

// GoT-flavoured warning messages for each behaviour type
const WARNING_MESSAGES: Record<NonNullable<PlayerWarning>, { title: string; body: string }> = {
  random: {
    title: "A Message from the Raven",
    body: "You know nothing, Jon Snow... or do you? You seem unsure of everything. Are you truly thinking of a character, or just pressing buttons?",
  },
  contrarian: {
    title: "The Raven is Suspicious",
    body: "You never agree with me. Are you truly thinking of a character from the Seven Kingdoms, or do you just enjoy defying a three-eyed raven?",
  },
  cheating: {
    title: "Something Is Wrong",
    body: "Your answers contradict each other. No character in all of Westeros fits what you've described. Are you being truthful with me?",
  },
};

const QuestionScreen = ({
  question,
  questionNumber,
  confidence,
  playerWarning,
  onAnswer,
}: QuestionScreenProps) => {
  const mood = playerWarning
    ? "arms-crossed"
    : moodCycle[(questionNumber - 1) % moodCycle.length];

  const warningMsg = playerWarning ? WARNING_MESSAGES[playerWarning] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-4 md:py-8 gap-2 md:gap-4 overflow-x-hidden">
      {/* Confidence bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#f4f1ea]/40 text-xs font-body uppercase tracking-widest">
            Question #{questionNumber}
          </span>
          <span className="text-[#f4f1ea]/40 text-xs font-body uppercase tracking-widest">
            Confidence{" "}
            <span className="text-primary font-bold">{confidence}%</span>
          </span>
        </div>
        <div className="w-full h-1 bg-[#2c2e33] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7f1d1d] to-[#991b1b]"
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Player warning banner */}
      <AnimatePresence>
        {warningMsg && (
          <motion.div
            key={playerWarning}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-[#1a0d0d]/90 border border-[#7f1d1d]/60 rounded-sm px-4 py-3 relative overflow-hidden"
          >
            {/* top accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#991b1b]/70 to-transparent" />

            <p className="text-[#991b1b] text-[10px] font-display uppercase tracking-[0.2em] mb-1">
              ⚠ {warningMsg.title}
            </p>
            <p className="text-[#f4f1ea]/70 font-body text-xs leading-relaxed italic">
              "{warningMsg.body}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-2">
        {/* Raven */}
        <AnimatePresence mode="wait">
          <RavenCharacter
            mood={mood}
            size="lg"
            key={playerWarning ?? questionNumber}
          />
        </AnimatePresence>

        {/* Question bubble */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpeechBubble text={question} side="right" />
            </motion.div>
          </AnimatePresence>

          {/* Answer buttons */}
          <div className="flex flex-col gap-2 mt-2">
            {answers.map((a, i) => (
              <AnswerButton
                key={a.label}
                label={a.label}
                variant={a.variant}
                onClick={() => onAnswer(a.label)}
                delay={0.1 + i * 0.07}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Back button */}
      {questionNumber > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => onAnswer("back")}
          className="mt-2 text-muted-foreground text-xs font-body hover:text-foreground transition-colors underline underline-offset-4"
        >
          ← Go back
        </motion.button>
      )}
    </div>
  );
};

export default QuestionScreen;
