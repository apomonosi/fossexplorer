import { useState, useEffect } from "react";
import { themes, type ThemeName } from "../data/themes";
import { ROSETTA_SECTIONS } from "../data/rosetta";
import { STRATEGY_PHASES, BARRIER_CARDS } from "../data/strategy";
import FOSSExplorer from "./FOSSExplorer";

export default function LandingPage() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const t = themes[theme];
  const [vis, setVis] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVis(p => ({ ...p, [(e.target as HTMLElement).dataset.section!]: true })); });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-section]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const reveal = (id: string, delay = 0): React.CSSProperties => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  const cssVars = Object.entries(t).map(([k, v]) => `${k}: ${v}`).join("; ");

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Source Sans 3', 'Noto Sans', sans-serif" }}>
      <style>{`
        :root { ${cssVars} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg-primary); color: var(--text-primary); transition: background 0.35s, color 0.35s; }
        ::selection { background: color-mix(in srgb, var(--accent-1) 30%, transparent); }
        @keyframes tooltipIn { from { opacity:0; transform:translateX(-50%) translateY(4px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      `}</style>

      <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", transition: "background 0.35s, color 0.35s" }}>

        {/* NAVBAR */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)",
          background: "color-mix(in srgb, var(--bg-primary) 82%, transparent)",
          borderBottom: "1px solid var(--border)", padding: "0 32px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <a href="/" style={{ textDecoration: "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 17, color: "var(--accent-1)", letterSpacing: "-0.03em" }}>
                  &gt;_ FOSS Explorer
                </span>
              </a>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", border: "1px solid var(--border-accent)", padding: "2px 6px", borderRadius: 4 }}>v0.1</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {["explorer", "barriers", "rosetta", "strategy"].map(s => (
                <a key={s} href={`#${s}`} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              ))}
              <a href="/whyometer" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
                Why-ometer
              </a>
              <a href="/well-tampered-desktop" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
                Desktop
              </a>
              <button onClick={() => setTheme(p => p === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border-accent)", borderRadius: 8, padding: "6px 12px",
                  cursor: "pointer", fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-1)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)"}>
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

          {/* HERO */}
          <section style={{ padding: "68px 0 44px", maxWidth: 740 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--accent-1)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              Open Source Strategy for Education
            </p>
            <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.03em" }}>
              An active Linux strategy<br />
              <span style={{ color: "var(--accent-1)" }}>for your institution</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 620 }}>
              Linux already dominates research infrastructure and HPC. The gap is on the desktop, in classrooms, and in administration — and it's not a technical gap.
              It's structural: lock-in, contracts, skills distribution, and change management. This project maps the full FOSS landscape and charts a phased, pragmatic path forward for teachers, students, and researchers.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href="#explorer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8,
                background: "var(--accent-1)", color: "#020617", fontWeight: 600, fontSize: 14, textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace", transition: "opacity 0.2s",
              }} onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.85"} onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}>
                Explore the Map
              </a>
              <a href="#strategy" style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8,
                background: "transparent", border: "1px solid var(--border-accent)", color: "var(--text-secondary)",
                fontWeight: 500, fontSize: 14, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s",
              }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "var(--accent-1)"; (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
                 onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "var(--border-accent)"; (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}>
                Read the Strategy
              </a>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0 0 48px" }} />

          {/* EXPLORER */}
          <section id="explorer" data-section="explorer" style={reveal("explorer")}>
            <div style={{ marginBottom: 14 }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Interactive FOSS Map</h2>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 600, lineHeight: 1.6 }}>
                Click any circle to zoom in and explore categories. Click the background or use breadcrumbs to zoom out. Find open source tools for your specific role and workflow.
              </p>
            </div>
            <FOSSExplorer theme={theme} />
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "48px 0" }} />

          {/* BARRIERS */}
          <section id="barriers" data-section="barriers" style={reveal("barriers")}>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Adoption Barriers</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 620, lineHeight: 1.6, marginBottom: 28 }}>
              Linux adoption in education isn't primarily constrained by technical capability. These structural barriers span five institutional domains and must be addressed through governance, policy, and pragmatic containment.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {BARRIER_CARDS.map((b, i) => (
                <div key={b.area} data-section={`bar${i}`}
                  style={{
                    ...reveal(`bar${i}`, i * 0.07),
                    background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "20px 22px",
                    borderLeft: `3px solid ${b.color}`, transition: "background 0.25s, opacity 0.55s, transform 0.55s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", color: b.color }}>{b.area}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{b.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "48px 0" }} />

          {/* ROSETTA TABLE */}
          <section id="rosetta" data-section="rosetta" style={reveal("rosetta")}>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Rosetta Table</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 620, lineHeight: 1.6, marginBottom: 28 }}>
              A practical mapping from proprietary blocker software to best-of-breed FOSS substitutes. Not every replacement is 1:1, but each entry has been validated in institutional contexts.
            </p>
            {ROSETTA_SECTIONS.map(sec => (
              <div key={sec.title} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-1)", marginBottom: 10, letterSpacing: "0.02em" }}>{sec.title}</h3>
                <div style={{ borderRadius: 10, border: "1px solid var(--border)", overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", background: "var(--table-header)", padding: "10px 16px", fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    <span>Proprietary</span><span>FOSS Substitute</span><span>Notes</span>
                  </div>
                  {sec.rows.map((row, ri) => (
                    <div key={ri} style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", padding: "10px 16px", fontSize: 13,
                      background: ri % 2 ? "var(--table-row-alt)" : "var(--table-row)", borderTop: "1px solid var(--border)",
                      color: "var(--text-secondary)", lineHeight: 1.5,
                    }}>
                      <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{row[0]}</span>
                      <span style={{ fontWeight: 600, color: "var(--accent-1)" }}>{row[1]}</span>
                      <span>{row[2]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "48px 0" }} />

          {/* STRATEGY TIMELINE */}
          <section id="strategy" data-section="strategy" style={{ ...reveal("strategy"), paddingBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Adoption Strategy</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 620, lineHeight: 1.6, marginBottom: 28 }}>
              A phased approach that treats Linux adoption as a governance and policy initiative — not a tooling exercise. Savings from reduced licensing directly fund training and support capacity.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
              <div style={{ position: "absolute", left: 23, top: 28, bottom: 28, width: 2, background: "var(--border-accent)", borderRadius: 1 }} />
              {STRATEGY_PHASES.map((p, i) => (
                <div key={p.phase} data-section={`ph${i}`}
                  style={{ ...reveal(`ph${i}`, i * 0.08), display: "flex", gap: 20, alignItems: "flex-start", padding: "16px 0" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", background: "var(--phase-bg)", border: "2px solid var(--accent-1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, zIndex: 2,
                  }}>{p.icon}</div>
                  <div style={{ paddingTop: 4 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 5, fontFamily: "'JetBrains Mono', monospace" }}>
                      <span style={{ color: "var(--accent-1)", marginRight: 8 }}>Phase {p.phase}</span>{p.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 560 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0 0 48px" }} />

          {/* PRINCIPLES */}
          <section data-section="principles" style={{ ...reveal("principles"), paddingBottom: 72 }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 32px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-1)", marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>Guiding Principles</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
                {[
                  "Linux adoption is a governance problem, not a tooling shortage.",
                  "Exceptions should be contained, not eliminated immediately.",
                  "Standardization matters more than distribution choice.",
                  "License savings should fund support and training.",
                  "Data sovereignty and auditability are strategic advantages.",
                  "Linux is critical institutional infrastructure, not an ideology.",
                ].map((p, i) => (
                  <div key={i} style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, paddingLeft: 14, borderLeft: "2px solid var(--border-accent)" }}>{p}</div>
                ))}
              </div>
            </div>
          </section>

          {/* STRATEGIC ADVANTAGES */}
          <section data-section="geo" style={{ ...reveal("geo"), paddingBottom: 80 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Strategic Advantages</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 620, lineHeight: 1.6, marginBottom: 24 }}>
              Beyond cost savings, the transition to open source infrastructure delivers advantages in resilience, sovereignty, and long-term independence.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {[
                { t: "Reduced Sanctions Exposure", d: "Less dependence on vendors who may withdraw under geopolitical pressure." },
                { t: "Data Sovereignty", d: "Full auditability and control over institutional data processing." },
                { t: "Cost Predictability", d: "Eliminate currency volatility risk in foreign-denominated license fees." },
                { t: "Local IT Ecosystems", d: "Support regional service providers and build domestic expertise." },
                { t: "Reproducible Research", d: "Open toolchains ensure research workflows can be verified and shared." },
                { t: "Hardware Longevity", d: "Lightweight Linux extends useful life of existing hardware fleets." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "18px 20px",
                  transition: "background 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-2)" }}>{item.t}</h4>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            FOSS Explorer — An open initiative for teachers, students & researchers · Built with open tools
          </p>
        </footer>
      </div>
    </div>
  );
}
