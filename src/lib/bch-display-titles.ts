/**
 * Display titles for archived BCH pages whose published title is lowercase or
 * malformed. Page bodies are never altered; this only fixes how a title reads
 * in navigation, headings and the archive index.
 */
const displayTitles: Record<string, string> = {
  services: "Hospital services",
  "opd-opd-general": "Outpatient services & clinic hours",
  "manage-donation": "How we manage donations",
  "what-we-need": "What we need",
  "make-donation": "Make a donation",
};

export function pageTitle(page: { slug: string; title: string }) {
  return displayTitles[page.slug] ?? page.title;
}
