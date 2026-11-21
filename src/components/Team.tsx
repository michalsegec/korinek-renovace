import Image from "next/image";

// "Who will come to your home" – people want names, not a faceless company.
// Demo photo: hands at work, no face, so we don't put a real stranger's face on a made-up person.
// For a real client: a real photo of the owner and team (ask them, phone photos are fine).
const team = [
  { name: "Petr Kořínek", role: "Majitel a stavbyvedoucí. Na prohlídky jezdí sám a je u každého předání." },
  { name: "Martin", role: "Obkladač, s Petrem pracuje od roku 2014." },
  { name: "Tomáš", role: "Instalatér a topenář, vodu a odpady dělá vždy on." },
  { name: "Elektrikář", role: "Smluvní, s revizní zprávou ke každé zakázce." },
];

const facts = [
  "Stálý tým, obklady nedáváme subdodavatelům",
  "Pojištění odpovědnosti do 5 milionů Kč",
  "Na stavbě jsme jen ve všední dny od 7:30 do 17:00",
];

export default function Team() {
  return (
    <section id="o-nas" className="border-t border-line bg-porcelain-deep/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <figure className="lg:col-span-5">
          <Image
            src="https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=900&q=75&auto=format"
            alt="Ruce obkladače pokládají bílý obklad na stěnu koupelny"
            width={720}
            height={900}
            sizes="(min-width: 1024px) 440px, 100vw"
            className="aspect-[4/3] w-full rounded-lg bg-porcelain-deep object-cover lg:aspect-[4/5]"
          />
          <figcaption className="mt-3 text-sm text-ink-soft">Petr při obkládání koupelny v Bystrci</figcaption>
        </figure>

        <div className="lg:col-span-7 lg:pt-4">
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">Kdo k vám přijde</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Žádní noví lidé každý týden. Firmu vede Petr Kořínek, obkladač s dvaceti lety praxe, a na
            vaší koupelně pracují pořád stejní tři řemeslníci.
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {team.map((person) => (
              <li key={person.name} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <span className="font-semibold">{person.name}</span>
                <span className="leading-relaxed text-ink-soft">{person.role}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-2.5">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tile" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
