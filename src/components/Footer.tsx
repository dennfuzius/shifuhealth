"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tLegal = useTranslations("legal");
  const locale = useLocale();
  const rawPathname = usePathname();
  const pathname = rawPathname.includes("[") ? "/" : rawPathname;
  const otherLocale = locale === "de" ? "en" : "de";

  const linkClass = "font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]";
  const linkStyle = { color: "var(--color-text-muted)" };

  return (
    <footer style={{ borderTop: "1px solid rgba(226, 219, 213, 0.5)" }}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            <span
              className="font-logo text-[18px] font-semibold"
              style={{ color: "var(--color-text-body)", letterSpacing: "-0.5px" }}
            >
              Shifu Health
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            <Link href="/ueber-tcm" className={linkClass} style={linkStyle}>
              {t("aboutTcm")}
            </Link>
            <Link href="/assistent" className={linkClass} style={linkStyle}>
              {t("assistant")}
            </Link>
            <Link href="/blog" className={linkClass} style={linkStyle}>
              {t("blog")}
            </Link>
            <Link href="/impressum" className={linkClass} style={linkStyle}>
              {tLegal("impressum")}
            </Link>
            <Link href="/datenschutz" className={linkClass} style={linkStyle}>
              {tLegal("datenschutz")}
            </Link>
            <Link
              href={pathname as "/"}
              locale={otherLocale}
              className={linkClass}
              style={linkStyle}
            >
              {locale === "de" ? "English" : "Deutsch"}
            </Link>
          </nav>

          {/* Copyright */}
          <p className="font-body text-[12px]" style={{ color: "var(--color-text-muted)" }}>
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
