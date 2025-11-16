import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata = {
  title: `Contact · ${siteConfig.name}`,
};

export default function ContactPage() {
  return (
    <div className="space-y-10 px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-400">Contact</p>
        <h1 className="font-serif text-5xl text-white">Nous écrire ou appeler</h1>
        <p className="text-zinc-300">
          Service réservation, privatisation, presse et collaborations culinaires.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Email</p>
          <Link href={`mailto:${siteConfig.email}`} className="text-2xl text-white">
            {siteConfig.email}
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Téléphone</p>
          <Link href={`tel:${siteConfig.phone}`} className="text-2xl text-white">
            {siteConfig.phone}
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">WhatsApp</p>
          <Link
            href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
            className="text-2xl text-white"
          >
            {siteConfig.whatsapp}
          </Link>
        </div>
      </div>
      <ContactCta />
    </div>
  );
}
