export const siteConfig = {
  name: "Maison Lagune",
  location: "Abidjan, Côte d’Ivoire",
  description:
    "Table gastronomique africaine premium : menu signature, cave d’exception, service couture sur la lagune Ebrié.",
  whatsapp: process.env.WHATSAPP_PHONE ?? "+2250707070707",
  phone: process.env.RESTAURANT_PHONE ?? "+2252722003030",
  email: "experience@maisonlagune.com",
  socials: {
    instagram: "https://instagram.com/maisonlagune",
    facebook: "https://facebook.com/maisonlagune",
  },
  schedules: [
    { label: "Déjeuner", value: "12h00 - 15h00" },
    { label: "Dîner", value: "19h00 - 00h30" },
  ],
  address: "Boulevard de Marseille, Zone 4, Abidjan",
};
