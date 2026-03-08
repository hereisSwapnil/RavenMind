import { motion } from "framer-motion";

interface AnswerButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "muted";
  onClick: () => void;
  delay?: number;
}

const variantStyles = {
  primary:
    "bg-primary/90 text-primary-foreground border-primary hover:bg-primary box-glow-gold",
  secondary:
    "bg-secondary/80 text-secondary-foreground border-secondary hover:bg-secondary box-glow-cyan",
  muted:
    "bg-muted/60 text-muted-foreground border-border hover:bg-muted",
};

const AnswerButton = ({ label, variant = "secondary", onClick, delay = 0 }: AnswerButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-xl border font-body font-semibold text-sm tracking-wide transition-colors duration-200 ${variantStyles[variant]}`}
    >
      {label}
    </motion.button>
  );
};

export default AnswerButton;
