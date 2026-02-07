export interface FOSSNode {
  name: string;
  description: string;
  color?: string;
  size?: number;
  children?: FOSSNode[];
}

export const FOSS_DATA: FOSSNode = {
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
