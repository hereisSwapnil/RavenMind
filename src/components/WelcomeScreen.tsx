import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import RavenCharacter from "./RavenCharacter";
import SpeechBubble from "./SpeechBubble";

interface WelcomeScreenProps {
  onPlay: () => void;
}

const WelcomeScreen = ({ onPlay }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-2">
      {/* Speech bubbles */}
      <motion.div
        className="flex flex-col gap-3 w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SpeechBubble text="Hello, I am RavenMind" side="left" />
      </motion.div>

      {/* Character */}
      <RavenCharacter mood="reading" size="lg" />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="RavenMind"
        className="h-16 md:h-20 w-auto object-contain mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

      {/* Subtitle */}
      <motion.div
        className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-6 py-3 max-w-sm text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-foreground/90 font-body text-sm">
          Think about a real or fictional character.
          <br />
          <span className="text-accent font-semibold">I will try to guess who it is</span>
        </p>
      </motion.div>

      {/* Play button */}
      <motion.button
        onClick={onPlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-14 py-4 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-xl tracking-widest box-glow-gold border-2 border-primary/80 transition-all duration-200"
      >
        ✦ PLAY ✦
      </motion.button>

      {/* Stats */}
      <motion.p
        className="text-muted-foreground text-xs font-body mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        1,247 people are playing right now
      </motion.p>
    </div>
  );
};

export default WelcomeScreen;
