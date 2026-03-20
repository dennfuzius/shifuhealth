"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "de" ? "en" : "de";

  const linkStyle =
    "font-body text-[13px] font-medium transition-all duration-200 ease-in-out hover:opacity-70";

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span
            className="font-heading text-[26px] font-medium"
            style={{ color: "var(--color-text)" }}
          >
            ShifuHealth
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          <Link
            href="/blog"
            className={linkStyle}
            style={{ color: "var(--color-text)" }}
          >
            {t("blog")}
          </Link>
          <Link
            href="/assistent"
            className={linkStyle}
            style={{ color: "var(--color-text)" }}
          >
            {t("assistant")}
          </Link>
          <Link
            href="/ueber-tcm"
            className={linkStyle}
            style={{ color: "var(--color-text)" }}
          >
            {t("aboutTcm")}
          </Link>
          <Link
            href={pathname as "/"}
            locale={otherLocale}
            className="font-body text-[13px] font-medium px-3 py-1 rounded-btn transition-all duration-200 ease-in-out"
            style={{
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
            }}
          >
            {t("language")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
