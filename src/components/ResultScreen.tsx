import { motion } from "framer-motion";
import RavenCharacter from "./RavenCharacter";

interface ResultScreenProps {
  characterName: string;
  characterDescription: string;
  characterImage: string;
  onCorrect: () => void;
  onWrong: () => void;
  onPlayAgain: () => void;
}

const ResultScreen = ({
  characterName,
  characterDescription,
  characterImage,
  onCorrect,
  onWrong,
  onPlayAgain,
}: ResultScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-6">
      {/* Raven celebrating */}
      <RavenCharacter mood="victory" size="md" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="font-display text-lg text-muted-foreground mb-1">I think of...</h2>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow-gold">
          {characterName}
        </h1>
      </motion.div>

      {/* Character card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-6 max-w-sm w-full text-center box-glow-cyan"
      >
        <img
          src={characterImage}
          alt={characterName}
          className="w-32 h-32 rounded-xl mx-auto mb-4 object-cover border-2 border-accent/30"
        />
        <p className="text-card-foreground font-body text-sm">{characterDescription}</p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={onCorrect}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-body font-bold box-glow-gold transition-transform hover:scale-105"
        >
          ✓ Yes, correct!
        </button>
        <button
          onClick={onWrong}
          className="px-8 py-3 rounded-xl bg-muted text-muted-foreground font-body font-semibold border border-border transition-transform hover:scale-105"
        >
          ✗ No, wrong
        </button>
      </motion.div>

      <button
        onClick={onPlayAgain}
        className="text-accent text-sm font-body underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Play again
      </button>
    </div>
  );
};

export default ResultScreen;
