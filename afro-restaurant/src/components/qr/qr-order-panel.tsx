"use client";

import { useState } from "react";
import type { Category, Dish } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

type CategoryWithDishes = Category & { dishes: Dish[] };

type CartItem = {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
};

export function QrOrderPanel({
  tableSlug,
  categories,
}: {
  tableSlug: string;
  categories: CategoryWithDishes[];
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { dishId: dish.id, name: dish.name, price: Number(dish.price), quantity: 1 }];
    });
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.dishId === dishId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async () => {
    if (cart.length === 0) {
      toast.error("Ajoutez un plat");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableSlug,
          items: cart.map((item) => ({
            dishId: item.dishId,
            quantity: item.quantity,
          })),
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "Erreur");
      }
      toast.success("Commande envoyée", {
        description: "L’équipe est notifiée instantanément.",
      });
      setCart([]);
    } catch (error) {
      console.error(error);
      toast.error("Impossible d’envoyer la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-white">{category.name}</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                {category.dishes.length} plats
              </p>
            </div>
            <div className="grid gap-4">
              {category.dishes.map((dish) => (
                <article
                  key={dish.id}
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 p-4"
                >
                  <div>
                    <p className="text-lg text-white">{dish.name}</p>
                    <p className="text-sm text-zinc-400">{dish.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-300">{formatPrice(dish.price)}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-amber-200 text-white hover:bg-amber-400 hover:text-black"
                      onClick={() => addToCart(dish)}
                    >
                      Ajouter
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h3 className="font-serif text-2xl text-white">Commande</h3>
        <div className="mt-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-sm text-zinc-400">Votre panier est vide.</p>
          )}
          {cart.map((item) => (
            <div key={item.dishId} className="flex items-center justify-between">
              <div>
                <p className="text-white">{item.name}</p>
                <p className="text-sm text-amber-300">
                  {formatPrice(item.price)} · {item.quantity} pcs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.dishId, -1)}
                >
                  -
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.dishId, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between text-lg text-white">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <Button
          onClick={submitOrder}
          disabled={isSubmitting || cart.length === 0}
          className="mt-6 w-full bg-amber-400 text-black hover:bg-amber-300"
        >
          {isSubmitting ? "Envoi..." : "Envoyer en cuisine"}
        </Button>
      </aside>
    </div>
  );
}
