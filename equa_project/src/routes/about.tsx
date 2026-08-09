import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/Sections";
import founder from "@/assets/founder.jpeg";
import reception from "@/assets/studio-reception.jpeg";
import beds from "@/assets/studio-beds.jpeg";
import lounge from "@/assets/studio-lounge.jpeg";
import waiting from "@/assets/studio-waiting.jpeg";
import consult from "@/assets/studio-consult.jpeg";
import desk from "@/assets/studio-desk.jpeg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Equà Studio | Founded by Sahrish, Principal Esthetician" },
      {
        name: "description",
        content:
          "Meet Sahrish, founder and principal esthetician of Equà Studio in Bahria Town, Lahore. Our story, our values, and a look inside the studio.",
      },
      { property: "og:title", content: "About Equà Studio & Founder Sahrish" },
      {
        property: "og:description",
        content:
          "A space where beauty meets honesty, expertise and genuine care — inside Equà Studio, Lahore.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  {
    title: "Consultation before treatment",
    text: "Every skin, brow and semi-permanent makeup service starts with a conversation. We map, patch-test and plan — because a beautiful result depends on the right decision, not the fastest one.",
  },
  {
    title: "Two tiers, clearly priced",
    text: "Many treatments come in an Equà Studio version and a Signature by Sahrish version, performed by our founder. Both are listed side by side so you can choose without being sold to.",
  },
  {
    title: "Products we'd use ourselves",
    text: "CoNatural botanicals, Cadiveu repair, professional hydrafacial serums and medical-grade pigments — chosen because they perform on Pakistani skin and hair, not because of a distributor deal.",
  },
  {
    title: "Aftercare that continues",
    text: "You leave with written aftercare and a WhatsApp line to check in on. Healing questions after a lip blush or a keratin treatment are always welcome.",
  },
];

const gallery = [
  { src: reception, id: "studio-interior-1", alt: "Reception desk and open floor at Equà Studio" },
  { src: beds, id: "studio-interior-2", alt: "Two curtained treatment beds with arc lamps" },
  { src: consult, id: "studio-interior-3", alt: "Consultation room with treatment bed and desk" },
  { src: lounge, id: "studio-interior-4", alt: "Client lounge with plum and cream seating" },
  { src: waiting, id: "studio-interior-5", alt: "Waiting area with soft seating and side tables" },
  { src: desk, id: "studio-interior-6", alt: "Quiet consultation desk with notes and air purifier" },
];

function About() {
  return (
    <>
      <section className="surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-4 text-4xl md:text-5xl">
            A space where beauty meets <span className="text-mauve italic">honesty</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Equà Studio opened in Bahria Town with a small, deliberate promise: no exaggerated
            claims, no packages you don't need, and no treatment performed by someone who hasn't
            trained for it. Everything you see on our menu exists because clients asked for it and we
            could deliver it properly.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div className="surface-cream absolute -bottom-5 -left-5 hidden h-40 w-40 md:block" />
            <img
              id="founder-photo"
              src={founder}
              alt="Sahrish, founder and principal esthetician of Equà Studio, seated in the studio"
              className="relative w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">Founder & principal esthetician</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Hi, I'm Sahrish</h2>
            <div className="gold-rule mt-6" />
            <div className="mt-7 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                “I founded Equà Studio with a simple vision — to create a space where beauty meets
                honesty, expertise and genuine care. Every treatment is tailored to the individual,
                because I believe confidence begins with feeling comfortable in your own skin.
              </p>
              <p>
                Before Equà, I spent years watching people leave salons with results that weren't
                theirs — brows that didn't suit their face, treatments sold rather than
                recommended. I wanted the opposite: a studio where I sit with you first, explain what
                your skin or hair actually needs, and tell you honestly when the answer is to wait.
              </p>
              <p>
                I still personally perform every Signature service and every semi-permanent makeup
                consultation. It keeps the standard where I want it, and it means I get to know the
                people who trust me with their faces.
              </p>
              <p>
                I'm grateful you're here, and I look forward to being part of your self-care
                journey.”
              </p>
            </div>
            <p className="mt-7 text-xs tracking-[0.24em] text-mauve uppercase">
              Sahrish · Founder & Principal Esthetician
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="surface-warm py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">What makes us different</p>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">
            Four things we won't compromise on
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="bg-card p-8">
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Inside the studio</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Come see it before you book</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Private curtained rooms, warm lighting, and a lounge you're welcome to sit in with a cup
            of tea while your treatment sets.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <img
                key={g.id}
                id={g.id}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover shadow-[var(--shadow-soft)]"
              />
            ))}
          </div>
        </div>
      </section>

      <BookingCta
        title="Book a consultation first"
        body="Not sure which treatment is right? Book a consultation and we'll walk you through options, timelines and honest expectations."
      />
    </>
  );
}
