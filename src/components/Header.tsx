"use client"; // this component reacts to clicks, so it runs in the browser

import { useEffect, useState } from "react";
import Link from "next/link"; // Next.js link: switches pages without a full reload
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false); // is the mobile menu open?
  const [scrolled, setScrolled] = useState(false); // has the user scrolled down?

  // Add a border under the header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-porcelain transition-[border-color] duration-200 border-b ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem]">
        {/* Logo: a simple wordmark, no generic icon */}
        {/* No aria-label here: the visible text is already a good name for screen readers */}
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold tracking-[-0.015em]">Kořínek</span>
          <span className="text-sm text-ink-soft">renovace</span>
        </Link>

        {/* Desktop menu */}
        <nav aria-label="Hlavní menu" className="hidden lg:block">
          <ul className="flex gap-8 text-[0.95rem]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink-soft transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Phone: always visible, because local customers like to call */}
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-md bg-tile px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-tile-dark sm:px-4"
          >
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            <span className="hidden sm:inline">{site.phone}</span>
            <span className="sm:hidden">Zavolat</span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobilní menu" className="border-t border-line lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3.5 text-lg last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
