import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

type Row = { id: string; title: string; published: boolean };

function Dashboard() {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Row[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from("posts").select("id,title,published").order("created_at", { ascending: false });
    setPosts(data ?? []);
  };
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    load();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Posts</h1>
        <Link to="/admin/post/$id" params={{ id: "new" }} className="bg-primary px-4 py-2 text-primary-foreground">
          New post
        </Link>
      </div>
      <ul className="mt-8 divide-y">
        {posts.map((p) => (
          <li key={p.id} className="flex items-center justify-between py-3">
            <span>{p.title} <em className="text-xs text-muted-foreground">{p.published ? "Published" : "Draft"}</em></span>
            <span className="space-x-4 text-sm">
              <Link to="/admin/post/$id" params={{ id: p.id }} className="underline">Edit</Link>
              <button onClick={() => remove(p.id)} className="text-red-600 underline">Delete</button>
            </span>
          </li>
        ))}
      </ul>
      <button className="mt-10 text-sm underline" onClick={async () => {
        await supabase.auth.signOut();
        nav({ to: "/admin/login" });
      }}>Sign out</button>
    </div>
  );
}