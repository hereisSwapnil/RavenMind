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
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-4 md:py-8 gap-4 md:gap-6 overflow-x-hidden">
      {/* Raven celebrating */}
      <RavenCharacter mood="victory" size="md" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="font-display text-lg text-muted-foreground mb-1 uppercase tracking-widest text-[#f4f1ea]/70">I think of...</h2>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary text-glow-blood">
          {characterName}
        </h1>
      </motion.div>

      {/* Character card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="bg-[#1a1c20]/95 backdrop-blur-md border-[1px] border-[#383a40] rounded-sm p-6 max-w-sm w-full text-center shadow-[0_0_20px_rgba(0,0,0,0.6)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <img
          src={characterImage}
          alt={characterName}
          className="w-36 h-36 rounded-sm mx-auto mb-5 object-cover border-[3px] border-[#2c2e33] shadow-inner"
        />
        <p className="text-[#f4f1ea]/90 font-body text-sm leading-relaxed">{characterDescription}</p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
      >
        <button
          onClick={onCorrect}
          className="flex-1 px-8 py-4 rounded-sm bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] text-[#f4f1ea] font-display tracking-wider font-bold shadow-[inset_0_1px_0_rgba(255,100,100,0.3),_0_4px_15px_rgba(0,0,0,0.6)] hover:from-[#b91c1c] hover:to-[#991b1b] hover:shadow-[inset_0_1px_0_rgba(255,100,100,0.4),_0_6px_20px_rgba(153,27,27,0.5)] border border-[#b91c1c] transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">✓ VERIFIED</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
        <button
          onClick={onWrong}
          className="flex-1 px-8 py-4 rounded-sm bg-gradient-to-b from-[#374151] to-[#1f2937] text-[#f4f1ea] font-display tracking-wider font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.6)] hover:from-[#4b5563] hover:to-[#374151] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_6px_15px_rgba(0,0,0,0.7)] border border-[#4b5563] transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">✗ INCORRECT</span>
        </button>
      </motion.div>

      <button
        onClick={onPlayAgain}
        className="text-accent text-sm font-display tracking-widest uppercase hover:text-white hover:text-glow-gold transition-all mt-4"
      >
        Play again
      </button>
    </div>
  );
};

export default ResultScreen;
