import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";
import { OrderStatus } from "@prisma/client";

export const revalidate = 0;

export default async function DashboardHome() {
  const [reservationsCount, ordersCount, dishesCount, reservations, orders] =
    await Promise.all([
      prisma.reservation.count({ where: { scheduledFor: { gte: new Date() } } }),
      prisma.order.count({ where: { status: { not: OrderStatus.SERVED } } }),
      prisma.dish.count(),
      prisma.reservation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { table: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Réservations à venir" value={reservationsCount} />
        <Card title="Commandes actives" value={ordersCount} />
        <Card title="Plats au menu" value={dishesCount} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-white/10 p-6">
          <h2 className="font-serif text-2xl text-white">Dernières réservations</h2>
          <div className="mt-4 space-y-3">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="rounded-2xl bg-black/40 p-4">
                <p className="text-white">{reservation.guestName}</p>
                <p className="text-sm text-zinc-400">
                  {formatDate(reservation.scheduledFor)} · {reservation.partySize} pers.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 p-6">
          <h2 className="font-serif text-2xl text-white">Commandes en salle</h2>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-black/40 p-4">
                <p className="text-white">{order.table?.label ?? "QR"}</p>
                <p className="text-sm text-zinc-400">
                  {order.items.length} plats · {formatPrice(order.total)}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  {order.status}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">{title}</p>
      <p className="text-4xl font-semibold text-white">{value}</p>
    </div>
  );
}
