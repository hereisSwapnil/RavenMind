import bgMystical from "@/assets/bg-mystical.jpg";

const GameBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgMystical})` }}
      />
      <div className="absolute inset-0 gradient-westeros opacity-60" />
      {/* Floating fire embers */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent/40 animate-pulse-glow box-glow-blood"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            transform: `translateY(-${Math.random() * 50 + 20}vh)`,
            transition: 'transform 10s linear',
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GameBackground;
