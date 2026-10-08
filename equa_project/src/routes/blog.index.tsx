import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id,title,slug,excerpt,cover_url,published_at,content")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(({ content, ...p }) => {
      const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
      return { ...p, mins: Math.max(1, Math.round(words / 200)) };
    });
  },
  head: () => ({
    meta: [
      { title: "Journal | Equà Studio" },
      { name: "description", content: "Skincare and beauty articles by Sahrish, Equà Studio." },
    ],
  }),
  component: Blog,
});

type Post = ReturnType<typeof Route.useLoaderData>[number];

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

function Cover({ p, className }: { p: Post; className: string }) {
  return p.cover_url ? (
    <img
      src={p.cover_url}
      alt={p.title}
      loading="lazy"
      className={`${className} object-cover transition duration-700 group-hover:scale-105`}
    />
  ) : (
    <div className={`${className} flex items-center justify-center bg-linear-to-br from-cream to-sand`}>
      <span className="font-display text-3xl tracking-[0.18em] text-mauve/60">EQUÀ</span>
    </div>
  );
}

function Meta({ p }: { p: Post }) {
  return (
    <div className="flex items-center gap-4 text-xs tracking-wide text-muted-foreground">
      {p.published_at && (
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-mauve" />
          {fmt(p.published_at)}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Clock className="size-3.5 text-mauve" />
        {p.mins} min read
      </span>
    </div>
  );
}

function Blog() {
  const posts = Route.useLoaderData();
  const [first, ...rest] = posts;

  return (
    <div className="bg-linear-to-b from-cream/60 to-background">
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-10 text-center">
        <p className="text-xs tracking-[0.42em] text-mauve uppercase">The Journal</p>
        <h1 className="font-display mt-4 text-5xl md:text-6xl">Beauty, skin &amp; self-care</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Honest advice and expert insights from Sahrish, straight from the studio.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        {posts.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">New articles are coming soon.</p>
        )}

        {first && (
          <Link
            to="/blog/$slug"
            params={{ slug: first.slug }}
            className="group grid overflow-hidden rounded-md border border-gold/40 bg-card shadow-sm transition hover:shadow-xl md:grid-cols-2"
          >
            <div className="overflow-hidden">
              <Cover p={first} className="aspect-[4/3] h-full w-full" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] tracking-[0.2em] text-primary uppercase">
                Latest
              </span>
              <Meta p={first} />
              <h2 className="font-display text-3xl leading-tight transition group-hover:text-primary md:text-4xl">
                {first.title}
              </h2>
              {first.excerpt && (
                <p className="line-clamp-4 text-muted-foreground">{first.excerpt}</p>
              )}
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-primary uppercase">
                Read article <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col overflow-hidden rounded-md border border-gold/40 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <Cover p={p} className="aspect-[4/3] w-full" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <Meta p={p} />
                  <h2 className="font-display text-2xl leading-snug transition group-hover:text-primary">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  )}
                  <span className="mt-auto flex items-center gap-2 pt-2 text-xs tracking-[0.2em] text-primary uppercase">
                    Read more <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}