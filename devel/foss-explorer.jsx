import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

/* ───────────────────────── DATA ───────────────────────── */
const FOSS_DATA = {
  name: "FOSS Universe",
  description: "Explore open source software, services & operating systems",
  children: [
    {
      name: "Operating Systems",
      description: "Free & open source operating systems for every use case",
      color: "var(--cat-os)",
      children: [
        {
          name: "For Beginners",
          description: "Easy to install, great out-of-the-box experience",
          children: [
            { name: "Linux Mint", description: "Familiar desktop, perfect first Linux. Based on Ubuntu with Cinnamon DE.", size: 40 },
            { name: "Ubuntu", description: "Most popular Linux distro. Huge community, excellent docs.", size: 38 },
            { name: "Zorin OS", description: "Designed for Windows/macOS switchers. Beautiful and intuitive.", size: 30 },
            { name: "Pop!_OS", description: "By System76. Great for developers and NVIDIA GPU users.", size: 28 },
            { name: "elementary OS", description: "macOS-like aesthetic. Curated app store, polished UX.", size: 25 },
          ],
        },
        {
          name: "For Power Users",
          description: "Maximum control and customization",
          children: [
            { name: "Fedora", description: "Cutting-edge packages, strong community. Sponsored by Red Hat.", size: 35 },
            { name: "Arch Linux", description: "Rolling release, build your own system. The Arch Wiki is legendary.", size: 30 },
            { name: "openSUSE", description: "Tumbleweed (rolling) or Leap (stable). YaST configuration tool.", size: 25 },
            { name: "Debian", description: "The universal OS. Rock-solid stability, massive package repos.", size: 28 },
            { name: "NixOS", description: "Declarative system configuration. Reproducible builds.", size: 20 },
          ],
        },
        {
          name: "For Research",
          description: "Specialized for scientific computing & research",
          children: [
            { name: "Ubuntu Server", description: "Standard for cloud and HPC. LTS releases for stability.", size: 30 },
            { name: "CentOS Stream", description: "Enterprise-grade, upstream of RHEL. Good for labs.", size: 22 },
            { name: "Rocky Linux", description: "Community RHEL rebuild. Drop-in CentOS replacement.", size: 22 },
            { name: "Qubes OS", description: "Security through compartmentalization. For sensitive research.", size: 18 },
          ],
        },
        {
          name: "Mobile & Other",
          description: "Beyond the desktop",
          children: [
            { name: "GrapheneOS", description: "Hardened Android. Privacy-focused mobile OS.", size: 20 },
            { name: "LineageOS", description: "Free Android distribution. Extend your device's life.", size: 20 },
            { name: "FreeBSD", description: "Not Linux! Excellent networking, ZFS, jails.", size: 22 },
            { name: "Haiku", description: "Inspired by BeOS. Unique, lightweight desktop OS.", size: 12 },
          ],
        },
      ],
    },
    {
      name: "Productivity & Office",
      description: "Create documents, spreadsheets, presentations & more",
      color: "var(--cat-prod)",
      children: [
        {
          name: "Office Suites",
          description: "Full-featured document creation",
          children: [
            { name: "LibreOffice", description: "Complete office suite: Writer, Calc, Impress, Draw. MS Office compatible.", size: 40 },
            { name: "ONLYOFFICE", description: "Modern UI, excellent MS Office compatibility. Collaborative editing.", size: 30 },
            { name: "CryptPad", description: "Encrypted collaborative office suite. Privacy-first.", size: 22 },
            { name: "Collabora Online", description: "LibreOffice in the browser. Self-hostable.", size: 22 },
          ],
        },
        {
          name: "Writing & Notes",
          description: "For academic writing, note-taking, and knowledge management",
          children: [
            { name: "LaTeX / Overleaf", description: "The gold standard for academic papers. Overleaf for collaboration.", size: 35 },
            { name: "Logseq", description: "Open source knowledge base. Outliner-based, local-first.", size: 25 },
            { name: "Zettlr", description: "Academic markdown editor. Zotero integration, citation support.", size: 22 },
            { name: "Joplin", description: "Note-taking with sync. Markdown, E2E encryption.", size: 24 },
            { name: "Typst", description: "Modern LaTeX alternative. Faster compilation, friendlier syntax.", size: 20 },
          ],
        },
        {
          name: "Reference Management",
          description: "Organize papers, citations and bibliographies",
          children: [
            { name: "Zotero", description: "Best-in-class reference manager. Browser extension, Word/LibreOffice plugin.", size: 35 },
            { name: "JabRef", description: "BibTeX-native reference manager. Great for LaTeX users.", size: 22 },
          ],
        },
        {
          name: "Project & Task Mgmt",
          description: "Organize work, track tasks, manage projects",
          children: [
            { name: "OpenProject", description: "Full project management: Gantt, Agile, time tracking.", size: 25 },
            { name: "Taiga", description: "Agile project management. Kanban & Scrum boards.", size: 20 },
            { name: "Vikunja", description: "Open source Todoist alternative. Self-hostable task manager.", size: 18 },
            { name: "Plane", description: "Open source Jira/Linear alternative. Modern issue tracking.", size: 20 },
          ],
        },
      ],
    },
    {
      name: "Communication",
      description: "Chat, video calls, email & social",
      color: "var(--cat-comm)",
      children: [
        {
          name: "Messaging & Chat",
          description: "Real-time communication platforms",
          children: [
            { name: "Matrix / Element", description: "Decentralized, encrypted chat. Bridges to Slack, Discord, etc.", size: 35 },
            { name: "Rocket.Chat", description: "Self-hosted Slack alternative. Channels, threads, video.", size: 28 },
            { name: "Mattermost", description: "Enterprise messaging. Integrations, compliance, self-hosted.", size: 26 },
            { name: "Signal", description: "Gold standard for private messaging. E2E encrypted.", size: 30 },
          ],
        },
        {
          name: "Video & Conferencing",
          description: "Video calls, webinars, virtual classrooms",
          children: [
            { name: "Jitsi Meet", description: "No account needed video calls. Self-hostable, browser-based.", size: 32 },
            { name: "BigBlueButton", description: "Built for education: breakout rooms, whiteboard, polls.", size: 30 },
            { name: "PeerTube", description: "Decentralized video hosting. Federated YouTube alternative.", size: 22 },
          ],
        },
        {
          name: "Email & Calendar",
          description: "Communication infrastructure",
          children: [
            { name: "Thunderbird", description: "Mozilla's email client. Calendar, contacts, feeds, chat.", size: 30 },
            { name: "Nextcloud Mail", description: "Webmail integrated with Nextcloud. Calendar & contacts sync.", size: 22 },
            { name: "Proton Mail", description: "Encrypted email. Open source clients, Swiss privacy.", size: 24 },
          ],
        },
        {
          name: "Forums & Social",
          description: "Community building platforms",
          children: [
            { name: "Discourse", description: "Modern forum software. Rich features, great for communities.", size: 28 },
            { name: "Mastodon", description: "Federated microblogging. Decentralized Twitter alternative.", size: 26 },
            { name: "Lemmy", description: "Federated link aggregator. Open source Reddit alternative.", size: 20 },
          ],
        },
      ],
    },
    {
      name: "Development",
      description: "Code editors, version control, DevOps & languages",
      color: "var(--cat-dev)",
      children: [
        {
          name: "Editors & IDEs",
          description: "Where the code happens",
          children: [
            { name: "VS Codium", description: "VS Code without Microsoft telemetry. Same extensions.", size: 35 },
            { name: "Neovim", description: "Hyperextensible Vim. Lua config, LSP support.", size: 28 },
            { name: "Emacs", description: "The extensible editor. Org-mode, Magit, infinite customization.", size: 25 },
            { name: "Zed", description: "High-performance editor in Rust. Collaborative, AI-assisted.", size: 22 },
          ],
        },
        {
          name: "Version Control",
          description: "Track changes, collaborate on code",
          children: [
            { name: "Git", description: "Distributed version control. The foundation of modern dev.", size: 40 },
            { name: "Gitea / Forgejo", description: "Lightweight self-hosted Git. GitHub alternative.", size: 28 },
            { name: "GitLab CE", description: "Complete DevOps platform. CI/CD, issues, wiki.", size: 32 },
            { name: "Codeberg", description: "Non-profit Git hosting. Powered by Forgejo.", size: 20 },
          ],
        },
        {
          name: "Containers & DevOps",
          description: "Build, ship, and run applications",
          children: [
            { name: "Podman", description: "Daemonless container engine. Docker-compatible, rootless.", size: 28 },
            { name: "Docker CE", description: "Container runtime. Build and run containerized apps.", size: 30 },
            { name: "Kubernetes", description: "Container orchestration at scale.", size: 28 },
            { name: "Ansible", description: "Agentless automation. Infrastructure as code.", size: 24 },
          ],
        },
        {
          name: "Languages",
          description: "Open source programming languages",
          children: [
            { name: "Python", description: "Versatile, readable. Dominant in science, AI, web.", size: 38 },
            { name: "Rust", description: "Memory-safe systems language. Growing fast.", size: 28 },
            { name: "Julia", description: "High-performance scientific computing.", size: 22 },
            { name: "R", description: "Statistical computing & graphics.", size: 24 },
          ],
        },
      ],
    },
    {
      name: "Creative & Media",
      description: "Graphics, audio, video & 3D creation tools",
      color: "var(--cat-creative)",
      children: [
        {
          name: "Graphics & Design",
          description: "Image editing, vector art, illustration",
          children: [
            { name: "GIMP", description: "Powerful image editor. Photoshop alternative.", size: 35 },
            { name: "Inkscape", description: "Vector graphics editor. SVG-native.", size: 30 },
            { name: "Krita", description: "Digital painting. Brushes, animation, HDR.", size: 28 },
            { name: "Penpot", description: "Open source Figma. Collaborative design.", size: 25 },
          ],
        },
        {
          name: "Audio & Music",
          description: "Record, edit, produce",
          children: [
            { name: "Audacity", description: "Audio editor & recorder. Simple, powerful.", size: 32 },
            { name: "Ardour", description: "Professional DAW. Multi-track recording.", size: 25 },
            { name: "MuseScore", description: "Sheet music notation. Compose, play back, share.", size: 22 },
          ],
        },
        {
          name: "Video & 3D",
          description: "Edit video, create animations and VFX",
          children: [
            { name: "Blender", description: "3D creation suite. Modeling, animation, rendering.", size: 38 },
            { name: "Kdenlive", description: "Non-linear video editor. Multi-track, effects.", size: 26 },
            { name: "OBS Studio", description: "Streaming & recording. The standard for live content.", size: 28 },
          ],
        },
      ],
    },
    {
      name: "Science & Data",
      description: "Research tools, data analysis, statistics & computation",
      color: "var(--cat-science)",
      children: [
        {
          name: "Data Analysis",
          description: "Process, analyze and visualize data",
          children: [
            { name: "Jupyter", description: "Interactive notebooks. Python, R, Julia.", size: 38 },
            { name: "RStudio", description: "IDE for R. Notebooks, plots, packages.", size: 28 },
            { name: "KNIME", description: "Visual data pipeline builder. No-code analytics.", size: 22 },
            { name: "Pandas / NumPy", description: "Python data stack. DataFrames, arrays.", size: 30 },
          ],
        },
        {
          name: "Mathematics",
          description: "Symbolic computation, math tools",
          children: [
            { name: "SageMath", description: "Open source Mathematica alternative.", size: 28 },
            { name: "GNU Octave", description: "MATLAB-compatible numerical computation.", size: 25 },
            { name: "GeoGebra", description: "Interactive geometry, algebra, calculus.", size: 24 },
          ],
        },
        {
          name: "Specialized Research",
          description: "Domain-specific scientific tools",
          children: [
            { name: "QGIS", description: "Geographic Information System. Maps, spatial analysis.", size: 28 },
            { name: "ImageJ / FIJI", description: "Scientific image analysis. Microscopy.", size: 24 },
            { name: "ParaView", description: "3D scientific visualization. Large datasets.", size: 20 },
          ],
        },
      ],
    },
    {
      name: "Infrastructure",
      description: "Cloud, storage, identity & server management",
      color: "var(--cat-infra)",
      children: [
        {
          name: "Cloud & Storage",
          description: "File sync, cloud platforms",
          children: [
            { name: "Nextcloud", description: "Self-hosted cloud. Files, calendar, contacts, apps.", size: 38 },
            { name: "Syncthing", description: "Peer-to-peer file sync. No server needed.", size: 24 },
            { name: "MinIO", description: "S3-compatible object storage.", size: 22 },
          ],
        },
        {
          name: "Identity & Auth",
          description: "Single sign-on, user management",
          children: [
            { name: "Keycloak", description: "Identity & access management. SSO, OIDC, LDAP.", size: 30 },
            { name: "FreeIPA", description: "Integrated identity. LDAP, Kerberos, DNS.", size: 22 },
            { name: "Samba AD", description: "AD-compatible. Linux-native directory services.", size: 20 },
          ],
        },
        {
          name: "Learning Platforms",
          description: "E-learning and course management",
          children: [
            { name: "Moodle", description: "The LMS standard. Courses, quizzes, grading.", size: 35 },
            { name: "ILIAS", description: "Comprehensive LMS. Popular in German-speaking unis.", size: 22 },
            { name: "Open edX", description: "MOOC platform. By MIT & Harvard.", size: 24 },
          ],
        },
        {
          name: "Monitoring",
          description: "Keep systems running smoothly",
          children: [
            { name: "Grafana", description: "Dashboards & observability.", size: 28 },
            { name: "Prometheus", description: "Monitoring & alerting. Time-series.", size: 24 },
            { name: "Uptime Kuma", description: "Self-hosted uptime monitoring.", size: 20 },
          ],
        },
      ],
    },
    {
      name: "Privacy & Security",
      description: "Protect data, encrypt communications, browse safely",
      color: "var(--cat-privacy)",
      children: [
        {
          name: "Browsers & Search",
          description: "Browse the web privately",
          children: [
            { name: "Firefox", description: "Independent browser. Extensions, privacy.", size: 35 },
            { name: "Tor Browser", description: "Anonymous browsing. Onion routing.", size: 25 },
            { name: "SearXNG", description: "Privacy-respecting metasearch. Self-hostable.", size: 22 },
          ],
        },
        {
          name: "Encryption & VPN",
          description: "Protect data in transit and at rest",
          children: [
            { name: "WireGuard", description: "Modern VPN protocol. Fast, simple, auditable.", size: 28 },
            { name: "VeraCrypt", description: "Disk encryption. Encrypted volumes.", size: 22 },
            { name: "GnuPG (GPG)", description: "Email & file encryption. Digital signatures.", size: 24 },
          ],
        },
        {
          name: "Passwords",
          description: "Manage credentials securely",
          children: [
            { name: "Bitwarden", description: "Password manager. Self-hostable (Vaultwarden).", size: 32 },
            { name: "KeePassXC", description: "Offline password manager. Local database.", size: 26 },
          ],
        },
      ],
    },
  ],
};

