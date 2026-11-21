// Price logic for the bathroom calculator.
// It's kept apart from the design on purpose: this file only does maths,
// so it's easy to read, test and change (e.g. when prices go up).
// Prices are fictional but realistic for Brno in 2026.

export type Building = "cihla" | "panel";
export type Standard = "zakladni" | "stredni" | "premiovy";
export type Extra = "topeni" | "walkin" | "wc" | "nabytek";

export type CalcInput = {
  area: number; // floor area in m²
  building: Building;
  standard: Standard;
  extras: Extra[];
  withTiles: boolean; // do we also supply tiles and sanitary ware?
};

export const AREA_MIN = 3;
export const AREA_MAX = 15;

const BASE = 120_000; // demolition, disposal, new pipes and wiring, waterproofing, cleaning
const PANEL_CORE = 45_000; // removing the old umakart core and building brick walls

export const standards: Record<Standard, { label: string; note: string; perM2: number; tilesPerM2: number; sanitary: number }> = {
  zakladni: { label: "Základní", note: "Spolehlivé materiály, jednoduchý a čistý vzhled", perM2: 15_000, tilesPerM2: 6_000, sanitary: 25_000 },
  stredni: { label: "Střední", note: "Velkoformátové obklady, podomítková baterie", perM2: 19_000, tilesPerM2: 9_000, sanitary: 45_000 },
  premiovy: { label: "Prémiový", note: "Kámen nebo velký formát, designová sanita, LED niky", perM2: 25_000, tilesPerM2: 14_000, sanitary: 80_000 },
};

export const extras: Record<Extra, { label: string; price: (area: number) => number; priceNote: string }> = {
  topeni: { label: "Podlahové topení", price: (a) => 8_000 + a * 2_500, priceNote: "8 000 Kč + 2 500 Kč/m²" },
  walkin: { label: "Sprchový kout bez vaničky", price: () => 14_000, priceNote: "14 000 Kč" },
  wc: { label: "Závěsné WC", price: () => 9_500, priceNote: "9 500 Kč" },
  nabytek: { label: "Nábytek na míru", price: () => 28_000, priceNote: "28 000 Kč" },
};

export type CalcResult = {
  work: number; // work + building material
  tiles: number; // tiles and sanitary ware (0 if the customer buys them)
  extrasTotal: number;
  total: number;
  low: number; // price range shown to the customer
  high: number;
  weeksMin: number;
  weeksMax: number;
};

const round1000 = (n: number) => Math.round(n / 1000) * 1000;

export function calculate(input: CalcInput): CalcResult {
  const area = Math.min(AREA_MAX, Math.max(AREA_MIN, input.area));
  const s = standards[input.standard];

  const work = BASE + area * s.perM2 + (input.building === "panel" ? PANEL_CORE : 0);
  const tiles = input.withTiles ? area * s.tilesPerM2 + s.sanitary : 0;
  const extrasTotal = input.extras.reduce((sum, e) => sum + extras[e].price(area), 0);
  const total = work + tiles + extrasTotal;

  // Show a range, not one exact number: the real price is set after a visit.
  const low = round1000(total * 0.92);
  const high = round1000(total * 1.08);

  const weeksMin = 3 + (input.building === "panel" ? 1 : 0) + (area > 8 ? 1 : 0);
  return { work, tiles, extrasTotal, total, low, high, weeksMin, weeksMax: weeksMin + 1 };
}

// Czech plural: 2–4 "týdny", 5 and more "týdnů"
export const weeksWord = (n: number) => (n >= 5 ? "týdnů" : "týdny");

export const formatCZK = (n: number) => new Intl.NumberFormat("cs-CZ").format(n) + " Kč";
