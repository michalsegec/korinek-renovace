import type { Metadata } from "next";
import { site } from "@/lib/site";

// This file's folder name becomes the address: /ochrana-osobnich-udaju
// NOTE: a sensible template for a small Czech firm. For a real client, a lawyer should check it.

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | Kořínek Renovace",
  description: "Jaké osobní údaje zpracováváme, proč, jak dlouho a jaká máte práva.",
  robots: { index: false }, // legal pages don't need to show up in Google
};

const h2 = "mt-12 font-display text-2xl tracking-[-0.01em]";
const p = "mt-4 leading-relaxed text-ink-soft";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
        Ochrana osobních údajů
      </h1>
      <p className={p}>Platné od 1. listopadu 2026. Píšeme to co nejjednodušeji.</p>

      <h2 className={h2}>Kdo vaše údaje zpracovává</h2>
      <p className={p}>
        {site.legalName}, IČO {site.ico}, se sídlem {site.address}, {site.register} (dále „my“). Napsat nám můžete na{" "}
        <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-2">
          {site.email}
        </a>{" "}
        nebo zavolat na {site.phone}.
      </p>

      <h2 className={h2}>Jaké údaje a proč</h2>
      <p className={p}>
        Když nám pošlete poptávku přes formulář, dostaneme vaše jméno, telefon, případně e-mail a to,
        co napíšete do zprávy. Použijeme je jen k tomu, abychom vám odpověděli, domluvili prohlídku a
        připravili nabídku.
      </p>
      <p className={p}>
        Právní důvod: jednání o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b) obecného nařízení o
        ochraně osobních údajů, GDPR). K tomu nepotřebujeme váš zvláštní souhlas.
      </p>

      <h2 className={h2}>Jak dlouho je máme</h2>
      <p className={p}>
        Pokud smlouvu neuzavřeme, poptávku smažeme do 12 měsíců. Pokud ji uzavřeme, údaje ze smlouvy a
        faktur musíme ze zákona uchovávat 10 let.
      </p>

      <h2 className={h2}>Komu je předáváme</h2>
      <p className={p}>
        Nikomu je neprodáváme. Pracují s nimi jen služby, které potřebujeme k provozu: poskytovatel
        hostingu webu a služba, která nám doručuje e-maily z formuláře. Obě zpracovávají údaje jen
        podle našich pokynů.
      </p>

      <h2 className={h2}>Vaše práva</h2>
      <p className={p}>
        Můžete nás požádat o přehled údajů, které o vás máme, o jejich opravu nebo smazání, omezení
        zpracování nebo vznést námitku. Stačí napsat na e-mail výše, odpovíme do 30 dnů. Pokud s námi
        nebudete spokojeni, můžete podat stížnost u Úřadu pro ochranu osobních údajů (uoou.gov.cz).
      </p>

      <h2 id="cookies" className={`${h2} scroll-mt-24`}>
        Cookies
      </h2>
      <p className={p}>
        Web si ve vašem prohlížeči pamatuje jen to, jak jste se rozhodli v liště o cookies. To je nutné
        pro jeho fungování a souhlas k tomu nepotřebujeme.
      </p>
      <p className={p}>
        Měření návštěvnosti (Google Analytics) spustíme jen tehdy, když ho v liště povolíte. Statistiky
        jsou anonymní a slouží k tomu, abychom viděli, co na webu lidé hledají. Souhlas můžete kdykoli
        změnit odkazem „Nastavení cookies“ v patičce.
      </p>
    </main>
  );
}
