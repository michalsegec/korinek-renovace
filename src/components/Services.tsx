
// The services live in a list (array). To add a service, add one more { ... } block.
// Each one has real details (how long, from what price), not vague marketing words.
const services = [
  {
    title: "Koupelna na klíč",
    text: "Bourání, nové rozvody vody a elektřiny, hydroizolace, obklady, sanita a úklid. Vy si vyberete obklady, o zbytek se postaráme.",
    time: "3–4 týdny",
    price: "od 165 000 Kč",
    popular: true,
  },
  {
    title: "Umakartové jádro v paneláku",
    text: "Vybouráme staré jádro a postavíme zděnou koupelnu a WC. Hlučné práce domluvíme se správou domu a sousedům dáme vědět předem.",
    time: "4–5 týdnů",
    price: "od 210 000 Kč",
  },
  {
    title: "Byt na klíč",
    text: "Koupelna, kuchyň, podlahy, elektřina a malování v jednom termínu. Jeden stavbyvedoucí, jeden rozpočet, jedno předání.",
    time: "8–12 týdnů",
    price: "od 6 900 Kč/m²",
  },
  {
    title: "Menší úpravy",
    text: "Výměna vany za sprchový kout, nový obklad v kuchyni nebo oprava podlahy. I malou práci uděláme se stejnou péčí.",
    time: "1–5 dní",
    price: "od 18 000 Kč",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="border-t border-line bg-porcelain-deep/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        {/* Left: heading. On desktop it stays in place while the list scrolls. */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-4xl leading-[1.1] font-medium tracking-[-0.015em] sm:text-5xl">
              Děláme hlavně koupelny. A děláme je pořádně.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Za 14 let jsme v Brně předali přes 400 koupelen. Bereme i celé byty a umakartová
              jádra, ale vždy jen tolik zakázek, abychom stíhali termíny.
            </p>
          </div>
        </div>

        {/* Right: the list of services, separated by thin lines (not cards) */}
        <div className="lg:col-span-8">
          <ul className="border-t border-ink/80">
            {services.map((s) => (
              <li
                key={s.title}
                className="grid gap-4 border-b border-line py-7 sm:grid-cols-[1fr_11rem] sm:gap-8 sm:py-9"
              >
                <div>
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-2xl font-medium tracking-[-0.01em] sm:text-[1.75rem]">
                    {s.title}
                    {s.popular && (
                      <span className="rounded-md bg-tile/10 px-2 py-0.5 font-sans text-xs font-semibold text-tile-dark">
                        Nejčastější
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{s.text}</p>
                </div>

                {/* Time and price: the two things every customer asks first */}
                <dl className="flex gap-8 text-[0.95rem] sm:flex-col sm:gap-3 sm:pt-1.5 sm:text-right">
                  <div>
                    <dt className="text-ink-soft">Délka</dt>
                    <dd className="mt-0.5 text-base font-semibold">{s.time}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-soft">Cena</dt>
                    <dd className="mt-0.5 text-base font-semibold">{s.price}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md leading-relaxed text-ink">
              Ceny zahrnují práci a stavební materiál. Obklady a sanitu si vybíráte sami, rádi
              s vámi zajedeme do vzorkovny.
            </p>
            <a
              href="#kalkulacka"
              className="shrink-0 font-medium text-tile-dark underline decoration-tile/30 decoration-2 underline-offset-[6px] transition-colors hover:decoration-tile"
            >
              Spočítat přesnější cenu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
