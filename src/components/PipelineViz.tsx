import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  step: number;
  distro: string | null;
  desktop: string | null;
  sections: string[];
  bundles: string[];
  output: string | null;
}

export default function PipelineViz({ step, distro, desktop, sections, bundles, output }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const nodes = [
      { x: 70, label: "OS", done: !!distro },
      { x: 230, label: "Desktop", done: !!desktop },
      { x: 410, label: "Institute", done: sections.length > 0 },
      { x: 590, label: "Bundles", done: bundles.length > 0 },
      { x: 770, label: "Output", done: !!output },
    ];
    const g = svg.append("g").attr("transform", "translate(0, 45)");
    for (let i = 0; i < nodes.length - 1; i++) {
      const f = nodes[i], t = nodes[i + 1];
      g.append("line").attr("x1", f.x + 28).attr("x2", t.x - 28).attr("y1", 0).attr("y2", 0)
        .attr("stroke", f.done ? "#22d3ee" : "#1e293b").attr("stroke-width", f.done ? 2 : 1.5).attr("stroke-dasharray", f.done ? "none" : "6,4");
      if (f.done) {
        const p = g.append("circle").attr("r", 3).attr("fill", "#22d3ee").attr("opacity", 0.8);
        (function a() { p.attr("cx", f.x + 28).attr("opacity", 0.9).transition().duration(1200).ease(d3.easeLinear).attr("cx", t.x - 28).attr("opacity", 0.2).on("end", a); })();
      }
    }
    nodes.forEach((n, i) => {
      const ng = g.append("g").attr("transform", `translate(${n.x}, 0)`);
      ng.append("circle").attr("r", 24).attr("fill", n.done ? "#0c2d4a" : "#0a0f1a").attr("stroke", n.done ? "#22d3ee" : i <= step ? "#334155" : "#1e293b").attr("stroke-width", n.done ? 2 : 1.5);
      if (n.done) {
        ng.append("circle").attr("r", 24).attr("fill", "none").attr("stroke", "#22d3ee").attr("stroke-width", 1).attr("opacity", 0.25)
          .append("animate").attr("attributeName", "r").attr("from", 24).attr("to", 36).attr("dur", "2s").attr("repeatCount", "indefinite");
      }
      ng.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central")
        .attr("fill", n.done ? "#22d3ee" : i <= step ? "#94a3b8" : "#334155")
        .attr("font-size", 13).attr("font-weight", 700).attr("font-family", "'Oxanium', monospace").text(n.done ? "✓" : i + 1);
      ng.append("text").attr("text-anchor", "middle").attr("y", -34)
        .attr("fill", i <= step ? "#e2e8f0" : "#475569")
        .attr("font-size", 10).attr("font-weight", 600).attr("font-family", "'Oxanium', monospace").attr("letter-spacing", "0.06em").text(n.label.toUpperCase());
    });
  }, [step, distro, desktop, sections, bundles, output]);

  return <svg ref={svgRef} viewBox="0 0 900 90" style={{ width: "100%", maxWidth: 900, display: "block", margin: "0 auto" }} />;
}
