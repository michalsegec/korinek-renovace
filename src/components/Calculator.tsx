"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { CalcEventDetail } from "@/components/ContactForm";
import {
  AREA_MAX,
  AREA_MIN,
  calculate,
  extras,
  formatCZK,
  standards,
  weeksWord,
  type Building,
  type Extra,
  type Standard,
} from "@/lib/calculator";

// Makes a number "count" smoothly to its new value (the one special animation of this section).
// People who turned off motion in their system get the new number straight away.
function useCountUp(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduce || from === target) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // fast at first, then gently slows down
      const current = Math.round(from + (target - from) * eased);
      fromRef.current = current;
      setValue(current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

// One choice tile (a radio button that looks like a box)
function Choice({
  name,
  checked,
  onChange,
  title,
  note,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note?: string;
}) {
  return (
    <label
      className={`relative flex cursor-pointer flex-col rounded-lg border bg-porcelain p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tile ${
        checked ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line hover:border-ink-soft"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="font-semibold">{title}</span>
      {note && <span className="mt-1 text-[0.95rem] leading-snug text-ink-soft">{note}</span>}
    </label>
  );
}

export default function Calculator() {
  const [area, setArea] = useState(5);
  const [building, setBuilding] = useState<Building>("cihla");
  const [standard, setStandard] = useState<Standard>("stredni");
  const [chosen, setChosen] = useState<Extra[]>(["walkin"]);
  const [withTiles, setWithTiles] = useState(true);

  const result = calculate({ area, building, standard, extras: chosen, withTiles });
  const low = useCountUp(result.low);
  const high = useCountUp(result.high);

  const toggleExtra = (e: Extra) =>
    setChosen((list) => (list.includes(e) ? list.filter((x) => x !== e) : [...list, e]));

  // Send the calculation to the contact form, so the visitor doesn't have to type it again
  const sendToForm = () => {
    const extraNames = chosen.map((e) => extras[e].label.toLowerCase()).join(", ");
    const detail: CalcEventDetail = {
      project: building === "panel" ? "Umakartové jádro" : "Koupelna",
      message:
        `Kalkulace z webu: koupelna ${area.toLocaleString("cs-CZ")} m², ` +
        `${building === "panel" ? "panelák s umakartovým jádrem" : "cihlový byt nebo dům"}, ` +
        `standard ${standards[standard].label.toLowerCase()}` +
        (extraNames ? `, navíc: ${extraNames}` : "") +
        `, obklady a sanita ${withTiles ? "od vás" : "vlastní"}. ` +
        `Orientačně ${formatCZK(result.low)} až ${formatCZK(result.high)}.`,
    };
    window.dispatchEvent(new CustomEvent("kalkulace", { detail }));
  };

  const fieldset = "border-t border-line pt-7 pb-8";
  const legend = "float-left mb-4 w-full font-display text-xl font-medium";

  return (
    <section id="kalkulacka" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.1] font-medium tracking-[-0.015em] sm:text-5xl">
            Kolik bude stát vaše koupelna?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Orientační cenu máte za minutu. Přesnou cenu vám řekneme po bezplatné prohlídce
            a ta pak platí, i když se během práce něco zdraží.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: the questions */}
          <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
            {/* 1. Size */}
            <fieldset className={fieldset}>
              <legend className={legend}>Velikost koupelny</legend>
              <div className="clear-both flex items-center gap-5">
                <label htmlFor="area" className="sr-only">
                  Plocha podlahy v metrech čtverečních
                </label>
                <input
                  id="area"
                  type="range"
                  min={AREA_MIN}
                  max={AREA_MAX}
                  step={0.5}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  aria-valuetext={`${area} metrů čtverečních`}
                  className="h-2 flex-1 cursor-pointer accent-tile"
                />
                <output htmlFor="area" className="w-20 text-right text-2xl font-semibold tabular-nums">
                  {area.toLocaleString("cs-CZ")} m²
                </output>
              </div>
              <p className="mt-2 text-[0.95rem] text-ink-soft">
                Plocha podlahy. Běžná koupelna v paneláku má 3–4 m².
              </p>
            </fieldset>

            {/* 2. Building type */}
            <fieldset className={fieldset}>
              <legend className={legend}>Kde koupelna je</legend>
              <div className="clear-both grid gap-3 sm:grid-cols-2">
                <Choice
                  name="building"
                  checked={building === "cihla"}
                  onChange={() => setBuilding("cihla")}
                  title="Cihlový byt nebo dům"
                  note="Stávající zděná koupelna"
                />
                <Choice
                  name="building"
                  checked={building === "panel"}
                  onChange={() => setBuilding("panel")}
                  title="Panelák s umakartovým jádrem"
                  note="Jádro vybouráme a postavíme zděné"
                />
              </div>
            </fieldset>

            {/* 3. Standard */}
            <fieldset className={fieldset}>
              <legend className={legend}>Standard vybavení</legend>
              <div className="clear-both grid gap-3 sm:grid-cols-3">
                {(Object.keys(standards) as Standard[]).map((key) => (
                  <Choice
                    key={key}
                    name="standard"
                    checked={standard === key}
                    onChange={() => setStandard(key)}
                    title={standards[key].label}
                    note={standards[key].note}
                  />
                ))}
              </div>
            </fieldset>

            {/* 4. Extras */}
            <fieldset className={fieldset}>
              <legend className={legend}>Něco navíc?</legend>
              <div className="clear-both grid gap-3 sm:grid-cols-2">
                {(Object.keys(extras) as Extra[]).map((key) => {
                  const on = chosen.includes(key);
                  return (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-porcelain p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tile ${
                        on ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line hover:border-ink-soft"
                      }`}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggleExtra(key)} className="sr-only" />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                          on ? "border-ink bg-ink text-porcelain" : "border-ink-soft"
                        }`}
                      >
                        {on && <Check size={14} strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="block font-semibold">{extras[key].label}</span>
                        <span className="text-[0.95rem] text-ink-soft">+ {extras[key].priceNote}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* 5. Tiles and sanitary ware */}
            <fieldset className={fieldset}>
              <legend className={legend}>Obklady a sanita</legend>
              <div className="clear-both grid gap-3 sm:grid-cols-2">
                <Choice
                  name="tiles"
                  checked={withTiles}
                  onChange={() => setWithTiles(true)}
                  title="Od nás"
                  note="Vybereme je spolu ve vzorkovně, cena je v kalkulaci"
                />
                <Choice
                  name="tiles"
                  checked={!withTiles}
                  onChange={() => setWithTiles(false)}
                  title="Vlastní"
                  note="Koupíte si je sami, počítáme jen práci a stavební materiál"
                />
              </div>
            </fieldset>

            {/* Phone only: the price stays at the bottom of the screen while you answer the questions */}
            <div
              aria-hidden="true"
              className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t border-line bg-porcelain px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden"
            >
              <span className="text-sm text-ink-soft">Orientačně</span>
              <span className="font-semibold tabular-nums">
                {formatCZK(low)} – {formatCZK(high)}
              </span>
            </div>
          </form>

          {/* Right: the result. On desktop it stays visible while you scroll the questions. */}
          <aside className="lg:col-span-5">
            <div className="rounded-lg bg-tile p-6 text-white sm:p-8 lg:sticky lg:top-28">
              <p className="text-white/75">Orientační cena</p>
              <p className="mt-2 font-display text-[2.1rem] leading-tight font-medium tracking-[-0.015em] tabular-nums sm:text-[2.5rem]">
                {formatCZK(low)}
                <span className="block text-white/75">až {formatCZK(high)}</span>
              </p>
              {/* Screen readers hear only the final price, not every animation step */}
              <p className="sr-only" aria-live="polite">
                Orientační cena {formatCZK(result.low)} až {formatCZK(result.high)}, délka{" "}
                {result.weeksMin} až {result.weeksMax} {weeksWord(result.weeksMax)}.
              </p>

              <dl className="mt-7 space-y-3 border-t border-white/20 pt-6 text-[0.95rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/75">Práce a stavební materiál</dt>
                  <dd className="tabular-nums">{formatCZK(result.work)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/75">Obklady a sanita</dt>
                  <dd className="tabular-nums">{result.tiles ? formatCZK(result.tiles) : "kupujete sami"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/75">Doplňky</dt>
                  <dd className="tabular-nums">{formatCZK(result.extrasTotal)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/20 pt-3">
                  <dt className="text-white/75">Délka prací</dt>
                  <dd className="font-semibold">
                    {result.weeksMin}–{result.weeksMax} {weeksWord(result.weeksMax)}
                  </dd>
                </div>
              </dl>

              <a
                href="#kontakt"
                onClick={sendToForm}
                className="mt-8 flex items-center justify-center rounded-md bg-brass px-6 py-4 font-semibold text-ink transition-colors hover:bg-porcelain"
              >
                Domluvit bezplatnou prohlídku
              </a>
              <p className="mt-4 leading-relaxed text-white/90">
                Přijedeme, změříme a do 3 dnů pošleme pevnou cenu. Nic za to neplatíte.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
