/**
 * Seed initial categories into Sanity.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 *   2. Run: npx tsx scripts/seed-categories.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

const categories = [
  {
    _type: "category",
    title: { de: "Ernährung", en: "Nutrition" },
    slug: { _type: "slug", current: "nutrition" },
    description: {
      de: "TCM-Ernährungstipps und saisonale Empfehlungen",
      en: "TCM nutrition tips and seasonal recommendations",
    },
    color: "#3B6853",
  },
  {
    _type: "category",
    title: { de: "Kräuter", en: "Herbs" },
    slug: { _type: "slug", current: "herbs" },
    description: {
      de: "Heilkräuter und pflanzliche Rezepte der TCM",
      en: "Healing herbs and herbal recipes from TCM",
    },
    color: "#4A7C59",
  },
  {
    _type: "category",
    title: { de: "Grundlagen", en: "Basics" },
    slug: { _type: "slug", current: "basics" },
    description: {
      de: "Grundlegende Konzepte der Traditionellen Chinesischen Medizin",
      en: "Fundamental concepts of Traditional Chinese Medicine",
    },
    color: "#C89741",
  },
  {
    _type: "category",
    title: { de: "Symptome", en: "Symptoms" },
    slug: { _type: "slug", current: "symptoms" },
    description: {
      de: "Symptome verstehen aus der Sicht der TCM",
      en: "Understanding symptoms from a TCM perspective",
    },
    color: "#D44A35",
  },
  {
    _type: "category",
    title: { de: "Jahreszeiten", en: "Seasons" },
    slug: { _type: "slug", current: "seasons" },
    description: {
      de: "Saisonale Gesundheitstipps nach den Fünf Elementen",
      en: "Seasonal health tips based on the Five Elements",
    },
    color: "#386694",
  },
  {
    _type: "category",
    title: { de: "Qi Gong", en: "Qi Gong" },
    slug: { _type: "slug", current: "qi-gong" },
    description: {
      de: "Qi Gong Übungen und Atemtechniken",
      en: "Qi Gong exercises and breathing techniques",
    },
    color: "#7E889A",
  },
];

async function seed() {
  console.log("Seeding categories...\n");

  for (const cat of categories) {
    try {
      const result = await client.create(cat);
      console.log(`✓ Created: ${cat.title.en} (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: ${cat.title.en}`, err);
    }
  }

  console.log("\nDone! Categories seeded.");
}

seed();
