import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      return setErr(error.message);
    }
    nav({ to: "/admin" });
  }

  const input =
    "mt-2 w-full rounded-sm border border-gold/40 bg-cream/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary";

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-linear-to-br from-cream via-background to-sand px-5 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-md border border-gold/50 bg-card/80 p-8 shadow-lg backdrop-blur md:p-10"
      >
        <div className="text-center">
          <span className="font-display block text-3xl tracking-[0.18em]">EQUÀ</span>
          <span className="mt-1 block text-[0.6rem] tracking-[0.42em] text-mauve">STUDIO</span>
          <h1 className="font-display mt-6 text-2xl">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your blog</p>
        </div>

        <div className="mt-8 space-y-5">
          <label className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
            Email
            <input
              className={input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
            Password
            <input
              className={input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {err && <p className="mt-4 text-center text-sm text-red-600">{err}</p>}

        <button
          disabled={loading}
          className="mt-8 w-full rounded-sm bg-primary py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}