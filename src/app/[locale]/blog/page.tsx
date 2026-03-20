import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getArticles, type Article } from "@/sanity/queries";

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();

  let articles: Article[] = [];
  try {
    articles = await getArticles();
  } catch {
    // Sanity not configured yet — show empty state
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="mb-12">
        <h1
          className="font-body text-[28px] md:text-[42px] font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {t("title")}
        </h1>
        <p
          className="font-body text-[16px] leading-[1.75]"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("subtitle")}
        </p>
      </div>

      {articles.length === 0 ? (
        <div
          className="rounded-card p-12 text-center"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <p className="font-body text-[16px]" style={{ color: "var(--color-text-muted)" }}>
            {t("noArticles")}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={{ pathname: "/blog/[slug]", params: { slug: article.slug.current } }}
              className="group card overflow-hidden transition-all duration-200 ease-in-out"
            >
              {article.featuredImage && (
                <div className="aspect-video" style={{ backgroundColor: "var(--color-surface)" }} />
              )}
              <div className="p-6">
                {article.category && (
                  <span
                    className="font-body text-[12px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--color-primary-lt)" }}
                  >
                    {article.category.title[locale as "de" | "en"]}
                  </span>
                )}
                <h2
                  className="font-body text-[18px] font-medium mt-2 mb-3 group-hover:opacity-70 transition-all duration-200 ease-in-out"
                  style={{ color: "var(--color-text)" }}
                >
                  {article.title[locale as "de" | "en"]}
                </h2>
                <p
                  className="font-body text-[14px] leading-[1.75] mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {article.excerpt?.[locale as "de" | "en"]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-[12px]" style={{ color: "var(--color-text-muted)" }}>
                    {article.publishedAt &&
                      new Date(article.publishedAt).toLocaleDateString(
                        locale === "de" ? "de-DE" : "en-US"
                      )}
                  </span>
                  <span
                    className="font-body text-[13px] font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {t("readMore")} →
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
