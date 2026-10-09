import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/offers")({
  component: OffersPage,
});

const offers = [
  {
    number: "01",
    title: "The Complete Reset",
    price: "3,750 PKR",
    description:
      "Manicure + Pedicure + Neck & Shoulder Massage + Hair Wash + Protein Mask + Paddle Dry",
    image: "/offers/deal-1.png",
  },
  {
    number: "02",
    title: "Fresh & Refined",
    price: "2,150 PKR",
    description:
      "Cleansing + Face & Neck Polisher + Eyebrow & Upperlip Threading",
    image: "/offers/deal-2.png",
  },
  {
    number: "03",
    title: "Studio Refresh",
    price: "3,950 PKR",
    description:
      "Cleansing + Manicure + Pedicure + Hair Wash + Straight Blow Dry",
    image: "/offers/deal-3.png",
  },
  {
    number: "04",
    title: "Glow Ritual",
    price: "4,950 PKR",
    description:
      "Brightening Facial + Face & Neck Polisher + Neck, Shoulder & Back Massage + Brow & Upperlip Thread",
    image: "/offers/deal-4.png",
  },
  {
    number: "05",
    title: "The Full Care Edit",
    price: "8,500 PKR",
    description:
      "Root Touch Up + Scalp & Hair Treatment + Manicure + Pedicure + Brow & Upperlip Thread",
    image: "/offers/deal-5.png",
  },
  {
    number: "06",
    title: "Smooth & Silky",
    price: "2,750 PKR",
    description:
      "Rica Wax: Half Arms + Half Legs + Underarms + Underlegs",
    image: "/offers/deal-6.png",
  },
  {
    number: "07",
    title: "Full Body Wax Edit",
    price: "3,250 PKR",
    description:
      "Rica Wax: Full Arms + Full Legs + Underarms + Underlegs",
    image: "/offers/deal-7.png",
  },
  {
    number: "08",
    title: "Lash Lift Ritual",
    price: "6,250 PKR",
    description: "Lash Lift + Lash Tint",
    image: "/offers/deal-8.png",
  },
];

function OffersPage() {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-sand/20" />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-3xl">
            <div className="eyebrow flex items-center gap-2">
              <Sparkles className="size-3.5" />
              Limited studio offers
            </div>

            <h1 className="mt-5 font-display text-5xl leading-[0.95] md:text-7xl">
              A little more
              <br />
              <span className="italic text-primary">beautiful.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Thoughtfully paired treatments, created for a little extra
              self-care. Discover our current studio offers at Equà.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-medium tracking-[0.16em] text-primary-foreground uppercase transition-transform hover:-translate-y-0.5"
              >
                Book an Appointment
                <ArrowUpRight className="size-4" />
              </Link>

              <span className="text-sm text-muted-foreground">
                Available 1–10 October 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The current edit</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Studio Offers
            </h2>
          </div>

          <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground md:block">
            Eight carefully curated combinations for your next studio visit.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.number}
              className="group overflow-hidden border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-full bg-background/90 font-display text-lg text-primary backdrop-blur">
                  {offer.number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-3xl leading-tight">
                    {offer.title}
                  </h3>

                  <span className="shrink-0 text-sm font-medium tracking-wide text-primary">
                    {offer.price}
                  </span>
                </div>

                <div className="gold-rule mt-5" />

                <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
                  {offer.description}
                </p>

                <Link
                  to="/appointment"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-primary uppercase"
                >
                  Book this offer
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Extra offer */}
      <section className="surface-cream border-y border-gold/30">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:py-20">
          <p className="eyebrow">The Extra</p>

          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            10% off all other services
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            Because sometimes your favourite treatment deserves a little
            something extra.
          </p>

          <p className="mt-5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            Terms & conditions apply
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="relative overflow-hidden bg-primary px-7 py-12 text-primary-foreground md:px-14 md:py-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 size-72 rounded-full border border-white/10" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs tracking-[0.25em] text-white/60 uppercase">
                Your next studio visit
              </p>

              <h2 className="mt-3 max-w-xl font-display text-4xl md:text-5xl">
                Make time for yourself.
              </h2>
            </div>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-medium tracking-[0.16em] text-primary uppercase transition-transform hover:-translate-y-0.5"
            >
              Book Now
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}