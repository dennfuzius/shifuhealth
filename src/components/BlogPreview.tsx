import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getFeaturedArticles, type Article } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import ScrollAnimator from "./ScrollAnimator";

export default async function BlogPreview() {
  const t = await getTranslations("blogPreview");
  const locale = (await getLocale()) as "de" | "en";

  let articles: Article[] = [];
  try {
    articles = await getFeaturedArticles(3);
  } catch {
    // Sanity not configured or no articles
  }

  if (articles.length === 0) return null;

  return (
    <section className="section-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollAnimator>
          <div className="text-center mb-12">
            <h2>{t("title")}</h2>
          </div>
        </ScrollAnimator>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <ScrollAnimator key={article._id}>
              <Link
                href={{
                  pathname: "/blog/[slug]",
                  params: { slug: article.slug.current },
                }}
                className="block card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {article.featuredImage && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={urlFor(article.featuredImage).width(600).height(400).url()}
                      alt={article.featuredImage.alt || article.title[locale]}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
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
                  <h3 className="font-body text-xl font-semibold mb-2">
                    {article.title[locale]}
                  </h3>
                  {article.excerpt?.[locale] && (
                    <p
                      className="font-body text-sm leading-relaxed mb-4"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {article.excerpt[locale]}
                    </p>
                  )}
                  <span
                    className="font-body text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t("readMore")} &rarr;
                  </span>
                </div>
              </Link>
            </ScrollAnimator>
          ))}
        </div>
        <div className="text-center">
          <Link href="/blog" className="btn-secondary">
            {t("allArticles")}
          </Link>
        </div>
      </div>
    </section>
  );
}
