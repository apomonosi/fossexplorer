import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { INSTITUTES } from "../data/desktop-config";

interface Props {
  distro: string;
  selected: string[];
  onToggle: (id: string, val: boolean) => void;
}

export default function InstituteSelector({ distro, selected, onToggle }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(760);

  useEffect(() => { if (wrapRef.current) setW(wrapRef.current.getBoundingClientRect().width - 16); }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = w, ROW = 52, INDENT = 38, INST_H = 50;
    let y = 12;
    const els: any[] = [];
    INSTITUTES.forEach(inst => { els.push({ t: "i", inst, y }); y += INST_H; inst.sections.forEach(sec => { els.push({ t: "s", inst, sec, y }); y += ROW; }); y += 8; });
    const H = y + 4;
    svg.attr("viewBox", `0 0 ${W} ${H}`).style("height", H + "px");
    const g = svg.append("g");

    els.forEach(el => {
      if (el.t === "i") {
        const { inst } = el, allIds = inst.sections.map((s: any) => s.id), allSel = allIds.every((id: string) => selected.includes(id)), someSel = allIds.some((id: string) => selected.includes(id));
        const ig = g.append("g").style("cursor", "pointer")
          .on("click", () => { if (allSel) allIds.forEach((id: string) => onToggle(id, false)); else allIds.forEach((id: string) => onToggle(id, true)); });

        ig.append("rect").attr("x", 0).attr("y", el.y).attr("width", W).attr("height", INST_H).attr("rx", 8)
          .attr("fill", allSel ? inst.color + "14" : someSel ? inst.color + "0a" : "#0c1220")
          .attr("stroke", someSel ? inst.color + "30" : "#1e293b").attr("stroke-width", 1);

        ig.append("rect").attr("x", 14).attr("y", el.y + 15).attr("width", 18).attr("height", 18).attr("rx", 4)
          .attr("fill", allSel ? inst.color : "transparent").attr("stroke", someSel ? inst.color : "#334155").attr("stroke-width", 1.5);
        if (allSel) ig.append("text").attr("x", 23).attr("y", el.y + 27).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", "#020617").attr("font-size", 13).attr("font-weight", 700).text("✓");
        else if (someSel) ig.append("line").attr("x1", 18).attr("x2", 28).attr("y1", el.y + 24).attr("y2", el.y + 24).attr("stroke", inst.color).attr("stroke-width", 2).attr("stroke-linecap", "round");

        ig.append("text").attr("x", 42).attr("y", el.y + 19).attr("dominant-baseline", "central").attr("fill", inst.color).attr("font-size", 14).attr("font-weight", 700).attr("font-family", "'Oxanium', monospace").text(`${inst.icon}  ${inst.name}`);
        ig.append("text").attr("x", 42).attr("y", el.y + 36).attr("dominant-baseline", "central").attr("fill", "#475569").attr("font-size", 10).attr("font-family", "'Oxanium', monospace").text(`${inst.sections.length} sections · click to select all`);

        const selCount = allIds.filter((id: string) => selected.includes(id)).length;
        if (selCount > 0) {
          const bx = W - 68;
          ig.append("rect").attr("x", bx).attr("y", el.y + 14).attr("width", 52).attr("height", 20).attr("rx", 10).attr("fill", inst.color + "20").attr("stroke", inst.color + "44").attr("stroke-width", 1);
          ig.append("text").attr("x", bx + 26).attr("y", el.y + 24).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", inst.color).attr("font-size", 10).attr("font-weight", 600).attr("font-family", "'Oxanium', monospace").text(`${selCount}/${allIds.length}`);
        }
      } else {
        const { sec, inst } = el, isSel = selected.includes(sec.id), pkgC = (sec.packages[distro as keyof typeof sec.packages] || []).length;
        const sg = g.append("g").style("cursor", "pointer").on("click", () => onToggle(sec.id, !isSel));

        g.append("line").attr("x1", 23).attr("x2", 23).attr("y1", el.y - 2).attr("y2", el.y + ROW / 2).attr("stroke", "#1e293b").attr("stroke-width", 1);
        g.append("line").attr("x1", 23).attr("x2", INDENT + 12).attr("y1", el.y + ROW / 2 - 4).attr("y2", el.y + ROW / 2 - 4).attr("stroke", "#1e293b").attr("stroke-width", 1);

        sg.append("rect").attr("x", INDENT).attr("y", el.y + 2).attr("width", W - INDENT).attr("height", ROW - 6).attr("rx", 6)
          .attr("fill", isSel ? inst.color + "0e" : "transparent").attr("stroke", isSel ? inst.color + "20" : "transparent").attr("stroke-width", 1);

        sg.append("rect").attr("x", INDENT + 14).attr("y", el.y + 14).attr("width", 16).attr("height", 16).attr("rx", 3)
          .attr("fill", isSel ? inst.color : "transparent").attr("stroke", isSel ? inst.color : "#334155").attr("stroke-width", 1.5);
        if (isSel) sg.append("text").attr("x", INDENT + 22).attr("y", el.y + 22).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", "#020617").attr("font-size", 11).attr("font-weight", 700).text("✓");

        sg.append("text").attr("x", INDENT + 38).attr("y", el.y + 17).attr("dominant-baseline", "central").attr("fill", isSel ? "#e2e8f0" : "#94a3b8").attr("font-size", 13).attr("font-weight", isSel ? 600 : 400).attr("font-family", "'Oxanium', monospace").text(`${sec.icon} ${sec.id}: ${sec.name}`);
        sg.append("text").attr("x", INDENT + 38).attr("y", el.y + 34).attr("dominant-baseline", "central").attr("fill", "#475569").attr("font-size", 10).attr("font-family", "'Oxanium', monospace").text(`${sec.desc}`);

        const bx = W - 55;
        sg.append("rect").attr("x", bx).attr("y", el.y + 13).attr("width", 40).attr("height", 18).attr("rx", 9).attr("fill", isSel ? inst.color + "22" : "#111827").attr("stroke", isSel ? inst.color + "44" : "#1e293b").attr("stroke-width", 1);
        sg.append("text").attr("x", bx + 20).attr("y", el.y + 22).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", isSel ? inst.color : "#475569").attr("font-size", 10).attr("font-weight", 600).attr("font-family", "'Oxanium', monospace").text(`${pkgC}`);
      }
    });
  }, [w, selected, distro]);

  return (
    <div ref={wrapRef} style={{ borderRadius: 10, border: "1px solid #1e293b", background: "#0a0f1a", padding: "8px", overflow: "hidden" }}>
      <svg ref={svgRef} width="100%" style={{ display: "block" }} />
    </div>
  );
}
