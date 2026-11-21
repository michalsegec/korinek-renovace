"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

// Lets the visitor change their cookie choice later (the law says it must be as easy as giving it)
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="cursor-pointer hover:text-white hover:underline"
    >
      Nastavení cookies
    </button>
  );
}
