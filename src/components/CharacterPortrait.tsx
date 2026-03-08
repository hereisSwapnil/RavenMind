import { useState } from "react";

interface CharacterPortraitProps {
  src: string;
  name: string;
  house: string;
  className?: string;
}

// Map houses to GoT-themed colors
function getHouseColor(house: string): { bg: string; text: string; border: string } {
  const h = house.toLowerCase();
  if (h.includes("stark")) return { bg: "#1a2a3a", text: "#b0c4de", border: "#4a6a8a" };
  if (h.includes("lannister")) return { bg: "#2d2200", text: "#ffd700", border: "#b8960c" };
  if (h.includes("targaryen")) return { bg: "#2d0000", text: "#c0392b", border: "#8b0000" };
  if (h.includes("baratheon")) return { bg: "#1a1a2e", text: "#f4d03f", border: "#5d5d8a" };
  if (h.includes("tyrell")) return { bg: "#0d2b0d", text: "#27ae60", border: "#1e8449" };
  if (h.includes("martell")) return { bg: "#2d1a00", text: "#e67e22", border: "#a04000" };
  if (h.includes("greyjoy")) return { bg: "#1a1a1a", text: "#a0a0a0", border: "#505050" };
  if (h.includes("bolton")) return { bg: "#100010", text: "#8e44ad", border: "#6c3483" };
  if (h.includes("mormont")) return { bg: "#0d1a0d", text: "#82a65a", border: "#4a6a2a" };
  if (h.includes("tarth")) return { bg: "#001a2d", text: "#5dade2", border: "#2980b9" };
  if (h.includes("tarly")) return { bg: "#1a0d0d", text: "#e74c3c", border: "#922b21" };
  if (h.includes("tully")) return { bg: "#002d1a", text: "#27ae60", border: "#1a6a3a" };
  if (h.includes("free folk") || h.includes("wildling")) return { bg: "#1a1000", text: "#e5bb4a", border: "#7a5a1a" };
  if (h.includes("unsullied") || h.includes("night")) return { bg: "#0d0d0d", text: "#808080", border: "#404040" };
  return { bg: "#1a1c20", text: "#f4f1ea", border: "#383a40" };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const CharacterPortrait = ({ src, name, house, className = "" }: CharacterPortraitProps) => {
  const [imgError, setImgError] = useState(false);
  const colors = getHouseColor(house);
  const initials = getInitials(name);

  if (imgError) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: colors.bg,
          border: `3px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            color: colors.text,
            fontSize: "2rem",
            fontFamily: "serif",
            fontWeight: "bold",
            lineHeight: 1,
          }}
        >
          {initials}
        </span>
        <span
          style={{
            color: colors.border,
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {house !== "None" ? house : "Westeros"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={className}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );
};

export default CharacterPortrait;
