import { client } from "./client";

export interface Article {
  _id: string;
  title: { de: string; en: string };
  slug: { current: string };
  excerpt: { de: string; en: string };
  body: Array<Record<string, unknown>>;
  category: {
    title: { de: string; en: string };
    slug: { current: string };
  } | null;
  symptomTags: string[];
  bodyPart: string;
  season: string;
  publishedAt: string;
  featuredImage: { asset: { _ref: string } } | null;
}

export interface Category {
  _id: string;
  title: { de: string; en: string };
  slug: { current: string };
  description: { de: string; en: string };
}

export async function getArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category->{title, slug},
      symptomTags,
      bodyPart,
      season,
      publishedAt,
      featuredImage
    }`
  );
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      category->{title, slug},
      symptomTags,
      bodyPart,
      season,
      publishedAt,
      featuredImage
    }`,
    { slug }
  );
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title.en asc) {
      _id,
      title,
      slug,
      description
    }`
  );
}
