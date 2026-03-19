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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-forest-700">{t("subtitle")}</p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-sage-200 bg-white p-12 text-center">
          <p className="text-forest-700">{t("noArticles")}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={{ pathname: "/blog/[slug]", params: { slug: article.slug.current } }}
              className="group rounded-xl border border-sage-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              {article.featuredImage && (
                <div className="aspect-video bg-sage-100" />
              )}
              <div className="p-6">
                {article.category && (
                  <span className="text-xs font-medium text-sage-600 uppercase tracking-wide">
                    {article.category.title[locale as "de" | "en"]}
                  </span>
                )}
                <h2 className="font-serif text-xl font-semibold text-forest-900 mt-2 mb-3 group-hover:text-sage-700 transition-colors">
                  {article.title[locale as "de" | "en"]}
                </h2>
                <p className="text-sm text-forest-700 leading-relaxed mb-4">
                  {article.excerpt?.[locale as "de" | "en"]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sage-500">
                    {article.publishedAt &&
                      new Date(article.publishedAt).toLocaleDateString(
                        locale === "de" ? "de-DE" : "en-US"
                      )}
                  </span>
                  <span className="text-sm font-medium text-sage-600 group-hover:text-sage-700">
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
