import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getAllArticles, type Article } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";

export const revalidate = 60;

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = (await getLocale()) as "de" | "en";

  let articles: Article[] = [];
  try {
    articles = await getAllArticles();
  } catch {
    // Sanity not configured yet — show empty state
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-24">
      <div className="mb-12">
        <div
          className="w-12 h-1 rounded-full mb-8"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <h1 className="mb-4">{t("title")}</h1>
        <p
          className="font-body text-base leading-relaxed max-w-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("subtitle")}
        </p>
      </div>

      {articles.length === 0 ? (
        <div
          className="card p-12 text-center"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <p className="font-body text-base" style={{ color: "var(--color-text-muted)" }}>
            {t("noArticles")}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={{ pathname: "/blog/[slug]", params: { slug: article.slug.current } }}
              className="group card overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {article.featuredImage && (
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={urlFor(article.featuredImage).width(600).height(400).url()}
                    alt={article.featuredImage.alt || article.title[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    <span className="font-body text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {article.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="font-body text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
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
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {article.publishedAt &&
                      new Date(article.publishedAt).toLocaleDateString(
                        locale === "de" ? "de-DE" : "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                  </span>
                  <span
                    className="font-body text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t("readMore")} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
