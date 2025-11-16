"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { createReservationAction, type ReservationActionState } from "@/actions/reservations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const initialState: ReservationActionState = { success: false };

export function ReservationForm() {
  const [state, formAction] = useFormState(createReservationAction, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        description: "Un email de confirmation vous a été envoyé.",
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="guestName">Nom complet</Label>
          <Input id="guestName" name="guestName" placeholder="Aïssata Koné" required />
          {state.errors?.guestName && (
            <p className="text-sm text-red-400">{state.errors.guestName[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="guestPhone">Téléphone</Label>
          <Input id="guestPhone" name="guestPhone" placeholder="+225 07 07 07 07" required />
          {state.errors?.guestPhone && (
            <p className="text-sm text-red-400">{state.errors.guestPhone[0]}</p>
          )}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="guestEmail">Email</Label>
          <Input id="guestEmail" name="guestEmail" type="email" placeholder="experience@email.com" required />
          {state.errors?.guestEmail && (
            <p className="text-sm text-red-400">{state.errors.guestEmail[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="partySize">Nombre de convives</Label>
          <Input id="partySize" name="partySize" type="number" min={1} max={12} defaultValue={2} required />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="serviceDate">Date</Label>
          <Input id="serviceDate" name="serviceDate" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serviceTime">Heure</Label>
          <Input id="serviceTime" name="serviceTime" type="time" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Intolérances, demandes spéciales..." rows={4} />
      </div>

      <Button type="submit" className="w-full bg-amber-400 text-black hover:bg-amber-300">
        Confirmer la réservation
      </Button>
    </form>
  );
}
