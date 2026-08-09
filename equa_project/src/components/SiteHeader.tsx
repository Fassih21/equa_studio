import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { STUDIO } from "@/lib/studio";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/location", label: "Location" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:py-5">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.18em] text-foreground">EQUÀ</span>
          <span className="mt-1 text-[0.6rem] tracking-[0.42em] text-mauve">STUDIO</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${STUDIO.phoneIntl}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-3.5" />
            {STUDIO.phoneDisplay}
          </a>
          <Link
            to="/appointment"
            className="rounded-sm bg-primary px-5 py-2.5 text-xs tracking-[0.16em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border surface-warm md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm tracking-wide text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-sm bg-primary px-5 py-3 text-center text-xs tracking-[0.16em] text-primary-foreground uppercase"
            >
              Book an Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
