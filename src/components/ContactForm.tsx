"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CircleCheck } from "lucide-react";
import { sendInquiry, type InquiryState } from "@/app/actions";

const projectTypes = ["Koupelna", "Umakartové jádro", "Byt na klíč", "Menší úprava", "Jiné"];

// The calculator sends its result here with this event (see Calculator.tsx)
export type CalcEventDetail = { project: string; message: string };

const input =
  "mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-soft/70 focus:border-tile focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-tile";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(sendInquiry, { status: "idle" });
  const [project, setProject] = useState("Koupelna");
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Remember when the form appeared (for the spam check on the server)
  useEffect(() => setStartedAt(String(Date.now())), []);

  // Fill in the form when someone clicks the button in the calculator
  useEffect(() => {
    const onCalc = (e: Event) => {
      const detail = (e as CustomEvent<CalcEventDetail>).detail;
      setProject(detail.project);
      setMessage(detail.message);
    };
    window.addEventListener("kalkulace", onCalc);
    return () => window.removeEventListener("kalkulace", onCalc);
  }, []);

  // If sending failed, move focus to the error message so everyone notices it
  useEffect(() => {
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-line bg-white p-8">
        <CircleCheck size={32} className="text-tile" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl">Děkujeme{state.name ? `, ${state.name}` : ""}.</p>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Poptávka dorazila. Ozveme se do 24 hodin, většinou ještě ten samý den, a domluvíme termín prohlídky.
        </p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const border = (field: keyof typeof err) => (err[field] ? "border-red-700" : "border-line");

  return (
    <form action={formAction} noValidate className="rounded-lg border border-line bg-white p-6 sm:p-8">
      {state.status === "error" && state.message && (
        <p ref={errorRef} tabIndex={-1} role="alert" className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {state.message}
        </p>
      )}

      {/* Spam traps: a hidden field only bots fill in, and the time the form appeared */}
      <div className="hidden" aria-hidden="true">
        <label>
          Web <input type="text" name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="t" value={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-medium">Jméno</label>
          <input id="name" name="name" defaultValue={state.values?.name} required autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} className={`${input} ${border("name")}`} />
          {err.name && <p id="name-error" className="mt-1.5 text-sm text-red-800">{err.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="font-medium">Telefon</label>
          <input id="phone" name="phone" type="tel" defaultValue={state.values?.phone} required autoComplete="tel" inputMode="tel" placeholder="777 123 456" aria-invalid={!!err.phone} aria-describedby={err.phone ? "phone-error" : undefined} className={`${input} ${border("phone")}`} />
          {err.phone && <p id="phone-error" className="mt-1.5 text-sm text-red-800">{err.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            E-mail <span className="font-normal text-ink-soft">(nepovinné)</span>
          </label>
          <input id="email" name="email" type="email" defaultValue={state.values?.email} autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} className={`${input} ${border("email")}`} />
          {err.email && <p id="email-error" className="mt-1.5 text-sm text-red-800">{err.email}</p>}
        </div>
        <div>
          <label htmlFor="project" className="font-medium">Co plánujete</label>
          <select id="project" name="project" value={project} onChange={(e) => setProject(e.target.value)} className={`${input} border-line`}>
            {projectTypes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="font-medium">
            Zpráva <span className="font-normal text-ink-soft">(nepovinné)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Např. velikost koupelny, kdy byste chtěli začít, nebo kdy se vám hodí zavolat."
            className={`${input} border-line resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-md bg-tile px-6 py-4 font-semibold text-white transition-colors hover:bg-tile-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Odesílám…" : "Odeslat poptávku"}
      </button>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Údaje použijeme jen k odpovědi na vaši poptávku. Více v{" "}
        <a href="/ochrana-osobnich-udaju" className="underline underline-offset-2 hover:text-ink">
          zásadách ochrany osobních údajů
        </a>
        .
      </p>
    </form>
  );
}
