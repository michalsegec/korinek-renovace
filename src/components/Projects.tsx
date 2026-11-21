import Image from "next/image";
import BeforeAfter from "@/components/BeforeAfter";

// Demo photos from Unsplash (free licence). A real client would give us their own photos.
const img = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format`;

const featured = {
  title: "Koupelna v cihlovém domě, Královo Pole",
  before: img("1630840450974-7c7ddad8bdfe", 1400),
  after: img("1696987007764-7f8b85dd3033", 1400),
  facts: [
    { label: "Plocha", value: "6,5 m²" },
    { label: "Hotovo za", value: "23 dní" },
    { label: "Cena", value: "312 000 Kč" },
  ],
  quote:
    "Báli jsme se, že se to protáhne na dva měsíce. Za tři týdny jsme se sprchovali v nové koupelně a cena seděla na korunu.",
  author: "Jana a Petr Dvořákovi",
};

const others = [
  {
    title: "Prosklený sprchový kout, Bystrc",
    src: img("1584622650111-993a426fbf0a"),
    alt: "Moderní koupelna s proskleným sprchovým koutem a umyvadlem se skříňkou",
    facts: "4,2 m², hotovo za 17 dní",
  },
  {
    title: "Sprchový kout místo vany, Kuřim",
    src: img("1629079447777-1e605162dc8d"),
    alt: "Bílá koupelna se sprchovým koutem bez vaničky a dvěma umyvadly",
    facts: "3,8 m², hotovo za 16 dní",
  },
  {
    title: "Byt 3+1 na klíč, Brno-střed",
    src: img("1620626011761-996317b8d101"),
    alt: "Světlá koupelna s volně stojící vanou v zrekonstruovaném bytě",
    facts: "78 m², hotovo za 9 týdnů",
  },
];

export default function Projects() {
  return (
    <section id="realizace" className="border-t border-line bg-porcelain-deep/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.1] font-medium tracking-[-0.015em] sm:text-5xl">
            Jak to vypadalo předtím a jak teď
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Posuňte jezdec na fotce. Všechny realizace jsou z posledních dvou let, z Brna a okolí.
          </p>
        </div>

        {/* Featured project with the before/after slider */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <BeforeAfter
              before={featured.before}
              after={featured.after}
              beforeAlt="Původní koupelna s modrým obkladem z 80. let"
              afterAlt="Nová koupelna s velkoformátovým obkladem a sprchovým koutem"
            />
          </div>

          <div className="flex flex-col lg:col-span-4">
            <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.01em] sm:text-[1.75rem]">
              {featured.title}
            </h3>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
              {featured.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm text-ink-soft">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <blockquote className="mt-6">
              <p className="text-lg leading-relaxed italic">„{featured.quote}“</p>
              <footer className="mt-3 text-sm text-ink-soft">{featured.author}</footer>
            </blockquote>
          </div>
        </div>

        {/* Other projects */}
        <ul className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <li key={p.title}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-porcelain-deep">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{p.facts}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
