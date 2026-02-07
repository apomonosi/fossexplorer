import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ══════════════════════════════════════════════
   ORGANISATIONAL STRUCTURE + PACKAGES
   ══════════════════════════════════════════════ */

const INSTITUTES = [
  {
    id: "A", name: "Natural Sciences", icon: "🔬", color: "#22d3ee",
    sections: [
      {
        id: "A1", name: "Physics", icon: "⚛️",
        packages: {
          alma: ["python3-numpy", "python3-scipy", "python3-matplotlib", "gnuplot", "octave", "paraview"],
          fedora: ["python3-numpy", "python3-scipy", "python3-matplotlib", "gnuplot", "octave", "paraview", "root"],
          ubuntu: ["python3-numpy", "python3-scipy", "python3-matplotlib", "gnuplot", "octave", "paraview", "root-system-bin"],
        },
        desc: "Numerical computing, simulation, ROOT, ParaView",
      },
      {
        id: "A2", name: "Chemistry", icon: "🧪",
        packages: {
          alma: ["python3-numpy", "python3-scipy", "avogadro", "openbabel"],
          fedora: ["python3-numpy", "python3-scipy", "avogadro2", "python3-openbabel", "jmol"],
          ubuntu: ["python3-numpy", "python3-scipy", "avogadro", "openbabel", "jmol", "pymol"],
        },
        desc: "Molecular modeling, Avogadro, OpenBabel, PyMOL",
      },
      {
        id: "A3", name: "Biology & Life Sciences", icon: "🧬",
        packages: {
          alma: ["python3-numpy", "python3-scipy", "python3-biopython"],
          fedora: ["python3-numpy", "python3-scipy", "python3-biopython", "ncbi-blast+", "samtools", "ImageMagick"],
          ubuntu: ["python3-numpy", "python3-scipy", "python3-biopython", "ncbi-blast+", "samtools", "bcftools", "fastqc", "imagej"],
        },
        desc: "Bioinformatics, BLAST, samtools, ImageJ/FIJI",
      },
    ],
  },
  {
    id: "B", name: "Engineering & CS", icon: "⚙️", color: "#4ade80",
    sections: [
      {
        id: "B1", name: "Computer Science", icon: "💻",
        packages: {
          alma: ["git", "gcc", "gcc-c++", "make", "cmake", "python3", "python3-pip", "java-17-openjdk-devel", "nodejs", "npm", "podman", "podman-compose", "valgrind", "gdb"],
          fedora: ["git", "gcc", "gcc-c++", "make", "cmake", "python3", "python3-pip", "java-17-openjdk-devel", "nodejs", "npm", "podman", "podman-compose", "valgrind", "gdb", "rust", "cargo"],
          ubuntu: ["git", "gcc", "g++", "make", "cmake", "python3", "python3-pip", "python3-venv", "default-jdk", "nodejs", "npm", "podman", "valgrind", "gdb", "rustc", "cargo"],
        },
        desc: "Compilers, runtimes, containers, debuggers, Rust",
      },
      {
        id: "B2", name: "Electrical Engineering", icon: "⚡",
        packages: {
          alma: ["gcc", "gcc-c++", "make", "python3", "python3-numpy", "octave"],
          fedora: ["gcc", "gcc-c++", "make", "python3", "python3-numpy", "octave", "kicad", "sigrok-cli", "fritzing"],
          ubuntu: ["gcc", "g++", "make", "python3", "python3-numpy", "octave", "kicad", "sigrok", "fritzing", "ngspice"],
        },
        desc: "KiCad, ngspice, signal processing, Octave",
      },
      {
        id: "B3", name: "Mechanical Engineering", icon: "🔧",
        packages: {
          alma: ["freecad", "python3-numpy", "python3-scipy", "octave", "gnuplot"],
          fedora: ["freecad", "openscad", "python3-numpy", "python3-scipy", "octave", "gnuplot", "calculix"],
          ubuntu: ["freecad", "openscad", "python3-numpy", "python3-scipy", "octave", "gnuplot", "calculix-ccx", "gmsh"],
        },
        desc: "FreeCAD, OpenSCAD, CalculiX, Gmsh",
      },
      {
        id: "B4", name: "Civil Engineering", icon: "🏗️",
        packages: {
          alma: ["qgis", "python3-numpy", "python3-scipy", "gnuplot"],
          fedora: ["qgis", "python3-numpy", "python3-scipy", "gnuplot", "grass"],
          ubuntu: ["qgis", "python3-numpy", "python3-scipy", "gnuplot", "grass", "saga"],
        },
        desc: "QGIS, GRASS GIS, geospatial analysis",
      },
    ],
  },
  {
    id: "C", name: "Humanities & Social Sciences", icon: "📚", color: "#a78bfa",
    sections: [
      {
        id: "C1", name: "Economics & Statistics", icon: "📊",
        packages: {
          alma: ["R", "python3-numpy", "python3-scipy", "python3-pandas"],
          fedora: ["R", "rstudio-desktop", "python3-numpy", "python3-scipy", "python3-pandas", "python3-statsmodels", "python3-jupyter-core", "pspp"],
          ubuntu: ["r-base", "python3-numpy", "python3-scipy", "python3-pandas", "python3-statsmodels", "jupyter-notebook", "pspp"],
        },
        desc: "R, RStudio, Jupyter, PSPP (SPSS alternative)",
      },
      {
        id: "C2", name: "Political Science & Law", icon: "⚖️",
        packages: {
          alma: ["libreoffice", "R"],
          fedora: ["libreoffice", "R", "python3-pandas", "zotero"],
          ubuntu: ["libreoffice", "r-base", "python3-pandas", "calibre"],
        },
        desc: "Statistical analysis, reference management, document tools",
      },
      {
        id: "C3", name: "Languages & Digital Humanities", icon: "🌍",
        packages: {
          alma: ["libreoffice", "python3-nltk"],
          fedora: ["libreoffice", "python3-nltk", "python3-spacy", "audacity", "subtitleeditor"],
          ubuntu: ["libreoffice", "python3-nltk", "python3-spacy", "audacity", "subtitleeditor", "lexiconium"],
        },
        desc: "NLP tools, NLTK, spaCy, Audacity for linguistics",
      },
    ],
  },
];

