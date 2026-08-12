import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { BookingCta } from "@/components/Sections";
import { STUDIO } from "@/lib/studio";

import handFootImg from "@/assets/hand-foot-collective.png";
import spmuImg from "@/assets/spmu-collective.png";
import browLashImg from "@/assets/brow-lash-collective.png";
import hairScalpImg from "@/assets/hair-scalp-collective.png";
import artistryEditImg from "@/assets/artistry-edit-bridal.png";
import facialImg from "@/assets/facial-collective.png";
import groomingImg from "@/assets/grooming-collective.png";
import wellnessImg from "@/assets/wellness-collective.png";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services | Equà Studio, Bahria Town Lahore" },
      {
        name: "description",
        content:
          "Explore Equà Studio's full treatment menu — hydrafacials, lash lift, brow lamination, microblading, keratin, bridal makeup, waxing, massages and more in Bahria Town, Lahore. Book a free consultation on WhatsApp.",
      },
      { property: "og:title", content: "Equà Studio Service Menu" },
      {
        property: "og:description",
        content: "Every treatment we offer, with a free consultation just a WhatsApp message away.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

type Row = { name: string; note?: string };
type Group = { heading?: string; note?: string; rows: Row[] };
type Collective = { title: string; blurb: string; image: string; groups: Group[] };

const collectives: Collective[] = [
  {
    title: "The Hand & Foot Collective",
    blurb: "Slow, warm rituals for hands and feet — from a tidy essential to a full aroma spa.",
    image: handFootImg,
    groups: [
      {
        heading: "Hand Rituals",
        rows: [
          { name: "Essential Manicure" },
          { name: "Botanical Manicure" },
          { name: "Aroma Spa Manicure" },
          { name: "Hand Microdermabrasion" },
        ],
      },
      {
        heading: "Foot Rituals",
        rows: [
          { name: "Essential Pedicure" },
          { name: "Botanical Pedicure" },
          { name: "Aroma Spa Pedicure" },
          { name: "Foot Microdermabrasion" },
        ],
      },
      {
        heading: "Add-ons",
        rows: [{ name: "Nail Colour" }, { name: "Polisher" }],
      },
    ],
  },
  {
    title: "The Semi-Permanent Makeup Collective",
    blurb:
      "Pigment work performed by Sahrish. A consultation and patch test are required before every procedure.",
    image: spmuImg,
    groups: [
      {
        rows: [
          { name: "Combo Brows" },
          { name: "Ombre Powder Brows" },
          { name: "Microblading" },
          { name: "Lip Blush" },
          { name: "Lash Line Enhancement" },
          { name: "Scalp Micropigmentation", note: "varies by area" },
          { name: "Beauty Marks (Moles & Freckles)" },
        ],
        note: "Consultation required before every procedure.",
      },
    ],
  },
  {
    title: "The Brow & Lash Collective",
    blurb: "Shape first, then colour and lift — mapped to your own bone structure.",
    image: browLashImg,
    groups: [
      {
        rows: [
          { name: "Lash Lift" },
          { name: "Brow Lamination" },
          { name: "Brow Mapping & Design" },
          { name: "Brow Threading" },
          { name: "Brow Tint" },
          { name: "Lash Tint" },
          { name: "Lash Extension Removal" },
        ],
      },
    ],
  },
  {
    title: "The Hair & Scalp Collective",
    blurb:
      "Scalp health first, then repair, smoothing and colour — with honest advice on what your hair can take.",
    image: hairScalpImg,
    groups: [
      {
        heading: "Scalp Treatments",
        rows: [{ name: "Scalp Hydra Purify" }],
      },
      {
        heading: "Hair Treatments",
        rows: [
          { name: "Essential Hair & Scalp Ritual" },
          { name: "Botanical Hair & Scalp Ritual (CoNatural)" },
          { name: "Cadiveu Extreme Hair Repair" },
          { name: "Keratin Treatment" },
          { name: "Botox Hair Therapy" },
          { name: "Protein Smoothing Treatment" },
        ],
      },
      {
        heading: "Colour Services",
        rows: [{ name: "Root Touch-up" }, { name: "Hair Colour (Full Head)" }],
      },
      {
        heading: "Cut & Style",
        rows: [{ name: "Haircut" }, { name: "Hair Trim" }, { name: "Hair Styling" }],
      },
    ],
  },
  {
    title: "Hair & Makeup — The Artistry Edit",
    blurb: "Bridal and event artistry, including draping and jewellery setting for the full day.",
    image: artistryEditImg,
    groups: [
      {
        heading: "Signature Bridal Series",
        rows: [
          { name: "Nikkah / Baraat / Valima / Shendi / Shalima" },
          { name: "Mehndi / Engagement" },
          { name: "Mayun / Dholki" },
        ],
      },
      {
        heading: "Signature Glam Series (Party Makeup)",
        rows: [{ name: "Signature Heavy Glam" }, { name: "Signature Party Makeup" }],
      },
      {
        heading: "The Finishing Touch",
        rows: [
          {
            name: "Bridal Hair & Draping Ritual — hairdo, dupatta & lehenga draping, jewellery setting, nail paint",
          },
        ],
      },
      {
        heading: "Assistant Glam Series",
        rows: [{ name: "Party Makeup" }],
      },
    ],
  },
  {
    title: "The Facial Collective",
    blurb:
      "From a 30-minute express cleanse to advanced corrective work — all decided after a skin read.",
    image: facialImg,
    groups: [
      {
        heading: "Advanced Skin Treatments",
        rows: [
          { name: "Hydrafacial (Face)" },
          { name: "Hydrafacial (Face, Neck & Décolletage)" },
          { name: "Advanced Corrective" },
          { name: "Korean Glass Skin" },
          { name: "BB Glow" },
          { name: "Dermaplaning" },
          { name: "Microdermabrasion" },
          { name: "Comedone Extraction" },
          { name: "Radio Frequency Skin Firming" },
        ],
      },
      {
        heading: "Botanical Facials (CoNatural)",
        rows: [
          { name: "Hydration" },
          { name: "Brightening" },
          { name: "Deep Cleanse" },
          { name: "Express Cleanse" },
        ],
      },
      {
        heading: "Essential Facials",
        rows: [
          { name: "Hydration" },
          { name: "Brightening" },
          { name: "Deep Cleanse" },
          { name: "Express Cleanse" },
        ],
      },
    ],
  },
  {
    title: "The Grooming Collective",
    blurb: "Threading and waxing with single-use tools, plus studio piercings.",
    image: groomingImg,
    groups: [
      {
        heading: "Hair Removal — Thread | Wax",
        rows: [
          { name: "Eyebrows" },
          { name: "Upper Lip" },
          { name: "Forehead" },
          { name: "Sideburns" },
          { name: "Chin" },
          { name: "Full Face (incl. Brows)" },
          { name: "Nose" },
          { name: "Neck" },
          { name: "Half Arms" },
          { name: "Full Arms" },
          { name: "Half Legs" },
          { name: "Full Legs" },
          { name: "Underarms" },
          { name: "Bikini" },
          { name: "Stomach" },
          { name: "Back" },
          { name: "Full Body" },
        ],
      },
      {
        heading: "Studio Piercings",
        rows: [{ name: "Ear Piercing" }, { name: "Nose Piercing" }],
      },
    ],
  },
  {
    title: "The Wellness Collective",
    blurb: "Pressure-point massage and reflexology to end the visit properly.",
    image: wellnessImg,
    groups: [
      {
        rows: [
          { name: "Head, Neck & Shoulder Massage (30 min)" },
          { name: "Back, Neck & Shoulder Massage (30 min)" },
          { name: "Foot Reflexology (30 min)" },
          { name: "Relaxation Massage (60 min)" },
          { name: "Deep Tissue Massage (60 min)" },
        ],
      },
    ],
  },
];

function whatsappUrl(serviceName: string) {
  const message = `Hello Equà Studio, I'd like to book a free consultation for: ${serviceName}. Please let me know the next available slot. Thank you.`;
  return `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(message)}`;
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <div className="mt-8 first:mt-0">
      {group.heading && (
        <h4 className="text-xs tracking-[0.22em] text-mauve uppercase">{group.heading}</h4>
      )}
      <ul className="mt-4">
        {group.rows.map((r) => (
          <li
            key={r.name}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border/70 py-3 text-sm"
          >
            <span>
              {r.name}
              {r.note && <span className="ml-2 text-xs text-muted-foreground">({r.note})</span>}
            </span>
            <a
              href={whatsappUrl(r.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-mauve px-3 py-1.5 text-[11px] tracking-wide text-primary uppercase transition-colors hover:bg-background"
            >
              <MessageCircle className="size-3.5" strokeWidth={1.6} />
              Book a Free Consultation
            </a>
          </li>
        ))}
      </ul>
      {group.note && <p className="mt-3 text-xs text-muted-foreground">{group.note}</p>}
    </div>
  );
}

function Services() {
  const [open, setOpen] = useState<string | null>(collectives[0]!.title);

  return (
    <>
      <section className="surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Service menu</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Everything we offer, <span className="text-mauve italic">made personal</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Where a treatment can be done in two ways, the more elevated version is Signature by
            Sahrish — performed personally by our founder. Every treatment starts with a free
            consultation on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="divide-y divide-border border-y border-border">
            {collectives.map((c) => {
              const isOpen = open === c.title;
              return (
                <div key={c.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : c.title)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="size-16 shrink-0 rounded-lg border border-border/60 object-cover shadow-[var(--shadow-soft)] md:size-[72px]"
                        loading="lazy"
                      />
                      <span>
                        <span className="font-display block text-2xl md:text-3xl">{c.title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{c.blurb}</span>
                      </span>
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-mauve transition-transform ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-10">
                      {c.groups.map((g, i) => (
                        <GroupBlock key={g.heading ?? i} group={g} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCta
        title="Found your treatment?"
        body="Send us your preferred date and time — we'll confirm your slot on WhatsApp and let you know how long to set aside."
      />
    </>
  );
}