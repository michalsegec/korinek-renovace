"use server";
// This code runs on the SERVER, not in the visitor's browser.
// So visitors can't see the API key, and they can't skip the checks.

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email", string>>;
  name?: string;
  // What the visitor typed, so the form can show it again after an error
  values?: { name: string; phone: string; email: string };
};

const projectTypes = ["Koupelna", "Umakartové jádro", "Byt na klíč", "Menší úprava", "Jiné"];

export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // 1. Spam checks. Bots fill every field (also the hidden "web" one) and send the form very fast.
  const startedAt = Number(get("t"));
  if (get("web") !== "" || (startedAt && Date.now() - startedAt < 3000)) {
    // Pretend it worked, so the bot doesn't learn anything
    return { status: "success", name: "" };
  }

  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const project = projectTypes.includes(get("project")) ? get("project") : "Jiné";
  const message = get("message").slice(0, 3000);

  // 2. Check the fields. Never trust the browser alone: these checks run again here.
  const errors: InquiryState["errors"] = {};
  if (name.length < 2) errors.name = "Napište prosím své jméno.";
  if (phone.replace(/[^\d]/g, "").length < 9) errors.phone = "Telefon má mít aspoň 9 číslic, např. 777 123 456.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail nevypadá správně. Zkontrolujte zavináč a tečku.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Zkontrolujte prosím označená pole.", errors, values: { name, phone, email } };
  }

  const text = [
    `Nová poptávka z webu`,
    ``,
    `Jméno: ${name}`,
    `Telefon: ${phone}`,
    `E-mail: ${email || "neuvedl/a"}`,
    `Typ zakázky: ${project}`,
    ``,
    message || "(bez zprávy)",
  ].join("\n");

  // 3. Send the email with Resend (resend.com). The keys live in .env.local, never in the code.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Demo mode: no key yet, so we only print the inquiry in the terminal.
    console.log("\n[DEMO] Poptávka by se odeslala:\n" + text + "\n");
    return { status: "success", name };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
        reply_to: email || undefined,
        subject: `Poptávka: ${project}, ${name}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { status: "success", name };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám rovnou zavolejte.",
      values: { name, phone, email },
    };
  }
}
