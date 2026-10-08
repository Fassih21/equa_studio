import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/post/$id")({ component: Editor });

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Editor() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const isNew = id === "new";
  const [f, setF] = useState({
    title: "", slug: "", excerpt: "", cover_url: "", published: false, published_at: null as string | null,
  });
  const [html, setHtml] = useState<string | null>(isNew ? "" : null);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editorProps: { attributes: { class: "post-body min-h-[300px] border p-3 focus:outline-none" } },
  });

  useEffect(() => {
    if (isNew) return;
    supabase.from("posts").select("*").eq("id", id).single().then(({ data }) => {
      if (!data) return;
      setF({ title: data.title, slug: data.slug, excerpt: data.excerpt ?? "",
        cover_url: data.cover_url ?? "", published: data.published, published_at: data.published_at });
      setHtml(data.content);
    });
  }, [id, isNew]);

  useEffect(() => {
    if (editor && html !== null) editor.commands.setContent(html);
  }, [editor, html]);

  async function upload(file: File) {
    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) return alert(error.message);
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setF((p) => ({ ...p, cover_url: data.publicUrl }));
  }

  async function save() {
    if (!editor || !f.title) return alert("Title required");
    if (saving) return;
    setSaving(true);
    const row = {
      title: f.title,
      slug: f.slug || slugify(f.title),
      excerpt: f.excerpt || null,
      cover_url: f.cover_url || null,
      content: editor.getHTML(),
      published: f.published,
      published_at: f.published ? f.published_at ?? new Date().toISOString() : f.published_at,
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

  const btn = "border px-2 py-1 text-sm";
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-5 py-16">
      <input className="w-full border p-2 text-xl" placeholder="Title" value={f.title}
        onChange={(e) => setF({ ...f, title: e.target.value })} />
      <input className="w-full border p-2 text-sm" placeholder="Slug (auto from title if empty)" value={f.slug}
        onChange={(e) => setF({ ...f, slug: e.target.value })} />
      <textarea className="w-full border p-2 text-sm" placeholder="Short excerpt" value={f.excerpt}
        onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
      <div>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        {f.cover_url && <img src={f.cover_url} alt="" className="mt-2 h-32 object-cover" />}
      </div>
      <div className="space-x-2">
        <button type="button" className={btn} onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" className={btn} onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
        <button type="button" className={btn} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className={btn} onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</button>
      </div>
      <EditorContent editor={editor} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} />
        Publish
      </label>
      <button
        onClick={save}
        disabled={saving}
        className="bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}