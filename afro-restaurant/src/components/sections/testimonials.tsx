const testimonials = [
  {
    name: "Nadine, Abidjan",
    comment:
      "Une immersion totale dans les saveurs ivoiriennes revisitées. Service précis, ambiance feutrée et attentionnée.",
  },
  {
    name: "Kofi, Accra",
    comment:
      "La commande via QR simplifie tout. Les plats arrivent chauds, suivis en temps réel par l’équipe.",
  },
  {
    name: "Camille, Paris",
    comment:
      "L’accord cacao & crustacés est incroyable. Bravo pour le mélange de modernité et d’héritage africain.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white/5 py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
            Expériences
          </p>
          <h2 className="font-serif text-4xl text-white">Avis de nos convives</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-black/40 p-6"
            >
              <p className="text-lg text-white">“{testimonial.comment}”</p>
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-amber-300">
                {testimonial.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
