"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { loadAnalytics, OPEN_SETTINGS_EVENT, readConsent, saveConsent, type Consent } from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!site.analytics) return;
    const saved = readConsent();
    if (saved === "granted") loadAnalytics();
    if (saved === null) setOpen(true); // first visit: ask

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    saveConsent(value);
    if (value === "granted") loadAnalytics();
    // Note: if someone changes YES to NO, analytics stops after the next page load
    setOpen(false);
  };

  if (!open) return null;

  // A small bar at the bottom. It does NOT block the page (blocking is not allowed).
  return (
    <div
      role="region"
      aria-label="Souhlas s cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-lg border border-line bg-white p-5 shadow-[0_8px_30px_rgba(28,36,34,0.18)] sm:inset-x-6 sm:p-6"
    >
      <p className="font-semibold">Můžeme měřit návštěvnost?</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        Anonymní statistiky nám ukážou, které stránky lidé čtou a kde se web dá zlepšit. Bez vašeho
        souhlasu nic neměříme a web funguje stejně.{" "}
        <a href="/ochrana-osobnich-udaju#cookies" className="underline underline-offset-2 hover:text-ink">
          Více o cookies
        </a>
      </p>
      {/* Both buttons look the same on purpose: refusing must be as easy as agreeing */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="cursor-pointer rounded-md border border-ink px-4 py-3 font-semibold transition-colors hover:bg-porcelain-deep"
        >
          Odmítnout
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="cursor-pointer rounded-md border border-ink px-4 py-3 font-semibold transition-colors hover:bg-porcelain-deep"
        >
          Povolit měření
        </button>
      </div>
    </div>
  );
}
