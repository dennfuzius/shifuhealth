#!/usr/bin/env npx tsx
/**
 * Publish an article to ShifuHealth's Sanity CMS.
 *
 * Usage:
 *   npx tsx scripts/publish-article.ts scripts/article-template.json
 *   npx tsx scripts/publish-article.ts path/to/my-article.json
 *
 * Requires SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
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

interface ArticleInput {
  title: { de: string; en: string };
  slug?: string;
  excerpt: { de: string; en: string };
  body: { de: string; en: string };
  category: string;
  symptomTags?: string[];
  bodyPart?: string;
  season?: string;
  readingTime?: number;
  seoTitle?: { de: string; en: string };
  seoDescription?: { de: string; en: string };
  imagePath?: string;
  imageAlt?: string;
}

/* ── Helpers ─────────────────────────────────────────── */

const SEASON_MAP: Record<string, string> = {
  "Frühling": "spring",
  "Spring": "spring",
  "Sommer": "summer",
  "Summer": "summer",
  "Spätsommer": "late-summer",
  "Late Summer": "late-summer",
  "Herbst": "autumn",
  "Autumn": "autumn",
  "Winter": "winter",
  "Alle": "all",
  "All": "all",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

/**
 * Convert plain text (with markdown-like formatting) to Sanity block content.
 * Supports paragraphs (double newline), **bold**, and *italic*.
 */
function textToBlocks(text: string): object[] {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());

  return paragraphs.map((paragraph) => {
    const spans: object[] = [];
    const markDefs: object[] = [];

    // Split on **bold** and *italic* markers
    const parts = paragraph.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

    for (const part of parts) {
      if (part.startsWith("**") && part.endsWith("**")) {
        spans.push({
          _type: "span",
          _key: crypto.randomUUID().slice(0, 8),
          text: part.slice(2, -2),
          marks: ["strong"],
        });
      } else if (part.startsWith("*") && part.endsWith("*")) {
        spans.push({
          _type: "span",
          _key: crypto.randomUUID().slice(0, 8),
          text: part.slice(1, -1),
          marks: ["em"],
        });
      } else if (part) {
        spans.push({
          _type: "span",
          _key: crypto.randomUUID().slice(0, 8),
          text: part.replace(/\n/g, " "),
          marks: [],
        });
      }
    }

    // Detect headings (lines starting with ## or ###)
    const trimmed = paragraph.trim();
    if (trimmed.startsWith("### ")) {
      return {
        _type: "block",
        _key: crypto.randomUUID().slice(0, 8),
        style: "h3",
        markDefs,
        children: [
          {
            _type: "span",
            _key: crypto.randomUUID().slice(0, 8),
            text: trimmed.slice(4),
            marks: [],
          },
        ],
      };
    }
    if (trimmed.startsWith("## ")) {
      return {
        _type: "block",
        _key: crypto.randomUUID().slice(0, 8),
        style: "h2",
        markDefs,
        children: [
          {
            _type: "span",
            _key: crypto.randomUUID().slice(0, 8),
            text: trimmed.slice(3),
            marks: [],
          },
        ],
      };
    }

    return {
      _type: "block",
      _key: crypto.randomUUID().slice(0, 8),
      style: "normal",
      markDefs,
      children: spans,
    };
  });
}

/* ── Main ────────────────────────────────────────────── */