const DISTROS = [
  { id: "alma", name: "Alma Linux", ver: "9", pkg: "dnf", color: "#0f4c75", accent: "#3282b8", icon: "🏔️", desc: "Enterprise RHEL-rebuild, rock-solid for labs" },
  { id: "fedora", name: "Fedora", ver: "41", pkg: "dnf", color: "#294172", accent: "#51a2d5", icon: "🎩", desc: "Cutting-edge packages, strong community" },
  { id: "ubuntu", name: "Ubuntu", ver: "24.04 LTS", pkg: "apt", color: "#4a1942", accent: "#e95420", icon: "🟠", desc: "Largest ecosystem, excellent documentation" },
];

const DESKTOPS = [
  { id: "cinnamon", name: "Cinnamon", icon: "🍂", desc: "Traditional, Windows-like workflow", color: "#d4a056" },
  { id: "cosmic", name: "COSMIC", icon: "🌌", desc: "System76's new Rust-based DE (alpha)", color: "#7c68ee" },
  { id: "gnome", name: "GNOME", icon: "👣", desc: "Modern, minimal, keyboard-driven", color: "#4a86cf" },
  { id: "mate", name: "MATE", icon: "🧉", desc: "Lightweight GNOME 2 fork, familiar", color: "#5e9c48" },
  { id: "plasma", name: "Plasma", icon: "💎", desc: "Feature-rich, deeply customizable", color: "#1d99f3" },
];

