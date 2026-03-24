"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/auth-context";
import FavoriteButton from "@/components/FavoriteButton";

type Favorite = {
  id: string;
  article_slug: string;
  article_title_de: string;
  article_title_en: string;
  article_image_url: string | null;
  category_title_de: string | null;
  category_title_en: string | null;
};

export default function FavoritenPage() {
  const t = useTranslations("favorites");
  const locale = useLocale();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setFavorites((data as Favorite[]) || []);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <p className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
          ...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      <h1
        className="font-body text-2xl md:text-3xl font-bold mb-8"
        style={{ color: "var(--color-text)" }}
      >
        {t("title")}
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <p
            className="font-body text-base mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("empty")}
          </p>
          <Link
            href="/blog"
            className="btn-primary inline-block font-body text-sm px-6 py-3 rounded-btn"
          >
            {t("emptyAction")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const title =
              locale === "de" ? fav.article_title_de : fav.article_title_en;
            const category =
              locale === "de"
                ? fav.category_title_de
                : fav.category_title_en;
            return (
              <div
                key={fav.id}
                className="card rounded-card overflow-hidden relative"
                style={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {fav.article_image_url && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={fav.article_image_url}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  {category && (
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {category}
                    </span>
                  )}
                  <h3
                    className="font-body text-base font-bold mt-1 mb-3"
                    style={{ color: "var(--color-text)" }}
                  >
                    <Link href={{ pathname: "/blog/[slug]", params: { slug: fav.article_slug } }}>
                      {title}
                    </Link>
                  </h3>
                </div>
                <div className="absolute top-3 right-3">
                  <FavoriteButton
                    article={{
                      slug: fav.article_slug,
                      titleDe: fav.article_title_de,
                      titleEn: fav.article_title_en,
                      imageUrl: fav.article_image_url || undefined,
                      categoryDe: fav.category_title_de || undefined,
                      categoryEn: fav.category_title_en || undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