/* ─────────── ROSETTA TABLE DATA ─────────── */
const ROSETTA_SECTIONS = [
  {
    title: "Office & Collaboration",
    rows: [
      ["Microsoft Office", "LibreOffice / ONLYOFFICE", "Strong offline suite; ONLYOFFICE for better MS fidelity"],
      ["Exchange + Outlook", "Thunderbird + EWS", "Adequate for most users"],
      ["SharePoint / OneDrive", "Nextcloud", "Mature, extensible, widely adopted"],
      ["Adobe Acrobat Pro", "Okular + LibreOffice Draw", "Covers most workflows"],
    ],
  },
  {
    title: "Identity & Device Management",
    rows: [
      ["Active Directory", "FreeIPA / Samba AD", "Linux-native IAM"],
      ["SCCM / Intune", "Ansible + FleetDM", "Linux-first endpoint management"],
    ],
  },
  {
    title: "Teaching & Research",
    rows: [
      ["SPSS", "R + RStudio", "Academic and industry standard"],
      ["MATLAB", "GNU Octave / Python", "Often retained in parallel"],
      ["ArcGIS Desktop", "QGIS", "Mature, full-featured replacement"],
      ["EndNote", "Zotero", "Widely adopted, browser extension"],
      ["Respondus LockDown", "Web-based exams (Moodle)", "Policy change required"],
    ],
  },
  {
    title: "Communication",
    rows: [
      ["Microsoft Teams", "Teams Web / Element (Matrix)", "Feature parity improving"],
      ["Zoom desktop", "Zoom Linux client / Jitsi", "Fully supported"],
      ["Slack", "Mattermost / Rocket.Chat", "Self-hosted, full control"],
    ],
  },
];

