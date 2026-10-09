import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bold,
  Check,
  ExternalLink,
  ImagePlus,
  Italic,
  List,
  Loader2,
  Save,
  Trash2,
  Type,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/post/$id")({
  component: Editor,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Editor() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const isNew = id === "new";

  const [f, setF] = useState({
    title: "",
    slug: "",
    excerpt: "",
    cover_url: "",
    published: false,
    published_at: null as string | null,
  });

  const [html, setHtml] = useState<string | null>(isNew ? "" : null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "post-body min-h-[420px] px-5 py-6 md:px-8 md:py-8 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (isNew) return;

    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) return;

        setF({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          cover_url: data.cover_url ?? "",
          published: data.published,
          published_at: data.published_at,
        });

        setHtml(data.content);
      });
  }, [id, isNew]);

  useEffect(() => {
    if (editor && html !== null) {
      editor.commands.setContent(html);
    }
  }, [editor, html]);

  async function upload(file: File) {
    setUploading(true);

    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(path, file);

    if (error) {
      setUploading(false);
      return alert(error.message);
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(path);

    setF((p) => ({
      ...p,
      cover_url: data.publicUrl,
    }));

    setUploading(false);
  }

  async function save() {
    if (!editor || !f.title.trim()) {
      return alert("Title required");
    }

    if (saving) return;

    setSaving(true);

    const row = {
      title: f.title.trim(),
      slug: f.slug.trim() || slugify(f.title),
      excerpt: f.excerpt.trim() || null,
      cover_url: f.cover_url || null,
      content: editor.getHTML(),
      published: f.published,
      published_at: f.published
        ? f.published_at ?? new Date().toISOString()
        : f.published_at,
    };

    const { error } = isNew
      ? await supabase.from("posts").insert(row)
      : await supabase.from("posts").update(row).eq("id", id);

    if (error) {
      setSaving(false);
      return alert(error.message);
    }

    nav({ to: "/admin" });
  }

  const toggleButton =
    "inline-flex size-9 items-center justify-center border border-transparent text-muted-foreground transition-all hover:border-border hover:bg-cream hover:text-primary";

  return (
    <div className="min-h-[calc(100vh-82px)] bg-gradient-to-br from-cream/40 via-background to-sand/10">
      {/* ─────────────────────────────
          TOP EDITOR BAR
      ───────────────────────────── */}
      <div className="border-b border-gold/30 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            to="/admin"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to journal
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
            >
              View website
              <ExternalLink className="size-3.5" />
            </Link>

            <button
              onClick={save}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}

              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────
          MAIN
      ───────────────────────────── */}
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        {/* Page intro */}
        <div className="mb-10">
          <p className="eyebrow">
            {isNew ? "New journal entry" : "Editing journal entry"}
          </p>

          <h1 className="mt-3 font-display text-5xl leading-none tracking-[-0.02em] md:text-6xl">
            {isNew ? "Create a story" : "Edit your story"}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Write something thoughtful for the Equà Studio journal. Keep it
            useful, honest and beautifully considered.
          </p>
        </div>

        {/* ─────────────────────────────
            EDITOR GRID
        ───────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* LEFT — ARTICLE */}
          <section className="min-w-0 border border-gold/30 bg-background">
            {/* Article heading */}
            <div className="border-b border-border px-5 py-6 md:px-8 md:py-7">
              <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-mauve">
                Article
              </p>

              <input
                className="w-full border-0 bg-transparent p-0 font-display text-4xl leading-tight text-foreground outline-none placeholder:text-muted-foreground/35 md:text-5xl"
                placeholder="Your article title..."
                value={f.title}
                onChange={(e) =>
                  setF({
                    ...f,
                    title: e.target.value,
                  })
                }
              />

              <div className="mt-6">
                <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  URL slug
                </label>

                <div className="flex items-center border border-border bg-cream/40 px-3 focus-within:border-mauve">
                  <span className="shrink-0 text-xs text-muted-foreground">
                    /blog/
                  </span>

                  <input
                    className="min-w-0 flex-1 border-0 bg-transparent px-1 py-2.5 text-sm outline-none"
                    placeholder="article-slug"
                    value={f.slug}
                    onChange={(e) =>
                      setF({
                        ...f,
                        slug: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Excerpt
                </label>

                <textarea
                  className="min-h-24 w-full resize-y border border-border bg-cream/40 px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-mauve focus:bg-background"
                  placeholder="A short introduction to your article..."
                  value={f.excerpt}
                  onChange={(e) =>
                    setF({
                      ...f,
                      excerpt: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="border-b border-border bg-cream/30 px-5 py-3 md:px-8">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Bold"
                    className={`${toggleButton} ${
                      editor?.isActive("bold")
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() =>
                      editor?.chain().focus().toggleBold().run()
                    }
                  >
                    <Bold className="size-4" />
                  </button>

                  <button
                    type="button"
                    title="Italic"
                    className={`${toggleButton} ${
                      editor?.isActive("italic")
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() =>
                      editor?.chain().focus().toggleItalic().run()
                    }
                  >
                    <Italic className="size-4" />
                  </button>

                  <div className="mx-2 h-5 w-px bg-border" />

                  <button
                    type="button"
                    title="Heading"
                    className={`${toggleButton} ${
                      editor?.isActive("heading", { level: 2 })
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() =>
                      editor
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 2 })
                        .run()
                    }
                  >
                    <Type className="size-4" />
                  </button>

                  <button
                    type="button"
                    title="Bullet list"
                    className={`${toggleButton} ${
                      editor?.isActive("bulletList")
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                  >
                    <List className="size-4" />
                  </button>

                  <span className="ml-auto text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground">
                    Content
                  </span>
                </div>
              </div>

              <EditorContent editor={editor} />
            </div>
          </section>

          {/* RIGHT — SETTINGS */}
          <aside className="space-y-5">
            {/* Publishing */}
            <section className="border border-gold/30 bg-background p-5 md:p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mauve">
                Publishing
              </p>

              <h2 className="mt-2 font-display text-2xl">
                Article status
              </h2>

              <button
                type="button"
                onClick={() =>
                  setF({
                    ...f,
                    published: !f.published,
                  })
                }
                className={`mt-5 flex w-full items-start gap-3 border p-4 text-left transition-all ${
                  f.published
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-cream/40 hover:border-mauve"
                }`}
              >
                <span
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    f.published
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {f.published && <Check className="size-3" />}
                </span>

                <span>
                  <span className="block text-sm font-medium">
                    {f.published ? "Published" : "Draft"}
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {f.published
                      ? "This article is visible on the public journal."
                      : "This article is saved privately until published."}
                  </span>
                </span>
              </button>
            </section>

            {/* Cover */}
            <section className="border border-gold/30 bg-background p-5 md:p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mauve">
                Cover image
              </p>

              <h2 className="mt-2 font-display text-2xl">
                Give it a visual
              </h2>

              {f.cover_url ? (
                <div className="mt-5">
                  <div className="group relative overflow-hidden bg-cream">
                    <img
                      src={f.cover_url}
                      alt=""
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs text-white">
                        Current cover
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 border border-border px-3 py-2.5 text-xs uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary">
                      <ImagePlus className="size-3.5" />
                      Change

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          upload(e.target.files[0])
                        }
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setF({
                          ...f,
                          cover_url: "",
                        })
                      }
                      className="inline-flex items-center justify-center border border-border px-3 py-2.5 text-muted-foreground transition-colors hover:border-red-200 hover:text-red-600"
                      title="Remove cover"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center border border-dashed border-gold/50 bg-cream/40 px-5 text-center transition-colors hover:border-mauve hover:bg-cream">
                  {uploading ? (
                    <>
                      <Loader2 className="size-6 animate-spin text-mauve" />

                      <span className="mt-3 text-sm">
                        Uploading image...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex size-11 items-center justify-center border border-gold/40 bg-background">
                        <ImagePlus className="size-5 text-mauve" />
                      </span>

                      <span className="mt-4 text-sm">
                        Upload cover image
                      </span>

                      <span className="mt-1 text-xs text-muted-foreground">
                        JPG, PNG or WEBP
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      upload(e.target.files[0])
                    }
                  />
                </label>
              )}
            </section>

            {/* Save card */}
            <section className="border border-gold/30 bg-cream p-5 md:p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                {f.published
                  ? "Your article will be visible to visitors on the journal."
                  : "Save this article as a draft and publish it whenever it's ready."}
              </p>

              <button
                onClick={save}
                disabled={saving || uploading}
                className="mt-5 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-xs uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}

                {saving ? "Saving..." : "Save changes"}
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}