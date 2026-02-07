export interface StrategyPhase {
  phase: string;
  title: string;
  desc: string;
  icon: string;
}

export interface BarrierCard {
  area: string;
  summary: string;
  color: string;
}

export const STRATEGY_PHASES: StrategyPhase[] = [
  { phase: "1", title: "Assess & Govern", desc: "Establish institutional Linux governance. Audit current software dependencies, licensing costs, and vendor lock-in. Define supported distributions and desktop environments.", icon: "🔍" },
  { phase: "2", title: "Replace Commodity Software", desc: "Migrate commodity tools first — browsers, office suites, email clients, reference managers. These have mature FOSS alternatives with minimal disruption.", icon: "🔄" },
  { phase: "3", title: "Contain Legacy Dependencies", desc: "Isolate remaining proprietary tools via VDI, web access, or containers. Don't block adoption waiting for 100% replacement — contain exceptions instead.", icon: "📦" },
  { phase: "4", title: "Invest in People", desc: "Redirect license savings into staff training, support contracts, and community building. A successful transition is a human problem, not a technical one.", icon: "🎓" },
  { phase: "5", title: "Measure & Iterate", desc: "Track KPIs — cost savings, helpdesk load, uptime, user satisfaction. Use data to drive the next wave of adoption decisions.", icon: "📊" },
];

export const BARRIER_CARDS: BarrierCard[] = [
  { area: "Administrative IT", summary: "Deep Microsoft ecosystem integration, proprietary formats, Windows-centric endpoint management and vendor-locked enterprise software.", color: "var(--cat-infra)" },
  { area: "Teaching & Classroom", summary: "Publisher-mandated software, exam proctoring systems, discipline-specific commercial tools, and accreditation requirements.", color: "var(--cat-prod)" },
  { area: "Research", summary: "Vendor-certified workflows, Windows-only instrument control software, and hardware driver dependencies in funded research.", color: "var(--cat-science)" },
  { area: "Collaboration", summary: "Teams/Outlook calendar integration, SharePoint-centric workflows, and desktop digital signature dependencies.", color: "var(--cat-comm)" },
  { area: "Support & Ecosystem", summary: "Windows/macOS-centric IT training pipelines, limited Linux desktop support contracts, and distribution fragmentation.", color: "var(--cat-os)" },
];
