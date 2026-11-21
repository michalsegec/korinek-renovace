// "How we work". These ARE steps in order, so numbers make sense here
// (don't use 01/02/03 on things that aren't a sequence).
const steps = [
  {
    title: "Prohlídka zdarma",
    text: "Přijedeme do 5 pracovních dnů, všechno změříme a probereme, jak si novou koupelnu představujete.",
    time: "asi 1 hodina",
  },
  {
    title: "Pevná cena",
    text: "Pošleme rozpočet rozepsaný po položkách. Cena ve smlouvě se už nezmění, pokud sami nepřidáte práci.",
    time: "do 3 dnů",
  },
  {
    title: "Obklady a termín",
    text: "Zajedeme spolu do vzorkovny v Brně a domluvíme den, kdy začneme. Obvykle za 4 až 8 týdnů.",
    time: "1 odpoledne",
  },
  {
    title: "Práce a předání",
    text: "Každý večer vám pošleme fotku, jak jsme pokročili. Na konci uklidíme, vše s vámi projdeme a předáme záruční list.",
    time: "3–5 týdnů",
  },
];

export default function Process() {
  return (
    <section id="postup" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
          Od prvního telefonátu po klíče od hotové koupelny
        </h2>

        <ol className="mt-12 grid gap-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-tile py-6 sm:pr-6 lg:pr-0">
              <span aria-hidden="true" className="font-display text-5xl text-tile">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
              <p className="mt-4 text-sm font-semibold">{step.time}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
