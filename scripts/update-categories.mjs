import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wuro9vba",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const CATEGORIES = [
  {
    slug: "tcm-grundlagen",
    title: { de: "TCM Grundlagen", en: "TCM Basics" },
    description: {
      de: "Einsteiger-Wissen und Konzepte der Traditionellen Chinesischen Medizin",
      en: "Beginner knowledge and concepts of Traditional Chinese Medicine",
    },
  },
  {
    slug: "behandlungen",
    title: { de: "Behandlungen", en: "Treatments" },
    description: {
      de: "Methoden und Techniken der TCM",
      en: "Methods and techniques of TCM",
    },
  },
  {
    slug: "beschwerden",
    title: { de: "Beschwerden", en: "Symptoms" },
    description: {
      de: "Symptome verstehen und TCM-Lösungen finden",
      en: "Understanding symptoms and finding TCM solutions",
    },
  },
  {
    slug: "ernaehrung",
    title: { de: "Ernährung", en: "Nutrition" },
    description: {
      de: "TCM-Diätetik und saisonale Ernährung",
      en: "TCM dietetics and seasonal nutrition",
    },
  },
  {
    slug: "lifestyle",
    title: { de: "Lifestyle", en: "Lifestyle" },
    description: {
      de: "TCM im Alltag - Routinen, Qi Gong und Rituale",
      en: "TCM in everyday life - routines, Qi Gong, and rituals",
    },
  },
  {
    slug: "ressourcen",
    title: { de: "Ressourcen", en: "Resources" },
    description: {
      de: "Glossar, Meridian-Karten und Buchempfehlungen",
      en: "Glossary, meridian maps, and book recommendations",
    },
  },
];

async function run() {
  // Delete existing categories
  const existing = await client.fetch(`*[_type == "category"]._id`);
  for (const id of existing) {
    await client.delete(id);
    console.log(`Deleted: ${id}`);
  }

  // Create new categories
  for (const cat of CATEGORIES) {
    const doc = {
      _type: "category",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
    };
    const created = await client.create(doc);
    console.log(`Created: ${cat.slug} (${created._id})`);
  }

  console.log("\nDone! 6 categories created.");
}

run().catch(console.error);
