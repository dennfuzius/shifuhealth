import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getArticleBySlug, getAllArticles } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import { Link } from "@/i18n/navigation";
import ArticleBody from "@/components/ArticleBody";
import ShareRow from "@/components/ShareRow";
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

  const bodyContent = article.body?.[loc] || article.body?.de || [];

  return (
    <article className="pt-28 pb-24">
      {/* ── Article Header ── */}
      <header className="mx-auto px-6" style={{ maxWidth: 720 }}>
        <Link
          href="/blog"
          className="font-body text-sm font-medium mb-10 inline-block transition-colors duration-200 hover:text-[var(--color-text-body)]"
          style={{ color: "var(--color-primary)" }}
        >
          &larr; {t("title")}
        </Link>

        {/* Meta row: category + reading time */}
        <div className="flex items-center gap-3 mb-5">
          {article.category && (
            <span
              className="font-body text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{
                backgroundColor: "var(--color-primary-10)",
                color: "var(--color-primary)",
              }}
            >
              {article.category.title[loc]}
            </span>
          )}
          {article.readingTime && (
            <span className="font-body text-xs" style={{ color: "var(--color-text-muted)" }}>
              {article.readingTime} min
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-body font-bold mb-5"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            lineHeight: 1.2,
            color: "var(--color-text)",
          }}
        >
          {article.title[loc]}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {article.publishedAt && (
            <span className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
              {new Date(article.publishedAt).toLocaleDateString(
                locale === "de" ? "de-DE" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>
          )}
          <span className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
            &middot; Von Shifu Qi &middot; ShifuHealth
          </span>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {article.featuredImage && (
        <div className="mx-auto px-6 mb-12" style={{ maxWidth: 720 }}>
          <div className="relative w-full overflow-hidden" style={{ borderRadius: 12, maxHeight: 480 }}>
            <Image
              src={urlFor(article.featuredImage).width(1440).height(810).url()}
              alt={article.featuredImage.alt || article.title[loc]}
              width={1440}
              height={810}
              className="w-full h-auto object-cover"
              style={{ maxHeight: 480 }}
              sizes="(max-width: 720px) 100vw, 720px"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Symptom Tags ── */}
      {article.symptomTags && article.symptomTags.length > 0 && (
        <div className="mx-auto px-6 mb-10" style={{ maxWidth: 720 }}>
          <div className="flex flex-wrap gap-2">
            {article.symptomTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1.5 font-body text-xs"
                style={{
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Article Body ── */}
      <div className="px-6">
        <ArticleBody content={bodyContent} />
      </div>

      {/* ── Share ── */}
      <div className="mx-auto px-6 mt-12 pt-8" style={{ maxWidth: 720, borderTop: "1px solid var(--color-border)" }}>
        <ShareRow
          title={article.title[loc]}
          url={`https://shifuhealth.com/${locale}/blog/${slug}`}
        />
      </div>
    </article>
  );
}
