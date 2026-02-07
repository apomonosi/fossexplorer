import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { FOSS_DATA, type FOSSNode } from "../data/foss-tree";

interface Props {
  theme: string;
}

export default function FOSSExplorer({ theme }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 880, h: 640 });
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  const [hovered, setHovered] = useState<any>(null);
  const focusRef = useRef<any>(null);
  const viewRef = useRef<number[]>([0, 0, 0]);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        setDims({ w: r.width, h: Math.max(520, Math.min(700, window.innerHeight * 0.62)) });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getCatColor = (n: any) => {
    let c = n;
    while (c.parent && c.depth > 1) c = c.parent;
    return c.data.color || "var(--cat-infra)";
  };

  const getCatPath = (n: any): string => {
    const parts: string[] = [];
    let c = n.parent;
    while (c && c.depth > 0) { parts.unshift(c.data.name); c = c.parent; }
    return parts.join(" › ");
  };

  const render = useCallback(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const hier = d3.hierarchy(FOSS_DATA).sum((d: any) => d.size || 0).sort((a, b) => (b.value || 0) - (a.value || 0));
    const root = d3.pack<FOSSNode>().size([w, h]).padding(4)(hier);

    let currentFocus = root;
    focusRef.current = root;
    viewRef.current = [root.x, root.y, root.r * 2.2];

    const g = svg.append("g");

    function zoomTo(v: number[]) {
      const k = Math.min(w, h) / v[2];
      viewRef.current = v;
      g.selectAll("circle")
        .attr("cx", (d: any) => (d.x - v[0]) * k + w / 2)
        .attr("cy", (d: any) => (d.y - v[1]) * k + h / 2)
        .attr("r", (d: any) => d.r * k);
      g.selectAll(".nlbl")
        .attr("x", (d: any) => (d.x - v[0]) * k + w / 2)
        .attr("y", (d: any) => !d.children ? (d.y - v[1]) * k + h / 2 : (d.y - v[1]) * k + h / 2 - d.r * k + 16)
        .style("font-size", (d: any) => {
          const r = d.r * k;
          return (!d.children ? Math.max(6, Math.min(13, r / 3.2)) : Math.max(8, Math.min(15, r / 5))) + "px";
        })
        .style("opacity", (d: any) => {
          const r = d.r * k;
          if (d.depth === 0) return 0;
          if (!d.children && r < 16) return 0;
          if (d.children && r < 28) return 0;
          return 1;
        });
    }

    function zoomNode(d: any) {
      currentFocus = d;
      focusRef.current = d;
      const path: any[] = [];
      let n = d;
      while (n) { path.unshift({ name: n.data.name, node: n }); n = n.parent; }
      setBreadcrumbs(path);
      const target = [d.x, d.y, d.r * 2.2];
      g.transition().duration(600).ease(d3.easeCubicInOut)
        .tween("zoom", () => { const i = d3.interpolateZoom(viewRef.current as [number, number, number], target as [number, number, number]); return (t: number) => zoomTo(i(t)); });
    }

    g.selectAll("circle").data(root.descendants()).join("circle")
      .attr("fill", (d: any) => {
        if (d.depth === 0) return "var(--graph-root)";
        const col = getCatColor(d);
        if (!d.children) return `color-mix(in srgb, ${col} 14%, transparent)`;
        return d.depth === 1 ? `color-mix(in srgb, ${col} 8%, transparent)` : `color-mix(in srgb, ${col} 6%, transparent)`;
      })
      .attr("stroke", (d: any) => {
        if (d.depth === 0) return "var(--border-accent)";
        const col = getCatColor(d);
        return !d.children ? `color-mix(in srgb, ${col} 55%, transparent)` : `color-mix(in srgb, ${col} 30%, transparent)`;
      })
      .attr("stroke-width", (d: any) => d.depth === 0 ? 2 : d.depth === 1 ? 1.5 : d.children ? 1 : 0.7)
      .style("cursor", "pointer")
      .on("click", (e: any, d: any) => { e.stopPropagation(); zoomNode(currentFocus === d && d.parent ? d.parent : d); })
      .on("dblclick", (e: any, d: any) => {
        e.stopPropagation();
        if (!d.children && d.data.slug) {
          window.location.href = "/tool/" + d.data.slug;
        }
      })
      .on("mouseenter", (e: any, d: any) => {
        if (d.depth === 0) return;
        setHovered(d);
        d3.select(e.target).transition().duration(180).attr("stroke-width", d.children ? 2.5 : 2).attr("stroke", getCatColor(d));
      })
      .on("mouseleave", (e: any, d: any) => {
        setHovered(null);
        const col = getCatColor(d);
        d3.select(e.target).transition().duration(180)
          .attr("stroke-width", d.depth === 1 ? 1.5 : d.children ? 1 : 0.7)
          .attr("stroke", d.children ? `color-mix(in srgb, ${col} 30%, transparent)` : `color-mix(in srgb, ${col} 55%, transparent)`);
      });

    g.selectAll(".nlbl").data(root.descendants().filter(d => d.depth > 0)).join("text")
      .attr("class", "nlbl").attr("text-anchor", "middle")
      .attr("dominant-baseline", (d: any) => d.children ? "hanging" : "central")
      .attr("fill", (d: any) => getCatColor(d))
      .attr("font-weight", (d: any) => d.children ? 700 : 500)
      .attr("pointer-events", "none")
      .attr("font-family", "'JetBrains Mono', 'Fira Code', monospace")
      .attr("letter-spacing", (d: any) => d.children ? "0.03em" : "0")
      .text((d: any) => d.data.name);

    svg.on("click", () => { if (currentFocus !== root && currentFocus.parent) zoomNode(currentFocus.parent); });
    zoomTo([root.x, root.y, root.r * 2.2]);
    setBreadcrumbs([{ name: "FOSS Universe", node: root }]);
  }, [dims]);

  useEffect(() => { render(); }, [dims, theme]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <nav style={{ padding: "10px 0", display: "flex", alignItems: "center", gap: 4, fontSize: 13, flexWrap: "wrap" }}>
        {breadcrumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {i > 0 && <span style={{ color: "var(--text-muted)" }}>›</span>}
            <button onClick={e => { e.stopPropagation(); focusRef.current = c.node; render(); }}
              style={{ background: "none", border: "none", padding: "3px 7px", borderRadius: 5, cursor: "pointer",
                color: i === breadcrumbs.length - 1 ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-primary)"; (e.target as HTMLElement).style.background = "var(--border)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = i === breadcrumbs.length - 1 ? "var(--text-primary)" : "var(--text-muted)"; (e.target as HTMLElement).style.background = "none"; }}>
              {c.name}
            </button>
          </span>
        ))}
      </nav>
      <svg ref={svgRef} width={dims.w} height={dims.h}
        style={{ display: "block", borderRadius: 12, background: "var(--graph-bg)", border: "1px solid var(--border)" }} />
      {hovered && hovered.data.description && (
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          background: "var(--tooltip-bg)", border: "1px solid var(--border-accent)", borderRadius: 12,
          padding: "14px 20px", maxWidth: 460, minWidth: 260, backdropFilter: "blur(14px)", zIndex: 100, pointerEvents: "none",
          animation: "tooltipIn 0.15s ease-out",
        }}>
          {getCatPath(hovered) && (
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>
              {getCatPath(hovered)}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            {hovered.data.icon && <span style={{ fontSize: 22 }}>{hovered.data.icon}</span>}
            <span style={{ fontWeight: 700, fontSize: 15, color: getCatColor(hovered), fontFamily: "'JetBrains Mono', monospace" }}>{hovered.data.name}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: hovered.data.url || hovered.data.slug ? 8 : 0 }}>{hovered.data.description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {hovered.data.url && (
              <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", opacity: 0.8 }}>
                🔗 {hovered.data.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            )}
            {!hovered.children && hovered.data.slug && (
              <span style={{ fontSize: 11, color: getCatColor(hovered), fontFamily: "'JetBrains Mono', monospace", opacity: 0.7 }}>
                double-click for details →
              </span>
            )}
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", padding: "14px 0 4px" }}>
        {FOSS_DATA.children!.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
