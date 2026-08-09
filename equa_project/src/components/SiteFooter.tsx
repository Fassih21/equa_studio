import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";
import { STUDIO } from "@/lib/studio";

export function SiteFooter() {
  return (
    <footer className="surface-cream mt-24 border-t border-gold/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <span className="font-display block text-2xl tracking-[0.18em]">EQUÀ</span>
          <span className="mt-1 block text-[0.6rem] tracking-[0.42em] text-mauve">STUDIO</span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A quiet, considered studio in Bahria Town, Lahore — where skin, hair and self-care are
            treated with honesty and real expertise.
          </p>
        </div>

        <div>
          <h3 className="text-sm tracking-[0.2em] uppercase">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-primary">
                About & Founder
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Service Menu
              </Link>
            </li>
            <li>
              <Link to="/location" className="hover:text-primary">
                Visit the Studio
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="hover:text-primary">
                Book an Appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm tracking-[0.2em] uppercase">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-mauve" />
              <span>
                {STUDIO.address.line1}
                <br />
                {STUDIO.address.line2}
                <br />
                {STUDIO.address.city} {STUDIO.address.postal}
              </span>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-mauve" />
              <span>{STUDIO.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm tracking-[0.2em] uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${STUDIO.phoneIntl}`} className="flex gap-2 hover:text-primary">
                <Phone className="mt-0.5 size-4 shrink-0 text-mauve" />
                {STUDIO.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={STUDIO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 hover:text-primary"
              >
                <Instagram className="mt-0.5 size-4 shrink-0 text-mauve" />@{STUDIO.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/30">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Equà Studio, Lahore. Premium aesthetics & beauty by Sahrish.
        </div>
      </div>
    </footer>
  );
}
