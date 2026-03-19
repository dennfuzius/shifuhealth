"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "de" ? "en" : "de";

  return (
    <header className="border-b border-sage-200 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-forest-800">
            Shifu<span className="text-sage-600">Health</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-forest-800 hover:text-sage-600 transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/blog"
            className="text-forest-800 hover:text-sage-600 transition-colors"
          >
            {t("blog")}
          </Link>
          <Link
            href="/assistent"
            className="text-forest-800 hover:text-sage-600 transition-colors"
          >
            {t("assistant")}
          </Link>
          <Link
            href={pathname as "/"}
            locale={otherLocale}
            className="rounded-full border border-sage-300 px-3 py-1 text-xs font-medium text-sage-700 hover:bg-sage-100 transition-colors"
          >
            {t("language")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
