import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export default async function DashboardMenuPage() {
  const categories = await prisma.category.findMany({
    include: { dishes: { orderBy: { name: "asc" } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
            Gestion du menu
          </p>
          <h1 className="font-serif text-4xl text-white">Catégories & plats</h1>
        </div>
        <Button className="bg-amber-400 text-black hover:bg-amber-300">
          Ajouter un plat (coming soon)
        </Button>
      </div>
      <div className="space-y-4">
        {categories.map((category) => (
          <article key={category.id} className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-white">{category.name}</h2>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                {category.dishes.length} plats
              </p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {category.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 px-4 py-3"
                >
                  <div>
                    <p className="text-white">{dish.name}</p>
                    <p className="text-sm text-zinc-400">{dish.description}</p>
                  </div>
                  <p className="text-amber-300">{formatPrice(dish.price)}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
