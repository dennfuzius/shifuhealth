import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import { getArticleBySlug, getArticles } from "@/sanity/queries";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    return articles.map((article) => ({ slug: article.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  try {
    const article = await getArticleBySlug(slug);
    if (!article) return {};

    const title = article.title[locale as "de" | "en"];
    const description = article.excerpt?.[locale as "de" | "en"] || "";
    const baseUrl = "https://shifuhealth.com";

    return {
      title,
      description,
      alternates: {
        canonical: `${baseUrl}/${locale}/blog/${slug}`,
        languages: {
          de: `${baseUrl}/de/blog/${slug}`,
          en: `${baseUrl}/en/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = params;
  const t = await getTranslations("blog");

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/blog"
        className="text-sm text-sage-600 hover:text-sage-700 mb-8 inline-block"
      >
        ← {t("title")}
      </Link>

      {article.category && (
        <span className="block text-xs font-medium text-sage-600 uppercase tracking-wide mb-2">
          {article.category.title[locale as "de" | "en"]}
        </span>
      )}

      <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-900 mb-4">
        {article.title[locale as "de" | "en"]}
      </h1>

      {article.publishedAt && (
        <p className="text-sm text-sage-500 mb-8">
          {t("publishedAt")}{" "}
          {new Date(article.publishedAt).toLocaleDateString(
            locale === "de" ? "de-DE" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
      )}

      {article.symptomTags && article.symptomTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.symptomTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage-100 px-3 py-1 text-xs text-sage-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg prose-stone max-w-none">
        {article.body && (
          <PortableText value={article.body as Array<Record<string, unknown> & { _type: string; _key: string }>} />
        )}
      </div>
    </article>
  );
}
