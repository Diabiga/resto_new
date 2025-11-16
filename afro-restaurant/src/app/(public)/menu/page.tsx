import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/format";

export const revalidate = 60;

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    include: { dishes: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });

  const firstCategory = categories[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
          Carte complète
        </p>
        <h1 className="font-serif text-5xl text-white">Menu Maison Lagune</h1>
        <p className="text-zinc-300">
          Entrées, grillades, spécialités africaines, desserts et mixologie.
        </p>
      </div>

      <Tabs defaultValue={firstCategory?.slug ?? ""} className="space-y-8">
        <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.slug}
              className="rounded-full border border-white/10 px-4 py-2 data-[state=active]:bg-amber-400 data-[state=active]:text-black"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.slug}>
            <div className="grid gap-6 md:grid-cols-2">
              {category.dishes.map((dish) => (
                <article
                  key={dish.id}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-black/40 p-4"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                    <Image src={dish.imageUrl} alt={dish.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl text-white">{dish.name}</h3>
                      <span className="text-amber-300">{formatPrice(dish.price)}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{dish.description}</p>
                    {dish.allergens && (
                      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                        Allergènes: {dish.allergens}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
