import Image from "next/image";
import type { Dish, Category } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";

type CategoryWithDishes = Category & { dishes: Dish[] };

export function MenuPreview({ categories }: { categories: CategoryWithDishes[] }) {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
            Menu
          </p>
          <h2 className="font-serif text-4xl text-white">
            Signatures de la Lagune
          </h2>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                  {category.summary}
                </p>
                <h3 className="font-serif text-2xl text-white">{category.name}</h3>
              </div>
              <Badge className="bg-amber-400 text-black">Chef</Badge>
            </div>
            <div className="space-y-4">
              {category.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-start gap-4 rounded-2xl bg-black/30 p-4"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                    <Image
                      src={dish.imageUrl}
                      alt={dish.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{dish.name}</p>
                      <span className="text-sm text-amber-300">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
