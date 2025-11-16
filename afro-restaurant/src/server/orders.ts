"use server";

import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { qrOrderSchema } from "@/lib/validations";

export async function createQrOrder(data: unknown) {
  const parsed = qrOrderSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0]?.message };
  }

  const table = await prisma.table.findUnique({
    where: { qrSlug: parsed.data.tableSlug },
  });

  if (!table) {
    return { success: false, message: "Table introuvable" };
  }

  const dishes = await prisma.dish.findMany({
    where: { id: { in: parsed.data.items.map((i) => i.dishId) } },
  });

  const items = parsed.data.items.map((item) => {
    const dish = dishes.find((d) => d.id === item.dishId);
    if (!dish) {
      throw new Error("Plat introuvable");
    }
    return {
      dishId: dish.id,
      quantity: item.quantity,
      unitPrice: Number(dish.price),
      note: item.note ?? "",
    };
  });

  const total = items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0,
  );

  await prisma.order.create({
    data: {
      tableId: table.id,
      status: OrderStatus.PENDING,
      total,
      items: { create: items },
    },
  });

  return { success: true, tableSlug: parsed.data.tableSlug };
}

export async function changeOrderStatus(orderId: string, status: OrderStatus) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}
