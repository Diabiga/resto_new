import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/sections/hero";
import { MenuPreview } from "@/components/sections/menu-preview";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { ContactCta } from "@/components/sections/contact-cta";
import { EventHighlight } from "@/components/sections/event-highlight";

export default async function HomePage() {
  const [categories, event] = await Promise.all([
    prisma.category.findMany({
      include: { dishes: { take: 3, orderBy: { createdAt: "desc" } } },
      take: 4,
    }),
    prisma.event.findFirst({ where: { featured: true }, orderBy: { startAt: "asc" } }),
  ]);

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <MenuPreview categories={categories} />
      <section className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
            Réservation
          </p>
          <h2 className="font-serif text-4xl text-white">
            Votre table au bord de la lagune
          </h2>
          <p className="text-zinc-300">
            Confirmation instantanée, email automatique, équipe dédiée en salle et en cuisine pour préparer votre arrivée.
          </p>
        </div>
        <ReservationForm />
      </section>
      <TestimonialsSection />
      <EventHighlight event={event} />
      <ContactCta />
    </div>
  );
}
