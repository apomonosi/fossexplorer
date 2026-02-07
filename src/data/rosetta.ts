export interface RosettaSection {
  title: string;
  rows: [string, string, string][];
}

export const ROSETTA_SECTIONS: RosettaSection[] = [
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
