import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Scissors,
  Eye,
  Wand2,
  HandHeart,
  Flower2,
  Feather,
  Crown,
  ShieldCheck,
  HeartHandshake,
  BadgeCheck,
  Star,
  MapPin,
  Images,
} from "lucide-react";
import heroImg from "@/assets/hero-lash.png";

import reception from "@/assets/studio-reception.jpeg";
import treatment from "@/assets/studio-treatment.jpeg";
import beds from "@/assets/studio-beds.jpeg";
import consult from "@/assets/studio-consult.jpeg";
import desk from "@/assets/studio-desk.jpeg";
import lounge from "@/assets/studio-lounge.jpeg";
import waiting from "@/assets/studio-waiting.jpeg";
import { BookingCta, Reviews } from "@/components/Sections";
import { STUDIO } from "@/lib/studio";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Equà Studio | Premium Aesthetics & Beauty Studio in Bahria Town, Lahore",
      },
      {
        name: "description",
        content:
          "Equà Studio is a premium aesthetics & beauty studio in Bahria Town, Lahore — hydrafacials, lash lifts, brow lamination, semi-permanent makeup, hair & scalp rituals and bridal makeup by Sahrish.",
      },
      {
        property: "og:title",
        content: "Equà Studio | Premium Aesthetics & Beauty in Lahore",
      },
      {
        property: "og:description",
        content:
          "Skin, hair, brows and bridal artistry in Bahria Town, Lahore. Rated 4.9 by 32 Google reviews. Book on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: STUDIO.legalName,
          telephone: STUDIO.phoneIntl,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ground Floor, 23, Park View, Sector E Commercial, Bahria Town",
            addressLocality: "Lahore",
            postalCode: "54000",
            addressCountry: "PK",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: STUDIO.rating,
            reviewCount: STUDIO.reviewCount,
          },
          priceRange: "PKR",
        }),
      },
    ],
  }),
});

const categories = [
  {
    icon: Sparkles,
    title: "The Facial Collective",
    text: "Hydrafacial, Korean glass skin, BB Glow, dermaplaning and botanical facials.",
  },
  {
    icon: Scissors,
    title: "Hair & Scalp",
    text: "Scalp hydra purify, keratin, botox therapy, colour, cuts and styling.",
  },
  {
    icon: Eye,
    title: "Brow & Lash",
    text: "Lash lifts, brow lamination, mapping, tinting and threading.",
  },
  {
    icon: Wand2,
    title: "Semi-Permanent Makeup",
    text: "Combo brows, ombre powder brows, microblading, lip blush, beauty marks.",
  },
  {
    icon: HandHeart,
    title: "Hand & Foot Collective",
    text: "Essential to aroma spa manicures, pedicures and microdermabrasion.",
  },
  {
    icon: Flower2,
    title: "Wellness",
    text: "Head, neck & shoulder massage, foot reflexology, deep tissue.",
  },
  {
    icon: Feather,
    title: "Grooming",
    text: "Threading and waxing, from brows to full body, plus studio piercings.",
  },
  {
    icon: Crown,
    title: "Bridal & Makeup",
    text: "Signature bridal series, party glam and the bridal draping ritual.",
  },
];

