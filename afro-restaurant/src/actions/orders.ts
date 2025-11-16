"use server";

import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { changeOrderStatus, createQrOrder } from "@/server/orders";

export async function createQrOrderAction(input: unknown) {
  const result = await createQrOrder(input);
  if (!result.success) {
    return result;
  }

  revalidatePath(`/qr/${result.tableSlug}`);
  revalidatePath("/dashboard/orders");

  return { success: true };
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  await changeOrderStatus(orderId, status);

  revalidatePath("/dashboard/orders");
}
