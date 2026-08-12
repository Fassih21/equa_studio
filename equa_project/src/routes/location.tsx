import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Star, Navigation } from "lucide-react";
import { Reviews, BookingCta } from "@/components/Sections";
import { STUDIO } from "@/lib/studio";

export const Route = createFileRoute("/location")({
  component: LocationPage,
  head: () => ({
    meta: [
      { title: "Visit Equà Studio | Park View, Bahria Town, Lahore" },
      {
        name: "description",
        content:
          "Find Equà Studio at Ground Floor, 23 Park View, Sector E Commercial, Bahria Town, Lahore. Directions, opening hours, phone and Instagram.",
      },
      { property: "og:title", content: "Visit Equà Studio in Bahria Town, Lahore" },
      {
        property: "og:description",
        content:
          "Ground Floor, 23 Park View, Sector E Commercial, Bahria Town, Lahore. Rated 4.9 by 32 Google reviews.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/location" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
});

function LocationPage() {
  return (
    <>
      <section className="surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Find us</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            Ground floor, <span className="text-mauve italic">Park View</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We're on the commercial strip in Sector E, Bahria Town — street parking right outside and
            step-free access from the front entrance.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="text-2xl md:text-3xl">{STUDIO.legalName}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Beauty salon · Aesthetics studio</p>

            <div className="mt-4 flex items-center gap-2">
              <span className="flex gap-0.5 text-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                {STUDIO.rating} · {STUDIO.reviewCount} Google reviews
              </span>
            </div>

            <dl className="mt-9 space-y-6 border-t border-border pt-8 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-mauve" strokeWidth={1.4} />
                <div>
                  <dt className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Address
                  </dt>
                  <dd className="mt-1 leading-relaxed">{STUDIO.addressOneLine}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-mauve" strokeWidth={1.4} />
                <div>
                  <dt className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Hours</dt>
                  <dd className="mt-1">Open today · closes 7:30 PM</dd>
                  <dd className="text-muted-foreground">{STUDIO.hours}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-mauve" strokeWidth={1.4} />
                <div>
                  <dt className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${STUDIO.phoneIntl}`} className="hover:text-primary">
                      {STUDIO.phoneIntl}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Instagram className="mt-0.5 size-5 shrink-0 text-mauve" strokeWidth={1.4} />
                <div>
                  <dt className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Instagram
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={STUDIO.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary"
                    >
                      @{STUDIO.instagram}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={STUDIO.mapsDirections}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              <Navigation className="size-4" strokeWidth={1.6} />
              Get Directions
            </a>
          </div>

          <div className="overflow-hidden rounded-sm border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map showing Equà Studio in Bahria Town, Lahore"
              src={STUDIO.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full lg:h-full"
            />
          </div>
        </div>
      </section>

      <Reviews />
      <BookingCta
        title="Planning a visit?"
        body="Appointments are recommended — walk-ins are welcome when we have a free room, but booking ahead guarantees your time and your therapist."
      />
    </>
  );
}
