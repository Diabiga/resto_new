import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-5xl rounded-[40px] border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-transparent px-8 py-12 text-center">
      <p className="text-sm uppercase tracking-[0.4em] text-amber-300">
        Contact VIP
      </p>
      <h2 className="font-serif text-4xl text-white">WhatsApp Concierge</h2>
      <p className="mt-4 text-lg text-zinc-300">
        Organisation d’événements, privatisation, menu dégustation sur-mesure.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          asChild
          className="bg-amber-400 text-black hover:bg-amber-300"
        >
          <Link href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}>
            Écrire sur WhatsApp
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="border-white/30 text-white hover:bg-white/10"
        >
          <Link href={`tel:${siteConfig.phone}`}>Appeler le Maître d’hôtel</Link>
        </Button>
      </div>
    </section>
  );
}
