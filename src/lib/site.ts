// All company details in one place.
// Need to change the phone number? Change it here, and it updates everywhere.
// NOTE: fictional company for a portfolio demo.

export const site = {
  // The live address of the site. Vercel tells us its own address automatically;
  // set NEXT_PUBLIC_SITE_URL only when the site gets its own domain (e.g. korinek-renovace.cz).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  name: "Kořínek Renovace",
  phone: "+420 777 123 456",
  phoneHref: "tel:+420777123456",
  email: "poptavky@korinek-renovace.cz",
  city: "Brno",
  address: "Křenová 52, 602 00 Brno",
  legalName: "Kořínek Renovace s.r.o.",
  ico: "08734561", // made up on purpose: it fails the IČO checksum, so it can't belong to a real company
  // Show the cookie banner? Only needed when the site measures visits (analytics).
  // The analytics script itself loads only if NEXT_PUBLIC_GA_ID is set AND the visitor agrees.
  analytics: true,
  hours: "Po–Pá 7:00–17:00",
  hoursLong: "ve všední dny od 7 do 17 hodin",
};

export const navLinks = [
  { href: "/#sluzby", label: "Služby" },
  { href: "/#kalkulacka", label: "Kalkulačka" },
  { href: "/#realizace", label: "Realizace" },
  { href: "/#postup", label: "Jak pracujeme" },
  { href: "/#kontakt", label: "Kontakt" },
];