const DE_PACKAGES = {
  alma: {
    cinnamon: { pre: ["dnf install -y epel-release", "dnf config-manager --set-enabled crb"], pkgs: ["cinnamon", "nemo", "lightdm"], post: ["systemctl set-default graphical.target", "systemctl enable lightdm"] },
    cosmic: { pre: [], pkgs: [], post: [], warn: "COSMIC DE is not available for Alma Linux. Consider Fedora or building from source." },
    gnome: { pre: [], pkgs: ["@gnome-desktop", "gdm"], post: ["systemctl set-default graphical.target", "systemctl enable gdm"] },
    mate: { pre: ["dnf install -y epel-release"], pkgs: ["@mate-desktop", "lightdm"], post: ["systemctl set-default graphical.target", "systemctl enable lightdm"] },
    plasma: { pre: ["dnf install -y epel-release"], pkgs: ["@kde-desktop", "sddm"], post: ["systemctl set-default graphical.target", "systemctl enable sddm"] },
  },
  fedora: {
    cinnamon: { pre: [], pkgs: ["@cinnamon-desktop-environment"], post: ["systemctl set-default graphical.target"] },
    cosmic: { pre: ["dnf copr enable -y ryanabx/cosmic-epoch", "dnf install -y cosmic-desktop"], pkgs: [], post: ["systemctl set-default graphical.target"], warn: "COSMIC is in alpha. Install via COPR." },
    gnome: { pre: [], pkgs: ["@gnome-desktop"], post: ["systemctl set-default graphical.target"] },
    mate: { pre: [], pkgs: ["@mate-desktop"], post: ["systemctl set-default graphical.target"] },
    plasma: { pre: [], pkgs: ["@kde-desktop-environment"], post: ["systemctl set-default graphical.target"] },
  },
  ubuntu: {
    cinnamon: { pre: [], pkgs: ["cinnamon-desktop-environment", "lightdm"], post: ["dpkg-reconfigure lightdm"] },
    cosmic: { pre: ["add-apt-repository -y ppa:system76/pop", "apt update"], pkgs: ["cosmic-desktop"], post: [], warn: "COSMIC is in alpha. Requires System76 PPA." },
    gnome: { pre: [], pkgs: ["ubuntu-desktop-minimal"], post: [] },
    mate: { pre: [], pkgs: ["ubuntu-mate-desktop"], post: [] },
    plasma: { pre: [], pkgs: ["kubuntu-desktop"], post: [] },
  },
};

const BASE_BUNDLES = [
  { id: "office", name: "Office & Productivity", icon: "📄", color: "#a78bfa", desc: "LibreOffice, Thunderbird, Nextcloud client",
    packages: { alma: ["libreoffice", "thunderbird", "nextcloud-client"], fedora: ["libreoffice", "thunderbird", "nextcloud-client"], ubuntu: ["libreoffice", "thunderbird", "nextcloud-desktop"] } },
  { id: "security", name: "Security & Privacy", icon: "🔒", color: "#f87171", desc: "Firefox, KeePassXC, WireGuard",
    packages: { alma: ["firefox", "keepassxc", "wireguard-tools"], fedora: ["firefox", "keepassxc", "wireguard-tools"], ubuntu: ["firefox", "keepassxc", "wireguard-tools"] } },
  { id: "teaching", name: "Teaching & LMS", icon: "🎓", color: "#22d3ee", desc: "LaTeX, Pandoc, Typst",
    packages: { alma: ["texlive", "texlive-latex", "pandoc"], fedora: ["texlive-scheme-medium", "pandoc", "typst"], ubuntu: ["texlive", "texlive-latex-extra", "pandoc", "latexmk"] } },
  { id: "creative", name: "Creative & Media", icon: "🎨", color: "#fb923c", desc: "GIMP, Inkscape, Blender, OBS",
    packages: { alma: ["gimp", "inkscape", "blender", "audacity"], fedora: ["gimp", "inkscape", "blender", "kdenlive", "obs-studio", "audacity", "krita"], ubuntu: ["gimp", "inkscape", "blender", "kdenlive", "obs-studio", "audacity", "krita"] } },
  { id: "comms", name: "Communication", icon: "💬", color: "#f472b6", desc: "Thunderbird, Element (Matrix)",
    packages: { alma: ["thunderbird"], fedora: ["thunderbird"], ubuntu: ["thunderbird"] }, flatpaks: ["im.riot.Riot"] },
];

/* ──── helpers ──── */
function dedup(a) { return [...new Set(a)]; }
function gatherSectionPkgs(distro, sels) {
  const p = []; INSTITUTES.forEach(i => i.sections.forEach(s => { if (sels.includes(s.id)) p.push(...(s.packages[distro] || [])); })); return dedup(p);
}
function gatherBundlePkgs(distro, sels) {
  const p = []; let f = []; sels.forEach(bid => { const b = BASE_BUNDLES.find(x => x.id === bid); if (b) { p.push(...(b.packages[distro] || [])); if (b.flatpaks) f.push(...b.flatpaks); } }); return { pkgs: dedup(p), flatpaks: dedup(f) };
}
function secLabel(ids) { return ids.map(id => { for (const i of INSTITUTES) { const s = i.sections.find(x => x.id === id); if (s) return `${i.name} → ${s.name}`; } return id; }).join(", "); }

