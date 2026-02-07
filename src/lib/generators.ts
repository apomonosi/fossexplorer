import { INSTITUTES, DISTROS, DESKTOPS, DE_PACKAGES, BASE_BUNDLES } from "../data/desktop-config";

export function dedup(a: string[]): string[] {
  return [...new Set(a)];
}

export function gatherSectionPkgs(distro: string, sels: string[]): string[] {
  const p: string[] = [];
  INSTITUTES.forEach(i => i.sections.forEach(s => {
    if (sels.includes(s.id)) p.push(...(s.packages[distro as keyof typeof s.packages] || []));
  }));
  return dedup(p);
}

export function gatherBundlePkgs(distro: string, sels: string[]): { pkgs: string[]; flatpaks: string[] } {
  const p: string[] = [];
  let f: string[] = [];
  sels.forEach(bid => {
    const b = BASE_BUNDLES.find(x => x.id === bid);
    if (b) {
      p.push(...(b.packages[distro as keyof typeof b.packages] || []));
      if (b.flatpaks) f.push(...b.flatpaks);
    }
  });
  return { pkgs: dedup(p), flatpaks: dedup(f) };
}

export function secLabel(ids: string[]): string {
  return ids.map(id => {
    for (const i of INSTITUTES) {
      const s = i.sections.find(x => x.id === id);
      if (s) return `${i.name} → ${s.name}`;
    }
    return id;
  }).join(", ");
}

export function genBash(distro: string, desktop: string, sections: string[], bundles: string[]): string {
  const d = DISTROS.find(x => x.id === distro)!;
  const de = DE_PACKAGES[distro][desktop];
  const isDnf = d.pkg === "dnf";
  const inst = isDnf ? "dnf install -y" : "apt install -y";
  const upd = isDnf ? "dnf update -y" : "apt update && apt upgrade -y";
  const L: string[] = [];

  L.push(`#!/usr/bin/env bash`,
    `# ═══════════════════════════════════════════════════════`,
    `# The Well-Tampered Desktop`,
    `# ${d.name} ${d.ver} · ${DESKTOPS.find(x => x.id === desktop)!.name}`,
    `# Sections: ${secLabel(sections)}`,
    `# Bundles:  ${bundles.map(b => BASE_BUNDLES.find(x => x.id === b)!.name).join(", ") || "none"}`,
    `# ═══════════════════════════════════════════════════════`,
    ``, `set -euo pipefail`,
    `if [[ $EUID -ne 0 ]]; then echo "ERROR: run as root (sudo)."; exit 1; fi`,
    `echo "═══  The Well-Tampered Desktop — ${d.name} ${d.ver}  ═══"`, ``);

  L.push(`# ── System update ──`, `echo "[1/5] Updating system…"`, upd, ``);
  L.push(`# ── Desktop: ${DESKTOPS.find(x => x.id === desktop)!.name} ──`, `echo "[2/5] Installing DE…"`);
  if (de.warn) L.push(`echo "⚠  ${de.warn}"`);
  de.pre?.filter(c => c).forEach(c => L.push(c));

  if (de.pkgs?.length) {
    if (isDnf && de.pkgs.some(p => p.startsWith("@"))) {
      de.pkgs.filter(p => p.startsWith("@")).forEach(g => L.push(`dnf groupinstall -y "${g.slice(1)}"`));
      const r = de.pkgs.filter(p => !p.startsWith("@"));
      if (r.length) L.push(`${inst} ${r.join(" ")}`);
    } else {
      L.push(`${inst} ${de.pkgs.join(" ")}`);
    }
  }
  de.post?.forEach(c => L.push(c));
  L.push(``);

  if (sections.length) {
    L.push(`# ── Institute / Section packages ──`, `echo "[3/5] Section packages…"`);
    sections.forEach(sid => {
      let sec, ii;
      for (const i of INSTITUTES) {
        const s = i.sections.find(x => x.id === sid);
        if (s) { sec = s; ii = i; break; }
      }
      if (sec && ii) {
        const p = sec.packages[distro as keyof typeof sec.packages] || [];
        if (p.length) L.push(`# ${ii.name} → ${sec.name}`, `${inst} ${p.join(" ")}`);
      }
    });
    L.push(``);
  }

  const { pkgs: bp, flatpaks: fp } = gatherBundlePkgs(distro, bundles);
  if (bp.length || fp.length) {
    L.push(`# ── Bundles ──`, `echo "[4/5] Bundles…"`);
    if (bp.length) L.push(`${inst} ${bp.join(" ")}`);
    if (fp.length) {
      L.push(`${inst} flatpak`,
        `flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo`);
      fp.forEach(f => L.push(`flatpak install -y flathub ${f}`));
    }
    L.push(``);
  }

  L.push(`echo "[5/5] Complete! → sudo reboot"`);
  return L.join("\n");
}

