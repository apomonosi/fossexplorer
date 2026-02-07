export interface FOSSNode {
  name: string;
  description: string;
  color?: string;
  size?: number;
  icon?: string;
  url?: string;
  slug?: string;
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
            { name: "Linux Mint", description: "Familiar desktop, perfect first Linux. Based on Ubuntu with Cinnamon DE. Excellent hardware support and a welcoming community make it the top recommendation for users leaving Windows.", icon: "🌿", url: "https://linuxmint.com", slug: "linux-mint", size: 40 },
            { name: "Ubuntu", description: "The most popular Linux distribution with a massive community and outstanding documentation. Backed by Canonical with 5-year LTS support cycles and a huge package archive.", icon: "🟠", url: "https://ubuntu.com", slug: "ubuntu", size: 38 },
            { name: "Zorin OS", description: "Designed specifically for Windows and macOS switchers. Ships with multiple desktop layout presets that mimic familiar environments. Beautiful, intuitive, and requires zero Linux knowledge to get started.", icon: "💠", url: "https://zorin.com/os", slug: "zorin-os", size: 30 },
            { name: "Pop!_OS", description: "By System76 hardware manufacturer. Excellent NVIDIA GPU support out of the box, tiling window manager, and a curated app store. Popular with developers and content creators.", icon: "🚀", url: "https://pop.system76.com", slug: "pop-os", size: 28 },
            { name: "elementary OS", description: "macOS-inspired aesthetic with a curated AppCenter and strong focus on UX consistency. Built on Ubuntu but ships its own Pantheon desktop. Great for users who value design.", icon: "🦋", url: "https://elementary.io", slug: "elementary-os", size: 25 },
          ],
        },
        {
          name: "For Power Users",
          description: "Maximum control and customization",
          children: [
            { name: "Fedora", description: "Cutting-edge packages with a strong community. Sponsored by Red Hat and serves as the upstream testing ground for RHEL. Ships the latest GNOME desktop and kernel within weeks of release.", icon: "🎩", url: "https://fedoraproject.org", slug: "fedora", size: 35 },
            { name: "Arch Linux", description: "Rolling release distribution where you build your system from the ground up. The Arch Wiki is the single best Linux documentation resource. Teaches you how Linux works.", icon: "🏔️", url: "https://archlinux.org", slug: "arch-linux", size: 30 },
            { name: "openSUSE", description: "Tumbleweed (rolling) or Leap (stable). YaST is a powerful system configuration tool. Strong enterprise lineage from SUSE. Excellent Btrfs and snapshot support.", icon: "🦎", url: "https://www.opensuse.org", slug: "opensuse", size: 25 },
            { name: "Debian", description: "The universal operating system. Rock-solid stability, the largest package repository in the Linux world, and the foundation for Ubuntu, Mint, and dozens of derivatives.", icon: "🌀", url: "https://www.debian.org", slug: "debian", size: 28 },
            { name: "NixOS", description: "Declarative system configuration using the Nix language. Fully reproducible builds, atomic upgrades, and rollbacks. Unique approach to package management gaining strong traction.", icon: "❄️", url: "https://nixos.org", slug: "nixos", size: 20 },
          ],
        },
        {
          name: "For Research",
          description: "Specialized for scientific computing & research",
          children: [
            { name: "Ubuntu Server", description: "The standard for cloud, containers, and HPC. LTS releases provide 5 years of security updates. Dominant on AWS, Azure, and in university research clusters.", icon: "🖥️", url: "https://ubuntu.com/server", slug: "ubuntu-server", size: 30 },
            { name: "CentOS Stream", description: "Enterprise-grade, positioned upstream of RHEL. Good for labs that need RHEL compatibility without the subscription. Continuous delivery model.", icon: "📡", url: "https://www.centos.org", slug: "centos-stream", size: 22 },
            { name: "Rocky Linux", description: "Community-driven RHEL rebuild created after CentOS shifted to Stream. Drop-in replacement for CentOS 8. Backed by CIQ and a growing enterprise community.", icon: "🪨", url: "https://rockylinux.org", slug: "rocky-linux", size: 22 },
            { name: "Qubes OS", description: "Security through hardware-level compartmentalization using Xen hypervisor. Each application runs in its own VM. Used by journalists, researchers handling sensitive data, and security professionals.", icon: "🛡️", url: "https://www.qubes-os.org", slug: "qubes-os", size: 18 },
          ],
        },
        {
          name: "Mobile & Other",
          description: "Beyond the desktop",
          children: [
            { name: "GrapheneOS", description: "Hardened Android for Pixel phones. Privacy-focused with sandboxed Google Play compatibility. Regular security patches and a minimal attack surface.", icon: "🔐", url: "https://grapheneos.org", slug: "grapheneos", size: 20 },
            { name: "LineageOS", description: "Free Android distribution that extends your device's useful life. Supports hundreds of devices with regular updates. No Google services required.", icon: "📱", url: "https://lineageos.org", slug: "lineageos", size: 20 },
            { name: "FreeBSD", description: "Not Linux — a complete Unix-like OS with its own kernel. Exceptional networking stack, ZFS filesystem, jails for containerization, and a clean separation of base system and ports.", icon: "😈", url: "https://www.freebsd.org", slug: "freebsd", size: 22 },
            { name: "Haiku", description: "Inspired by BeOS. A unique, lightweight desktop OS with a single-team coherent design. Fast boot times and a distinctive media-focused heritage.", icon: "🍃", url: "https://www.haiku-os.org", slug: "haiku", size: 12 },
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
            { name: "LibreOffice", description: "Complete office suite with Writer, Calc, Impress, Draw, and Base. Strong MS Office compatibility, native ODF support, and a vibrant extension ecosystem. The default office suite on most Linux distributions.", icon: "📝", url: "https://www.libreoffice.org", slug: "libreoffice", size: 40 },
            { name: "ONLYOFFICE", description: "Modern interface with the best Microsoft Office file format compatibility among open source suites. Real-time collaborative editing and self-hostable server edition.", icon: "📊", url: "https://www.onlyoffice.com", slug: "onlyoffice", size: 30 },
            { name: "CryptPad", description: "End-to-end encrypted collaborative office suite. Documents, spreadsheets, presentations, kanban, and forms — all zero-knowledge. Self-hostable.", icon: "🔒", url: "https://cryptpad.org", slug: "cryptpad", size: 22 },
            { name: "Collabora Online", description: "LibreOffice technology in the browser. Integrates with Nextcloud, ownCloud, and other platforms. Self-hostable collaborative editing for institutions.", icon: "🌐", url: "https://www.collaboraoffice.com", slug: "collabora-online", size: 22 },
          ],
        },
        {
          name: "Writing & Notes",
          description: "For academic writing, note-taking, and knowledge management",
          children: [
            { name: "LaTeX / Overleaf", description: "The gold standard for academic papers, theses, and technical documents. Overleaf provides browser-based collaborative LaTeX editing with real-time preview and Git integration.", icon: "📄", url: "https://www.overleaf.com", slug: "latex-overleaf", size: 35 },
            { name: "Logseq", description: "Open source knowledge base and outliner. Local-first with optional sync. Graph-based note linking, daily journals, and a growing plugin ecosystem.", icon: "📗", url: "https://logseq.com", slug: "logseq", size: 25 },
            { name: "Zettlr", description: "Academic markdown editor with built-in Zotero integration, citation support, and export to PDF, DOCX, and LaTeX. Designed for researchers and writers.", icon: "✍️", url: "https://www.zettlr.com", slug: "zettlr", size: 22 },
            { name: "Joplin", description: "Note-taking and to-do application with sync via Nextcloud, Dropbox, or WebDAV. Markdown support, end-to-end encryption, and web clipper extension.", icon: "📓", url: "https://joplinapp.org", slug: "joplin", size: 24 },
            { name: "Typst", description: "Modern alternative to LaTeX with dramatically faster compilation and a friendlier markup syntax. Growing template library and collaborative web editor.", icon: "⚡", url: "https://typst.app", slug: "typst", size: 20 },
          ],
        },
        {
          name: "Reference Management",
          description: "Organize papers, citations and bibliographies",
          children: [
            { name: "Zotero", description: "Best-in-class reference manager used across academia. Browser extension for one-click capture, plugins for Word and LibreOffice, PDF annotation, and group libraries for collaborative research.", icon: "📚", url: "https://www.zotero.org", slug: "zotero", size: 35 },
            { name: "JabRef", description: "BibTeX-native reference manager. Open source, cross-platform, and ideal for LaTeX users. Integrates with Overleaf, LibreOffice, and major BibTeX workflows.", icon: "📖", url: "https://www.jabref.org", slug: "jabref", size: 22 },
          ],
        },
        {
          name: "Project & Task Mgmt",
          description: "Organize work, track tasks, manage projects",
          children: [
            { name: "OpenProject", description: "Full project management with Gantt charts, Agile boards, time tracking, cost reporting, and BIM support. Self-hostable with an active community edition.", icon: "📋", url: "https://www.openproject.org", slug: "openproject", size: 25 },
            { name: "Taiga", description: "Agile project management platform with Kanban and Scrum boards, user stories, sprints, and wiki. Clean interface designed for software development teams.", icon: "🏷️", url: "https://taiga.io", slug: "taiga", size: 20 },
            { name: "Vikunja", description: "Open source task manager and Todoist alternative. Lists, kanban, Gantt, and calendar views. Self-hostable with CalDAV integration.", icon: "✅", url: "https://vikunja.io", slug: "vikunja", size: 18 },
            { name: "Plane", description: "Open source alternative to Jira and Linear. Modern issue tracking with cycles, modules, and views. Self-hostable with a growing feature set.", icon: "✈️", url: "https://plane.so", slug: "plane", size: 20 },
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
            { name: "Matrix / Element", description: "Decentralized, end-to-end encrypted communication protocol with bridges to Slack, Discord, Telegram, and more. Element is the flagship client. Used by governments and universities.", icon: "💬", url: "https://element.io", slug: "matrix-element", size: 35 },
            { name: "Rocket.Chat", description: "Self-hosted team communication platform. Channels, threads, video calls, and extensive integrations. Enterprise features with an open source core.", icon: "🚀", url: "https://www.rocket.chat", slug: "rocketchat", size: 28 },
            { name: "Mattermost", description: "Enterprise-grade messaging platform. Self-hosted with compliance features, integrations, and playbooks. Strong DevOps and incident response workflows.", icon: "💭", url: "https://mattermost.com", slug: "mattermost", size: 26 },
            { name: "Signal", description: "Gold standard for private messaging. End-to-end encrypted by default with disappearing messages, sealed sender, and audited open source clients.", icon: "🔵", url: "https://signal.org", slug: "signal", size: 30 },
          ],
        },
        {
          name: "Video & Conferencing",
          description: "Video calls, webinars, virtual classrooms",
          children: [
            { name: "Jitsi Meet", description: "No-account-needed video conferencing. Self-hostable, browser-based, end-to-end encrypted. Share screens, chat, and record. Used by many universities.", icon: "🎥", url: "https://jitsi.org", slug: "jitsi-meet", size: 32 },
            { name: "BigBlueButton", description: "Purpose-built for education: breakout rooms, shared whiteboard, polling, hand-raising, and recording. Integrates with Moodle, Canvas, and other LMS platforms.", icon: "🎓", url: "https://bigbluebutton.org", slug: "bigbluebutton", size: 30 },
            { name: "PeerTube", description: "Decentralized video hosting using ActivityPub federation. Host your own YouTube-like platform that interconnects with other instances. No tracking or ads.", icon: "▶️", url: "https://joinpeertube.org", slug: "peertube", size: 22 },
          ],
        },
        {
          name: "Email & Calendar",
          description: "Communication infrastructure",
          children: [
            { name: "Thunderbird", description: "Mozilla's email client with built-in calendar, contacts, feeds, and chat. Add-on ecosystem, PGP encryption support, and Exchange compatibility.", icon: "📧", url: "https://www.thunderbird.net", slug: "thunderbird", size: 30 },
            { name: "Nextcloud Mail", description: "Webmail integrated into the Nextcloud ecosystem. Calendar and contacts sync via CalDAV/CardDAV. Clean interface for institutional deployments.", icon: "✉️", url: "https://nextcloud.com", slug: "nextcloud-mail", size: 22 },
            { name: "Proton Mail", description: "End-to-end encrypted email based in Switzerland. Open source clients, zero-access encryption, and a growing suite including calendar, drive, and VPN.", icon: "🛡️", url: "https://proton.me/mail", slug: "proton-mail", size: 24 },
          ],
        },
        {
          name: "Forums & Social",
          description: "Community building platforms",
          children: [
            { name: "Discourse", description: "Modern forum software with rich features: categories, tags, trust levels, plugins, and excellent moderation tools. Used by thousands of open source communities.", icon: "💬", url: "https://www.discourse.org", slug: "discourse", size: 28 },
            { name: "Mastodon", description: "Federated microblogging platform using ActivityPub. Decentralized Twitter alternative where each server sets its own rules. Growing academic presence.", icon: "🐘", url: "https://joinmastodon.org", slug: "mastodon", size: 26 },
            { name: "Lemmy", description: "Federated link aggregator and discussion platform. Open source Reddit alternative with community-run instances and ActivityPub support.", icon: "🐿️", url: "https://join-lemmy.org", slug: "lemmy", size: 20 },
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
            { name: "VS Codium", description: "VS Code without Microsoft telemetry or branding. Same extension marketplace compatibility, same features, fully open source binaries.", icon: "💻", url: "https://vscodium.com", slug: "vscodium", size: 35 },
            { name: "Neovim", description: "Hyperextensible Vim fork with Lua configuration, built-in LSP client, treesitter parsing, and a rich plugin ecosystem. The terminal editor of choice for many developers.", icon: "⌨️", url: "https://neovim.io", slug: "neovim", size: 28 },
            { name: "Emacs", description: "The infinitely extensible editor. Org-mode for literate programming and GTD, Magit for Git, and a Lisp-based configuration system that can do anything.", icon: "🔮", url: "https://www.gnu.org/software/emacs", slug: "emacs", size: 25 },
            { name: "Zed", description: "High-performance code editor written in Rust. Collaborative editing, AI integration, and GPU-accelerated rendering. Fast and modern.", icon: "⚡", url: "https://zed.dev", slug: "zed", size: 22 },
          ],
        },
        {
          name: "Version Control",
          description: "Track changes, collaborate on code",
          children: [
            { name: "Git", description: "The distributed version control system that powers modern software development. Created by Linus Torvalds. Foundation for GitHub, GitLab, and all modern code collaboration.", icon: "🔀", url: "https://git-scm.com", slug: "git", size: 40 },
            { name: "Gitea / Forgejo", description: "Lightweight, self-hosted Git service. Low resource usage, easy to deploy. Forgejo is a community fork with guaranteed open governance.", icon: "☕", url: "https://forgejo.org", slug: "gitea-forgejo", size: 28 },
            { name: "GitLab CE", description: "Complete DevOps platform in a single application. CI/CD pipelines, issue tracking, wiki, container registry, and security scanning. Community Edition is fully open source.", icon: "🦊", url: "https://about.gitlab.com", slug: "gitlab-ce", size: 32 },
            { name: "Codeberg", description: "Non-profit Git hosting powered by Forgejo. Free for open source projects. Based in Germany with strong privacy commitments.", icon: "🏔️", url: "https://codeberg.org", slug: "codeberg", size: 20 },
          ],
        },
        {
          name: "Containers & DevOps",
          description: "Build, ship, and run applications",
          children: [
            { name: "Podman", description: "Daemonless, rootless container engine. Docker CLI-compatible. No root daemon means better security. Pods concept inspired by Kubernetes.", icon: "🦭", url: "https://podman.io", slug: "podman", size: 28 },
            { name: "Docker CE", description: "The container runtime that popularized containerization. Build, ship, and run applications in isolated environments. Huge ecosystem of images on Docker Hub.", icon: "🐳", url: "https://www.docker.com", slug: "docker-ce", size: 30 },
            { name: "Kubernetes", description: "Container orchestration at scale. Automates deployment, scaling, and management of containerized applications. The industry standard for production workloads.", icon: "☸️", url: "https://kubernetes.io", slug: "kubernetes", size: 28 },
            { name: "Ansible", description: "Agentless IT automation using YAML playbooks. Infrastructure as code, configuration management, and application deployment. Push-based, SSH-powered, no agents required.", icon: "🤖", url: "https://www.ansible.com", slug: "ansible", size: 24 },
          ],
        },
        {
          name: "Languages",
          description: "Open source programming languages",
          children: [
            { name: "Python", description: "Versatile, readable language dominant in data science, AI/ML, web development, and automation. Massive package ecosystem (PyPI). The most-taught programming language worldwide.", icon: "🐍", url: "https://www.python.org", slug: "python", size: 38 },
            { name: "Rust", description: "Memory-safe systems programming language without garbage collection. Growing fast in infrastructure, WebAssembly, and embedded systems. Loved by developers for its compiler guarantees.", icon: "🦀", url: "https://www.rust-lang.org", slug: "rust", size: 28 },
            { name: "Julia", description: "High-performance language for scientific and numerical computing. Combines the ease of Python with the speed of C. Multiple dispatch and native parallelism.", icon: "📐", url: "https://julialang.org", slug: "julia", size: 22 },
            { name: "R", description: "Language and environment for statistical computing and graphics. Unmatched for data visualization (ggplot2) and statistical analysis. Dominant in academia and biostatistics.", icon: "📈", url: "https://www.r-project.org", slug: "r-lang", size: 24 },
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
            { name: "GIMP", description: "Powerful raster image editor and Photoshop alternative. Layer support, filters, scripting, and a large plugin ecosystem. Handles professional photo editing workflows.", icon: "🖼️", url: "https://www.gimp.org", slug: "gimp", size: 35 },
            { name: "Inkscape", description: "Professional vector graphics editor. SVG-native with support for PDF, EPS, and AI formats. Used for logos, illustrations, technical diagrams, and web graphics.", icon: "✒️", url: "https://inkscape.org", slug: "inkscape", size: 30 },
            { name: "Krita", description: "Digital painting application with GPU-accelerated canvas, brush engines, animation tools, and HDR support. Designed by and for artists.", icon: "🎨", url: "https://krita.org", slug: "krita", size: 28 },
            { name: "Penpot", description: "Open source design and prototyping platform. Web-based Figma alternative with real-time collaboration. Self-hostable with SVG-native workflow.", icon: "🖌️", url: "https://penpot.app", slug: "penpot", size: 25 },
          ],
        },
        {
          name: "Audio & Music",
          description: "Record, edit, produce",
          children: [
            { name: "Audacity", description: "Multi-track audio editor and recorder. Simple yet powerful for podcasting, audio cleanup, format conversion, and basic music production. Cross-platform.", icon: "🎧", url: "https://www.audacityteam.org", slug: "audacity", size: 32 },
            { name: "Ardour", description: "Professional digital audio workstation. Multi-track recording, editing, mixing, and mastering. JACK and PulseAudio support. Used in professional studios.", icon: "🎛️", url: "https://ardour.org", slug: "ardour", size: 25 },
            { name: "MuseScore", description: "Sheet music notation software. Compose, play back, and share scores. Huge library of community-created sheets. Standard for music education.", icon: "🎵", url: "https://musescore.org", slug: "musescore", size: 22 },
          ],
        },
        {
          name: "Video & 3D",
          description: "Edit video, create animations and VFX",
          children: [
            { name: "Blender", description: "Industry-grade 3D creation suite. Modeling, sculpting, animation, rendering (Cycles/EEVEE), compositing, and video editing. Used in film, games, and architecture.", icon: "🧊", url: "https://www.blender.org", slug: "blender", size: 38 },
            { name: "Kdenlive", description: "Non-linear video editor with multi-track timeline, effects, transitions, and proxy editing. Active development with a growing professional user base.", icon: "🎬", url: "https://kdenlive.org", slug: "kdenlive", size: 26 },
            { name: "OBS Studio", description: "The industry standard for live streaming and screen recording. Scene composition, audio mixing, virtual camera, and plugin ecosystem. Used by millions.", icon: "📹", url: "https://obsproject.com", slug: "obs-studio", size: 28 },
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
            { name: "Jupyter", description: "Interactive computational notebooks supporting Python, R, Julia, and 40+ other languages. The standard for data exploration, visualization, and reproducible research.", icon: "📓", url: "https://jupyter.org", slug: "jupyter", size: 38 },
            { name: "RStudio", description: "Integrated development environment for R. Notebooks, plots, package management, and Shiny for interactive web applications. Essential for statistical work.", icon: "📊", url: "https://posit.co/products/open-source/rstudio", slug: "rstudio", size: 28 },
            { name: "KNIME", description: "Visual data pipeline builder for analytics and machine learning. Drag-and-drop workflow design, no coding required. Enterprise integrations available.", icon: "🔗", url: "https://www.knime.com", slug: "knime", size: 22 },
            { name: "Pandas / NumPy", description: "The foundational Python data stack. Pandas for DataFrames and data wrangling, NumPy for numerical arrays and linear algebra. Used in virtually every Python data project.", icon: "🐼", url: "https://pandas.pydata.org", slug: "pandas-numpy", size: 30 },
          ],
        },
        {
          name: "Mathematics",
          description: "Symbolic computation, math tools",
          children: [
            { name: "SageMath", description: "Open source computer algebra system. Combines the power of many existing packages under a unified Python-based interface. Alternative to Mathematica and Maple.", icon: "🧮", url: "https://www.sagemath.org", slug: "sagemath", size: 28 },
            { name: "GNU Octave", description: "MATLAB-compatible numerical computation environment. Drop-in replacement for many MATLAB scripts. Free for teaching and research without license restrictions.", icon: "📐", url: "https://octave.org", slug: "gnu-octave", size: 25 },
            { name: "GeoGebra", description: "Interactive mathematics software for geometry, algebra, calculus, and statistics. Widely used in education from secondary school through university.", icon: "📏", url: "https://www.geogebra.org", slug: "geogebra", size: 24 },
          ],
        },
        {
          name: "Specialized Research",
          description: "Domain-specific scientific tools",
          children: [
            { name: "QGIS", description: "Full-featured Geographic Information System. Create, edit, visualize, and analyze geospatial data. Plugin system with hundreds of community extensions.", icon: "🗺️", url: "https://qgis.org", slug: "qgis", size: 28 },
            { name: "ImageJ / FIJI", description: "Scientific image analysis platform standard in microscopy and biomedical imaging. Macro scripting, plugin architecture, and extensive community resources.", icon: "🔬", url: "https://imagej.net", slug: "imagej-fiji", size: 24 },
            { name: "ParaView", description: "3D scientific visualization for large datasets. Volume rendering, time series, and parallel processing. Used in CFD, astrophysics, and materials science.", icon: "🌊", url: "https://www.paraview.org", slug: "paraview", size: 20 },
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
            { name: "Nextcloud", description: "Self-hosted cloud platform. File sync, calendar, contacts, document collaboration, video calls, and 300+ apps. The most popular self-hosted productivity suite.", icon: "☁️", url: "https://nextcloud.com", slug: "nextcloud", size: 38 },
            { name: "Syncthing", description: "Continuous peer-to-peer file synchronization. No central server, no cloud, no account. Encrypted, authenticated, and open protocol.", icon: "🔄", url: "https://syncthing.net", slug: "syncthing", size: 24 },
            { name: "MinIO", description: "High-performance S3-compatible object storage. Kubernetes-native. Used for data lakes, backups, and AI/ML storage.", icon: "💾", url: "https://min.io", slug: "minio", size: 22 },
          ],
        },
        {
          name: "Identity & Auth",
          description: "Single sign-on, user management",
          children: [
            { name: "Keycloak", description: "Identity and access management. Single Sign-On, OpenID Connect, SAML 2.0, and LDAP federation. User management, 2FA, and social login.", icon: "🔑", url: "https://www.keycloak.org", slug: "keycloak", size: 30 },
            { name: "FreeIPA", description: "Integrated identity management. Combines LDAP, Kerberos, DNS, and certificate authority. The Linux-native answer to Active Directory.", icon: "🪪", url: "https://www.freeipa.org", slug: "freeipa", size: 22 },
            { name: "Samba AD", description: "Active Directory-compatible domain controller on Linux. File sharing, authentication, and group policy. Enables mixed Windows/Linux environments.", icon: "🏛️", url: "https://www.samba.org", slug: "samba-ad", size: 20 },
          ],
        },
        {
          name: "Learning Platforms",
          description: "E-learning and course management",
          children: [
            { name: "Moodle", description: "The world's most widely used open source LMS. Courses, quizzes, assignments, grading, forums, and SCORM support. Used by universities, schools, and corporations worldwide.", icon: "🎓", url: "https://moodle.org", slug: "moodle", size: 35 },
            { name: "ILIAS", description: "Comprehensive LMS with strong assessment tools, repository, and SCORM 2004 support. Particularly popular in German-speaking universities and institutions.", icon: "🏫", url: "https://www.ilias.de", slug: "ilias", size: 22 },
            { name: "Open edX", description: "MOOC platform created by MIT and Harvard. Powers edX.org and thousands of institutional deployments. Course authoring, certificates, and analytics.", icon: "🌍", url: "https://openedx.org", slug: "open-edx", size: 24 },
          ],
        },
        {
          name: "Monitoring",
          description: "Keep systems running smoothly",
          children: [
            { name: "Grafana", description: "Visualization and dashboarding platform. Connect to Prometheus, InfluxDB, Elasticsearch, and dozens more. Beautiful dashboards for monitoring.", icon: "📈", url: "https://grafana.com", slug: "grafana", size: 28 },
            { name: "Prometheus", description: "Pull-based monitoring and alerting toolkit. Time-series database with PromQL query language. The standard for cloud-native monitoring.", icon: "🔥", url: "https://prometheus.io", slug: "prometheus", size: 24 },
            { name: "Uptime Kuma", description: "Self-hosted uptime monitoring with a beautiful UI. HTTP, TCP, DNS, and ping checks. Notifications via Slack, Telegram, email, and more.", icon: "💚", url: "https://uptime.kuma.pet", slug: "uptime-kuma", size: 20 },
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
            { name: "Firefox", description: "Independent browser backed by the non-profit Mozilla Foundation. Rich extension ecosystem, strong privacy defaults, container tabs, and the only major browser not based on Chromium.", icon: "🦊", url: "https://www.mozilla.org/firefox", slug: "firefox", size: 35 },
            { name: "Tor Browser", description: "Anonymous browsing through onion routing. Prevents tracking, censorship circumvention, and access to .onion services. Based on Firefox ESR.", icon: "🧅", url: "https://www.torproject.org", slug: "tor-browser", size: 25 },
            { name: "SearXNG", description: "Privacy-respecting metasearch engine. Aggregates results from 70+ search engines without tracking. Self-hostable with customizable result sources.", icon: "🔍", url: "https://docs.searxng.org", slug: "searxng", size: 22 },
          ],
        },
        {
          name: "Encryption & VPN",
          description: "Protect data in transit and at rest",
          children: [
            { name: "WireGuard", description: "Modern VPN protocol with minimal attack surface. Faster, simpler, and more auditable than OpenVPN or IPsec. Built into the Linux kernel since 5.6.", icon: "🔐", url: "https://www.wireguard.com", slug: "wireguard", size: 28 },
            { name: "VeraCrypt", description: "Disk encryption software. Create encrypted volumes or encrypt entire partitions. Successor to TrueCrypt with ongoing security audits.", icon: "🔏", url: "https://veracrypt.fr", slug: "veracrypt", size: 22 },
            { name: "GnuPG (GPG)", description: "OpenPGP implementation for email and file encryption, digital signatures, and key management. The backbone of secure email and package signing.", icon: "🔑", url: "https://gnupg.org", slug: "gnupg", size: 24 },
          ],
        },
        {
          name: "Passwords",
          description: "Manage credentials securely",
          children: [
            { name: "Bitwarden", description: "Full-featured password manager with browser extensions, mobile apps, and CLI. Self-hostable via Vaultwarden. End-to-end encrypted with organizational sharing.", icon: "🗝️", url: "https://bitwarden.com", slug: "bitwarden", size: 32 },
            { name: "KeePassXC", description: "Offline password manager with local encrypted database. Browser integration, TOTP support, SSH agent, and no cloud dependency.", icon: "🔐", url: "https://keepassxc.org", slug: "keepassxc", size: 26 },
          ],
        },
      ],
    },
  ],
};
