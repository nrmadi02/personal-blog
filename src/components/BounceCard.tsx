import { useState } from "react";
import { motion } from "motion/react";

const colors = [
  { bg: "#6366f1", label: "Indigo" },
  { bg: "#ec4899", label: "Pink" },
  { bg: "#10b981", label: "Emerald" },
  { bg: "#f59e0b", label: "Amber" },
  { bg: "#ef4444", label: "Red" },
  { bg: "#8b5cf6", label: "Violet" },
];

export default function BounceCard() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div style={styles.container}>
      <p style={styles.hint}>Hover &amp; tap the cards below 👇</p>
      <div style={styles.grid}>
        {colors.map((color, i) => (
          <motion.div
            key={color.label}
            style={{
              ...styles.card,
              backgroundColor: color.bg,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.08,
              rotate: [-2, 2, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            layout
          >
            <motion.span
              style={styles.label}
              animate={{
                fontSize: expanded === i ? "1.1rem" : "0.9rem",
              }}
            >
              {color.label}
            </motion.span>
            {expanded === i && (
              <motion.p
                style={styles.desc}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                Clicked! 🎉
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#1e1e2e",
    maxWidth: "480px",
  },
  hint: {
    color: "#94a3b8",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.75rem",
  },
  card: {
    borderRadius: "10px",
    padding: "1.25rem 0.75rem",
    textAlign: "center",
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    minHeight: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
  },
  label: {
    display: "block",
    color: "#fff",
    fontWeight: 600,
  },
  desc: {
    margin: 0,
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.8)",
  },
};
