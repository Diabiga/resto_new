import { z } from "zod";

export const reservationSchema = z.object({
  guestName: z.string().min(2, "Nom requis"),
  guestEmail: z.string().email("Email invalide"),
  guestPhone: z.string().min(8, "Téléphone requis"),
  partySize: z.number().min(1).max(12),
  serviceDate: z.string().min(1, "Date requise"),
  serviceTime: z.string().min(1, "Heure requise"),
  message: z.string().max(500).optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const qrOrderSchema = z.object({
  tableSlug: z.string(),
  items: z
    .array(
      z.object({
        dishId: z.string(),
        quantity: z.number().min(1),
        note: z.string().max(200).optional().or(z.literal("")),
      }),
    )
    .min(1, "Ajoutez au moins un plat"),
});

export type QrOrderInput = z.infer<typeof qrOrderSchema>;
