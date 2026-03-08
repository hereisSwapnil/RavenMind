import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  side?: "left" | "right";
}

const SpeechBubble = ({ text, side = "left" }: SpeechBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative max-w-xs px-6 py-4 rounded-sm bg-gradient-to-br from-[#f4e8c5] to-[#d8c596] border-2 border-[#8b7355] text-[#2c1e16] font-display font-semibold text-sm leading-relaxed shadow-[inset_0_0_20px_rgba(139,115,85,0.15),0_6px_20px_rgba(0,0,0,0.6)] ${
        side === "left" ? "mr-auto" : "ml-auto"
      }`}
    >
      {text}
      <div
        className={`absolute -bottom-[10px] ${
          side === "left" ? "left-6" : "right-6"
        } w-4 h-4 bg-[#d8c596] border-b-2 border-r-2 border-[#8b7355] rotate-45`}
      />
    </motion.div>
  );
};

export default SpeechBubble;
