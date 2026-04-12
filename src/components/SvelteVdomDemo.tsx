import { useState } from "react";

const configs = {
  initial: {
    old: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding" />', diff: false },
      { text: '<Todo text="Push git" />', diff: false },
    ],
    new: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding" />', diff: false },
      { text: '<Todo text="Push git" />', diff: false },
    ],
    step: "initial" as const,
  },
  update: {
    old: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding" />', diff: false },
      { text: '<Todo text="Push git" />', diff: false },
    ],
    new: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding ✅" />', diff: true },
      { text: '<Todo text="Push git" />', diff: false },
    ],
    step: "update" as const,
  },
  add: {
    old: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding" />', diff: false },
      { text: '<Todo text="Push git" />', diff: false },
    ],
    new: [
      { text: '<Todo text="Beli kopi" />', diff: false },
      { text: '<Todo text="Coding" />', diff: false },
      { text: '<Todo text="Push git" />', diff: false },
      { text: '<Todo text="Deploy 🚀" />', diff: true },
    ],
    step: "add" as const,
  },
};

function StepContent({ type }: { type: "initial" | "update" | "add" }) {
  if (type === "initial") {
    return (
      <>
        Tidak ada perubahan. Tapi React/Vue <em>tetap</em> membuat VDOM baru
        &amp; men-diff.
      </>
    );
  }
  if (type === "update") {
    return (
      <>
        <strong>React/Vue:</strong> Create VDOM baru → Diff semua 3 item →
        Update 1 node di DOM
        <br />
        <br />
        <strong className="text-[#ff3e00]">Svelte:</strong> Langsung update{" "}
        <code>textContent</code> node ke-2. Selesai.
      </>
    );
  }
  return (
    <>
      <strong>React/Vue:</strong> Diff semua → Tambah 1 node
      <br />
      <br />
      <strong className="text-[#ff3e00]">Svelte:</strong>{" "}
      <code>createElement</code> + <code>insertBefore</code>. Langsung.
    </>
  );
}

export default function SvelteVdomDemo() {
  const [action, setAction] = useState<"initial" | "update" | "add">("initial");
  const c = configs[action];

  return (
    <div className="bg-surface border border-border rounded-xl p-6 my-8">
      <p className="text-xs uppercase tracking-wider text-muted mb-4">
        Coba tekan tombol di bawah untuk lihat cara kerja VDOM vs Svelte
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
            action === "initial"
              ? "bg-[#ff3e00] text-white border-[#ff3e00]"
              : "bg-background text-foreground border-border hover:border-[#ff3e00] hover:bg-[#ff3e0020]"
          }`}
          onClick={() => setAction("initial")}
        >
          State Awal
        </button>
        <button
          className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
            action === "update"
              ? "bg-[#ff3e00] text-white border-[#ff3e00]"
              : "bg-background text-foreground border-border hover:border-[#ff3e00] hover:bg-[#ff3e0020]"
          }`}
          onClick={() => setAction("update")}
        >
          Ubah Satu Item
        </button>
        <button
          className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
            action === "add"
              ? "bg-[#ff3e00] text-white border-[#ff3e00]"
              : "bg-background text-foreground border-border hover:border-[#ff3e00] hover:bg-[#ff3e0020]"
          }`}
          onClick={() => setAction("add")}
        >
          Tambah Item
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="text-xs uppercase tracking-wider text-muted/60 mb-3">
            Old VDOM (React/Vue)
          </h4>
          {c.old.map((b, i) => (
            <div
              key={`old-${i}`}
              className={`px-3 py-2 rounded-md mb-1.5 font-mono text-sm transition-all ${
                b.diff
                  ? "bg-[#ff3e0018] border-l-[3px] border-l-[#ff3e00] text-[#ff3e00]"
                  : "bg-white/[0.02] border-l-[3px] border-l-border text-muted/50"
              }`}
            >
              {b.text}
            </div>
          ))}
        </div>
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="text-xs uppercase tracking-wider text-muted/60 mb-3">
            New VDOM
          </h4>
          {c.new.map((b, i) => (
            <div
              key={`new-${i}`}
              className={`px-3 py-2 rounded-md mb-1.5 font-mono text-sm transition-all ${
                b.diff
                  ? "bg-[#ff3e0018] border-l-[3px] border-l-[#ff3e00] text-[#ff3e00]"
                  : "bg-white/[0.02] border-l-[3px] border-l-border text-muted/50"
              }`}
            >
              {b.text}
            </div>
          ))}
        </div>
        <div className="bg-background border border-border rounded-lg p-4">
          <h4 className="text-xs uppercase tracking-wider text-muted/60 mb-3">
            Real DOM Update
          </h4>
          <p className="text-sm text-[#fbbf24] font-semibold leading-relaxed">
            <StepContent type={c.step} />
          </p>
        </div>
      </div>
    </div>
  );
}
