import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Réserver" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ sticky }: { sticky?: boolean }) {
  return (
    <header
      className={cn(
        "w-full px-6 py-4 transition-all duration-300",
        sticky && "sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-widest text-white">
          Maison Lagune
        </Link>

        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-zinc-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-amber-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="outline"
            className="border-amber-400/60 bg-transparent text-amber-300 hover:bg-amber-400 hover:text-black"
          >
            <Link href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}>
              WhatsApp
            </Link>
          </Button>
          <Button
            asChild
            className="bg-white text-black hover:bg-amber-400"
          >
            <Link href={`tel:${siteConfig.phone}`}>Appeler</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
