import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  side?: "left" | "right";
}

const SpeechBubble = ({ text, side = "left" }: SpeechBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative max-w-xs px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-sm border border-border text-card-foreground font-body text-sm leading-relaxed ${
        side === "left" ? "mr-auto" : "ml-auto"
      }`}
    >
      {text}
      <div
        className={`absolute -bottom-2 ${
          side === "left" ? "left-6" : "right-6"
        } w-4 h-4 bg-card/90 border-b border-r border-border rotate-45`}
      />
    </motion.div>
  );
};

export default SpeechBubble;
