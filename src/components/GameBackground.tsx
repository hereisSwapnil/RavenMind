import bgMystical from "@/assets/bg-mystical.jpg";

const GameBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgMystical})` }}
      />
      <div className="absolute inset-0 gradient-mystical opacity-40" />
      {/* Floating diamond particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rotate-45 border border-foreground/20 animate-pulse-glow"
          style={{
            left: `${8 + (i * 23) % 90}%`,
            top: `${5 + (i * 17) % 85}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GameBackground;
