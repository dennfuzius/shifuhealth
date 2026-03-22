import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getArticleBySlug, getAllArticles } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles.map((article) => ({ slug: article.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as "de" | "en";
  try {
    const article = await getArticleBySlug(slug);
    if (!article) return {};

    const title = article.seoTitle?.[loc] || article.title[loc];
    const description = article.seoDescription?.[loc] || article.excerpt?.[loc] || "";
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
  const { locale, slug } = await params;
  const loc = locale as "de" | "en";
  const t = await getTranslations("blog");

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  if (!article) notFound();

  // Get body content for the current locale
  const bodyContent = article.body?.[loc] || article.body?.de || [];

  return (
    <article className="mx-auto max-w-3xl px-6 pt-28 pb-24">
      <Link
        href="/blog"
        className="font-body text-sm font-medium mb-8 inline-block transition-colors duration-200 hover:text-[var(--color-text-body)]"
        style={{ color: "var(--color-primary)" }}
      >
        &larr; {t("title")}
      </Link>

      {article.category && (
        <span
          className="block font-body text-xs font-semibold px-2.5 py-1 rounded-lg mb-4 w-fit"
          style={{
            backgroundColor: "var(--color-primary-10)",
            color: "var(--color-primary)",
          }}
        >
          {article.category.title[loc]}
        </span>
      )}

      <h1 className="mb-4">
        {article.title[loc]}
      </h1>

      <div className="flex items-center gap-4 mb-8">
        {article.publishedAt && (
          <p className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
            {t("publishedAt")}{" "}
            {new Date(article.publishedAt).toLocaleDateString(
              locale === "de" ? "de-DE" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
        )}
        {article.readingTime && (
          <span className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
            &middot; {article.readingTime} min
          </span>
        )}
      </div>

      {article.featuredImage && (
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
          <Image
            src={urlFor(article.featuredImage).width(1200).height(600).url()}
            alt={article.featuredImage.alt || article.title[loc]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {article.symptomTags && article.symptomTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.symptomTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 font-body text-xs"
              style={{
                backgroundColor: "transparent",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose prose-lg max-w-none font-body leading-relaxed"
        style={{ color: "var(--color-text-body)" }}
      >
        {bodyContent && Array.isArray(bodyContent) && bodyContent.length > 0 && (
          <PortableText
            value={bodyContent as Array<Record<string, unknown> & { _type: string; _key: string }>}
          />
        )}
      </div>
    </article>
  );
}
