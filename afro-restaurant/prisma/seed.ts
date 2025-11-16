import { PrismaClient, UserRole, OrderStatus, ReservationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Entrées",
    slug: "entrees",
    summary: "Mises en bouche raffinées inspirées des marchés ivoiriens.",
    dishes: [
      {
        name: "Tartare d'Attiéké Royal",
        slug: "tartare-attieke-royal",
        description: "Attiéké finement grainé, mangue, avocat, huile rouge parfumée.",
        price: "9500",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      },
      {
        name: "Velouté de Gombo Fumé",
        slug: "veloute-gombo-fume",
        description: "Crème de gombo grillé, éclats d'arachides caramélisés.",
        price: "7800",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      },
    ],
  },
  {
    name: "Spécialités africaines",
    slug: "specialites-africaines",
    summary: "Plats signatures sublimant les classiques d'Afrique de l'Ouest.",
    dishes: [
      {
        name: "Gnocchis de Plantain & Sauce Claire",
        slug: "gnocchis-plantain",
        description: "Gnocchis moelleux servis avec un bouillon de sole et crevettes.",
        price: "13500",
        imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      },
      {
        name: "Chinchard braisé cacao",
        slug: "chinchard-cacao",
        description: "Poisson braisé, laquage cacao de Côte d'Ivoire, bananes vapeur.",
        price: "15000",
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
      },
    ],
  },
  {
    name: "Grillades & Viandes",
    slug: "grillades",
    summary: "Sélection premium maturée avec épices maison.",
    dishes: [
      {
        name: "Côte de boeuf boucanée",
        slug: "cote-boeuf-boucanee",
        description: "Marinade kola-café, fumage bois d'ébène, chimichurri bissap.",
        price: "22000",
        imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088",
      },
    ],
  },
  {
    name: "Desserts",
    slug: "desserts",
    summary: "Notes sucrées entre cacao, bissap et fruits exotiques.",
    dishes: [
      {
        name: "Dacquoise bissap & chocolat 70%",
        slug: "dacquoise-bissap",
        description: "Ganache montée cacao, coulis hibiscus, crumble sésame.",
        price: "8500",
        imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
      },
      {
        name: "Sorbet bissap-lime",
        slug: "sorbet-bissap-lime",
        description: "Sorbet minute, poudre de mangue verte, meringue coco.",
        price: "7200",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      },
    ],
  },
];

const tables = [
  { label: "Table 1", capacity: 2, qrSlug: "table-1" },
  { label: "Table 2", capacity: 4, qrSlug: "table-2" },
  { label: "Table 3", capacity: 6, qrSlug: "table-3" },
];

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash("Admin@2025", 10);

  await prisma.user.upsert({
    where: { email: "direction@maisonlagune.com" },
    update: {},
    create: {
      name: "Admin Maison Lagune",
      email: "direction@maisonlagune.com",
      role: UserRole.ADMIN,
      passwordHash,
      phone: "+2250101010101",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    },
  });

  for (const table of tables) {
    await prisma.table.upsert({
      where: { qrSlug: table.qrSlug },
      update: {},
      create: { ...table, qrCodeUrl: "" },
    });
  }

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, summary: category.summary },
      create: {
        name: category.name,
        slug: category.slug,
        summary: category.summary,
      },
    });

    for (const dish of category.dishes) {
      await prisma.dish.upsert({
        where: { slug: dish.slug },
        update: {
          name: dish.name,
          description: dish.description,
          price: dish.price,
          imageUrl: dish.imageUrl,
          categoryId: createdCategory.id,
        },
        create: {
          name: dish.name,
          slug: dish.slug,
          description: dish.description,
          price: dish.price,
          imageUrl: dish.imageUrl,
          categoryId: createdCategory.id,
        },
      });
    }
  }

  const tableOne = await prisma.table.findFirst({ where: { qrSlug: "table-1" } });

  if (tableOne) {
    const reservation = await prisma.reservation.create({
      data: {
        guestName: "Aïssata Koné",
        guestEmail: "aissata.kone@example.com",
        guestPhone: "+2250708080808",
        partySize: 4,
        scheduledFor: new Date(Date.now() + 3600 * 1000 * 24),
        status: ReservationStatus.CONFIRMED,
        tableId: tableOne.id,
      },
    });

    const dish = await prisma.dish.findFirst();
    if (dish) {
      await prisma.order.create({
        data: {
          tableId: tableOne.id,
          reservationId: reservation.id,
          status: OrderStatus.KITCHEN,
          total: dish.price,
          items: {
            create: [
              {
                dishId: dish.id,
                quantity: 2,
                unitPrice: dish.price,
                note: "Sans piment",
              },
            ],
          },
        },
      });
    }
  }

  await prisma.event.upsert({
    where: { slug: "soiree-jazz-champagne" },
    update: {},
    create: {
      title: "Soirée Jazz & Champagne",
      slug: "soiree-jazz-champagne",
      description: "Live band, menu dégustation 7 services, accords champagne.",
      startAt: new Date(Date.now() + 3600 * 1000 * 48),
      coverUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      featured: true,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "menu-signature-ivoirien" },
    update: {},
    create: {
      title: "Menu Signature Côte d'Ivoire",
      slug: "menu-signature-ivoirien",
      excerpt: "Un voyage gastronomique entre lagune et cacao.",
      content: "Découvrez notre nouveau parcours dégustation en 8 temps...",
      coverUrl: "https://images.unsplash.com/photo-1481391032119-d89fee407e44",
      published: true,
      publishAt: new Date(),
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
