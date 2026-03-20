"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");

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
          <Link href="/blog" className={linkStyle} style={{ color: "var(--color-text)" }}>
            {t("blog")}
          </Link>
          <Link href="/assistent" className={linkStyle} style={{ color: "var(--color-text)" }}>
            {t("assistant")}
          </Link>
          <Link href="/ueber-tcm" className={linkStyle} style={{ color: "var(--color-text)" }}>
            {t("aboutTcm")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
