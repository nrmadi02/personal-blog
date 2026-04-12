import { useState } from "react";

const tabs = [
  {
    id: "react",
    label: "React",
    lines: 14,
    lang: "react",
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}

export default Counter;`,
  },
  {
    id: "vue",
    label: "Vue",
    lines: 14,
    lang: "vue",
    code: `<script setup>
import { ref } from 'vue';

const count = ref(0);
function increment() { count.value++; }
</script>

<template>
  <button @click="increment">
    Clicked {{ count }} times
  </button>
</template>`,
  },
  {
    id: "svelte",
    label: "Svelte",
    lines: 7,
    lang: "svelte",
    highlight: true,
    code: `<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicked {count} times
</button>`,
  },
];

const langColors: Record<string, string> = {
  react: "#61dafb",
  vue: "#42b883",
  svelte: "#ff3e00",
};

export default function SvelteSyntaxTabs() {
  const [active, setActive] = useState("react");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="my-6">
      <div className="flex gap-0.5 bg-background rounded-lg p-[3px] mb-4 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`px-4 py-1.5 rounded-md text-sm cursor-pointer transition-all ${
              active === t.id
                ? "bg-[#ff3e00] text-white"
                : "text-muted hover:text-foreground"
            }`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        className={`rounded-xl border border-border overflow-hidden ${
          current.highlight
            ? "shadow-[0_0_40px_rgba(255,62,0,0.15)] border-[#ff3e004d]"
            : ""
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-border text-sm">
          <span className="flex items-center gap-2 font-semibold">
            <span style={{ color: langColors[current.lang] }}>●</span>
            {current.label}
          </span>
          <span
            className="font-mono"
            style={{ color: current.highlight ? "#ff3e00" : undefined }}
          >
            {current.lines} baris {current.highlight ? "✨" : ""}
          </span>
        </div>
        <pre className="p-4 overflow-x-auto m-0">
          <code className="text-sm leading-relaxed text-muted font-mono">
            {current.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
