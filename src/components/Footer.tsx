import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl">Kořínek</span>
              <span className="text-sm text-white/70">renovace</span>
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-white/70">
              Rekonstrukce koupelen a bytů v Brně a okolí. Pevná cena, jeden tým, záruka 5 let.
            </p>
          </div>

          <nav aria-label="Odkazy v patičce" className="md:col-span-3">
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/85 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="space-y-2.5 not-italic md:col-span-4">
            <a href={site.phoneHref} className="block font-semibold hover:underline">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block text-white/85 hover:underline">
              {site.email}
            </a>
            <p className="text-white/70">{site.address}</p>
            <p className="text-white/70">{site.hours}</p>
          </address>
        </div>

        {/* Legal line: company name, IČO and the privacy links (required for a Czech business) */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl">
            © {year} {site.legalName}, IČO {site.ico}, {site.address}, {site.register}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/ochrana-osobnich-udaju" className="hover:text-white hover:underline">
                Ochrana osobních údajů
              </Link>
            </li>
            {site.analytics && (
              <li>
                <CookieSettingsButton />
              </li>
            )}
          </ul>
        </div>

        <p className="mt-6 text-xs text-white/70">
          Ukázkový web do portfolia. Firma, recenze a kontakty jsou smyšlené.
        </p>
      </div>
    </footer>
  );
}
