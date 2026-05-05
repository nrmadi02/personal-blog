import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface NodeDef {
  id: string;
  label: string;
  sub?: string;
  color: string;
  row: "top" | "middle" | "bottom";
  col: number;
  icon: string;
}

const nodes: NodeDef[] = [
  { id: "browser", label: "Browser", sub: "React Client", color: "#60a5fa", row: "top", col: 0, icon: "🌐" },
  { id: "router", label: "TanStack Router", sub: "Type-safe Routing", color: "#f472b6", row: "top", col: 1, icon: "🧭" },
  { id: "serverfn", label: "Server Functions", sub: "Zod Validation", color: "#34d399", row: "top", col: 2, icon: "⚡" },
  { id: "database", label: "Database", sub: "Drizzle + SQLite", color: "#fbbf24", row: "top", col: 3, icon: "🗄️" },
  { id: "query", label: "TanStack Query", sub: "Caching · Refetch · Mutate", color: "#a78bfa", row: "middle", col: 1, icon: "🔄" },
  { id: "cache", label: "Cache + Revalidation", sub: "Stale-while-revalidate", color: "#fb923c", row: "bottom", col: 1, icon: "⚡" },
];

interface Connection {
  from: string;
  to: string;
}

const connections: Connection[] = [
  { from: "browser", to: "router" },
  { from: "router", to: "serverfn" },
  { from: "serverfn", to: "database" },
  { from: "router", to: "query" },
  { from: "query", to: "cache" },
];

const descriptions: Record<string, string> = {
  browser: "Client React yang merender UI dan mengirim request ke router.",
  router: "Type-safe routing yang menghubungkan URL ke komponen + loader data.",
  serverfn: "Fungsi TypeScript yang jalan di server — dipanggil dari client seperti fungsi biasa.",
  database: "Drizzle ORM + SQLite — schema typed, query typed, result typed.",
  query: "Caching layer otomatis — deduplikasi request, stale-while-revalidate, optimistic update.",
  cache: "Data yang sudah di-fetch disimpan di cache. Request berikutnya instant tanpa hit server.",
};

interface Point {
  x: number;
  y: number;
}

function getNodeCenter(el: HTMLElement, containerRect: DOMRect): Point {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - containerRect.left,
    y: rect.top + rect.height / 2 - containerRect.top,
  };
}

