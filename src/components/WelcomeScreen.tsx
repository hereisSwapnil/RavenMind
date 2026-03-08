import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import RavenCharacter from "./RavenCharacter";
import SpeechBubble from "./SpeechBubble";

interface WelcomeScreenProps {
  onPlay: () => void;
}

const WelcomeScreen = ({ onPlay }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-2 md:py-4 gap-1 md:gap-2 overflow-x-hidden">
      {/* Speech bubbles */}
      <motion.div
        className="flex flex-col gap-3 w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SpeechBubble text="Hello, I am RavenMind — the Three-Eyed Raven sees all." side="left" />
      </motion.div>

      {/* Character */}
      <RavenCharacter mood="reading" size="md" />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="RavenMind"
        className="h-12 md:h-16 w-auto object-contain mt-1 md:mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

      {/* Subtitle */}
      <motion.div
        className="bg-gradient-to-b from-[#2c2f36] to-[#1a1c20] backdrop-blur-md border-[2px] border-[#4a4d55] border-b-[#111] rounded-sm px-4 md:px-6 py-3 md:py-4 max-w-sm text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.7)] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5a5d65] to-transparent opacity-50" />
        <p className="text-[#e5e7eb] font-body text-sm leading-snug md:leading-relaxed tracking-wide">
          Think of a character from
          <br />
          <span className="text-accent font-display font-bold tracking-wider uppercase text-sm">Game of Thrones</span>
          <br />
          <span className="text-primary font-bold text-glow-blood mt-1 md:mt-2 block tracking-wider uppercase text-xs">and I will guess who it is</span>
        </p>
        <p className="text-[#9ca3af] font-body text-[11px] md:text-xs mt-2 md:mt-3 leading-snug md:leading-relaxed">
          Starks, Lannisters, Targaryens, and more — <br className="hidden sm:inline" />
          I know them all. Just answer my questions.
        </p>
      </motion.div>

      {/* Play button */}
      <motion.button
        onClick={onPlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 md:mt-4 px-12 md:px-16 py-3 md:py-4 rounded-sm bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] text-primary-foreground font-display font-bold text-xl md:text-2xl tracking-[0.2em] shadow-[inset_0_1px_0_rgba(255,100,100,0.3),_0_8px_20px_rgba(0,0,0,0.6),_0_0_15px_rgba(153,27,27,0.3)] border border-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] hover:shadow-[inset_0_1px_0_rgba(255,100,100,0.4),_0_10px_25px_rgba(153,27,27,0.5)] transition-all duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">PLAY</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </motion.button>

      {/* Stats */}
      <motion.p
        className="text-muted-foreground text-[10px] md:text-xs font-body mt-1 md:mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        10+ people are playing right now
      </motion.p>
    </div>
  );
};

export default WelcomeScreen;
