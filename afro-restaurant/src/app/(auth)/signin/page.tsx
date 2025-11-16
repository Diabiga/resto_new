import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Connexion · ${siteConfig.name}`,
  description: "Accès privé pour l’équipe Maison Lagune",
};

export default function SignInPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-[420px] space-y-8 p-6 text-center">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
            {siteConfig.location}
          </p>
          <h1 className="font-serif text-4xl">Maison Lagune</h1>
          <p className="text-sm text-zinc-300">
            Accès réservé aux équipes administratives et de salle.
          </p>
        </div>

        <SignInForm />

        <p className="text-xs text-zinc-400">
          Besoin d’aide ?{" "}
          <Link href={`mailto:${siteConfig.email}`} className="text-amber-300">
            {siteConfig.email}
          </Link>
        </p>
      </div>
    </section>
  );
}
