import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login") return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/admin/login" });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex,nofollow" }] }),
  component: () => <Outlet />,
});