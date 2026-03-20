"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "de" ? "en" : "de";

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(226, 219, 213, 0.5)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            <span
              className="font-heading text-[18px] font-semibold"
              style={{ color: "var(--color-text-body)", letterSpacing: "-0.5px" }}
            >
              ShifuHealth
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              href="/ueber-tcm"
              className="font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("aboutTcm")}
            </Link>
            <Link
              href="/assistent"
              className="font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("assistant")}
            </Link>
            <Link
              href="/blog"
              className="font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("blog")}
            </Link>
            <Link
              href={pathname as "/"}
              locale={otherLocale}
              className="font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {locale === "de" ? "English" : "Deutsch"}
            </Link>
          </nav>

          {/* Copyright */}
          <p
            className="font-body text-[12px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
