import { motion } from "framer-motion";
import RavenCharacter from "./RavenCharacter";
import CharacterPortrait from "./CharacterPortrait";
import type { Character } from "@/data/characters";

interface GaveUpScreenProps {
  bestGuess: Character | null;
  onPlayAgain: () => void;
}

const GaveUpScreen = ({ bestGuess, onPlayAgain }: GaveUpScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-4 gap-4 md:gap-6 overflow-x-hidden">
      <RavenCharacter mood="arms-crossed" size="md" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="font-display text-lg text-muted-foreground mb-2 uppercase tracking-widest text-[#f4f1ea]/70">
          The raven is stumped...
        </h2>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-accent text-glow-gold">
          I cannot guess your character
        </h1>
        <p className="text-[#f4f1ea]/50 font-body text-sm mt-3 max-w-xs mx-auto leading-relaxed">
          You have bested the Three-Eyed Raven. Your character may not yet be in
          my knowledge.
        </p>
      </motion.div>

      {bestGuess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-[#1a1c20]/95 backdrop-blur-md border-[1px] border-[#383a40] rounded-sm p-6 max-w-sm w-full text-center shadow-[0_0_20px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b8960c]/40 to-transparent" />
          <p className="text-[#f4f1ea]/40 text-xs font-body uppercase tracking-widest mb-3">
            My best guess was...
          </p>
          <CharacterPortrait
            src={bestGuess.image}
            name={bestGuess.name}
            house={bestGuess.house}
            className="w-20 h-20 rounded-sm mx-auto mb-3 object-cover border-[2px] border-[#2c2e33] opacity-60"
          />
          <p className="text-[#f4f1ea]/60 font-display text-lg">{bestGuess.name}</p>
          <p className="text-[#f4f1ea]/30 font-body text-xs mt-1">
            {bestGuess.house}
          </p>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onPlayAgain}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 md:mt-4 px-12 py-3 rounded-sm bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] text-[#f4f1ea] font-display tracking-wider font-bold shadow-[inset_0_1px_0_rgba(255,100,100,0.3),_0_4px_15px_rgba(0,0,0,0.6)] hover:from-[#b91c1c] hover:to-[#991b1b] border border-[#b91c1c] transition-all duration-300"
      >
        PLAY AGAIN
      </motion.button>
    </div>
  );
};

export default GaveUpScreen;
