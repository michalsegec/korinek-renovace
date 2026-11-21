"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

// Before/after slider.
// Trick: an invisible <input type="range"> covers the whole photo.
// That gives us mouse drag, touch and keyboard (arrow keys) for free, and screen readers understand it.
export default function BeforeAfter({ before, after, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50); // where the divider is, in % from the left

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-porcelain-deep select-none">
      {/* "After" photo: the full picture underneath */}
      <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />

      {/* "Before" photo on top, cut off at the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-md bg-ink/80 px-2.5 py-1 text-sm font-medium text-white">
        Před
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-md bg-ink/80 px-2.5 py-1 text-sm font-medium text-white">
        Po
      </span>

      {/* Divider line with a handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          <ChevronsLeftRight size={22} aria-hidden="true" />
        </div>
      </div>

      {/* The invisible control on top of everything */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Porovnání před a po: posuňte doleva nebo doprava"
        aria-valuetext={`${pos} % fotky před rekonstrukcí`}
        // touch-pan-y: on phones, swiping up/down still scrolls the page
        className="peer absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
      {/* Focus ring for keyboard users (the input itself is invisible) */}
      <div className="pointer-events-none absolute inset-0 rounded-lg peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-tile" />
    </div>
  );
}
