import { Plus } from "lucide-react";
import { site } from "@/lib/site";

// FAQ uses <details> and <summary>: the browser opens and closes them by itself.
// No JavaScript needed, and it works with the keyboard and screen readers.
const faqs = [
  {
    q: "Musím být během rekonstrukce doma?",
    a: "Nemusíte. Stačí nám předat klíče. Každý večer vám pošleme fotku a krátkou zprávu, co jsme ten den udělali.",
  },
  {
    q: "Jak dlouho budeme bez koupelny?",
    a: "Podle rozsahu 3 až 5 týdnů. V paneláku umíme na většinu té doby zapojit provizorní WC.",
  },
  {
    q: "Co když se během práce objeví problém, třeba shnilé trubky?",
    a: "Ukážeme vám ho, nafotíme a řekneme cenu dřív, než cokoli uděláme. Bez vašeho souhlasu nic nepřidáme.",
  },
  {
    q: "Kdo vyřídí souhlas správy domu nebo SVJ?",
    a: "My. Připravíme žádost i rozpis hlučných prací a sousedům dáme na nástěnku oznámení s naším telefonem.",
  },
  {
    q: "Jak se platí?",
    a: "30 % zálohy na materiál před začátkem, 40 % v polovině prací a zbytek až po předání, když je všechno v pořádku.",
  },
  {
    q: "Jakou dáváte záruku?",
    a: "5 let na naši práci, na materiál podle výrobce (obvykle 2 roky). Když něco nefunguje, přijedeme do 48 hodin.",
  },
  {
    q: "Jezdíte i mimo Brno?",
    a: "Ano, do 40 km od Brna: například Kuřim, Šlapanice, Modřice nebo Rosice.",
  },
];

export default function Faq() {
  return (
    <section id="otazky" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-4">
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
            Časté otázky
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Nenašli jste odpověď? Zavolejte na{" "}
            <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-tile">
              {site.phone}
            </a>
            , {site.hoursLong}.
          </p>
        </div>

        <div className="lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-tile transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
