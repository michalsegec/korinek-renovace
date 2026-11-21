import { Star } from "lucide-react";

// Reviews sound real when they are specific and not all perfect.
// (Fictional company, so these are written for the demo.)
const reviews = [
  {
    text: "Koupelnu v paneláku jsme měli hotovou za 25 dní, jak slíbili. Každý večer přišla fotka, takže jsme nemuseli jezdit kontrolovat. Sousedé si nestěžovali, protože o hlučných dnech věděli dopředu.",
    name: "Markéta Svobodová",
    job: "Umakartové jádro, Líšeň",
  },
  {
    text: "Při bourání našli shnilou odpadní trubku. Pan Kořínek nám ji ukázal, řekl cenu a teprve pak ji vyměnil. Konečná faktura byla přesně podle smlouvy plus ta jedna trubka.",
    name: "Tomáš Hrubý",
    job: "Koupelna, Královo Pole",
  },
  {
    text: "Jediné, co bych vytkla: jeden den se nepracovalo, protože nepřišla dodávka obkladů. Dali nám ale vědět ráno a termín předání stejně dodrželi.",
    name: "Ivana Malá",
    job: "Koupelna a WC, Kuřim",
  },
  {
    text: "Oceňuji, že s námi jeli do vzorkovny a rozmluvili nám lesklou dlažbu na podlahu. Po roce vidím, že měli pravdu.",
    name: "Lukáš Novotný",
    job: "Byt na klíč, Brno-střed",
  },
];

// The "rotten pipe" review goes big: it shows honesty about extra costs, the #1 fear
const featured = reviews[1];
const rest = reviews.filter((r) => r !== featured);

export default function Reviews() {
  return (
    <section id="recenze" className="bg-tile text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        {/* Heading and rating on one line */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
            Co píšou zákazníci
          </h2>
          <p className="flex items-center gap-2 text-lg">
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-brass text-brass" />
              ))}
            </span>
            <span>
              <strong className="font-semibold">4,9 z 5</strong>
              <span className="text-white/80">, 87 recenzí na Google</span>
            </span>
          </p>
        </div>

        {/* One big quote: the review that proves honesty best */}
        <blockquote className="mt-12 max-w-4xl border-t border-white/25 pt-8">
          <p className="font-display text-2xl leading-snug sm:text-[2rem]">„{featured.text}“</p>
          <footer className="mt-6">
            <span className="font-semibold">{featured.name}</span>
            <span className="text-white/80">, {featured.job}</span>
          </footer>
        </blockquote>

        {/* The rest: smaller, in a row, separated by lines (not boxes) */}
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {rest.map((r) => (
            <li key={r.name} className="border-t border-white/25 pt-6">
              <blockquote>
                <p className="leading-relaxed">„{r.text}“</p>
                <footer className="mt-4 text-[0.95rem]">
                  <span className="font-semibold">{r.name}</span>
                  <span className="block text-white/80">{r.job}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
