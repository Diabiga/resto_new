import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
          {siteConfig.location}
        </p>
        <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
          Cuisine d’auteur inspirée des terres ivoiriennes
        </h1>
        <p className="text-lg text-zinc-300">
          Une expérience sensorielle autour des produits nobles d’Afrique de
          l’Ouest. Table signature, mixologie, musique live sur la lagune Ebrié.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-amber-400 text-black hover:bg-amber-300"
          >
            <Link href="/reservations">Réserver une table</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/qr/table-1">Commander à table</Link>
          </Button>
        </div>
        <div className="flex gap-8 text-sm uppercase tracking-[0.3em] text-zinc-400">
          <div>
            <p className="text-white">Cuisine</p>
            <p>Signature</p>
          </div>
          <div>
            <p className="text-white">Mixologie</p>
            <p>7 bars</p>
          </div>
          <div>
            <p className="text-white">Tables</p>
            <p>QR & Live</p>
          </div>
        </div>
      </div>

      <div className="relative h-[420px] rounded-[40px] border border-white/10 bg-[url('https://images.unsplash.com/photo-1421622548261-c45bfe178854?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 rounded-3xl border border-white/20 bg-black/40 p-6 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
            Chef exécutif
          </p>
          <p className="font-serif text-2xl text-white">Kouamé Aka</p>
          <p className="text-sm text-zinc-300">
            Menu dégustation 8 services, accords champagne & cacao.
          </p>
        </div>
      </div>
    </section>
  );
}
