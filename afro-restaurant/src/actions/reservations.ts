"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validations";
import { sendReservationEmail } from "@/lib/email";

export type ReservationActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createReservationAction(
  _prevState: ReservationActionState,
  formData: FormData,
): Promise<ReservationActionState> {
  const raw = {
    guestName: formData.get("guestName"),
    guestEmail: formData.get("guestEmail"),
    guestPhone: formData.get("guestPhone"),
    partySize: Number(formData.get("partySize")),
    serviceDate: formData.get("serviceDate"),
    serviceTime: formData.get("serviceTime"),
    message: formData.get("message") ?? "",
  };

  const parsed = reservationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { serviceDate, serviceTime, ...rest } = parsed.data;
  const scheduledFor = new Date(`${serviceDate}T${serviceTime}:00`);

  await prisma.reservation.create({
    data: {
      ...rest,
      scheduledFor,
      notes: rest.message ?? "",
    },
  });

  await sendReservationEmail({
    guestName: rest.guestName,
    guestEmail: rest.guestEmail,
    partySize: rest.partySize,
    serviceDate,
    serviceTime,
  });

  revalidatePath("/reservations");
  revalidatePath("/dashboard/reservations");

  return { success: true, message: "Réservation confirmée" };
}
