import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/lib/site";
import "./globals.css";

// One font family with a "width" axis: normal for text, wide for headings.
// "latin-ext" is needed for Czech letters (ě, š, č, ř, ž, ů).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const description =
  "Rekonstrukce koupelen a bytů v Brně a okolí. Pevná cena ve smlouvě, jeden tým od bourání po úklid a záruka 5 let na práci.";

// SEO: what Google and social networks (WhatsApp, Facebook) show about the site
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rekonstrukce koupelen a bytů Brno | Kořínek Renovace",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.name,
    title: "Koupelna hotová za tři týdny. Cenu víte předem.",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={archivo.variable}>
      <body>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
