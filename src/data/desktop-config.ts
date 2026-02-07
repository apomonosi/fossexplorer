export interface SectionPackages {
  alma: string[];
  fedora: string[];
  ubuntu: string[];
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  packages: SectionPackages;
  desc: string;
}

export interface Institute {
  id: string;
  name: string;
  icon: string;
  color: string;
  sections: Section[];
}

export interface Distro {
  id: string;
  name: string;
  ver: string;
  pkg: string;
  color: string;
  accent: string;
  icon: string;
  desc: string;
}

export interface Desktop {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
}

export interface DEConfig {
  pre: string[];
  pkgs: string[];
  post: string[];
  warn?: string;
}

export interface Bundle {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  packages: SectionPackages;
  flatpaks?: string[];
}

export const INSTITUTES: Institute[] = [
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

export const DISTROS: Distro[] = [
  { id: "alma", name: "Alma Linux", ver: "9", pkg: "dnf", color: "#0f4c75", accent: "#3282b8", icon: "🏔️", desc: "Enterprise RHEL-rebuild, rock-solid for labs" },
  { id: "fedora", name: "Fedora", ver: "41", pkg: "dnf", color: "#294172", accent: "#51a2d5", icon: "🎩", desc: "Cutting-edge packages, strong community" },
  { id: "ubuntu", name: "Ubuntu", ver: "24.04 LTS", pkg: "apt", color: "#4a1942", accent: "#e95420", icon: "🟠", desc: "Largest ecosystem, excellent documentation" },
];

export const DESKTOPS: Desktop[] = [
  { id: "cinnamon", name: "Cinnamon", icon: "🍂", desc: "Traditional, Windows-like workflow", color: "#d4a056" },
  { id: "cosmic", name: "COSMIC", icon: "🌌", desc: "System76's new Rust-based DE (alpha)", color: "#7c68ee" },
  { id: "gnome", name: "GNOME", icon: "👣", desc: "Modern, minimal, keyboard-driven", color: "#4a86cf" },
  { id: "mate", name: "MATE", icon: "🧉", desc: "Lightweight GNOME 2 fork, familiar", color: "#5e9c48" },
  { id: "plasma", name: "Plasma", icon: "💎", desc: "Feature-rich, deeply customizable", color: "#1d99f3" },
];

export const DE_PACKAGES: Record<string, Record<string, DEConfig>> = {
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

export const BASE_BUNDLES: Bundle[] = [
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
