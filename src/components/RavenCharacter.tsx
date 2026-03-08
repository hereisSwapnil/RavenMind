import { motion } from "framer-motion";
import ravenReading from "@/assets/raven-reading.png";
import ravenThinking from "@/assets/raven-thinking.png";
import ravenConfident from "@/assets/raven-confident.png";
import ravenPower from "@/assets/raven-power.png";
import ravenSurprised from "@/assets/raven-surprised.png";
import ravenVictory from "@/assets/raven-victory.png";
import ravenNeutral from "@/assets/raven-neutral.png";
import ravenArmsCrossed from "@/assets/raven-arms-crossed.png";

export type RavenMood =
  | "reading"
  | "thinking"
  | "confident"
  | "power"
  | "surprised"
  | "victory"
  | "neutral"
  | "arms-crossed";

const moodImages: Record<RavenMood, string> = {
  reading: ravenReading,
  thinking: ravenThinking,
  confident: ravenConfident,
  power: ravenPower,
  surprised: ravenSurprised,
  victory: ravenVictory,
  neutral: ravenNeutral,
  "arms-crossed": ravenArmsCrossed,
};

interface RavenCharacterProps {
  mood: RavenMood;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-48",
  md: "h-72",
  lg: "h-96",
};

const RavenCharacter = ({ mood, size = "md" }: RavenCharacterProps) => {
  return (
    <motion.div
      className={`${sizes[size]} animate-float`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      key={mood}
    >
      <img
        src={moodImages[mood]}
        alt="RavenMind"
        className="h-full w-auto object-contain drop-shadow-[0_0_25px_rgba(100,200,255,0.3)]"
      />
    </motion.div>
  );
};

export default RavenCharacter;
