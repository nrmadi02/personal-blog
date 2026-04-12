import { useState } from "react";

const frameworks = [
  {
    id: "react" as const,
    label: "React",
    color: "#61dafb",
  },
  {
    id: "vue" as const,
    label: "Vue",
    color: "#42b883",
  },
  {
    id: "svelte" as const,
    label: "Svelte",
    color: "#ff3e00",
  },
] as const;

type FwId = "react" | "vue" | "svelte";

function WorkSteps({ fw, count }: { fw: FwId; count: number }) {
  if (count === 0) {
    return <span className="text-muted/40">Menunggu...</span>;
  }

  if (fw === "react") {
    return (
      <>
        <span className="text-[#fbbf24] font-semibold">1.</span> setState()
        called
        <br />
        <span className="text-[#fbbf24] font-semibold">2.</span> Create new VDOM
        tree
        <br />
        <span className="text-[#fbbf24] font-semibold">3.</span> Diff old VDOM
        vs new VDOM
        <br />
        <span className="text-[#fbbf24] font-semibold">4.</span> Reconcile
        changes
        <br />
        <span className="text-[#fbbf24] font-semibold">5.</span> Commit to real
        DOM ✓
      </>
    );
  }
  if (fw === "vue") {
    return (
      <>
        <span className="text-[#fbbf24] font-semibold">1.</span> ref.value
        updated
        <br />
        <span className="text-[#fbbf24] font-semibold">2.</span> Trigger
        reactivity system
        <br />
        <span className="text-[#fbbf24] font-semibold">3.</span> Create new
        VNode tree
        <br />
        <span className="text-[#fbbf24] font-semibold">4.</span> Patch &amp;
        diff algorithm
        <br />
        <span className="text-[#fbbf24] font-semibold">5.</span> Update real DOM
        ✓
      </>
    );
  }
  return (
    <>
      <span className="text-[#ff3e00] font-semibold">1.</span> count++
      <br />
      <span className="text-[#ff3e00] font-semibold">2.</span>{" "}
      element.textContent = count ✓<br />
      <span className="block mt-1 text-muted/50">Done. No VDOM. No diff.</span>
    </>
  );
}

export default function SvelteCounterDemo() {
  const [counts, setCounts] = useState<Record<FwId, number>>({
    react: 0,
    vue: 0,
    svelte: 0,
  });
  const [clicked, setClicked] = useState<Record<FwId, boolean>>({
    react: false,
    vue: false,
    svelte: false,
  });

  const click = (fw: FwId) => {
    setCounts((prev) => ({ ...prev, [fw]: prev[fw] + 1 }));
    setClicked((prev) => ({ ...prev, [fw]: true }));
    setTimeout(() => setClicked((prev) => ({ ...prev, [fw]: false })), 150);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-8 my-8">
      <p className="text-xs uppercase tracking-wider text-muted mb-6">
        Coba klik counter di bawah — lihat &quot;kerja&quot; yang dilakukan
        masing-masing
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <div
            key={fw.id}
            className="bg-background border border-border rounded-lg p-6 text-center"
          >
            <h4
              className="text-xs font-semibold mb-2"
              style={{ color: fw.color }}
            >
              {fw.label}
            </h4>
            <div
              className={`text-6xl font-black tabular-nums my-4 transition-transform ${
                clicked[fw.id] ? "scale-115" : ""
              }`}
              style={{ color: fw.color }}
            >
              {counts[fw.id]}
            </div>
            <button
              className="px-5 py-2.5 rounded-lg border border-border bg-background text-foreground cursor-pointer transition-all hover:border-[#ff3e00] active:scale-95"
              onClick={() => click(fw.id)}
            >
              +1
            </button>
            <div className="mt-4 text-sm text-muted/50 font-mono text-left leading-relaxed">
              <WorkSteps fw={fw.id} count={counts[fw.id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