const STRATEGY_PHASES = [
  { phase: "1", title: "Assess & Govern", desc: "Establish institutional Linux governance. Audit current software dependencies, licensing costs, and vendor lock-in. Define supported distributions and desktop environments.", icon: "🔍" },
  { phase: "2", title: "Replace Commodity Software", desc: "Migrate commodity tools first — browsers, office suites, email clients, reference managers. These have mature FOSS alternatives with minimal disruption.", icon: "🔄" },
  { phase: "3", title: "Contain Legacy Dependencies", desc: "Isolate remaining proprietary tools via VDI, web access, or containers. Don't block adoption waiting for 100% replacement — contain exceptions instead.", icon: "📦" },
  { phase: "4", title: "Invest in People", desc: "Redirect license savings into staff training, support contracts, and community building. A successful transition is a human problem, not a technical one.", icon: "🎓" },
  { phase: "5", title: "Measure & Iterate", desc: "Track KPIs — cost savings, helpdesk load, uptime, user satisfaction. Use data to drive the next wave of adoption decisions.", icon: "📊" },
];

const BARRIER_CARDS = [
  { area: "Administrative IT", summary: "Deep Microsoft ecosystem integration, proprietary formats, Windows-centric endpoint management and vendor-locked enterprise software.", color: "var(--cat-infra)" },
  { area: "Teaching & Classroom", summary: "Publisher-mandated software, exam proctoring systems, discipline-specific commercial tools, and accreditation requirements.", color: "var(--cat-prod)" },
  { area: "Research", summary: "Vendor-certified workflows, Windows-only instrument control software, and hardware driver dependencies in funded research.", color: "var(--cat-science)" },
  { area: "Collaboration", summary: "Teams/Outlook calendar integration, SharePoint-centric workflows, and desktop digital signature dependencies.", color: "var(--cat-comm)" },
  { area: "Support & Ecosystem", summary: "Windows/macOS-centric IT training pipelines, limited Linux desktop support contracts, and distribution fragmentation.", color: "var(--cat-os)" },
];

