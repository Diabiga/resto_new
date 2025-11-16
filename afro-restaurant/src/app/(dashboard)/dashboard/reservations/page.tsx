import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export default async function ReservationsAdminPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { scheduledFor: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-white">Réservations</h1>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <article
            key={reservation.id}
            className="rounded-3xl border border-white/10 bg-black/40 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl text-white">{reservation.guestName}</p>
                <p className="text-sm text-zinc-400">
                  {formatDate(reservation.scheduledFor)} · {reservation.partySize} pers
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300">
                {reservation.status}
              </span>
            </div>
            {reservation.notes && (
              <p className="mt-3 text-sm text-zinc-300">{reservation.notes}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