/* ──── generators ──── */
function genBash(distro, desktop, sections, bundles) {
  const d = DISTROS.find(x => x.id === distro), de = DE_PACKAGES[distro][desktop], isDnf = d.pkg === "dnf";
  const inst = isDnf ? "dnf install -y" : "apt install -y", upd = isDnf ? "dnf update -y" : "apt update && apt upgrade -y";
  const L = [];
  L.push(`#!/usr/bin/env bash`, `# ═══════════════════════════════════════════════════════`, `# The Well-Tampered Desktop`, `# ${d.name} ${d.ver} · ${DESKTOPS.find(x => x.id === desktop).name}`, `# Sections: ${secLabel(sections)}`, `# Bundles:  ${bundles.map(b => BASE_BUNDLES.find(x => x.id === b).name).join(", ") || "none"}`, `# ═══════════════════════════════════════════════════════`, ``, `set -euo pipefail`, `if [[ $EUID -ne 0 ]]; then echo "ERROR: run as root (sudo)."; exit 1; fi`, `echo "═══  The Well-Tampered Desktop — ${d.name} ${d.ver}  ═══"`, ``);
  L.push(`# ── System update ──`, `echo "[1/5] Updating system…"`, upd, ``);
  L.push(`# ── Desktop: ${DESKTOPS.find(x => x.id === desktop).name} ──`, `echo "[2/5] Installing DE…"`);
  if (de.warn) L.push(`echo "⚠  ${de.warn}"`);
  de.pre?.filter(c => c).forEach(c => L.push(c));
  if (de.pkgs?.length) { if (isDnf && de.pkgs.some(p => p.startsWith("@"))) { de.pkgs.filter(p => p.startsWith("@")).forEach(g => L.push(`dnf groupinstall -y "${g.slice(1)}"`)); const r = de.pkgs.filter(p => !p.startsWith("@")); if (r.length) L.push(`${inst} ${r.join(" ")}`); } else { L.push(`${inst} ${de.pkgs.join(" ")}`); } }
  de.post?.forEach(c => L.push(c)); L.push(``);
  if (sections.length) { L.push(`# ── Institute / Section packages ──`, `echo "[3/5] Section packages…"`);
    sections.forEach(sid => { let sec, ii; for (const i of INSTITUTES) { const s = i.sections.find(x => x.id === sid); if (s) { sec = s; ii = i; break; } } if (sec) { const p = sec.packages[distro] || []; if (p.length) { L.push(`# ${ii.name} → ${sec.name}`, `${inst} ${p.join(" ")}`); } } }); L.push(``); }
  const { pkgs: bp, flatpaks: fp } = gatherBundlePkgs(distro, bundles);
  if (bp.length || fp.length) { L.push(`# ── Bundles ──`, `echo "[4/5] Bundles…"`); if (bp.length) L.push(`${inst} ${bp.join(" ")}`); if (fp.length) { L.push(`${inst} flatpak`, `flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo`); fp.forEach(f => L.push(`flatpak install -y flathub ${f}`)); } L.push(``); }
  L.push(`echo "[5/5] Complete! → sudo reboot"`);
  return L.join("\n");
}
function genPlaybook(distro, desktop, sections, bundles) {
  const d = DISTROS.find(x => x.id === distro), de = DE_PACKAGES[distro][desktop], isDnf = d.pkg === "dnf", mod = isDnf ? "ansible.builtin.dnf" : "ansible.builtin.apt";
  const Y = [];
  Y.push(`# ═══════════════════════════════════════════════════════`, `# The Well-Tampered Desktop — Ansible Playbook`, `# ${d.name} ${d.ver} · ${DESKTOPS.find(x => x.id === desktop).name}`, `# Sections: ${secLabel(sections)}`, `# Bundles:  ${bundles.map(b => BASE_BUNDLES.find(x => x.id === b).name).join(", ") || "none"}`, `# ═══════════════════════════════════════════════════════`);
  if (de.warn) Y.push(`# ⚠  WARNING: ${de.warn}`);
  Y.push(``, `---`, `- name: The Well-Tampered Desktop`, `  hosts: desktops`, `  become: true`, `  tasks:`, ``);
  if (isDnf) { Y.push(`    - name: Update all packages`, `      ansible.builtin.dnf:`, `        name: '*'`, `        state: latest`, ``); } else { Y.push(`    - name: Update apt cache and upgrade`, `      ansible.builtin.apt:`, `        update_cache: yes`, `        upgrade: dist`, ``); }
  const realPre = (de.pre || []).filter(c => !c.startsWith("#")); if (realPre.length) { Y.push(`    - name: DE prerequisites`, `      ansible.builtin.shell: |`); realPre.forEach(c => Y.push(`        ${c}`)); Y.push(``); }
  if (de.pkgs?.length) { if (isDnf) { de.pkgs.filter(p => p.startsWith("@")).forEach(g => { Y.push(`    - name: Install ${g.slice(1)} group`, `      ansible.builtin.dnf:`, `        name: '${g}'`, `        state: present`, ``); }); const r = de.pkgs.filter(p => !p.startsWith("@")); if (r.length) { Y.push(`    - name: Install DE packages`, `      ${mod}:`, `        name: [${r.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``); } } else { Y.push(`    - name: Install ${DESKTOPS.find(x => x.id === desktop).name}`, `      ${mod}:`, `        name: [${de.pkgs.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``); } }
  (de.post || []).forEach(cmd => { if (cmd.includes("enable")) { Y.push(`    - name: Enable ${cmd.split(" ").pop()}`, `      ansible.builtin.systemd:`, `        name: ${cmd.split(" ").pop()}`, `        enabled: yes`, ``); } else { Y.push(`    - name: Post-install config`, `      ansible.builtin.shell: ${cmd}`, ``); } });
  sections.forEach(sid => { let sec, ii; for (const i of INSTITUTES) { const s = i.sections.find(x => x.id === sid); if (s) { sec = s; ii = i; break; } } if (sec) { const p = sec.packages[distro] || []; if (p.length) { Y.push(`    - name: "${ii.name} → ${sec.name}"`, `      ${mod}:`, `        name: [${p.map(x => `"${x}"`).join(", ")}]`, `        state: present`, ``); } } });
  const { pkgs: bp, flatpaks: fp } = gatherBundlePkgs(distro, bundles);
  if (bp.length) { Y.push(`    - name: Install bundle packages`, `      ${mod}:`, `        name: [${bp.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``); }
  if (fp.length) { Y.push(`    - name: Install Flatpak`, `      ${mod}:`, `        name: flatpak`, `        state: present`, ``, `    - name: Add Flathub`, `      community.general.flatpak_remote:`, `        name: flathub`, `        flatpakrepo_url: https://dl.flathub.org/repo/flathub.flatpakrepo`, `        state: present`, ``); fp.forEach(f => { Y.push(`    - name: Install ${f}`, `      community.general.flatpak:`, `        name: ${f}`, `        state: present`, `        remote: flathub`, ``); }); }
  return Y.join("\n");
}

/* ══════════════════════════════════════════════
   D3 PIPELINE VIS
   ══════════════════════════════════════════════ */
function PipelineViz({ step, distro, desktop, sections, bundles, output }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current); svg.selectAll("*").remove();
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
      if (n.done) { ng.append("circle").attr("r", 24).attr("fill", "none").attr("stroke", "#22d3ee").attr("stroke-width", 1).attr("opacity", 0.25).append("animate").attr("attributeName", "r").attr("from", 24).attr("to", 36).attr("dur", "2s").attr("repeatCount", "indefinite"); }
      ng.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", n.done ? "#22d3ee" : i <= step ? "#94a3b8" : "#334155").attr("font-size", 13).attr("font-weight", 700).attr("font-family", "'Oxanium', monospace").text(n.done ? "✓" : i + 1);
      ng.append("text").attr("text-anchor", "middle").attr("y", -34).attr("fill", i <= step ? "#e2e8f0" : "#475569").attr("font-size", 10).attr("font-weight", 600).attr("font-family", "'Oxanium', monospace").attr("letter-spacing", "0.06em").text(n.label.toUpperCase());
    });
  }, [step, distro, desktop, sections, bundles, output]);
  return <svg ref={svgRef} viewBox="0 0 900 90" style={{ width: "100%", maxWidth: 900, display: "block", margin: "0 auto" }} />;
}