const trust = [
  {
    icon: BadgeCheck,
    title: "Led by a principal esthetician",
    text: "Sahrish personally consults and performs the Signature treatments — you are never handed off to whoever is free.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical hygiene, softly delivered",
    text: "Single-use tools where it matters, sanitised stations between clients, and honest aftercare instructions in writing.",
  },
  {
    icon: HeartHandshake,
    title: "Honest recommendations",
    text: "If a treatment isn't right for your skin or hair right now, we'll say so — and suggest what actually is.",
  },
  {
    icon: Star,
    title: "Curated, not crowded",
    text: "Limited appointments per day inside private curtained rooms, so your slot never feels rushed.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden md:min-h-[92vh] md:items-center">
        <img
          src={treatment}
          alt="A private treatment room inside Equà Studio, Bahria Town, Lahore"
          className="absolute inset-0 h-full w-full object-cover object-[75%_center]"
          loading="eager"
        />
        {/* light-brand overlay: cream fade on mobile (bottom→top), plum/cream fade on desktop (left→right) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/25 md:bg-gradient-to-r md:from-background md:via-background/90 md:to-background/10" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 md:py-24">
          <div className="fade-up max-w-xl">
            <p className="eyebrow">Bahria Town · Lahore</p>
            <h1 className="mt-5 text-4xl leading-[1.08] md:text-6xl">
              Considered beauty,
              <br />
              <span className="text-mauve italic">tailored to you</span> at Equà Studio
            </h1>
            <div className="gold-rule mt-7" />
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              A premium aesthetics and beauty studio founded by Sahrish — where skin, hair, brows
              and bridal artistry are handled with honesty, real expertise and unhurried care. No
              upsells, no guesswork; just treatments chosen for the person in the chair.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="rounded-sm bg-primary px-8 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                Book an Appointment
              </Link>
              <Link
                to="/services"
                className="rounded-sm border border-mauve bg-background/70 px-8 py-4 text-xs tracking-[0.18em] text-primary uppercase backdrop-blur transition-colors hover:surface-warm"
              >
                View Service Menu
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="surface-cream inline-flex items-center gap-3 rounded-sm border border-gold/40 px-5 py-3 shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-1 text-gold" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm">
                  <span className="font-display text-lg">{STUDIO.rating}</span>{" "}
                  <span className="text-muted-foreground">
                    · {STUDIO.reviewCount} Google reviews
                  </span>
                </p>
              </div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                80+ treatments
              </p>
            </div>
          </div>
        </div>

        {/* floating founder quote, anchored to the photo */}
        <div className="surface-warm absolute right-5 bottom-5 hidden max-w-xs items-center gap-4 border border-gold/40 p-4 shadow-[var(--shadow-lift)] lg:flex">
          <img
            src={heroImg}
            alt="Close-up of laminated brows and a lash lift finished at Equà Studio"
            className="size-16 shrink-0 rounded-sm object-cover"
            loading="eager"
          />
          <div>
            <p className="font-display text-sm leading-snug">
              “Confidence begins with feeling comfortable in your own skin.”
            </p>
            <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-mauve uppercase">
              Sahrish · Founder
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="surface-warm py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1fr_1.1fr]">
          <img
            id="studio-interior-1"
            src={reception}
            alt="The bright reception area of Equà Studio with a curved oak desk and treatment rooms behind"
            className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">The studio</p>
            <h2 className="mt-3 text-3xl md:text-4xl">
              A calm, private space on the ground floor of Bahria Town
            </h2>
            <div className="gold-rule mt-6" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Equà Studio was built around one idea: that beauty work should feel honest. Everything
              starts with a proper consultation — your skin history, your hair, what you've tried
              before, and what you actually want. Only then do we choose a treatment.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Inside, you'll find curtained treatment rooms with soft arc lighting, a quiet lounge
              to wait in, and a small team that remembers your name and your last appointment.
              Whether you're in for a 30-minute express cleanse or a full bridal day, the pace stays
              gentle.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-block border-b border-gold pb-1 text-xs tracking-[0.2em] text-primary uppercase"
            >
              Meet Sahrish & read our story
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Eight collectives, one studio</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Our menu is grouped into collectives so you can find your treatment quickly — and see
              exactly what it costs before you arrive.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ icon: Icon, title, text }) => (
              <Link
                key={title}
                to="/services"
                className="group flex flex-col bg-card p-7 transition-colors hover:surface-warm"
              >
                <Icon className="size-6 text-mauve" strokeWidth={1.4} />
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <span className="mt-5 text-[0.68rem] tracking-[0.2em] text-primary uppercase">
                  View pricing →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="surface-warm py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">Why Equà</p>
            <h2 className="mt-3 text-3xl md:text-4xl">The difference is in what we don't do</h2>
            <div className="gold-rule mt-6" />
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {trust.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="size-5 text-mauve" strokeWidth={1.4} />
                  <h3 className="mt-4 text-lg leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-5">
            <img
              id="studio-interior-2"
              src={beds}
              alt="A treatment bed at Equà Studio with soft linens and arc lighting"
              className="w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Take a look inside</p>
              <h2 className="mt-3 text-3xl md:text-4xl">A studio built to slow you down</h2>
            </div>
            <Link
              to="/about"
              className="hidden items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.2em] text-primary uppercase md:inline-flex"
            >
              <Images className="size-4" strokeWidth={1.4} />
              Our story
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                src: consult,
                alt: "A consultation corner at Equà Studio where treatments are planned with you",
              },
              { src: desk, alt: "The curved oak reception desk at Equà Studio" },
              { src: lounge, alt: "The quiet client lounge at Equà Studio" },
              { src: waiting, alt: "The waiting area at Equà Studio, Bahria Town, Lahore" },
            ].map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="aspect-[3/4] w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* LOCATION STRIP */}
      <section className="py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 text-mauve" strokeWidth={1.4} />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {STUDIO.address.line1}, {STUDIO.address.line2}
              <br />
              {STUDIO.address.city} · {STUDIO.hours}
            </p>
          </div>
          <Link
            to="/location"
            className="border-b border-gold pb-1 text-xs tracking-[0.2em] text-primary uppercase"
          >
            Find the studio
          </Link>
        </div>
      </section>

      <BookingCta />
    </>
  );
}