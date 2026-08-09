import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BookingCta } from "@/components/Sections";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services & Price List | Equà Studio, Bahria Town Lahore" },
      {
        name: "description",
        content:
          "Full Equà Studio price list in PKR — hydrafacials, lash lift, brow lamination, microblading, keratin, bridal makeup, waxing, massages and more in Bahria Town, Lahore.",
      },
      { property: "og:title", content: "Equà Studio Service Menu & Prices" },
      {
        property: "og:description",
        content:
          "Eight collectives, transparent PKR pricing, with Equà Studio and Signature by Sahrish tiers side by side.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

type Row = { name: string; price?: string; studio?: string; signature?: string; note?: string };
type Group = { heading?: string; note?: string; rows: Row[]; comparison?: boolean };
type Collective = { title: string; blurb: string; groups: Group[] };

const money = (n: number) => n.toLocaleString("en-PK");

const collectives: Collective[] = [
  {
    title: "The Hand & Foot Collective",
    blurb: "Slow, warm rituals for hands and feet — from a tidy essential to a full aroma spa.",
    groups: [
      {
        heading: "Hand Rituals",
        rows: [
          { name: "Essential Manicure", price: money(2000) },
          { name: "Botanical Manicure", price: money(2500) },
          { name: "Aroma Spa Manicure", price: money(3000) },
          { name: "Hand Microdermabrasion", price: money(7500) },
        ],
      },
      {
        heading: "Foot Rituals",
        rows: [
          { name: "Essential Pedicure", price: money(2500) },
          { name: "Botanical Pedicure", price: money(3000) },
          { name: "Aroma Spa Pedicure", price: money(3500) },
          { name: "Foot Microdermabrasion", price: money(9000) },
        ],
      },
      {
        heading: "Add-ons",
        rows: [
          { name: "Nail Colour", price: money(500) },
          { name: "Polisher", price: money(500) },
        ],
      },
    ],
  },
  {
    title: "The Semi-Permanent Makeup Collective",
    blurb:
      "Pigment work performed by Sahrish. A consultation and patch test are required before every procedure.",
    groups: [
      {
        rows: [
          { name: "Combo Brows", price: money(25000) },
          { name: "Ombre Powder Brows", price: money(20000) },
          { name: "Microblading", price: money(20000) },
          { name: "Lip Blush", price: money(20000) },
          { name: "Lash Line Enhancement", price: money(20000) },
          {
            name: "Scalp Micropigmentation",
            price: `starting ${money(20000)}`,
            note: "varies by area",
          },
          { name: "Beauty Marks (Moles & Freckles)", price: `${money(5000)} / mark` },
        ],
        note: "Consultation required before every procedure.",
      },
    ],
  },
  {
    title: "The Brow & Lash Collective",
    blurb: "Shape first, then colour and lift — mapped to your own bone structure.",
    groups: [
      {
        comparison: true,
        rows: [
          { name: "Lash Lift", studio: money(7000), signature: money(10500) },
          { name: "Brow Lamination", studio: money(7000), signature: money(10500) },
          { name: "Brow Mapping & Design", studio: "—", signature: money(1500) },
          { name: "Brow Threading", studio: money(300), signature: "—" },
          { name: "Brow Tint", studio: money(2500), signature: "—" },
          { name: "Lash Tint", studio: money(2000), signature: "—" },
          { name: "Lash Extension Removal", studio: money(2000), signature: "—" },
        ],
      },
    ],
  },
  {
    title: "The Hair & Scalp Collective",
    blurb:
      "Scalp health first, then repair, smoothing and colour — with honest advice on what your hair can take.",
    groups: [
      {
        heading: "Scalp Treatments",
        rows: [{ name: "Scalp Hydra Purify", price: `${money(7000)} / ${money(10500)}` }],
      },
      {
        heading: "Hair Treatments",
        note: "* starting price — final price depends on hair length and density.",
        rows: [
          { name: "Essential Hair & Scalp Ritual", price: money(4500) },
          { name: "Botanical Hair & Scalp Ritual (CoNatural)", price: money(6500) },
          { name: "Cadiveu Extreme Hair Repair", price: money(7500) },
          { name: "Keratin Treatment*", price: `starting ${money(15000)}` },
          { name: "Botox Hair Therapy*", price: `starting ${money(15000)}` },
          { name: "Protein Smoothing Treatment*", price: `starting ${money(15000)}` },
        ],
      },
      {
        heading: "Colour Services",
        rows: [
          { name: "Root Touch-up*", price: `starting ${money(4500)}` },
          { name: "Hair Colour (Full Head)*", price: `starting ${money(10000)}` },
        ],
      },
      {
        heading: "Cut & Style",
        comparison: true,
        rows: [
          { name: "Haircut", studio: money(3500), signature: money(6000) },
          { name: "Hair Trim", studio: money(1500), signature: money(2500) },
          { name: "Hair Styling*", studio: money(2500), signature: "—" },
        ],
      },
    ],
  },
  {
    title: "Hair & Makeup — The Artistry Edit",
    blurb: "Bridal and event artistry, including draping and jewellery setting for the full day.",
    groups: [
      {
        heading: "Signature Bridal Series",
        rows: [
          { name: "Nikkah / Baraat / Valima / Shendi / Shalima", price: money(70000) },
          { name: "Mehndi / Engagement", price: money(50000) },
          { name: "Mayun / Dholki", price: money(40000) },
        ],
      },
      {
        heading: "Signature Glam Series (Party Makeup)",
        rows: [
          { name: "Signature Heavy Glam", price: money(30000) },
          { name: "Signature Party Makeup", price: money(18000) },
        ],
      },
      {
        heading: "The Finishing Touch",
        rows: [
          {
            name: "Bridal Hair & Draping Ritual — hairdo, dupatta & lehenga draping, jewellery setting, nail paint",
            price: money(40000),
          },
        ],
      },
      {
        heading: "Assistant Glam Series",
        rows: [{ name: "Party Makeup", price: money(6000) }],
      },
    ],
  },
  {
    title: "The Facial Collective",
    blurb:
      "From a 30-minute express cleanse to advanced corrective work — all decided after a skin read.",
    groups: [
      {
        heading: "Advanced Skin Treatments",
        comparison: true,
        rows: [
          { name: "Hydrafacial (Face)", studio: money(8000), signature: money(12500) },
          {
            name: "Hydrafacial (Face, Neck & Décolletage)",
            studio: money(15000),
            signature: money(22500),
          },
          { name: "Advanced Corrective", studio: money(14000), signature: money(18500) },
          { name: "Korean Glass Skin", studio: money(11000), signature: money(15000) },
          { name: "BB Glow", studio: money(14000), signature: money(18500) },
          { name: "Dermaplaning", studio: money(9500), signature: money(13000) },
          { name: "Microdermabrasion", studio: money(7500), signature: money(10500) },
          { name: "Comedone Extraction", studio: money(8000), signature: money(12000) },
          { name: "Radio Frequency Skin Firming", studio: money(7500), signature: money(13500) },
        ],
      },
      {
        heading: "Botanical Facials (CoNatural)",
        rows: [
          { name: "Hydration", price: money(6000) },
          { name: "Brightening", price: money(6000) },
          { name: "Deep Cleanse", price: money(5000) },
          { name: "Express Cleanse", price: money(3500) },
        ],
      },
      {
        heading: "Essential Facials",
        rows: [
          { name: "Hydration", price: money(4500) },
          { name: "Brightening", price: money(4500) },
          { name: "Deep Cleanse", price: money(3000) },
          { name: "Express Cleanse", price: money(2000) },
        ],
      },
    ],
  },
  {
    title: "The Grooming Collective",
    blurb: "Threading and waxing with single-use tools, plus studio piercings.",
    groups: [
      {
        heading: "Hair Removal — Thread | Wax",
        comparison: true,
        rows: [
          { name: "Eyebrows", studio: money(300), signature: money(400) },
          { name: "Upper Lip", studio: money(200), signature: money(300) },
          { name: "Forehead", studio: money(300), signature: money(500) },
          { name: "Sideburns", studio: money(350), signature: money(400) },
          { name: "Chin", studio: money(350), signature: money(400) },
          { name: "Full Face (incl. Brows)", studio: money(1800), signature: money(2500) },
          { name: "Nose", studio: "—", signature: money(300) },
          { name: "Neck", studio: "—", signature: money(600) },
          { name: "Half Arms", studio: "—", signature: money(1000) },
          { name: "Full Arms", studio: "—", signature: money(1500) },
          { name: "Half Legs", studio: "—", signature: money(1500) },
          { name: "Full Legs", studio: "—", signature: money(2000) },
          { name: "Underarms", studio: "—", signature: money(800) },
          { name: "Bikini", studio: "—", signature: money(1800) },
          { name: "Stomach", studio: "—", signature: money(1200) },
          { name: "Back", studio: "—", signature: money(1500) },
          { name: "Full Body", studio: "—", signature: money(8000) },
        ],
      },
      {
        heading: "Studio Piercings",
        rows: [
          { name: "Ear Piercing", price: money(4000) },
          { name: "Nose Piercing", price: money(4000) },
        ],
      },
    ],
  },
  {
    title: "The Wellness Collective",
    blurb: "Pressure-point massage and reflexology to end the visit properly.",
    groups: [
      {
        rows: [
          { name: "Head, Neck & Shoulder Massage (30 min)", price: money(3000) },
          { name: "Back, Neck & Shoulder Massage (30 min)", price: money(3500) },
          { name: "Foot Reflexology (30 min)", price: money(3500) },
          { name: "Relaxation Massage (60 min)", price: money(6000) },
          { name: "Deep Tissue Massage (60 min)", price: money(7500) },
        ],
      },
    ],
  },
];

function GroupBlock({ group, grooming }: { group: Group; grooming?: boolean }) {
  const colA = grooming ? "Thread" : "Equà Studio";
  const colB = grooming ? "Wax" : "Signature by Sahrish";

  return (
    <div className="mt-8 first:mt-0">
      {group.heading && (
        <h4 className="text-xs tracking-[0.22em] text-mauve uppercase">{group.heading}</h4>
      )}
      {group.comparison ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gold/50 text-left">
                <th className="py-3 pr-4 font-normal text-muted-foreground">Service</th>
                <th className="py-3 pr-4 text-right font-normal text-muted-foreground">{colA}</th>
                <th className="py-3 text-right font-normal text-muted-foreground">{colB}</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((r) => (
                <tr key={r.name} className="border-b border-border/70">
                  <td className="py-3 pr-4">{r.name}</td>
                  <td className="py-3 pr-4 text-right tabular-nums">{r.studio}</td>
                  <td className="py-3 text-right tabular-nums">{r.signature}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">All prices in PKR.</p>
        </div>
      ) : (
        <ul className="mt-4">
          {group.rows.map((r) => (
            <li
              key={r.name}
              className="flex items-baseline justify-between gap-4 border-b border-border/70 py-3 text-sm"
            >
              <span>
                {r.name}
                {r.note && (
                  <span className="ml-2 text-xs text-muted-foreground">({r.note})</span>
                )}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">PKR {r.price}</span>
            </li>
          ))}
        </ul>
      )}
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
            Everything we offer, <span className="text-mauve italic">priced openly</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Where a treatment is listed twice, the second column is Signature by Sahrish — performed
            personally by our founder. All prices are in Pakistani Rupees and include a consultation.
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
                    <span>
                      <span className="font-display block text-2xl md:text-3xl">{c.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{c.blurb}</span>
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-mauve transition-transform ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-10">
                      {c.groups.map((g, i) => (
                        <GroupBlock
                          key={g.heading ?? i}
                          group={g}
                          grooming={c.title === "The Grooming Collective"}
                        />
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
