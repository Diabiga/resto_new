import type { ReactNode } from "react";
import Link from "next/link";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Vue globale" },
  { href: "/dashboard/menu", label: "Menu" },
  { href: "/dashboard/reservations", label: "Réservations" },
  { href: "/dashboard/orders", label: "Commandes" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <aside className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur">
        <Link href="/dashboard" className="font-serif text-2xl">
          Maison Lagune · Admin
        </Link>
        <div className="text-sm text-zinc-400">
          {session.user.name} · {session.user.role}
        </div>
      </aside>
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        <nav className="flex flex-col gap-3 text-sm uppercase tracking-[0.2em] text-zinc-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 hover:border-amber-400 hover:text-amber-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
