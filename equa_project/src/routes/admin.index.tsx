import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

type Row = {
  id: string;
  title: string;
  published: boolean;
  created_at?: string;
};

function formatDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Dashboard() {
  const nav = useNavigate();

  const [posts, setPosts] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("posts")
      .select("id,title,published,created_at")
      .order("created_at", { ascending: false });

    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;

    setDeletingId(id);

    await supabase.from("posts").delete().eq("id", id);

    setDeletingId(null);
    load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/admin/login" });
  }

  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="min-h-[calc(100vh-82px)] bg-gradient-to-br from-cream/40 via-background to-sand/10">
      {/* ─────────────────────────────
          ADMIN HEADER
      ───────────────────────────── */}
      <header className="border-b border-gold/30 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link to="/" className="group">
            <span className="block font-display text-2xl tracking-[0.18em] transition-colors group-hover:text-primary">
              EQUÀ
            </span>

            <span className="mt-0.5 block text-[0.52rem] tracking-[0.45em] text-mauve">
              STUDIO
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
            >
              View website
              <ExternalLink className="size-3.5" />
            </Link>

            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────
          MAIN
      ───────────────────────────── */}
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        {/* Heading */}
        <section className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Studio Journal</p>

            <h1 className="mt-3 font-display text-5xl leading-none tracking-[-0.02em] md:text-6xl">
              Content & stories
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
              Manage the articles that make up Equà Studio's journal.
            </p>
          </div>

          <Link
            to="/admin/post/$id"
            params={{ id: "new" }}
            className="group inline-flex w-fit items-center gap-4 bg-primary px-5 py-3.5 text-xs uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <Plus className="size-4" />
            New post
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        {/* Stats */}
        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          <div className="border border-gold/30 bg-background/70 px-5 py-5">
            <div className="flex items-center gap-3">
              <FileText className="size-4 text-mauve" />
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Total posts
              </span>
            </div>

            <p className="mt-3 font-display text-4xl">{posts.length}</p>
          </div>

          <div className="border border-gold/30 bg-background/70 px-5 py-5">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-mauve" />

              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Published
              </span>
            </div>

            <p className="mt-3 font-display text-4xl">{publishedCount}</p>
          </div>

          <div className="border border-gold/30 bg-background/70 px-5 py-5">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full border border-mauve" />

              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Drafts
              </span>
            </div>

            <p className="mt-3 font-display text-4xl">{draftCount}</p>
          </div>
        </section>

        {/* Posts */}
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-primary">
              All posts
            </p>

            {!loading && (
              <span className="text-xs text-muted-foreground">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          <div className="overflow-hidden border border-gold/30 bg-background">
            {loading ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto size-5 animate-spin rounded-full border-2 border-gold/30 border-t-primary" />

                <p className="mt-4 text-sm text-muted-foreground">
                  Loading journal...
                </p>
              </div>
            ) : posts.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex size-12 items-center justify-center border border-gold/40 bg-cream">
                  <FileText className="size-5 text-mauve" />
                </div>

                <h2 className="mt-5 font-display text-3xl">
                  Your journal is empty.
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  Create your first article and start building the Equà Studio
                  journal.
                </p>

                <Link
                  to="/admin/post/$id"
                  params={{ id: "new" }}
                  className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="size-4" />
                  Create first post
                </Link>
              </div>
            ) : (
              <div>
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    className={`group flex flex-col gap-5 px-5 py-6 transition-colors hover:bg-cream/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${
                      index !== posts.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    {/* Post info */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary md:text-3xl">
                          {post.title}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] ${
                            post.published
                              ? "bg-primary/8 text-primary"
                              : "bg-cream text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              post.published
                                ? "bg-mauve"
                                : "border border-muted-foreground/50"
                            }`}
                          />

                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      {post.created_at && (
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                          {formatDate(post.created_at)}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      <Link
                        to="/admin/post/$id"
                        params={{ id: post.id }}
                        className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-all hover:border-primary hover:text-primary"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => remove(post.id)}
                        disabled={deletingId === post.id}
                        className="inline-flex items-center gap-2 border border-transparent px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="size-3.5" />

                        {deletingId === post.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}