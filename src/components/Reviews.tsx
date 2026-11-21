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

export default function Reviews() {
  return (
    <section id="recenze" className="bg-tile text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-4">
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
            Co píšou zákazníci
          </h2>
          <p className="mt-6 flex items-center gap-2 text-lg">
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-brass text-brass" />
              ))}
            </span>
            <span>
              <strong className="font-semibold">4,9 z 5</strong>
            </span>
          </p>
          <p className="mt-1 text-white/75">87 recenzí na Google</p>
        </div>

        {/* Two columns of quotes with different lengths, so it doesn't look like a grid of boxes */}
        <ul className="gap-12 sm:columns-2 lg:col-span-8">
          {reviews.map((r) => (
            <li key={r.name} className="mb-10 break-inside-avoid border-t border-white/25 pt-6">
              <blockquote>
                <p className="text-lg leading-relaxed">„{r.text}“</p>
                <footer className="mt-4 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="block text-white/75">{r.job}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
