import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("title,excerpt,content,cover_url,published_at")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw notFound();

    return data;
  },

  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title} | Equà Studio` },
      {
        name: "description",
        content: loaderData?.excerpt ?? "",
      },
      {
        property: "og:title",
        content: loaderData?.title ?? "",
      },
      {
        property: "og:image",
        content: loaderData?.cover_url ?? "",
      },
    ],
  }),

  component: Post,
});

function getReadingTime(content: string | null) {
  if (!content) return 1;

  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: string | null) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Post() {
  const post = Route.useLoaderData();

  const readingTime = getReadingTime(post.content);
  const formattedDate = formatDate(post.published_at);

  return (
    <article className="bg-background">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="border-b border-gold/20 bg-gradient-to-br from-[#fffdf9] via-background to-[#f5ede3]">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
          {/* Back */}
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            All articles
          </Link>

          <div className="mt-12 grid items-end gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Editorial heading */}
            <div className="fade-up">
              <div className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                The Journal
              </div>

              <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[0.95] tracking-[-0.025em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gold/25 pt-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {formattedDate && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-3.5 text-mauve" />
                    {formattedDate}
                  </span>
                )}

                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-3.5 text-mauve" />
                  {readingTime} min read
                </span>
              </div>
            </div>

            {/* Cover */}
            <div className="relative overflow-hidden">
              <div className="absolute -inset-3 rounded-sm border border-gold/20" />

              {post.cover_url ? (
                <img
                  src={post.cover_url}
                  alt={post.title}
                  className="relative aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-[#f6ede2] to-sand">
                  <div className="absolute inset-8 border border-primary/15" />

                  <div className="text-center">
                    <span className="block font-display text-5xl tracking-[0.18em] text-primary/80">
                      EQUÀ
                    </span>
                    <span className="mt-2 block text-[0.55rem] tracking-[0.5em] text-mauve">
                      STUDIO
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── ARTICLE ───────────────────────── */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[180px_minmax(0,680px)_1fr]">
          {/* Small side label */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="eyebrow">Equà Journal</div>

              <div className="mt-5 h-px w-10 bg-gold" />

              <p className="mt-5 max-w-[130px] text-xs leading-5 text-muted-foreground">
                Considered thoughts on beauty, skin, hair and self-care.
              </p>
            </div>
          </aside>

          {/* Content */}
          <div
            className="post-body max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          {/* Desktop CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-gold/30 bg-cream/60 p-6">
              <Sparkles className="size-5 text-mauve" />

              <p className="mt-5 font-display text-2xl leading-tight">
                Ready for your next visit?
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Let’s create something considered, personal and completely yours.
              </p>

              <Link
                to="/appointment"
                className="group mt-6 inline-flex w-full items-center justify-between bg-primary px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary/90"
              >
                Book now
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ───────────────────────── MOBILE CTA ───────────────────────── */}
      <section className="px-5 pb-20 lg:hidden">
        <div className="relative overflow-hidden border border-gold/30 bg-gradient-to-br from-cream to-[#f4e8db] p-7">
          <div className="absolute -right-10 -top-10 size-32 rounded-full border border-primary/10" />

          <Sparkles className="relative size-5 text-mauve" />

          <h2 className="relative mt-5 font-display text-3xl leading-tight">
            Ready for your next visit?
          </h2>

          <p className="relative mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Let’s create something considered, personal and completely yours.
          </p>

          <Link
            to="/appointment"
            className="group relative mt-6 inline-flex items-center gap-3 bg-primary px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book now
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </article>
  );
}