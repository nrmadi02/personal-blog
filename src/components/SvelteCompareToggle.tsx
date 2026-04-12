import { useState } from "react";

const opponents = {
  react: {
    name: "React",
    emoji: "⚛️",
    dotColor: "#61dafb",
    items: [
      "Bundle besar (~42KB runtime)",
      "VDOM diffing di setiap update",
      "Runtime reactivity (hooks)",
      "Learning curve tinggi (hooks, effects, closures)",
      "Perlu Redux/Zustand/Jotai",
      "Perlu Framer Motion / library eksternal",
      "Perlu CSS Modules / styled-components",
      "Next.js untuk full-stack",
    ],
  },
  vue: {
    name: "Vue",
    emoji: "💚",
    dotColor: "#42b883",
    items: [
      "Bundle menengah (~33KB runtime)",
      "VDOM diffing di setiap update",
      "Runtime reactivity (reactive proxy)",
      "Learning curve medium (Composition API)",
      "Perlu Pinia untuk state management",
      "Perlu library eksternal untuk animasi",
      "Scoped CSS (built-in, bagus)",
      "Nuxt.js untuk full-stack",
    ],
  },
};

const svelteItems = [
  "Bundle minimal (~1.6KB runtime)",
  "Tidak ada VDOM overhead",
  "Compile-time reactivity",
  "Learning curve rendah",
  "Built-in state management",
  "Built-in animations & transitions",
  "Scoped CSS native",
  "SvelteKit untuk full-stack",
];

export default function SvelteCompareToggle() {
  const [opponent, setOpponent] = useState<"react" | "vue">("react");
  const op = opponents[opponent];

  return (
    <div className="my-8">
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
            opponent === "react"
              ? "bg-[#ff3e00] text-white border-[#ff3e00]"
              : "bg-background text-muted border-border hover:border-muted"
          }`}
          onClick={() => setOpponent("react")}
        >
          React
        </button>
        <button
          className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
            opponent === "vue"
              ? "bg-[#ff3e00] text-white border-[#ff3e00]"
              : "bg-background text-muted border-border hover:border-muted"
          }`}
          onClick={() => setOpponent("vue")}
        >
          Vue
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface border border-[#ff3e004d] rounded-xl p-6">
          <div className="font-extrabold text-lg mb-4">🔥 Svelte</div>
          <ul className="list-none p-0 m-0">
            {svelteItems.map((item, i) => (
              <li
                key={i}
                className="py-1.5 text-sm text-muted flex gap-2 items-start leading-relaxed"
              >
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ background: "#ff3e00" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="font-extrabold text-lg mb-4">
            {op.emoji} {op.name}
          </div>
          <ul className="list-none p-0 m-0">
            {op.items.map((item, i) => (
              <li
                key={i}
                className="py-1.5 text-sm text-muted flex gap-2 items-start leading-relaxed"
              >
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                  style={{ background: op.dotColor }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
