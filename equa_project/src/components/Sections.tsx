import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { REVIEWS, STUDIO } from "@/lib/studio";

export function Reviews({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-14" : "surface-warm py-20 md:py-28"}>
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">Kind words</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-3xl md:text-4xl">
            {STUDIO.rating} stars across {STUDIO.reviewCount} Google reviews
          </h2>
          <div className="flex items-center gap-1 text-gold" aria-label="4.9 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-sm border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="flex gap-1 text-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <span className="font-medium">{r.name}</span>
                <span className="mt-0.5 block text-xs text-mauve">{r.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingCta({
  title = "Ready when you are",
  body = "Tell us what you'd like done and when suits you — we'll confirm your slot on WhatsApp, usually within the hour.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="surface-cream border-y border-gold/40 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="eyebrow">Appointments</p>
        <h2 className="mt-3 text-3xl md:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/appointment"
            className="rounded-sm bg-primary px-8 py-4 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Book an Appointment
          </Link>
          <a
            href={`tel:${STUDIO.phoneIntl}`}
            className="rounded-sm border border-mauve px-8 py-4 text-xs tracking-[0.18em] text-primary uppercase transition-colors hover:bg-background"
          >
            Call {STUDIO.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
