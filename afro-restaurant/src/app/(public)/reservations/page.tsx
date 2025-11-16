import { ReservationForm } from "@/components/reservations/reservation-form";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Réservation · ${siteConfig.name}`,
};

export default function ReservationsPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
          Réserver
        </p>
        <h1 className="font-serif text-5xl text-white">
          Table, salon privé ou terrasse
        </h1>
        <p className="text-zinc-300">
          Choisissez votre service, indiquez vos attentes, nous vous confirmons par
          email et WhatsApp sous quelques minutes.
        </p>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>• Confirmation email (Resend)</li>
          <li>• WhatsApp direct {siteConfig.whatsapp}</li>
          <li>• Tables connectées (QR) pour commander dès votre arrivée</li>
          <li>• Possibilité de précommandes pour la cuisine</li>
        </ul>
      </div>
      <ReservationForm />
    </div>
  );
}
