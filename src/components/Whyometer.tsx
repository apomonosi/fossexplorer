import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { REASONS } from "../data/whyometer-reasons";

export default function Whyometer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef(REASONS.map(r => r.base));
  const animRef = useRef<number | null>(null);
  const [dims, setDims] = useState({ w: 700, h: 700 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [currentValues, setCurrentValues] = useState(REASONS.map(r => r.base));
  const [, setAggregate] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        const s = Math.min(r.width, 720);
        setDims({ w: s, h: s });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const render = useCallback(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const cx = w / 2;
    const cy = h / 2;
    const outerR = Math.min(w, h) / 2 - 40;
    const innerR = outerR * 0.32;
    const bandWidth = (outerR - innerR - 20) / REASONS.length;

    const defs = svg.append("defs");

    const glow = defs.append("filter").attr("id", "arcGlow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    glow.append("feGaussianBlur").attr("stdDeviation", "6").attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const cGlow = defs.append("filter").attr("id", "centerGlow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    cGlow.append("feGaussianBlur").attr("stdDeviation", "12").attr("result", "blur");
    const cMerge = cGlow.append("feMerge");
    cMerge.append("feMergeNode").attr("in", "blur");
    cMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const radGrad = defs.append("radialGradient").attr("id", "bgGrad").attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
    radGrad.append("stop").attr("offset", "0%").attr("stop-color", "#0f1729");
    radGrad.append("stop").attr("offset", "100%").attr("stop-color", "#060a13");

    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);
    g.append("circle").attr("r", outerR + 20).attr("fill", "url(#bgGrad)").attr("stroke", "none");
    g.append("circle").attr("r", outerR + 2).attr("fill", "none").attr("stroke", "#1e293b").attr("stroke-width", 1.5);

    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 9 === 0;
      const r1 = outerR + 3;
      const r2 = outerR + (isMajor ? 12 : 7);
      g.append("line")
        .attr("x1", Math.cos(angle) * r1).attr("y1", Math.sin(angle) * r1)
        .attr("x2", Math.cos(angle) * r2).attr("y2", Math.sin(angle) * r2)
        .attr("stroke", isMajor ? "#475569" : "#1e293b")
        .attr("stroke-width", isMajor ? 1.5 : 0.8);
    }

    REASONS.forEach((_reason, i) => {
      const r = innerR + 16 + i * bandWidth;
      g.append("circle").attr("r", r).attr("fill", "none").attr("stroke", "#111827").attr("stroke-width", bandWidth - 3).attr("opacity", 0.6);
      g.append("circle").attr("r", r).attr("fill", "none").attr("stroke", "#1a2235").attr("stroke-width", 0.5);
    });

    const arcsGroup = g.append("g").attr("class", "value-arcs");

    const arcPaths = REASONS.map((reason, i) => {
      const r = innerR + 16 + i * bandWidth;
      const arcGen = d3.arc()
        .innerRadius(r - (bandWidth - 3) / 2)
        .outerRadius(r + (bandWidth - 3) / 2)
        .startAngle(-Math.PI * 0.75)
        .cornerRadius(2) as any;

      arcsGroup.append("path").attr("d", arcGen.endAngle(Math.PI * 0.75)()).attr("fill", reason.color).attr("opacity", 0.06);

      const valuePath = arcsGroup.append("path").attr("class", `arc-${i}`).attr("fill", reason.color).attr("opacity", 0.7).attr("filter", "url(#arcGlow)");
      const tipPath = arcsGroup.append("path").attr("class", `tip-${i}`).attr("fill", reason.color).attr("opacity", 0.95);

      return { arcGen, valuePath, tipPath, r };
    });

    g.append("circle").attr("r", innerR + 4).attr("fill", "none").attr("stroke", "#1e293b").attr("stroke-width", 1);
    g.append("circle").attr("r", innerR - 2).attr("fill", "#0a0f1a").attr("stroke", "#1e293b").attr("stroke-width", 0.5);

    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      g.append("circle").attr("cx", Math.cos(a) * (innerR + 1)).attr("cy", Math.sin(a) * (innerR + 1)).attr("r", 1.2).attr("fill", "#334155");
    }

    const centerVal = g.append("text")
      .attr("class", "center-value").attr("text-anchor", "middle").attr("dominant-baseline", "central")
      .attr("y", -10).attr("fill", "#22d3ee").attr("font-size", innerR * 0.48).attr("font-weight", 700)
      .attr("font-family", "'Oxanium', 'JetBrains Mono', monospace").attr("filter", "url(#centerGlow)").text("76");

    g.append("text").attr("text-anchor", "middle").attr("y", innerR * 0.25).attr("fill", "#64748b")
      .attr("font-size", 11).attr("font-family", "'Oxanium', monospace").attr("letter-spacing", "0.12em").text("URGENCY INDEX");

    const pctSign = g.append("text")
      .attr("class", "pct-sign").attr("text-anchor", "start").attr("dominant-baseline", "central")
      .attr("y", -10 - innerR * 0.08).attr("fill", "#475569").attr("font-size", innerR * 0.18).attr("font-family", "'Oxanium', monospace");

    const startA = -Math.PI * 0.75;
    const endA = Math.PI * 0.75;
    [0, 25, 50, 75, 100].forEach(v => {
      const a = startA + (endA - startA) * (v / 100);
      const x = Math.cos(a) * (outerR + 22);
      const y = Math.sin(a) * (outerR + 22);
      g.append("text").attr("x", x).attr("y", y).attr("text-anchor", "middle").attr("dominant-baseline", "central")
        .attr("fill", "#475569").attr("font-size", 9).attr("font-family", "'Oxanium', monospace").text(v);
    });

    function updateArcs(values: number[]) {
      const startAngle = -Math.PI * 0.75;
      const sweep = Math.PI * 1.5;

      arcPaths.forEach(({ arcGen, valuePath, tipPath }, i) => {
        const endAngle = startAngle + sweep * (values[i] / 100);
        valuePath.attr("d", arcGen.endAngle(endAngle)());
        const tipGen = d3.arc()
          .innerRadius((arcGen as any).innerRadius()())
          .outerRadius((arcGen as any).outerRadius()())
          .startAngle(endAngle - 0.04)
          .endAngle(endAngle + 0.01)
          .cornerRadius(2) as any;
        tipPath.attr("d", tipGen());
      });

      const avg = values.reduce((s, v) => s + v, 0) / values.length;
      centerVal.text(Math.round(avg));
      const numWidth = Math.round(avg).toString().length * innerR * 0.26;
      pctSign.attr("x", numWidth / 2 + 2).text("%");
      const urgencyColor = avg > 80 ? "#f87171" : avg > 65 ? "#facc15" : "#22d3ee";
      centerVal.attr("fill", urgencyColor);
    }

    const phases = REASONS.map(() => Math.random() * Math.PI * 2);
    const speeds = REASONS.map(() => 0.3 + Math.random() * 0.5);
    const phases2 = REASONS.map(() => Math.random() * Math.PI * 2);
    const speeds2 = REASONS.map(() => 0.7 + Math.random() * 0.4);
    let startTime: number | null = null;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      const newValues = REASONS.map((r, i) => {
        const noise1 = Math.sin(t * speeds[i] + phases[i]);
        const noise2 = Math.sin(t * speeds2[i] + phases2[i]) * 0.4;
        const combined = (noise1 + noise2) / 1.4;
        return Math.max(5, Math.min(98, r.base + combined * r.range));
      });

      valuesRef.current = newValues;
      setCurrentValues([...newValues]);
      setAggregate(newValues.reduce((s, v) => s + v, 0) / newValues.length);
      updateArcs(newValues);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [dims]);

  useEffect(() => {
    const cleanup = render();
    return cleanup;
  }, [render]);

  return (
    <div style={{
      background: "var(--bg-primary)",
      fontFamily: "'Oxanium', 'JetBrains Mono', monospace",
      color: "var(--text-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "36px 0 40px",
      borderRadius: 16,
      transition: "background 0.35s, color 0.35s",
    }}>
      <header style={{ textAlign: "center", padding: "0 24px 8px" }}>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", margin: 0, lineHeight: 1.2,
          background: "linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Why-ometer
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, letterSpacing: "0.06em", fontWeight: 300 }}>
          Strategic urgency indicators for Linux & FOSS adoption
        </p>
      </header>

      <div ref={containerRef} style={{ width: "100%", maxWidth: 720, position: "relative", padding: "0 16px" }}>
        <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display: "block", margin: "0 auto" }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 10,
        maxWidth: 720,
        width: "100%",
        padding: "4px 24px 0",
      }}>
        {REASONS.map((r, i) => {
          const val = currentValues[i];
          const isHot = val > 80;
          return (
            <div key={r.id}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? "var(--bg-card)" : "var(--bg-secondary)",
                border: `1px solid ${hoveredIdx === i ? r.color + "55" : "var(--border-hard)"}`,
                borderRadius: 8,
                padding: "12px 14px",
                transition: "all 0.25s",
                cursor: "default",
              }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: r.color, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {r.short}
                </span>
                <span style={{
                  fontSize: 18, fontWeight: 700,
                  color: isHot ? "#f87171" : val > 65 ? "#facc15" : r.color,
                  fontVariantNumeric: "tabular-nums",
                  transition: "color 0.3s",
                }}>
                  {Math.round(val)}
                  <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: 1 }}>%</span>
                </span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: "var(--border-hard)", overflow: "hidden", marginBottom: 6 }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  background: `linear-gradient(90deg, ${r.color}88, ${r.color})`,
                  width: `${val}%`,
                  transition: "width 0.15s ease-out",
                  boxShadow: `0 0 8px ${r.color}44`,
                }} />
              </div>
              <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>{r.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
