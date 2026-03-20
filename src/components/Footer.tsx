"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "de" ? "en" : "de";

  return (
    <footer style={{ backgroundColor: "var(--color-text)", color: "var(--color-bg)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <span className="font-heading text-[24px] font-medium block mb-4" style={{ color: "var(--color-bg)" }}>
              ShifuHealth
            </span>
            <p className="font-body text-[14px] leading-relaxed max-w-xs" style={{ opacity: 0.7 }}>
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-body text-[13px] font-medium uppercase tracking-wider mb-4" style={{ opacity: 0.5 }}>
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/blog" className="font-body text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: "var(--color-bg)" }}>
                {t("blog")}
              </Link>
              <Link href="/assistent" className="font-body text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: "var(--color-bg)" }}>
                {t("assistant")}
              </Link>
              <Link href="/ueber-tcm" className="font-body text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: "var(--color-bg)" }}>
                {t("aboutTcm")}
              </Link>
            </nav>
          </div>

          {/* Column 3: Language & Social */}
          <div>
            <h4 className="font-body text-[13px] font-medium uppercase tracking-wider mb-4" style={{ opacity: 0.5 }}>
              {locale === "de" ? "Sprache & Social" : "Language & Social"}
            </h4>
            <Link
              href={pathname as "/"}
              locale={otherLocale}
              className="inline-block font-body text-[13px] font-medium px-4 py-2 rounded-lg mb-6 transition-opacity duration-200 hover:opacity-80"
              style={{
                border: "1px solid rgba(245, 237, 227, 0.3)",
                color: "var(--color-bg)",
              }}
            >
              {locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
            </Link>
            <div className="flex gap-5">
              {["Instagram", "YouTube", "LinkedIn"].map((name) => (
                <span
                  key={name}
                  className="font-body text-[12px] cursor-pointer transition-opacity duration-200 hover:opacity-100"
                  style={{ opacity: 0.5 }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="pt-8 text-center font-body text-[13px]"
          style={{ borderTop: "1px solid rgba(245, 237, 227, 0.15)", opacity: 0.6 }}
        >
          {t("disclaimer")}
        </div>
      </div>
    </footer>
  );
}
