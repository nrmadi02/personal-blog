const bars = [
  { label: "Svelte (runtime)", size: "~1.6 KB", width: "5%", gradient: true },
  {
    label: "Vue 3 (runtime)",
    size: "~33 KB",
    width: "33%",
    gradient: false,
    color: "#42b883",
  },
  {
    label: "React 18 (runtime)",
    size: "~42 KB",
    width: "42%",
    gradient: false,
    color: "#61dafb",
  },
];

export default function SvelteStatBars() {
  return (
    <div className="my-8">
      {bars.map((bar) => (
        <div key={bar.label} className="mb-5">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted">{bar.label}</span>
            <span className="text-muted font-mono">{bar.size}</span>
          </div>
          <div className="h-2 bg-surface rounded overflow-hidden">
            <div
              className="h-full rounded transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: bar.width,
                background: bar.gradient
                  ? "linear-gradient(90deg, #ff3e00, #fbbf24)"
                  : bar.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
