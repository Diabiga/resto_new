## Architecture fonctionnelle

- **Interfaces publiques** : pages vitrines (accueil, menu, réservations, événements) générées côté serveur via App Router, données servies par Prisma.
- **Commande via QR** : routes dynamiques `app/qr/[slug]/` chargent le menu pour la table identifiée, sessions stockées en `Table` + `Order`.
- **Réservations** : formulaire client -> action serveur -> `Reservation`, email Resend à l’invité + notification admin.
- **Admin** : layout protégé `app/(dashboard)/dashboard` avec widgets temps réel (React Query) et composants shadcn/ui (cards, tables, dialogs).
- **Auth** : NextAuth credentials (mode dev) + PrismaAdapter, rôles `ADMIN`/`STAFF` pour contrôler l’accès.
- **Assets** : upload via API route Cloudinary (`/api/upload`) utilisé par le back-office.
- **Emails & WhatsApp** : liens CTA vers Resend + deep links `https://wa.me/<phone>` et `tel:` pour contact immédiat.

## Architecture technique

| Couche | Responsabilités | Implémentation |
| --- | --- | --- |
| UI/Design System | Layout responsive premium (noir/doré), composants réutilisables, animations discrètes | Tailwind v4, shadcn/ui (Button, Card, Badge, Sheet, Dialog), `framer-motion`-like animations via `animate-[...]` utilitaires |
| State management | Formulaire avancé, commande QR, admin dashboard | React Hook Form + Zod, Zustand pour panier à table, @tanstack/react-query pour polling commandes |
| Données | ORM, migrations, seed évolutif | Prisma + SQLite (dev), `prisma/seed.ts` pour données de démonstration |
| Auth | Sessions staff/admin, protection dashboard/API | NextAuth credentials + PrismaAdapter, middleware route matcher |
| Services | Emails, Uploads, QR, Analytics | Resend (confirmation réservation), Cloudinary (images menu), `qrcode` (génération PNG/URL), instrumentation maison pour stats |

## Flux principaux

1. **Réservation** : formulaire -> action `createReservationAction` -> Prisma -> Resend -> revalidate `app/(public)/reservations`.
2. **Commande QR** : scan -> route `qr/[slug]` -> Zustand store pour panier -> action `createOrderAction` -> Prisma -> notifications cuisine (pending) -> admin dashboard sur React Query.
3. **Gestion menu** : admin CRUD -> API routes (mutations) -> revalidate `menu` & `qr`.
4. **Auth** : NextAuth route handlers -> middleware -> layout dashboard.
5. **Statistiques** : server components agrègent `Order`, `Reservation`, `Dish` -> cartes + charts.

## Arborescence clé

```
src/
  app/
    (public)/
      layout.tsx
      page.tsx
      menu/page.tsx
      reservations/page.tsx
      contact/page.tsx
    qr/[slug]/page.tsx
    (auth)/signin/page.tsx
    (dashboard)/dashboard/
      page.tsx
      menu/page.tsx
      reservations/page.tsx
      orders/page.tsx
    api/
      auth/[...nextauth]/route.ts
      reservations/route.ts
      orders/route.ts
      qr/[slug]/route.ts
      upload/route.ts
      stats/route.ts
  components/
    hero/
    menu/
    reservations/
    dashboard/
  lib/
    auth.ts
    prisma.ts
    email.ts
    cloudinary.ts
    qr.ts
    form.ts
    validations.ts
  stores/
    cart-store.ts
  data/
    featured.ts
```

## Étapes de livraison

1. **Scaffolding & design system** (DONE) – Next.js, Tailwind, shadcn init, palette premium.
2. **Base de données** (DONE) – Prisma schema + migration.
3. **Seed & outils** – scripts seed + utils (prisma, auth, validations).
4. **Interface publique** – sections hero, menu, réservation, CTA WhatsApp.
5. **Commande QR** – route dynamique + store panier + action.
6. **Admin dashboard** – layout + modules + stats temps réel.
7. **Services** – emails Resend, upload Cloudinary, QR builder.
8. **Tests & docs** – scripts pour vérifier (lint, prisma, vitest si besoin).
