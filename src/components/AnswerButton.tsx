import { motion } from "framer-motion";

interface AnswerButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "muted";
  onClick: () => void;
  delay?: number;
}

const variantStyles = {
  primary:
    "bg-gradient-to-b from-[#991b1b] to-[#7f1d1d] text-[#f4f1ea] border border-[#b91c1c] shadow-[inset_0_1px_0_rgba(255,100,100,0.3),_0_4px_15px_rgba(0,0,0,0.6)] hover:from-[#b91c1c] hover:to-[#991b1b] hover:shadow-[inset_0_1px_0_rgba(255,100,100,0.4),_0_6px_20px_rgba(153,27,27,0.5)]",
  secondary:
    "bg-gradient-to-b from-[#374151] to-[#1f2937] text-[#f4f1ea] border border-[#4b5563] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.6)] hover:from-[#4b5563] hover:to-[#374151] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_6px_15px_rgba(0,0,0,0.7)]",
  muted:
    "bg-gradient-to-b from-[#1f2937] to-[#111827] text-[#9ca3af] border border-[#374151] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_4px_10px_rgba(0,0,0,0.5)] hover:text-[#d1d5db] hover:from-[#374151] hover:to-[#1f2937]",
};

const AnswerButton = ({ label, variant = "secondary", onClick, delay = 0 }: AnswerButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-sm border-[1px] font-display font-semibold tracking-wider text-sm transition-all duration-300 relative overflow-hidden group ${variantStyles[variant]}`}
    >
      <span className="relative z-10">{label}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </motion.button>
  );
};

export default AnswerButton;
