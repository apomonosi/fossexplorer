import { useState } from "react";
import { DISTROS, DESKTOPS, DE_PACKAGES, BASE_BUNDLES } from "../data/desktop-config";
import { genBash, genPlaybook, gatherSectionPkgs } from "../lib/generators";
import PipelineViz from "./PipelineViz";
import InstituteSelector from "./InstituteSelector";

export default function WellTamperedDesktop() {
  const [step, setStep] = useState(0);
  const [distro, setDistro] = useState<string | null>(null);
  const [desktop, setDesktop] = useState<string | null>(null);
  const [sections, setSections] = useState<string[]>([]);
  const [bundles, setBundles] = useState<string[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [generated, setGenerated] = useState("");
  const [copyFb, setCopyFb] = useState(false);

  const warnings = distro && desktop ? DE_PACKAGES[distro]?.[desktop]?.warn : null;
  const toggleSection = (id: string, val: boolean) => { setSections(p => val ? (p.includes(id) ? p : [...p, id]) : p.filter(x => x !== id)); setOutput(null); setGenerated(""); };
  const toggleBundle = (id: string) => { setBundles(p => p.includes(id) ? p.filter(b => b !== id) : [...p, id]); setOutput(null); setGenerated(""); };
  const generate = (type: string) => { setOutput(type); setStep(4); setGenerated(type === "script" ? genBash(distro!, desktop!, sections, bundles) : genPlaybook(distro!, desktop!, sections, bundles)); };
  const handleCopy = () => { navigator.clipboard.writeText(generated).then(() => { setCopyFb(true); setTimeout(() => setCopyFb(false), 2000); }).catch(() => {}); };
  const handleDownload = () => { const ext = output === "script" ? "sh" : "yml"; const blob = new Blob([generated], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `well-tampered-desktop-${distro}-${desktop}.${ext}`; a.click(); };
  const reset = () => { setStep(0); setDistro(null); setDesktop(null); setSections([]); setBundles([]); setOutput(null); setGenerated(""); };

  const card: React.CSSProperties = { background: "#0c1220", border: "1px solid #1e293b", borderRadius: 10, padding: "16px 18px", cursor: "pointer", transition: "all 0.25s" };
  const stepHead = (num: string, label: string, done: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: done ? "#0c2d4a" : "#111827", border: `1.5px solid ${done ? "#22d3ee" : "#334155"}`, color: done ? "#22d3ee" : "#64748b", fontSize: 12, fontWeight: 700, fontFamily: "'Oxanium', monospace" }}>{done ? "✓" : num}</div>
      <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.04em", fontFamily: "'Oxanium', monospace" }}>{label}</h2>
    </div>
  );
  const canGen = sections.length > 0 || bundles.length > 0;

  return (
    <div style={{ background: "linear-gradient(170deg, #020617 0%, #060a13 100%)", fontFamily: "'Oxanium', 'JetBrains Mono', monospace", color: "#e2e8f0", borderRadius: 16, padding: "36px 0" }}>
      <style>{`
        .anim-in { animation: slideUp 0.4s ease-out both; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        pre::-webkit-scrollbar { height:6px; } pre::-webkit-scrollbar-track { background:#0a0f1a; } pre::-webkit-scrollbar-thumb { background:#334155; border-radius:3px; }
      `}</style>

      <header style={{ textAlign: "center", padding: "0 24px 12px" }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          background: "linear-gradient(135deg, #22d3ee, #4ade80, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Well-Tampered Desktop
        </h2>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 8, fontWeight: 300, letterSpacing: "0.04em" }}>OS → Desktop → Institute & Section → Bundles → Deploy</p>
      </header>

      <div style={{ padding: "16px 24px 8px" }}>
        <PipelineViz step={step} distro={distro} desktop={desktop} sections={sections} bundles={bundles} output={output} />
      </div>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 24px" }}>

        {/* 1: OS */}
        <section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("1", "Select Operating System", !!distro)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {DISTROS.map(d => { const sel = distro === d.id; return (
              <div key={d.id} onClick={() => { setDistro(d.id); if (step < 1) setStep(1); setDesktop(null); setSections([]); setBundles([]); setOutput(null); setGenerated(""); }}
                style={{ ...card, borderColor: sel ? d.accent : "#1e293b", background: sel ? d.color + "22" : "#0c1220" }}
                onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = d.accent + "66"; }} onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 22 }}>{d.icon}</span>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: sel ? d.accent : "#e2e8f0" }}>{d.name}</div><div style={{ fontSize: 11, color: "#64748b" }}>{d.ver} · {d.pkg}</div></div>
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.45 }}>{d.desc}</p>
              </div>); })}
          </div>
        </section>

        {/* 2: DE */}
        {step >= 1 && (<section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("2", "Select Desktop Environment", !!desktop)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {DESKTOPS.map(de => { const sel = desktop === de.id; const warn = distro ? DE_PACKAGES[distro]?.[de.id]?.warn : null; return (
              <div key={de.id} onClick={() => { setDesktop(de.id); if (step < 2) setStep(2); setSections([]); setBundles([]); setOutput(null); setGenerated(""); }}
                style={{ ...card, borderColor: sel ? de.color : "#1e293b", background: sel ? de.color + "18" : "#0c1220", opacity: warn ? 0.7 : 1 }}
                onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = de.color + "66"; }} onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = sel ? de.color : "#1e293b"; }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{de.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: sel ? de.color : "#e2e8f0", marginBottom: 2 }}>{de.name}</div>
                <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>{de.desc}</p>
                {warn && <p style={{ fontSize: 10, color: "#f87171", marginTop: 6 }}>⚠ {warn.split(".")[0]}</p>}
              </div>); })}
          </div>
          {warnings && <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#1c0a0a", border: "1px solid #7f1d1d", fontSize: 12, color: "#fca5a5", lineHeight: 1.5 }}>⚠ {warnings}</div>}
        </section>)}

        {/* 3: INSTITUTE & SECTION */}
        {step >= 2 && distro && (<section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("3", "Select Institute & Sections", sections.length > 0)}
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14, lineHeight: 1.5 }}>
            Click an institute header to select all its sections, or pick individual sections. Package counts are shown for {DISTROS.find(d => d.id === distro)?.name}.
          </p>
          <InstituteSelector distro={distro} selected={sections} onToggle={toggleSection} />
          {sections.length > 0 && (
            <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "#0c1a1a", border: "1px solid #134e4a", fontSize: 12, color: "#5eead4", lineHeight: 1.5 }}>
              <strong>{sections.length} section{sections.length > 1 ? "s" : ""}</strong> selected → <strong>{gatherSectionPkgs(distro, sections).length}</strong> unique packages for {DISTROS.find(d => d.id === distro)?.name}
            </div>
          )}
        </section>)}

        {/* 4: BUNDLES */}
        {step >= 2 && distro && (<section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("4", "Additional Bundles (optional)", bundles.length > 0)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10 }}>
            {BASE_BUNDLES.map(b => { const sel = bundles.includes(b.id); return (
              <div key={b.id} onClick={() => toggleBundle(b.id)}
                style={{ ...card, borderColor: sel ? b.color : "#1e293b", background: sel ? b.color + "12" : "#0c1220" }}
                onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = b.color + "44"; }} onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.borderColor = sel ? b.color : "#1e293b"; }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sel ? b.color : "#e2e8f0" }}>{b.icon} {b.name}</span>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${sel ? b.color : "#334155"}`, background: sel ? b.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#020617", fontWeight: 700 }}>{sel ? "✓" : ""}</div>
                </div>
                <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>{b.desc}</p>
              </div>); })}
          </div>
          {canGen && (
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => generate("script")} style={{ flex: 1, padding: "14px", borderRadius: 8, border: "1.5px solid #22d3ee", cursor: "pointer", background: output === "script" ? "#0c2d4a" : "transparent", color: "#22d3ee", fontFamily: "'Oxanium', monospace", fontSize: 14, fontWeight: 600, transition: "all 0.25s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#0c2d4a"} onMouseLeave={e => { if (output !== "script") (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                Generate Bash Script
              </button>
              <button onClick={() => generate("playbook")} style={{ flex: 1, padding: "14px", borderRadius: 8, border: "1.5px solid #a78bfa", cursor: "pointer", background: output === "playbook" ? "#1e1040" : "transparent", color: "#a78bfa", fontFamily: "'Oxanium', monospace", fontSize: 14, fontWeight: 600, transition: "all 0.25s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1e1040"} onMouseLeave={e => { if (output !== "playbook") (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                Generate Ansible Playbook
              </button>
            </div>
          )}
        </section>)}

        {/* 5: OUTPUT */}
        {output && generated && (<section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("5", `${output === "script" ? "Bash Script" : "Ansible Playbook"} — Ready`, true)}
          <div style={{ background: "#0c1a12", border: "1px solid #14532d", borderRadius: 8, padding: "14px 18px", marginBottom: 14, fontSize: 13, color: "#86efac", lineHeight: 1.6 }}>
            {output === "script" ? (<>
              <strong style={{ color: "#4ade80" }}>How to run:</strong><br />
              <code style={{ background: "#052e16", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>chmod +x well-tampered-desktop-{distro}-{desktop}.sh</code><br />
              <code style={{ background: "#052e16", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>sudo ./well-tampered-desktop-{distro}-{desktop}.sh</code><br />
              <span style={{ color: "#64748b", fontSize: 11 }}>Requires root. Review before running. Reboot after.</span>
            </>) : (<>
              <strong style={{ color: "#4ade80" }}>How to run:</strong><br />
              <code style={{ background: "#052e16", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>ansible-playbook -i inventory.ini well-tampered-desktop-{distro}-{desktop}.yml --become</code><br />
              <span style={{ color: "#64748b", fontSize: 11 }}>Ansible 2.12+. Define hosts under <code>[desktops]</code>.{bundles.includes("comms") && " Needs community.general collection."}</span>
            </>)}
          </div>
          <div style={{ position: "relative", borderRadius: 10, border: "1px solid #1e293b", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#111827", borderBottom: "1px solid #1e293b" }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>well-tampered-desktop-{distro}-{desktop}.{output === "script" ? "sh" : "yml"}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleCopy} style={{ background: copyFb ? "#052e16" : "#1e293b", border: "1px solid #334155", borderRadius: 5, padding: "4px 10px", cursor: "pointer", color: copyFb ? "#4ade80" : "#94a3b8", fontFamily: "'Oxanium', monospace", fontSize: 11 }}>{copyFb ? "✓ Copied" : "Copy"}</button>
                <button onClick={handleDownload} style={{ background: "#0c2d4a", border: "1px solid #22d3ee44", borderRadius: 5, padding: "4px 10px", cursor: "pointer", color: "#22d3ee", fontFamily: "'Oxanium', monospace", fontSize: 11 }}>↓ Download</button>
              </div>
            </div>
            <pre style={{ margin: 0, padding: 16, background: "#0a0f1a", color: "#94a3b8", fontSize: 11.5, lineHeight: 1.55, fontFamily: "'JetBrains Mono', monospace", overflowX: "auto", maxHeight: 420, overflowY: "auto" }}>{generated}</pre>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={reset} style={{ background: "transparent", border: "1px solid #334155", borderRadius: 8, padding: "10px 28px", cursor: "pointer", color: "#64748b", fontFamily: "'Oxanium', monospace", fontSize: 13, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#64748b"; (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#334155"; (e.currentTarget as HTMLElement).style.color = "#64748b"; }}>
              ↻ Start Over
            </button>
          </div>
        </section>)}

      </main>
    </div>
  );
}
