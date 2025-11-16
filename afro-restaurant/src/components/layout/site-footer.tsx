import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-white">{siteConfig.name}</p>
          <p>{siteConfig.address}</p>
          <p>{siteConfig.location}</p>
        </div>
        <div className="space-y-1">
          <Link href={`mailto:${siteConfig.email}`} className="block hover:text-amber-300">
            {siteConfig.email}
          </Link>
          <Link href={`tel:${siteConfig.phone}`} className="block hover:text-amber-300">
            {siteConfig.phone}
          </Link>
        </div>
        <div className="space-x-4 uppercase tracking-[0.3em]">
          <Link href={siteConfig.socials.instagram}>Instagram</Link>
          <Link href={siteConfig.socials.facebook}>Facebook</Link>
        </div>
      </div>
    </footer>
  );
}
