import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { QrOrderPanel } from "@/components/qr/qr-order-panel";

type QrPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function QrPage({ params }: QrPageProps) {
  const { slug } = await params;
  const table = await prisma.table.findUnique({
    where: { qrSlug: slug },
  });

  if (!table) {
    return notFound();
  }

  const categories = await prisma.category.findMany({
    include: { dishes: { where: { isAvailable: true }, orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-400">
          Service à table connecté
        </p>
        <h1 className="font-serif text-5xl text-white">Table {table.label}</h1>
        <p className="text-zinc-400">
          Scannez, commandez, suivez vos plats en cuisine. Pas besoin d’attendre.
        </p>
      </div>
      <QrOrderPanel tableSlug={slug} categories={categories} />
    </div>
  );
}
