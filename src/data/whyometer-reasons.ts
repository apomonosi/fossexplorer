export interface Reason {
  id: string;
  label: string;
  short: string;
  base: number;
  range: number;
  color: string;
  desc: string;
}

export const REASONS: Reason[] = [
  { id: "cost", label: "Licensing Cost\nReduction", short: "Cost", base: 82, range: 14, color: "#22d3ee", desc: "Eliminate recurring proprietary license fees across the institution" },
  { id: "currency", label: "Currency &\nProcurement Risk", short: "Currency", base: 68, range: 22, color: "#a78bfa", desc: "Reduce exposure to foreign-denominated licensing and exchange volatility" },
  { id: "geopolitics", label: "Geopolitical\nResilience", short: "Geopolitics", base: 74, range: 18, color: "#f472b6", desc: "Mitigate risk of sanctions, vendor withdrawal, and supply chain disruption" },
  { id: "sovereignty", label: "Data\nSovereignty", short: "Sovereignty", base: 88, range: 10, color: "#4ade80", desc: "Full control and auditability over institutional data processing" },
  { id: "reproducibility", label: "Research\nReproducibility", short: "Reproducibility", base: 79, range: 12, color: "#facc15", desc: "Open toolchains ensure research workflows can be verified and shared" },
  { id: "hardware", label: "Hardware\nLongevity", short: "Hardware", base: 71, range: 16, color: "#fb923c", desc: "Lightweight Linux extends useful life of existing hardware fleets" },
  { id: "vendor", label: "Vendor\nIndependence", short: "Vendor Lock-in", base: 85, range: 12, color: "#f87171", desc: "Break free from single-vendor dependency in critical infrastructure" },
  { id: "ecosystem", label: "Local IT\nEcosystem", short: "Local IT", base: 62, range: 20, color: "#94a3b8", desc: "Build domestic expertise and support regional service providers" },
];
