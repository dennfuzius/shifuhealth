"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/auth-context";

export type ArticleMeta = {
  slug: string;
  titleDe: string;
  titleEn: string;
  imageUrl?: string;
  categoryDe?: string;
  categoryEn?: string;
};

export function useFavorites() {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }
    supabase
      .from("favorites")
      .select("article_slug")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFavoriteIds(new Set(data?.map((f) => f.article_slug) || []));
      });
  }, [user, supabase]);

  const toggleFavorite = useCallback(
    async (article: ArticleMeta) => {
      if (!user) return false;
      const isFav = favoriteIds.has(article.slug);

      // Optimistic update
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        isFav ? next.delete(article.slug) : next.add(article.slug);
        return next;
      });

      if (isFav) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("article_slug", article.slug);
        if (error) {
          setFavoriteIds((prev) => new Set([...prev, article.slug]));
        }
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          article_slug: article.slug,
          article_title_de: article.titleDe,
          article_title_en: article.titleEn,
          article_image_url: article.imageUrl,
          category_title_de: article.categoryDe,
          category_title_en: article.categoryEn,
        });
        if (error) {
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(article.slug);
            return next;
          });
        }
      }
      return !isFav;
    },
    [user, favoriteIds, supabase]
  );

  return { favoriteIds, toggleFavorite, isLoggedIn: !!user };
}
