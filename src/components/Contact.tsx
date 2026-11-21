import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

// No embedded Google map on purpose: it sets cookies before the visitor agrees.
// A plain link to Mapy.cz does the same job.
const mapLink = `https://mapy.cz/zakladni?q=${encodeURIComponent(site.address)}`;

export default function Contact() {
  const details = [
    { icon: Phone, label: site.phone, href: site.phoneHref },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: site.address, href: mapLink },
    { icon: Clock, label: site.hours },
  ];

  return (
    <section id="kontakt" className="border-t border-line bg-porcelain-deep/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] sm:text-5xl">
            Domluvme si prohlídku
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Napište nám pár slov o koupelně, nebo rovnou zavolejte. Prohlídka i rozpočet jsou zdarma
            a nezávazné.
          </p>

          <ul className="mt-10 space-y-4">
            {details.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon size={20} aria-hidden="true" className="shrink-0 text-tile" />
                {href ? (
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-tile"
                  >
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
