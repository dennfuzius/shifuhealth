import { client } from "./client";

/* ── Types ────────────────────────────────────────────── */

export interface Article {
  _id: string;
  title: { de: string; en: string };
  slug: { current: string };
  excerpt: { de: string; en: string };
  body: { de: unknown[]; en: unknown[] };
  category: {
    title: { de: string; en: string };
    slug: { current: string };
    color: string | null;
  } | null;
  symptomTags: string[];
  bodyPart: string;
  season: string;
  readingTime: number | null;
  publishedAt: string;
  featuredImage: { asset: { _ref: string }; alt?: string } | null;
  seoTitle: { de: string; en: string } | null;
  seoDescription: { de: string; en: string } | null;
}

export interface Category {
  _id: string;
  title: { de: string; en: string };
  slug: { current: string };
  description: { de: string; en: string };
  color: string | null;
  image: { asset: { _ref: string }; alt?: string } | null;
}

/* ── Shared field projections ─────────────────────────── */

const articleListFields = `
  _id,
  title,
  slug,
  excerpt,
  category->{title, slug, color},
  symptomTags,
  bodyPart,
  season,
  readingTime,
  publishedAt,
  featuredImage
`;

const articleDetailFields = `
  ${articleListFields},
  body,
  seoTitle,
  seoDescription
`;

/* ── Queries ──────────────────────────────────────────── */

export async function getAllArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) {
      ${articleListFields}
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${articleDetailFields}
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      ${articleListFields}
    }`,
    { categorySlug },
    { next: { revalidate: 60 } }
  );
}

export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)[0...$limit] {
      ${articleListFields}
    }`,
    { limit: limit - 1 },
    { next: { revalidate: 60 } }
  );
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title.en asc) {
      _id,
      title,
      slug,
      description,
      color,
      image
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

/* ── Backward compatibility ── */
export const getArticles = getAllArticles;