async function publish(inputPath: string) {
  // 1. Read input
  const raw = fs.readFileSync(path.resolve(inputPath), "utf-8");
  const input: ArticleInput = JSON.parse(raw);

  console.log(`\n📝 Publishing: "${input.title.en}"\n`);

  // 2. Validate required fields
  if (!input.title?.de || !input.title?.en) {
    throw new Error("title.de and title.en are required");
  }
  if (!input.body?.de || !input.body?.en) {
    throw new Error("body.de and body.en are required");
  }
  if (!input.category) {
    throw new Error("category slug is required");
  }

  // 3. Resolve category reference
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ _id }`,
    { slug: input.category }
  );
  if (!category) {
    const available = await client.fetch(
      `*[_type == "category"]{ "slug": slug.current, "title": title.en }`
    );
    console.error(`❌ Category "${input.category}" not found.`);
    console.error("Available categories:");
    available.forEach((c: { slug: string; title: string }) =>
      console.error(`  - ${c.slug} (${c.title})`)
    );
    process.exit(1);
  }

  // 4. Upload image (if provided)
  let imageAsset: { _id: string } | null = null;
  if (input.imagePath) {
    const imgPath = path.resolve(input.imagePath);
    if (!fs.existsSync(imgPath)) {
      throw new Error(`Image not found: ${imgPath}`);
    }
    console.log(`📷 Uploading image: ${path.basename(imgPath)}`);
    const imageBuffer = fs.readFileSync(imgPath);
    imageAsset = await client.assets.upload("image", imageBuffer, {
      filename: path.basename(imgPath),
    });
    console.log(`   ✓ Uploaded: ${imageAsset._id}`);
  }

  // 5. Build document
  const slug = input.slug || slugify(input.title.en);
  const seasonValue = input.season ? SEASON_MAP[input.season] || input.season : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = {
    _type: "article",
    title: input.title,
    slug: { _type: "slug", current: slug },
    excerpt: input.excerpt,
    body: {
      de: textToBlocks(input.body.de),
      en: textToBlocks(input.body.en),
    },
    category: { _type: "reference", _ref: category._id },
    publishedAt: new Date().toISOString(),
  };

  if (input.symptomTags?.length) doc.symptomTags = input.symptomTags;
  if (input.bodyPart) doc.bodyPart = input.bodyPart;
  if (seasonValue) doc.season = seasonValue;
  if (input.readingTime) doc.readingTime = input.readingTime;
  if (input.seoTitle) doc.seoTitle = input.seoTitle;
  if (input.seoDescription) doc.seoDescription = input.seoDescription;

  if (imageAsset) {
    doc.featuredImage = {
      _type: "image",
      asset: { _type: "reference", _ref: imageAsset._id },
      alt: input.imageAlt || input.title.en,
    };
  }

  // 6. Create and publish
  console.log("📤 Creating article in Sanity...");
  const result = await client.create(doc);
  console.log(`   ✓ Created: ${result._id}`);

  // Sanity documents created via API are drafts by default in some configs.
  // Publish by ensuring no draft prefix:
  const publishedId = result._id.replace(/^drafts\./, "");
  if (result._id.startsWith("drafts.")) {
    await client
      .patch(publishedId)
      .set(doc)
      .commit();
    console.log(`   ✓ Published: ${publishedId}`);
  }

  // 7. Output result
  const baseUrl = "https://shifuhealth.com";
  console.log(`\n✅ Article published successfully!\n`);
  console.log(`   Sanity ID:  ${publishedId}`);
  console.log(`   Slug:       ${slug}`);
  console.log(`   DE URL:     ${baseUrl}/de/blog/${slug}`);
  console.log(`   EN URL:     ${baseUrl}/en/blog/${slug}`);
  console.log(`   Studio:     https://wuro9vba.sanity.studio/structure/article;${publishedId}`);
  console.log();
}

/* ── CLI entry point ─────────────────────────────────── */

const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Usage: npx tsx scripts/publish-article.ts <article.json>");
  console.error("Example: npx tsx scripts/publish-article.ts scripts/article-template.json");
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error("❌ Missing environment variables. Make sure .env.local contains:");
  console.error("   NEXT_PUBLIC_SANITY_PROJECT_ID=wuro9vba");
  console.error("   NEXT_PUBLIC_SANITY_DATASET=production");
  console.error("   SANITY_API_TOKEN=<your-token>");
  process.exit(1);
}

publish(inputFile).catch((err) => {
  console.error("❌ Failed to publish:", err.message);
  process.exit(1);
});
