import Image from "next/image";
import { Star } from "lucide-react";

// Facts that build trust. Shown as a quiet line, not as big "500+" number tiles.
const trust = [
  { strong: "4,9 z 5", text: "87 recenzí na Google" },
  { strong: "Od roku 2011", text: "v Brně" },
  { strong: "Záruka 5 let", text: "na práci" },
];

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-7 px-4 pt-4 pb-16 sm:px-6 sm:pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-24">
      {/* Left: the message */}
      <div className="lg:col-span-7 lg:pt-6">
        <h1 className="font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-6xl lg:text-[4.25rem]">
          Koupelna hotová za tři týdny. Cenu víte předem.
        </h1>

        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
          Rekonstruujeme koupelny a byty v Brně a okolí. Jeden tým od bourání po poslední
          silikon, pevná cena ve smlouvě a po sobě uklidíme. Umakartové jádro v paneláku
          zvládneme za čtyři týdny.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <a
            href="#kalkulacka"
            className="inline-flex items-center justify-center rounded-md bg-tile px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-tile-dark"
          >
            Spočítat cenu koupelny
          </a>
          <a
            href="#realizace"
            className="inline-flex items-center justify-center px-2 py-3 font-medium underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-tile"
          >
            Prohlédnout realizace
          </a>
        </div>

        <ul className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[0.95rem] sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {trust.map((item, i) => (
            <li key={item.strong} className="flex items-center gap-2 whitespace-nowrap">
              {i === 0 && (
                <Star size={16} aria-hidden="true" className="fill-brass text-brass" />
              )}
              <span>
                <strong className="font-semibold">{item.strong}</strong>{" "}
                <span className="text-ink-soft">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: the photo. On phones it goes FIRST (wide and short), so the first screen shows a real bathroom. */}
      <figure className="order-first lg:order-none lg:col-span-5">
        {/*
          Demo photo from Unsplash. For a real client: put their photo in /public/images
          and use src="/images/hero.jpg".
          "priority" = load this image first, because it's at the top of the page.
        */}
        <Image
          src="https://images.unsplash.com/photo-1600488999585-e4364713b90a?w=1000&q=75&auto=format"
          alt="Hotová koupelna se světlým obkladem, dřevěnou skříňkou pod umyvadlem a zrcadlem"
          width={800}
          height={1000}
          priority
          // On phones the photo is the first big thing, so keep the file small:
          // exact width (screen minus side padding) and a bit more compression.
          sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
          quality={60}
          className="aspect-[16/10] w-full rounded-lg bg-porcelain-deep object-cover lg:aspect-[4/5]"
        />
        <figcaption className="mt-3 hidden text-sm text-ink-soft lg:block">
          Koupelna v Žabovřeskách, hotovo za 19 dní
        </figcaption>
      </figure>
    </section>
  );
}
