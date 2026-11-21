import Link from "next/link";
import { site } from "@/lib/site";

// Shown for any address that doesn't exist (error 404).
// It says what happened and gives a way forward, instead of a dead end.
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:py-32">
      <p className="font-display text-7xl text-tile">404</p>
      <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
        Tahle stránka neexistuje
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        Možná je v odkazu překlep, nebo jsme stránku přesunuli. Zkuste úvodní stránku, nebo nám rovnou
        zavolejte na {site.phone}.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex rounded-md bg-tile px-6 py-4 font-semibold text-white transition-colors hover:bg-tile-dark"
      >
        Zpět na úvodní stránku
      </Link>
    </main>
  );
}
