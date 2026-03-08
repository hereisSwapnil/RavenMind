import { motion, AnimatePresence } from "framer-motion";
import RavenCharacter, { type RavenMood } from "./RavenCharacter";
import AnswerButton from "./AnswerButton";
import ProgressBar from "./ProgressBar";
import SpeechBubble from "./SpeechBubble";

interface QuestionScreenProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

const moodCycle: RavenMood[] = ["thinking", "confident", "neutral", "arms-crossed", "reading", "surprised"];

const answers = [
  { label: "Yes", variant: "primary" as const },
  { label: "Probably Yes", variant: "secondary" as const },
  { label: "Don't Know", variant: "muted" as const },
  { label: "Probably Not", variant: "secondary" as const },
  { label: "No", variant: "muted" as const },
];

const QuestionScreen = ({ question, questionNumber, totalQuestions, onAnswer }: QuestionScreenProps) => {
  const mood = moodCycle[(questionNumber - 1) % moodCycle.length];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-4 md:py-8 gap-2 md:gap-4 overflow-x-hidden">
      <ProgressBar current={questionNumber} total={totalQuestions} />

      <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
        {/* Raven */}
        <AnimatePresence mode="wait">
          <RavenCharacter mood={mood} size="md" key={questionNumber} />
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
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => onAnswer("back")}
        className="mt-2 text-muted-foreground text-xs font-body hover:text-foreground transition-colors underline underline-offset-4"
      >
        ← Go back
      </motion.button>
    </div>
  );
};

export default QuestionScreen;
