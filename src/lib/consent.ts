// Cookie consent, kept simple.
// Czech law (since 2022): no analytics or marketing cookies until the visitor says YES.
// Saying NO must be as easy as saying yes, and the site must work either way.

export type Consent = "granted" | "denied";

const KEY = "cookie-consent";
export const OPEN_SETTINGS_EVENT = "cookie-settings";

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // private mode or blocked storage: just ask again
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // nothing to do: the banner will simply show again next time
  }
}

// Loads Google Analytics ONLY after consent, and only if an ID is set in .env.local
export function loadAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
}
