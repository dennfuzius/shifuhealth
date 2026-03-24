"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type ArticleCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  imageAlt: string;
  categorySlug: string;
  categoryTitle: string;
  readingTime: number;
  publishedAt: string;
};

type CategoryInfo = {
  slug: string;
  title: string;
};

export default function BlogFilterClient({
  articles,
  categories,
  allLabel,
  readMore,
  comingSoon,
}: {
  articles: ArticleCard[];
  categories: CategoryInfo[];
  allLabel: string;
  readMore: string;
  comingSoon: string;
}) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? articles.filter((a) => a.categorySlug === activeFilter)
    : articles;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter(null)}
          className="font-body text-[13px] font-medium px-4 py-2 rounded-full transition-all"
          style={{
            backgroundColor: !activeFilter
              ? "var(--color-primary)"
              : "var(--color-surface)",
            color: !activeFilter ? "#fff" : "var(--color-text-secondary)",
            border: `1px solid ${!activeFilter ? "var(--color-primary)" : "var(--color-border)"}`,
          }}
        >
          {allLabel}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveFilter(cat.slug)}
            className="font-body text-[13px] font-medium px-4 py-2 rounded-full transition-all"
            style={{
              backgroundColor:
                activeFilter === cat.slug
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
              color:
                activeFilter === cat.slug
                  ? "#fff"
                  : "var(--color-text-secondary)",
              border: `1px solid ${activeFilter === cat.slug ? "var(--color-primary)" : "var(--color-border)"}`,
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-card p-12 text-center"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="font-body text-base"
            style={{ color: "var(--color-text-muted)" }}
          >
            {comingSoon}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={{
                pathname: "/blog/[slug]",
                params: { slug: article.slug },
              }}
              className="group rounded-card overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              {article.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  {article.categoryTitle && (
                    <span
                      className="font-body text-xs font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: "var(--color-primary-10)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {article.categoryTitle}
                    </span>
                  )}
                  {article.readingTime > 0 && (
                    <span
                      className="font-body text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {article.readingTime} min
                    </span>
                  )}
                </div>
                <h3 className="font-body text-base font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p
                    className="font-body text-sm line-clamp-2 mb-3"
                    style={{
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {article.excerpt}
                  </p>
                )}
                <span
                  className="font-body text-sm font-medium"
                  style={{ color: "var(--color-accent)" }}
                >
                  {readMore} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
