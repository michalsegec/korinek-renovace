import { ImageResponse } from "next/og";

// The picture shown when someone shares the site on WhatsApp, Facebook or Messenger.
// Next.js turns this code into a 1200×630 PNG.

export const alt = "Kořínek Renovace: koupelna hotová za tři týdny, cenu víte předem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "Koupelna hotová za tři týdny. Cenu víte předem.";
const small = "Kořínek renovace, rekonstrukce koupelen a bytů v Brně";

// Load our font with Czech letters (the built-in font can't show ř, ě, ů well)
async function loadFont(text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("Font for the social image could not be loaded");
  return (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const font = await loadFont(headline + small);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1f5247",
          color: "#f2f3f0",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: 1000 }}>{headline}</div>
        <div style={{ fontSize: 30, color: "#b08d57" }}>{small}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, weight: 700, style: "normal" }] },
  );
}
