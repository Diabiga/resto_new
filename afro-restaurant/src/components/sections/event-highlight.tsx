import Image from "next/image";
import type { Event } from "@prisma/client";
import { formatDate } from "@/lib/format";

export function EventHighlight({ event }: { event: Event | null }) {
  if (!event) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 rounded-[40px] border border-white/10 bg-black/40 p-6 md:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-[30px]">
          <Image
            src={
              event.coverUrl ??
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            }
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
            Événement
          </p>
          <h2 className="font-serif text-4xl text-white">{event.title}</h2>
          <p className="text-zinc-300">{event.description}</p>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
            {formatDate(event.startAt)}
          </p>
        </div>
      </div>
    </section>
  );
}