/* ─────────── THEME DEFINITIONS ─────────── */
const themes = {
  dark: {
    "--bg-primary": "#060a13",
    "--bg-secondary": "#0c1220",
    "--bg-card": "#111827",
    "--bg-card-hover": "#1a2438",
    "--bg-surface": "rgba(17, 24, 39, 0.7)",
    "--text-primary": "#e2e8f0",
    "--text-secondary": "#94a3b8",
    "--text-muted": "#64748b",
    "--border": "rgba(148, 163, 184, 0.1)",
    "--border-accent": "rgba(148, 163, 184, 0.2)",
    "--cat-os": "#22d3ee",
    "--cat-prod": "#a78bfa",
    "--cat-comm": "#f472b6",
    "--cat-dev": "#4ade80",
    "--cat-creative": "#fb923c",
    "--cat-science": "#facc15",
    "--cat-infra": "#94a3b8",
    "--cat-privacy": "#f87171",
    "--accent-1": "#22d3ee",
    "--accent-2": "#a78bfa",
    "--graph-bg": "#0a0f1a",
    "--graph-root": "#0f172a",
    "--tooltip-bg": "rgba(10, 15, 30, 0.95)",
    "--table-header": "#111d2e",
    "--table-row-alt": "rgba(17, 24, 39, 0.5)",
    "--table-row": "transparent",
    "--phase-bg": "#111827",
  },
  light: {
    "--bg-primary": "#f5f7fb",
    "--bg-secondary": "#edf0f7",
    "--bg-card": "#ffffff",
    "--bg-card-hover": "#f0f4ff",
    "--bg-surface": "rgba(255, 255, 255, 0.85)",
    "--text-primary": "#1e293b",
    "--text-secondary": "#475569",
    "--text-muted": "#94a3b8",
    "--border": "rgba(30, 41, 59, 0.1)",
    "--border-accent": "rgba(30, 41, 59, 0.15)",
    "--cat-os": "#0891b2",
    "--cat-prod": "#7c3aed",
    "--cat-comm": "#db2777",
    "--cat-dev": "#16a34a",
    "--cat-creative": "#ea580c",
    "--cat-science": "#ca8a04",
    "--cat-infra": "#64748b",
    "--cat-privacy": "#dc2626",
    "--accent-1": "#0891b2",
    "--accent-2": "#7c3aed",
    "--graph-bg": "#edf0f7",
    "--graph-root": "#dde3ef",
    "--tooltip-bg": "rgba(255, 255, 255, 0.96)",
    "--table-header": "#e8ecf4",
    "--table-row-alt": "rgba(241, 245, 249, 0.7)",
    "--table-row": "transparent",
    "--phase-bg": "#ffffff",
  },
};

