import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const items = [
  {
    id: 1,
    icon: "📦",
    title: "Komponen Motion",
    desc: "Tambahkan animasi ke elemen HTML & SVG mana pun dengan motion.",
  },
  {
    id: 2,
    icon: "🖱️",
    title: "Gesture Animations",
    desc: "Hover, tap, drag — semua langsung tersedia lewat props.",
  },
  {
    id: 3,
    icon: "📜",
    title: "Scroll Animations",
    desc: "Trigger atau link animasi ke posisi scroll.",
  },
  {
    id: 4,
    icon: "🔄",
    title: "Layout Animations",
    desc: "Animasi otomatis saat layout berubah — ukuran, posisi, urutan.",
  },
  {
    id: 5,
    icon: "🎭",
    title: "Exit Animations",
    desc: "Animasi halus saat elemen dihapus dari DOM.",
  },
  {
    id: 6,
    icon: "⚡",
    title: "120fps Performance",
    desc: "Hybrid engine menggunakan Web Animations API & JS fallback.",
  },
];

export default function StaggerList() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={styles.container}>
      <p style={styles.hint}>
        Klik item untuk melihat stagger &amp; exit animation 👇
      </p>
      <div style={styles.list}>
        <AnimatePresence>
          {items
            .filter((item) => selected === null || item.id !== selected)
            .map((item, i) => (
              <motion.div
                key={item.id}
                style={styles.item}
                layout
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 60,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                }}
                whileHover={{
                  x: 8,
                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(item.id)}
              >
                <motion.span
                  style={styles.icon}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.08 + 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {item.icon}
                </motion.span>
                <div style={styles.text}>
                  <p style={styles.title}>{item.title}</p>
                  <p style={styles.desc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selected !== null && items.find((i) => i.id === selected) && (
          <motion.div
            style={styles.toast}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p>
              ✅ <strong>{items.find((i) => i.id === selected)?.title}</strong>{" "}
              dihapus dari daftar!
            </p>
            <button style={styles.resetBtn} onClick={() => setSelected(null)}>
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#1e1e2e",
    maxWidth: "520px",
  },
  hint: {
    color: "#94a3b8",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.04)",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  icon: {
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    margin: 0,
    color: "#e2e8f0",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  desc: {
    margin: "2px 0 0",
    color: "#94a3b8",
    fontSize: "0.8rem",
    lineHeight: 1.4,
  },
  toast: {
    marginTop: "1rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#a7f3d0",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  },
  resetBtn: {
    background: "rgba(16, 185, 129, 0.3)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    color: "#a7f3d0",
    borderRadius: "6px",
    padding: "0.3rem 0.75rem",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
};
