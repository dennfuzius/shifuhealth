import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  getAllArticles,
  type Article,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import BlogFilterClient from "@/components/BlogFilterClient";

export const revalidate = 60;

const CATEGORIES = [
  { slug: "tcm-grundlagen", num: 1 },
  { slug: "behandlungen", num: 2 },
  { slug: "beschwerden", num: 3 },
  { slug: "ernaehrung", num: 4 },
  { slug: "lifestyle", num: 5 },
  { slug: "ressourcen", num: 6 },
];

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = (await getLocale()) as "de" | "en";

  let articles: Article[] = [];
  try {
    articles = await getAllArticles();
  } catch {
    // Sanity not configured yet
  }

  const featured = articles.slice(0, 3);

  // Build category data for client filter
  const categories = CATEGORIES.map((cat) => ({
    slug: cat.slug,
    title: t(`cat${cat.num}` as "cat1"),
    subtitle: t(`cat${cat.num}sub` as "cat1sub"),
    examples: t(`cat${cat.num}ex` as "cat1ex"),
  }));

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="pt-28 pb-16 px-6"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="w-12 h-1 rounded-full mx-auto mb-6"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <h1
            className="font-body font-bold mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--color-text)",
              lineHeight: 1.2,
            }}
          >
            {t("heroTitle")}
          </h1>
          <p
            className="font-body text-base max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
          >
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ── */}
      {featured.length > 0 && (
        <section
          className="py-16 px-6"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="mx-auto max-w-5xl">
            <h2
              className="font-body text-xl font-bold mb-8"
              style={{ color: "var(--color-text)" }}
            >
              {t("featuredTitle")}
            </h2>
            <div className="space-y-6">
              {featured.map((article) => (
                <Link
                  key={article._id}
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: article.slug.current },
                  }}
                  className="group flex flex-col md:flex-row gap-6 rounded-card overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {article.featuredImage && (
                    <div className="relative md:w-[40%] h-52 md:h-auto min-h-[200px] overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(article.featuredImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={
                          article.featuredImage.alt || article.title[locale]
                        }
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span
                          className="font-body text-xs font-semibold px-2.5 py-1 rounded-lg"
                          style={{
                            backgroundColor: "var(--color-primary-10)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {article.category.title[locale]}
                        </span>
                      )}
                      {article.readingTime && (
                        <span
                          className="font-body text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {article.readingTime} min
                        </span>
                      )}
                    </div>
                    <h2 className="font-body text-lg md:text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {article.title[locale]}
                    </h2>
                    {article.excerpt?.[locale] && (
                      <p
                        className="font-body text-sm mb-4 line-clamp-2"
                        style={{
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {article.excerpt[locale]}
                      </p>
                    )}
                    <span
                      className="font-body text-sm font-medium"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {t("readMore")} &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORIES ── */}
      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-body text-xl font-bold mb-8"
            style={{ color: "var(--color-text)" }}
          >
            {t("categoriesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-[12px] p-6 transition-all duration-200 hover:border-[var(--color-primary)] hover:-translate-y-0.5 cursor-default"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mb-4"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
                <h3
                  className="font-body text-lg font-bold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {cat.title}
                </h3>
                <p
                  className="font-body text-[13px] mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {cat.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.examples.split(", ").map((ex) => (
                    <span
                      key={ex}
                      className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--color-primary-10)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL ARTICLES with filter ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="font-body text-xl font-bold mb-8"
            style={{ color: "var(--color-text)" }}
          >
            {t("allArticlesTitle")}
          </h2>
          <BlogFilterClient
            articles={articles.map((a) => ({
              id: a._id,
              slug: a.slug.current,
              title: a.title[locale],
              excerpt: a.excerpt?.[locale] || "",
              imageUrl: a.featuredImage
                ? urlFor(a.featuredImage).width(600).height(400).url()
                : null,
              imageAlt: a.featuredImage?.alt || a.title[locale],
              categorySlug: a.category?.slug?.current || "",
              categoryTitle: a.category?.title?.[locale] || "",
              readingTime: a.readingTime || 0,
              publishedAt: a.publishedAt || "",
            }))}
            categories={categories}
            allLabel={t("allFilter")}
            readMore={t("readMore")}
            comingSoon={t("comingSoon")}
          />
        </div>
      </section>
    </div>
  );
}