export default function TanStackArchitecture() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [clicked, setClicked] = useState<string | null>(null);
  const [linePaths, setLinePaths] = useState<
    { key: string; from: Point; to: Point }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setNodeRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        nodeRefs.current.set(id, el);
      } else {
        nodeRefs.current.delete(id);
      }
    },
    []
  );

  const recalcLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    const paths = connections
      .map((conn) => {
        const fromEl = nodeRefs.current.get(conn.from);
        const toEl = nodeRefs.current.get(conn.to);
        if (!fromEl || !toEl) return null;

        return {
          key: `${conn.from}-${conn.to}`,
          from: getNodeCenter(fromEl, containerRect),
          to: getNodeCenter(toEl, containerRect),
        };
      })
      .filter(Boolean) as { key: string; from: Point; to: Point }[];

    setLinePaths(paths);
  }, []);

  useEffect(() => {
    // Initial calculation after a short delay to let layout settle
    const timer = setTimeout(recalcLines, 100);

    const observer = new ResizeObserver(() => {
      recalcLines();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [recalcLines]);

  // Recalculate on hover change (since scaling may shift positions slightly)
  useEffect(() => {
    const timer = setTimeout(recalcLines, 50);
    return () => clearTimeout(timer);
  }, [hovered, recalcLines]);

  const isActive = (conn: Connection) =>
    hovered === conn.from ||
    hovered === conn.to ||
    clicked === conn.from ||
    clicked === conn.to;

  // SVG dimensions — we'll use the container's actual size
  const svgWidth = "100%";
  const svgHeight = "100%";

  return (
    <div style={styles.wrapper}>
      <p style={styles.hint}>Klik atau hover node untuk melihat koneksi 👇</p>
      <div ref={containerRef} style={styles.diagram}>
        {/* SVG overlay for connections */}
        <svg style={styles.svg}>
          {linePaths.map(({ key, from, to }) => {
            const conn = connections.find(
              (c) => `${c.from}-${c.to}` === key
            );
            if (!conn) return null;
            const active = isActive(conn);

            // For vertical connections (router→query, query→cache),
            // draw an L-shaped path through the gap
            const isVertical =
              conn.from === "router" && conn.to === "query";
            const isVertical2 = conn.from === "query" && conn.to === "cache";

            if (isVertical || isVertical2) {
              const midY = (from.y + to.y) / 2;
              const d = `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;

              return (
                <g key={key}>
                  <path
                    d={d}
                    fill="none"
                    stroke={active ? "#818cf8" : "#334155"}
                    strokeWidth={active ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {active && (
                    <motion.circle
                      r={4}
                      fill="#a5b4fc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <animateMotion
                        dur="1.8s"
                        repeatCount="indefinite"
                        path={d}
                      />
                    </motion.circle>
                  )}
                </g>
              );
            }

            // Horizontal connection
            return (
              <g key={key}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? "#818cf8" : "#334155"}
                  strokeWidth={active ? 2.5 : 1.5}
                  strokeLinecap="round"
                />
                {active && (
                  <motion.circle
                    r={4}
                    fill="#a5b4fc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    />
                  </motion.circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Top row */}
        <div style={styles.row}>
          {nodes
            .filter((n) => n.row === "top")
            .map((node, i) => (
              <motion.div
                key={node.id}
                ref={setNodeRef(node.id)}
                style={{
                  ...styles.node,
                  borderColor: node.color,
                  background:
                    hovered === node.id || clicked === node.id
                      ? `${node.color}18`
                      : "rgba(255,255,255,0.03)",
                  boxShadow:
                    hovered === node.id || clicked === node.id
                      ? `0 0 20px ${node.color}20`
                      : "none",
                }}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.12,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setClicked(clicked === node.id ? null : node.id)
                }
              >
                <span style={{ ...styles.nodeIcon, color: node.color }}>
                  {node.icon}
                </span>
                <span style={styles.nodeLabel}>{node.label}</span>
                <span style={styles.nodeSub}>{node.sub}</span>
              </motion.div>
            ))}
        </div>

        {/* Middle row — centered */}
        <div style={{ ...styles.row, justifyContent: "center" }}>
          {nodes
            .filter((n) => n.row === "middle")
            .map((node, i) => (
              <motion.div
                key={node.id}
                ref={setNodeRef(node.id)}
                style={{
                  ...styles.node,
                  maxWidth: "220px",
                  borderColor: node.color,
                  background:
                    hovered === node.id || clicked === node.id
                      ? `${node.color}18`
                      : "rgba(255,255,255,0.03)",
                  boxShadow:
                    hovered === node.id || clicked === node.id
                      ? `0 0 20px ${node.color}20`
                      : "none",
                }}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.6 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setClicked(clicked === node.id ? null : node.id)
                }
              >
                <span style={{ ...styles.nodeIcon, color: node.color }}>
                  {node.icon}
                </span>
                <span style={styles.nodeLabel}>{node.label}</span>
                <span style={styles.nodeSub}>{node.sub}</span>
              </motion.div>
            ))}
        </div>

        {/* Bottom row — centered */}
        <div style={{ ...styles.row, justifyContent: "center" }}>
          {nodes
            .filter((n) => n.row === "bottom")
            .map((node, i) => (
              <motion.div
                key={node.id}
                ref={setNodeRef(node.id)}
                style={{
                  ...styles.node,
                  maxWidth: "220px",
                  borderColor: node.color,
                  background:
                    hovered === node.id || clicked === node.id
                      ? `${node.color}18`
                      : "rgba(255,255,255,0.03)",
                  boxShadow:
                    hovered === node.id || clicked === node.id
                      ? `0 0 20px ${node.color}20`
                      : "none",
                }}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.75 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setClicked(clicked === node.id ? null : node.id)
                }
              >
                <span style={{ ...styles.nodeIcon, color: node.color }}>
                  {node.icon}
                </span>
                <span style={styles.nodeLabel}>{node.label}</span>
                <span style={styles.nodeSub}>{node.sub}</span>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Legend */}
      {clicked && (
        <motion.div
          style={styles.legend}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>
            ✨ <strong>{nodes.find((n) => n.id === clicked)?.label}</strong>
            {" — "}
            {descriptions[clicked]}
          </p>
        </motion.div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#0f0f1a",
    border: "1px solid #1e293b",
    maxWidth: "640px",
    margin: "1.5rem 0",
    overflow: "hidden",
  },
  hint: {
    color: "#94a3b8",
    marginBottom: "1rem",
    fontSize: "0.85rem",
    textAlign: "center",
  },
  diagram: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
    overflow: "visible",
  },
  row: {
    display: "flex",
    gap: "0.6rem",
    position: "relative",
    zIndex: 1,
    flexWrap: "wrap",
  },
  node: {
    flex: "1 1 100px",
    minWidth: "95px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    padding: "0.7rem 0.4rem",
    borderRadius: "10px",
    border: "2px solid",
    cursor: "pointer",
    textAlign: "center",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  nodeIcon: {
    fontSize: "1.4rem",
  },
  nodeLabel: {
    color: "#e2e8f0",
    fontWeight: 700,
    fontSize: "0.78rem",
    lineHeight: 1.2,
  },
  nodeSub: {
    color: "#64748b",
    fontSize: "0.65rem",
    lineHeight: 1.3,
  },
  legend: {
    marginTop: "0.75rem",
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.25)",
    color: "#c7d2fe",
    fontSize: "0.8rem",
    lineHeight: 1.5,
  },
};
