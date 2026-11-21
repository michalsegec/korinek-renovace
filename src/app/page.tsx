import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { site } from "@/lib/site";

// Structured data: tells Google exactly what this business is, where, and when it's open.
// It can show up in search results and on Google Maps.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.legalName,
  url: site.url,
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Křenová 52",
    postalCode: "602 00",
    addressLocality: "Brno",
    addressCountry: "CZ",
  },
  areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.19, longitude: 16.61 }, geoRadius: 40000 },
  openingHours: "Mo-Fr 07:00-17:00",
  priceRange: "$$",
};

// Header, footer and cookie banner are in layout.tsx, so every page has them.
export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />
      <Calculator />
      <Projects />
      <Process />
      <Team />
      <Reviews />
      <Faq />
      <Contact />
    </main>
  );
}
