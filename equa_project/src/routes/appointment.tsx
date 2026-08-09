import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MessageCircle, Clock, Phone, CheckCircle2 } from "lucide-react";
import { STUDIO } from "@/lib/studio";
import studioRoom from "@/assets/studio-beds.jpeg";

export const Route = createFileRoute("/appointment")({
  component: Appointment,
  head: () => ({
    meta: [
      { title: "Book an Appointment | Equà Studio, Bahria Town Lahore" },
      {
        name: "description",
        content:
          "Book your appointment at Equà Studio in Bahria Town, Lahore. Fill the form and your request opens straight in WhatsApp for confirmation.",
      },
      { property: "og:title", content: "Book an Appointment at Equà Studio" },
      {
        property: "og:description",
        content:
          "Choose your treatment, date and time — we confirm on WhatsApp, usually within the hour.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/appointment" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
});

const treatments = [
  "Consultation",
  "Hydrafacial",
  "Korean Glass Skin",
  "BB Glow",
  "Dermaplaning",
  "Botanical / Essential Facial",
  "Lash Lift",
  "Brow Lamination",
  "Brow Threading / Tint",
  "Semi-Permanent Makeup (Brows / Lip Blush)",
  "Beauty Marks",
  "Hair & Scalp Treatment",
  "Keratin / Smoothing",
  "Haircut & Styling",
  "Hair Colour",
  "Manicure / Pedicure",
  "Waxing / Threading",
  "Bridal Makeup",
  "Party Makeup",
  "Massage / Reflexology",
  "Ear / Nose Piercing",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--mauve)]";
const labelClass = "block text-xs tracking-[0.18em] text-muted-foreground uppercase";

function Appointment() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const treatment = String(data.get("treatment") ?? "").trim() || "Not specified";
    const date = String(data.get("date") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();

    const message = `Hello Equà Studio, I would like to book an appointment.
Name: ${name}
Phone: ${phone}
Preferred Treatment: ${treatment}
Preferred Date: ${date}
Preferred Time: ${time}
Please confirm my appointment slot. Thank you.`;

    window.open(
      `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <>
      <section className="surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Appointments</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Book your <span className="text-mauve italic">time</span> with us
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Fill this in and your request opens in WhatsApp, ready to send. We reply with
            confirmation and how long to set aside — usually within the hour during studio hours.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-border bg-card p-7 shadow-[var(--shadow-soft)] md:p-9"
          >
            <h2 className="text-2xl">Appointment request</h2>
            <div className="gold-rule mt-4" />

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="03XX XXX XXXX"
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="treatment">
                  Preferred treatment <span className="normal-case">(optional)</span>
                </label>
                <select id="treatment" name="treatment" defaultValue="" className={fieldClass}>
                  <option value="">Not specified — help me choose</option>
                  {treatments.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="date">
                  Preferred date
                </label>
                <input id="date" name="date" required type="date" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="time">
                  Preferred time
                </label>
                <input id="time" name="time" required type="time" className={fieldClass} />
              </div>
            </div>

            <button
              type="submit"
              className="mt-9 flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" strokeWidth={1.6} />
              Send request on WhatsApp
            </button>

            {sent && (
              <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mauve" />
                WhatsApp should have opened with your details. If it didn't, message us directly at{" "}
                <a href={`tel:${STUDIO.phoneIntl}`} className="text-primary underline">
                  {STUDIO.phoneDisplay}
                </a>
                .
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              No payment is taken here. Your slot is confirmed once we reply on WhatsApp.
            </p>
          </form>

          <aside>
            <img
              id="appointment-image"
              src={studioRoom}
              alt="Private treatment beds with arc lighting inside Equà Studio, Lahore"
              loading="lazy"
              className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="surface-warm mt-6 border border-gold/40 p-7">
              <h3 className="text-xl">Good to know</h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-mauve" />
                  Semi-permanent makeup, keratin and bridal bookings need a consultation first — we'll
                  arrange it when we confirm.
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-mauve" />
                  Prefer to talk it through? Call{" "}
                  <a href={`tel:${STUDIO.phoneIntl}`} className="text-primary">
                    {STUDIO.phoneDisplay}
                  </a>
                  .
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-mauve" />
                  Please let us know 24 hours ahead if you need to move your appointment.
                </li>
              </ul>
              <p className="mt-6 border-t border-gold/40 pt-5 text-sm text-muted-foreground">
                {STUDIO.addressOneLine}
                <br />
                {STUDIO.hours}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
