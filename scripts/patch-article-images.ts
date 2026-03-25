#!/usr/bin/env npx tsx
/**
 * Patch an article to inject image blocks into the body at specific positions.
 *
 * Usage:
 *   npx tsx scripts/patch-article-images.ts l79NOCYauQyEsrE1wSooYr
 *
 * Requires SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

/* ── Sanity client ───────────────────────────────────── */

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

/* ── Types ───────────────────────────────────────────── */

interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{ text: string }>;
  [key: string]: unknown;
}

interface Article {
  _id: string;
  body: {
    de: PortableTextBlock[];
    en: PortableTextBlock[];
  };
}

/* ── Image asset IDs ─────────────────────────────────── */

const IMAGES = {
  zyklen: "image-b904e4dc07e8bcca14293de1bf7df49b166ed444-1408x768-jpg",
  holz: "image-4e29dea6e9ff23c80e4a0d3be05bf63720e5dc1e-1408x768-jpg",
  feuer: "image-d5350964dfa7777d331671649d4a00193d576a42-1408x768-jpg",
  erde: "image-e2b0e57c3482dfe49309000f05f9823dcc287809-1408x768-jpg",
  metall: "image-c2eaaf6521105879f0928dec9a022171a2343f0e-1408x768-jpg",
  wasser: "image-3ba839443e6fd4368db278afc8c2436b201e7daf-1408x768-jpg",
  konstitution: "image-f1bc13affe4430e0ce7f2d1565fc16c2313c69f0-1408x768-jpg",
};

/* ── Insertion rules ─────────────────────────────────── */

interface InsertionRule {
  headingText: string;
  imageKey: keyof typeof IMAGES;
}

const DE_INSERTIONS: InsertionRule[] = [
  { headingText: "Das Element Holz", imageKey: "zyklen" },
  { headingText: "Das Element Feuer", imageKey: "holz" },
  { headingText: "Das Element Erde", imageKey: "feuer" },
  { headingText: "Das Element Metall", imageKey: "erde" },
  { headingText: "Das Element Wasser", imageKey: "metall" },
  { headingText: "Die 5 Elemente als Konstitutionstypen", imageKey: "wasser" },
  { headingText: "Fazit", imageKey: "konstitution" },
];

const EN_INSERTIONS: InsertionRule[] = [
  { headingText: "The Wood Element", imageKey: "zyklen" },
  { headingText: "The Fire Element", imageKey: "holz" },
  { headingText: "The Earth Element", imageKey: "feuer" },
  { headingText: "The Metal Element", imageKey: "erde" },
  { headingText: "The Water Element", imageKey: "metall" },
  { headingText: "The Five Elements as Constitutional Types", imageKey: "wasser" },
  { headingText: "Conclusion", imageKey: "konstitution" },
];

/* ── Helpers ─────────────────────────────────────────── */

function getRandomKey(): string {
  return crypto.randomUUID().slice(0, 8);
}

function createImageBlock(assetId: string): PortableTextBlock {
  return {
    _type: "image",
    _key: getRandomKey(),
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
}

function extractHeadingText(block: PortableTextBlock): string | null {
  if (block._type !== "block") return null;
  if (!block.children || block.children.length === 0) return null;
  if (block.style !== "h2" && block.style !== "h3") return null;

  const text = block.children
    .map((child: { text?: string; [key: string]: unknown }) => child.text || "")
    .join("");

  return text;
}

function patchBodyWithImages(
  body: PortableTextBlock[],
  insertions: InsertionRule[]
): PortableTextBlock[] {
  // First, remove any existing image blocks to avoid duplicates
  const result = body.filter((block) => block._type !== "image");
  const indexesToInsert: Array<{ index: number; block: PortableTextBlock }> = [];

  // Find all insertion points (indices where we need to insert images)
  for (const rule of insertions) {
    for (let i = 0; i < result.length; i++) {
      const headingText = extractHeadingText(result[i]);
      if (headingText && headingText.startsWith(rule.headingText)) {
        // Insert BEFORE this heading
        indexesToInsert.push({
          index: i,
          block: createImageBlock(IMAGES[rule.imageKey]),
        });
        break;
      }
    }
  }

  // Insert in reverse order to maintain correct indices
  indexesToInsert.sort((a, b) => b.index - a.index);

  for (const { index, block } of indexesToInsert) {
    result.splice(index, 0, block);
  }

  return result;
}

/* ── Main ────────────────────────────────────────────── */

async function patchArticle(articleId: string) {
  console.log(`\n🔍 Fetching article: ${articleId}\n`);

  // 1. Fetch the article
  const article = await client.fetch<Article>(
    `*[_id == "${articleId}" || _id == "drafts.${articleId}"][0]`
  );

  if (!article) {
    console.error(`❌ Article not found: ${articleId}`);
    process.exit(1);
  }

  if (!article.body?.de || !article.body?.en) {
    console.error("❌ Article does not have body.de and body.en");
    process.exit(1);
  }

  console.log(`✓ Found article`);

  // 2. Patch both bodies with images
  console.log(`\n📸 Patching German body (de)...`);
  const patchedDe = patchBodyWithImages(article.body.de, DE_INSERTIONS);
  console.log(`   ✓ Inserted ${DE_INSERTIONS.length} images`);

  console.log(`\n📸 Patching English body (en)...`);
  const patchedEn = patchBodyWithImages(article.body.en, EN_INSERTIONS);
  console.log(`   ✓ Inserted ${EN_INSERTIONS.length} images`);

  // 3. Prepare patch
  const patchId = article._id.replace(/^drafts\./, "");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patch: any = {
    body: {
      de: patchedDe,
      en: patchedEn,
    },
  };

  // 4. Apply patch
  console.log(`\n📤 Applying patch to Sanity...`);
  const result = await client.patch(patchId).set(patch).commit();

  console.log(`   ✓ Patched: ${result._id}`);

  // 5. Output result
  console.log(`\n✅ Article patched successfully!\n`);
  console.log(`   Article ID: ${patchId}`);
  console.log(
    `   Studio: https://wuro9vba.sanity.studio/structure/article;${patchId}\n`
  );
}

/* ── CLI entry point ─────────────────────────────────── */

const articleId = process.argv[2];

if (!articleId) {
  console.error("Usage: npx tsx scripts/patch-article-images.ts <article-id>");
  console.error("Example: npx tsx scripts/patch-article-images.ts l79NOCYauQyEsrE1wSooYr");
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error("❌ Missing environment variables. Make sure .env.local contains:");
  console.error("   NEXT_PUBLIC_SANITY_PROJECT_ID=wuro9vba");
  console.error("   NEXT_PUBLIC_SANITY_DATASET=production");
  console.error("   SANITY_API_TOKEN=<your-token>");
  process.exit(1);
}

patchArticle(articleId).catch((err) => {
  console.error("❌ Failed to patch article:", err.message);
  process.exit(1);
});
