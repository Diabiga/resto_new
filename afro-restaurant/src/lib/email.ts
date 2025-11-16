import { Resend } from "resend";
import { siteConfig } from "@/config/site";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendReservationEmail({
  guestName,
  guestEmail,
  partySize,
  serviceDate,
  serviceTime,
}: {
  guestName: string;
  guestEmail: string;
  partySize: number;
  serviceDate: string;
  serviceTime: string;
}) {
  if (!resend) return;

  await resend.emails.send({
    from: "Maison Lagune <experience@maisonlagune.com>",
    to: guestEmail,
    subject: `Confirmation de réservation - ${siteConfig.name}`,
    html: `
      <h1>Merci ${guestName}</h1>
      <p>Votre réservation est confirmée pour ${partySize} personne(s) le ${serviceDate} à ${serviceTime}.</p>
      <p>Adresse: ${siteConfig.address}</p>
      <p>Nous restons disponibles sur WhatsApp ${siteConfig.whatsapp}</p>
    `,
  });
}