/* ══════════════════════════════════════════════
   D3 INSTITUTE / SECTION TREE
   ══════════════════════════════════════════════ */
function InstituteSelector({ distro, selected, onToggle }) {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const [w, setW] = useState(760);

  useEffect(() => { if (wrapRef.current) setW(wrapRef.current.getBoundingClientRect().width - 16); }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current); svg.selectAll("*").remove();
    const W = w, ROW = 52, INDENT = 38, INST_H = 50;
    let y = 12;
    const els = [];
    INSTITUTES.forEach(inst => { els.push({ t: "i", inst, y }); y += INST_H; inst.sections.forEach(sec => { els.push({ t: "s", inst, sec, y }); y += ROW; }); y += 8; });
    const H = y + 4;
    svg.attr("viewBox", `0 0 ${W} ${H}`).style("height", H + "px");
    const g = svg.append("g");

    els.forEach(el => {
      if (el.t === "i") {
        const { inst } = el, allIds = inst.sections.map(s => s.id), allSel = allIds.every(id => selected.includes(id)), someSel = allIds.some(id => selected.includes(id));
        const ig = g.append("g").style("cursor", "pointer")
          .on("click", () => { if (allSel) allIds.forEach(id => onToggle(id, false)); else allIds.forEach(id => onToggle(id, true)); });

        ig.append("rect").attr("x", 0).attr("y", el.y).attr("width", W).attr("height", INST_H).attr("rx", 8)
          .attr("fill", allSel ? inst.color + "14" : someSel ? inst.color + "0a" : "#0c1220")
          .attr("stroke", someSel ? inst.color + "30" : "#1e293b").attr("stroke-width", 1);

        // Checkbox
        ig.append("rect").attr("x", 14).attr("y", el.y + 15).attr("width", 18).attr("height", 18).attr("rx", 4)
          .attr("fill", allSel ? inst.color : "transparent").attr("stroke", someSel ? inst.color : "#334155").attr("stroke-width", 1.5);
        if (allSel) ig.append("text").attr("x", 23).attr("y", el.y + 27).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", "#020617").attr("font-size", 13).attr("font-weight", 700).text("✓");
        else if (someSel) ig.append("line").attr("x1", 18).attr("x2", 28).attr("y1", el.y + 24).attr("y2", el.y + 24).attr("stroke", inst.color).attr("stroke-width", 2).attr("stroke-linecap", "round");

        ig.append("text").attr("x", 42).attr("y", el.y + 19).attr("dominant-baseline", "central").attr("fill", inst.color).attr("font-size", 14).attr("font-weight", 700).attr("font-family", "'Oxanium', monospace").text(`${inst.icon}  ${inst.name}`);
        ig.append("text").attr("x", 42).attr("y", el.y + 36).attr("dominant-baseline", "central").attr("fill", "#475569").attr("font-size", 10).attr("font-family", "'Oxanium', monospace").text(`${inst.sections.length} sections · click to select all`);

        // Selected count badge
        const selCount = allIds.filter(id => selected.includes(id)).length;
        if (selCount > 0) {
          const bx = W - 68;
          ig.append("rect").attr("x", bx).attr("y", el.y + 14).attr("width", 52).attr("height", 20).attr("rx", 10).attr("fill", inst.color + "20").attr("stroke", inst.color + "44").attr("stroke-width", 1);
          ig.append("text").attr("x", bx + 26).attr("y", el.y + 24).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", inst.color).attr("font-size", 10).attr("font-weight", 600).attr("font-family", "'Oxanium', monospace").text(`${selCount}/${allIds.length}`);
        }
      } else {
        const { sec, inst } = el, isSel = selected.includes(sec.id), pkgC = (sec.packages[distro] || []).length;
        const sg = g.append("g").style("cursor", "pointer").on("click", () => onToggle(sec.id, !isSel));

        // Vertical connector
        g.append("line").attr("x1", 23).attr("x2", 23).attr("y1", el.y - 2).attr("y2", el.y + ROW / 2).attr("stroke", "#1e293b").attr("stroke-width", 1);
        g.append("line").attr("x1", 23).attr("x2", INDENT + 12).attr("y1", el.y + ROW / 2 - 4).attr("y2", el.y + ROW / 2 - 4).attr("stroke", "#1e293b").attr("stroke-width", 1);

        sg.append("rect").attr("x", INDENT).attr("y", el.y + 2).attr("width", W - INDENT).attr("height", ROW - 6).attr("rx", 6)
          .attr("fill", isSel ? inst.color + "0e" : "transparent").attr("stroke", isSel ? inst.color + "20" : "transparent").attr("stroke-width", 1);

        // Checkbox
        sg.append("rect").attr("x", INDENT + 14).attr("y", el.y + 14).attr("width", 16).attr("height", 16).attr("rx", 3)
          .attr("fill", isSel ? inst.color : "transparent").attr("stroke", isSel ? inst.color : "#334155").attr("stroke-width", 1.5);
        if (isSel) sg.append("text").attr("x", INDENT + 22).attr("y", el.y + 22).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", "#020617").attr("font-size", 11).attr("font-weight", 700).text("✓");

        sg.append("text").attr("x", INDENT + 38).attr("y", el.y + 17).attr("dominant-baseline", "central").attr("fill", isSel ? "#e2e8f0" : "#94a3b8").attr("font-size", 13).attr("font-weight", isSel ? 600 : 400).attr("font-family", "'Oxanium', monospace").text(`${sec.icon} ${sec.id}: ${sec.name}`);
        sg.append("text").attr("x", INDENT + 38).attr("y", el.y + 34).attr("dominant-baseline", "central").attr("fill", "#475569").attr("font-size", 10).attr("font-family", "'Oxanium', monospace").text(`${sec.desc}`);

        // Pkg count
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

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function WellTamperedDesktop() {
  const [step, setStep] = useState(0);
  const [distro, setDistro] = useState(null);
  const [desktop, setDesktop] = useState(null);
  const [sections, setSections] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [output, setOutput] = useState(null);
  const [generated, setGenerated] = useState("");
  const [copyFb, setCopyFb] = useState(false);

  const warnings = distro && desktop ? DE_PACKAGES[distro]?.[desktop]?.warn : null;
  const toggleSection = (id, val) => { setSections(p => val ? (p.includes(id) ? p : [...p, id]) : p.filter(x => x !== id)); setOutput(null); setGenerated(""); };
  const toggleBundle = (id) => { setBundles(p => p.includes(id) ? p.filter(b => b !== id) : [...p, id]); setOutput(null); setGenerated(""); };
  const generate = (type) => { setOutput(type); setStep(4); setGenerated(type === "script" ? genBash(distro, desktop, sections, bundles) : genPlaybook(distro, desktop, sections, bundles)); };
  const handleCopy = () => { navigator.clipboard.writeText(generated).then(() => { setCopyFb(true); setTimeout(() => setCopyFb(false), 2000); }).catch(() => {}); };
  const handleDownload = () => { const ext = output === "script" ? "sh" : "yml"; const blob = new Blob([generated], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `well-tampered-desktop-${distro}-${desktop}.${ext}`; a.click(); };
  const reset = () => { setStep(0); setDistro(null); setDesktop(null); setSections([]); setBundles([]); setOutput(null); setGenerated(""); };

  const card = { background: "#0c1220", border: "1px solid #1e293b", borderRadius: 10, padding: "16px 18px", cursor: "pointer", transition: "all 0.25s" };
  const stepHead = (num, label, done) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: done ? "#0c2d4a" : "#111827", border: `1.5px solid ${done ? "#22d3ee" : "#334155"}`, color: done ? "#22d3ee" : "#64748b", fontSize: 12, fontWeight: 700, fontFamily: "'Oxanium', monospace" }}>{done ? "✓" : num}</div>
      <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "0.04em", fontFamily: "'Oxanium', monospace" }}>{label}</h2>
    </div>
  );
  const canGen = sections.length > 0 || bundles.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #020617 0%, #060a13 100%)", fontFamily: "'Oxanium', 'JetBrains Mono', monospace", color: "#e2e8f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::selection { background: rgba(34,211,238,0.3); }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .anim-in { animation: slideUp 0.4s ease-out both; }
        pre::-webkit-scrollbar { height:6px; } pre::-webkit-scrollbar-track { background:#0a0f1a; } pre::-webkit-scrollbar-thumb { background:#334155; border-radius:3px; }`}</style>

      <header style={{ textAlign: "center", padding: "36px 24px 12px" }}>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          background: "linear-gradient(135deg, #22d3ee, #4ade80, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Well-Tampered Desktop
        </h1>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 8, fontWeight: 300, letterSpacing: "0.04em" }}>OS → Desktop → Institute & Section → Bundles → Deploy</p>
      </header>

      <div style={{ padding: "16px 24px 8px" }}>
        <PipelineViz step={step} distro={distro} desktop={desktop} sections={sections} bundles={bundles} output={output} />
      </div>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* 1: OS */}
        <section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("1", "Select Operating System", !!distro)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {DISTROS.map(d => { const sel = distro === d.id; return (
              <div key={d.id} onClick={() => { setDistro(d.id); if (step < 1) setStep(1); setDesktop(null); setSections([]); setBundles([]); setOutput(null); setGenerated(""); }}
                style={{ ...card, borderColor: sel ? d.accent : "#1e293b", background: sel ? d.color + "22" : "#0c1220" }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = d.accent + "66"; }} onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = "#1e293b"; }}>
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
            {DESKTOPS.map(de => { const sel = desktop === de.id, warn = DE_PACKAGES[distro]?.[de.id]?.warn; return (
              <div key={de.id} onClick={() => { setDesktop(de.id); if (step < 2) setStep(2); setSections([]); setBundles([]); setOutput(null); setGenerated(""); }}
                style={{ ...card, borderColor: sel ? de.color : "#1e293b", background: sel ? de.color + "18" : "#0c1220", opacity: warn ? 0.7 : 1 }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = de.color + "66"; }} onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = sel ? de.color : "#1e293b"; }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{de.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: sel ? de.color : "#e2e8f0", marginBottom: 2 }}>{de.name}</div>
                <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>{de.desc}</p>
                {warn && <p style={{ fontSize: 10, color: "#f87171", marginTop: 6 }}>⚠ {warn.split(".")[0]}</p>}
              </div>); })}
          </div>
          {warnings && <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#1c0a0a", border: "1px solid #7f1d1d", fontSize: 12, color: "#fca5a5", lineHeight: 1.5 }}>⚠ {warnings}</div>}
        </section>)}

        {/* 3: INSTITUTE & SECTION */}
        {step >= 2 && (<section className="anim-in" style={{ marginBottom: 32 }}>
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
        {step >= 2 && (<section className="anim-in" style={{ marginBottom: 32 }}>
          {stepHead("4", "Additional Bundles (optional)", bundles.length > 0)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10 }}>
            {BASE_BUNDLES.map(b => { const sel = bundles.includes(b.id); return (
              <div key={b.id} onClick={() => toggleBundle(b.id)}
                style={{ ...card, borderColor: sel ? b.color : "#1e293b", background: sel ? b.color + "12" : "#0c1220" }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = b.color + "44"; }} onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = sel ? b.color : "#1e293b"; }}>
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
                onMouseEnter={e => e.currentTarget.style.background = "#0c2d4a"} onMouseLeave={e => { if (output !== "script") e.currentTarget.style.background = "transparent"; }}>
                📜 Generate Bash Script
              </button>
              <button onClick={() => generate("playbook")} style={{ flex: 1, padding: "14px", borderRadius: 8, border: "1.5px solid #a78bfa", cursor: "pointer", background: output === "playbook" ? "#1e1040" : "transparent", color: "#a78bfa", fontFamily: "'Oxanium', monospace", fontSize: 14, fontWeight: 600, transition: "all 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e1040"} onMouseLeave={e => { if (output !== "playbook") e.currentTarget.style.background = "transparent"; }}>
                📋 Generate Ansible Playbook
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
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#64748b"; e.currentTarget.style.color = "#e2e8f0"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#64748b"; }}>
              ↻ Start Over
            </button>
          </div>
        </section>)}

      </main>
    </div>
  );
}
