import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { STUDIO } from "@/lib/studio";

const ELFSIGHT_WIDGET_CLASS = "elfsight-app-0cf44976-e743-48f0-8b08-b1bc6244760a";

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

        <div className="mt-10">
          <div className={ELFSIGHT_WIDGET_CLASS} data-elfsight-app-lazy />
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