/* ══════════════ FOSS EXPLORER COMPONENT ══════════════ */
function FOSSExplorer({ theme }) {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const [dims, setDims] = useState({ w: 880, h: 640 });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [hovered, setHovered] = useState(null);
  const focusRef = useRef(null);
  const viewRef = useRef(null);

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

  const getCatColor = (n) => {
    let c = n;
    while (c.parent && c.depth > 1) c = c.parent;
    return c.data.color || "var(--cat-infra)";
  };

  const render = useCallback(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const hier = d3.hierarchy(FOSS_DATA).sum(d => d.size || 0).sort((a, b) => b.value - a.value);
    const root = d3.pack().size([w, h]).padding(4)(hier);

    let currentFocus = root;
    focusRef.current = root;
    viewRef.current = [root.x, root.y, root.r * 2.2];

    const g = svg.append("g");

    function zoomTo(v) {
      const k = Math.min(w, h) / v[2];
      viewRef.current = v;
      g.selectAll("circle")
        .attr("cx", d => (d.x - v[0]) * k + w / 2)
        .attr("cy", d => (d.y - v[1]) * k + h / 2)
        .attr("r", d => d.r * k);
      g.selectAll(".nlbl")
        .attr("x", d => (d.x - v[0]) * k + w / 2)
        .attr("y", d => !d.children ? (d.y - v[1]) * k + h / 2 : (d.y - v[1]) * k + h / 2 - d.r * k + 16)
        .style("font-size", d => {
          const r = d.r * k;
          return (!d.children ? Math.max(6, Math.min(13, r / 3.2)) : Math.max(8, Math.min(15, r / 5))) + "px";
        })
        .style("opacity", d => {
          const r = d.r * k;
          if (d.depth === 0) return 0;
          if (!d.children && r < 16) return 0;
          if (d.children && r < 28) return 0;
          return 1;
        });
    }

    function zoomNode(d) {
      currentFocus = d;
      focusRef.current = d;
      const path = [];
      let n = d;
      while (n) { path.unshift({ name: n.data.name, node: n }); n = n.parent; }
      setBreadcrumbs(path);
      const target = [d.x, d.y, d.r * 2.2];
      g.transition().duration(600).ease(d3.easeCubicInOut)
        .tween("zoom", () => { const i = d3.interpolateZoom(viewRef.current, target); return t => zoomTo(i(t)); });
    }

    const cStyle = getComputedStyle(document.documentElement);

    g.selectAll("circle").data(root.descendants()).join("circle")
      .attr("fill", d => {
        if (d.depth === 0) return "var(--graph-root)";
        const col = getCatColor(d);
        if (!d.children) return `color-mix(in srgb, ${col} 14%, transparent)`;
        return d.depth === 1 ? `color-mix(in srgb, ${col} 8%, transparent)` : `color-mix(in srgb, ${col} 6%, transparent)`;
      })
      .attr("stroke", d => {
        if (d.depth === 0) return "var(--border-accent)";
        const col = getCatColor(d);
        return !d.children ? `color-mix(in srgb, ${col} 55%, transparent)` : `color-mix(in srgb, ${col} 30%, transparent)`;
      })
      .attr("stroke-width", d => d.depth === 0 ? 2 : d.depth === 1 ? 1.5 : d.children ? 1 : 0.7)
      .style("cursor", "pointer")
      .on("click", (e, d) => { e.stopPropagation(); zoomNode(currentFocus === d && d.parent ? d.parent : d); })
      .on("mouseenter", (e, d) => {
        if (d.depth === 0) return;
        setHovered(d);
        d3.select(e.target).transition().duration(180).attr("stroke-width", d.children ? 2.5 : 2).attr("stroke", getCatColor(d));
      })
      .on("mouseleave", (e, d) => {
        setHovered(null);
        const col = getCatColor(d);
        d3.select(e.target).transition().duration(180)
          .attr("stroke-width", d.depth === 1 ? 1.5 : d.children ? 1 : 0.7)
          .attr("stroke", d.children ? `color-mix(in srgb, ${col} 30%, transparent)` : `color-mix(in srgb, ${col} 55%, transparent)`);
      });

    g.selectAll(".nlbl").data(root.descendants().filter(d => d.depth > 0)).join("text")
      .attr("class", "nlbl").attr("text-anchor", "middle")
      .attr("dominant-baseline", d => d.children ? "hanging" : "central")
      .attr("fill", d => getCatColor(d))
      .attr("font-weight", d => d.children ? 700 : 500)
      .attr("pointer-events", "none")
      .attr("font-family", "'JetBrains Mono', 'Fira Code', monospace")
      .attr("letter-spacing", d => d.children ? "0.03em" : "0")
      .text(d => d.data.name);

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
              onMouseEnter={e => { e.target.style.color = "var(--text-primary)"; e.target.style.background = "var(--border)"; }}
              onMouseLeave={e => { e.target.style.color = i === breadcrumbs.length - 1 ? "var(--text-primary)" : "var(--text-muted)"; e.target.style.background = "none"; }}>
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
          background: "var(--tooltip-bg)", border: "1px solid var(--border-accent)", borderRadius: 10,
          padding: "10px 18px", maxWidth: 400, backdropFilter: "blur(12px)", zIndex: 100, pointerEvents: "none",
          animation: "tooltipIn 0.15s ease-out",
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: getCatColor(hovered), fontFamily: "'JetBrains Mono', monospace", marginBottom: 3 }}>{hovered.data.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{hovered.data.description}</div>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", padding: "14px 0 4px" }}>
        {FOSS_DATA.children.map(c => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const t = themes[theme];
  const [vis, setVis] = useState({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVis(p => ({ ...p, [e.target.dataset.section]: true })); });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-section]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const reveal = (id, delay = 0) => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  const cssVars = Object.entries(t).map(([k, v]) => `${k}: ${v}`).join("; ");

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Source Sans 3', 'Noto Sans', sans-serif" }}>
      <style>{`
        :root { ${cssVars} }
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg-primary); color: var(--text-primary); transition: background 0.35s, color 0.35s; }
        ::selection { background: color-mix(in srgb, var(--accent-1) 30%, transparent); }
        @keyframes tooltipIn { from { opacity:0; transform:translateX(-50%) translateY(4px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      `}</style>

      <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", transition: "background 0.35s, color 0.35s" }}>

        {/* ─── NAVBAR ─── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)",
          background: "color-mix(in srgb, var(--bg-primary) 82%, transparent)",
          borderBottom: "1px solid var(--border)", padding: "0 32px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 17, color: "var(--accent-1)", letterSpacing: "-0.03em" }}>
                &gt;_ FOSS Explorer
              </span>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", border: "1px solid var(--border-accent)", padding: "2px 6px", borderRadius: 4 }}>v0.1</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {["explorer", "barriers", "rosetta", "strategy"].map(s => (
                <a key={s} href={`#${s}`} style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "var(--text-primary)"} onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              ))}
              <button onClick={() => setTheme(p => p === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border-accent)", borderRadius: 8, padding: "6px 12px",
                  cursor: "pointer", fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-1)"} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-accent)"}>
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

          {/* ─── HERO ─── */}
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
              }} onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>
                Explore the Map ↓
              </a>
              <a href="#strategy" style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8,
                background: "transparent", border: "1px solid var(--border-accent)", color: "var(--text-secondary)",
                fontWeight: 500, fontSize: 14, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s",
              }} onMouseEnter={e => { e.target.style.borderColor = "var(--accent-1)"; e.target.style.color = "var(--text-primary)"; }}
                 onMouseLeave={e => { e.target.style.borderColor = "var(--border-accent)"; e.target.style.color = "var(--text-secondary)"; }}>
                Read the Strategy
              </a>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0 0 48px" }} />

          {/* ─── EXPLORER ─── */}
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

          {/* ─── BARRIERS ─── */}
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
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", color: b.color }}>{b.area}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{b.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "48px 0" }} />

          {/* ─── ROSETTA TABLE ─── */}
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

          {/* ─── STRATEGY TIMELINE ─── */}
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

          {/* ─── PRINCIPLES ─── */}
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

          {/* ─── GEOPOLITICAL ─── */}
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
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-card-hover)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-2)" }}>{item.t}</h4>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 32px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            FOSS Explorer — An open initiative for teachers, students & researchers · Built with open tools
          </p>
        </footer>
      </div>
    </div>
  );
}
