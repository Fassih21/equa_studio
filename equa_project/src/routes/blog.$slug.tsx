import { createFileRoute, notFound, Link } from "@tanstack/react-router";
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
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },  
      { property: "og:image", content: loaderData?.cover_url ?? "" },
    ],
  }),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
        ← All articles
      </Link>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">{post.title}</h1>
      {post.published_at && (
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(post.published_at).toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
      )}
      {post.cover_url && (
        <img src={post.cover_url} alt={post.title} className="mt-8 w-full object-cover" />
      )}
      <div className="post-body mt-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}