export function genPlaybook(distro: string, desktop: string, sections: string[], bundles: string[]): string {
  const d = DISTROS.find(x => x.id === distro)!;
  const de = DE_PACKAGES[distro][desktop];
  const isDnf = d.pkg === "dnf";
  const mod = isDnf ? "ansible.builtin.dnf" : "ansible.builtin.apt";
  const Y: string[] = [];

  Y.push(`# ═══════════════════════════════════════════════════════`,
    `# The Well-Tampered Desktop — Ansible Playbook`,
    `# ${d.name} ${d.ver} · ${DESKTOPS.find(x => x.id === desktop)!.name}`,
    `# Sections: ${secLabel(sections)}`,
    `# Bundles:  ${bundles.map(b => BASE_BUNDLES.find(x => x.id === b)!.name).join(", ") || "none"}`,
    `# ═══════════════════════════════════════════════════════`);
  if (de.warn) Y.push(`# ⚠  WARNING: ${de.warn}`);
  Y.push(``, `---`, `- name: The Well-Tampered Desktop`, `  hosts: desktops`, `  become: true`, `  tasks:`, ``);

  if (isDnf) {
    Y.push(`    - name: Update all packages`, `      ansible.builtin.dnf:`, `        name: '*'`, `        state: latest`, ``);
  } else {
    Y.push(`    - name: Update apt cache and upgrade`, `      ansible.builtin.apt:`, `        update_cache: yes`, `        upgrade: dist`, ``);
  }

  const realPre = (de.pre || []).filter(c => !c.startsWith("#"));
  if (realPre.length) {
    Y.push(`    - name: DE prerequisites`, `      ansible.builtin.shell: |`);
    realPre.forEach(c => Y.push(`        ${c}`));
    Y.push(``);
  }

  if (de.pkgs?.length) {
    if (isDnf) {
      de.pkgs.filter(p => p.startsWith("@")).forEach(g => {
        Y.push(`    - name: Install ${g.slice(1)} group`,
          `      ansible.builtin.dnf:`, `        name: '${g}'`, `        state: present`, ``);
      });
      const r = de.pkgs.filter(p => !p.startsWith("@"));
      if (r.length) {
        Y.push(`    - name: Install DE packages`,
          `      ${mod}:`, `        name: [${r.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``);
      }
    } else {
      Y.push(`    - name: Install ${DESKTOPS.find(x => x.id === desktop)!.name}`,
        `      ${mod}:`, `        name: [${de.pkgs.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``);
    }
  }

  (de.post || []).forEach(cmd => {
    if (cmd.includes("enable")) {
      Y.push(`    - name: Enable ${cmd.split(" ").pop()}`,
        `      ansible.builtin.systemd:`, `        name: ${cmd.split(" ").pop()}`, `        enabled: yes`, ``);
    } else {
      Y.push(`    - name: Post-install config`, `      ansible.builtin.shell: ${cmd}`, ``);
    }
  });

  sections.forEach(sid => {
    let sec, ii;
    for (const i of INSTITUTES) {
      const s = i.sections.find(x => x.id === sid);
      if (s) { sec = s; ii = i; break; }
    }
    if (sec && ii) {
      const p = sec.packages[distro as keyof typeof sec.packages] || [];
      if (p.length) {
        Y.push(`    - name: "${ii.name} → ${sec.name}"`,
          `      ${mod}:`, `        name: [${p.map(x => `"${x}"`).join(", ")}]`, `        state: present`, ``);
      }
    }
  });

  const { pkgs: bp, flatpaks: fp } = gatherBundlePkgs(distro, bundles);
  if (bp.length) {
    Y.push(`    - name: Install bundle packages`,
      `      ${mod}:`, `        name: [${bp.map(p => `"${p}"`).join(", ")}]`, `        state: present`, ``);
  }
  if (fp.length) {
    Y.push(`    - name: Install Flatpak`, `      ${mod}:`, `        name: flatpak`, `        state: present`, ``,
      `    - name: Add Flathub`, `      community.general.flatpak_remote:`,
      `        name: flathub`, `        flatpakrepo_url: https://dl.flathub.org/repo/flathub.flatpakrepo`,
      `        state: present`, ``);
    fp.forEach(f => {
      Y.push(`    - name: Install ${f}`, `      community.general.flatpak:`,
        `        name: ${f}`, `        state: present`, `        remote: flathub`, ``);
    });
  }

  return Y.join("\n");
}
