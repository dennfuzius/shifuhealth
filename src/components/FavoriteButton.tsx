"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useFavorites, type ArticleMeta } from "@/lib/favorites/use-favorites";

export default function FavoriteButton({
  article,
  size = 20,
}: {
  article: ArticleMeta;
  size?: number;
}) {
  const t = useTranslations("favorites");
  const router = useRouter();
  const { favoriteIds, toggleFavorite, isLoggedIn } = useFavorites();
  const isFav = favoriteIds.has(article.slug);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    await toggleFavorite(article);
  };

  return (
    <button
      onClick={handleClick}
      title={isLoggedIn ? (isFav ? t("removed") : t("added")) : t("loginToSave")}
      className="transition-transform hover:scale-110 active:scale-95"
      style={{ lineHeight: 1 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFav ? "var(--color-accent)" : "none"}
        stroke={isFav ? "var(--color-accent)" : "var(--color-text-muted)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
