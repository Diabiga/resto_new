import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { updateOrderStatusAction } from "@/actions/orders";

const statuses = Object.values(OrderStatus);

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { table: true, items: { include: { dish: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-white">Commandes QR & salle</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                  {order.table?.label ?? "QR invité"}
                </p>
                <p className="text-2xl text-white">{formatPrice(order.total)}</p>
                <ul className="mt-3 text-sm text-zinc-400">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity} × {item.dish.name}
                      {item.note && <span className="text-amber-200"> · {item.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <form
                action={async (formData) => {
                  "use server";
                  const status = formData.get("status") as OrderStatus;
                  await updateOrderStatusAction(order.id, status);
                }}
                className="space-y-2"
              >
                <select
                  name="status"
                  defaultValue={order.status}
                  className="rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm uppercase tracking-[0.3em]"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status} className="bg-black text-white">
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="block w-full rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black"
                >
                  Mettre à jour
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
