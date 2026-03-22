"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const flags: Record<string, string> = {
  de: "\u{1F1E9}\u{1F1EA}",
  en: "\u{1F1EC}\u{1F1E7}",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const rawPathname = usePathname();
  // Fall back to "/" for dynamic routes with params (e.g. /blog/my-slug)
  // usePathname returns the matched route pattern, not the actual path
  const pathname = rawPathname.includes("[") ? "/" : rawPathname;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-body text-[13px] font-medium px-3 py-1.5 rounded-btn transition-all duration-200 ease-in-out"
        style={{
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
        }}
      >
        <span>{flags[locale]}</span>
        <span>{t("current")}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          <path d="M1 1l4 4 4-4" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="absolute right-0 mt-2 w-40 rounded-card overflow-hidden z-50"
        style={{
          backgroundColor: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-4px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        {(["de", "en"] as const).map((lang) => (
          <Link
            key={lang}
            href={pathname as "/"}
            locale={lang}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 font-body text-[13px] font-medium transition-all duration-200 ease-in-out"
            style={{
              color: locale === lang ? "var(--color-primary)" : "var(--color-text)",
              backgroundColor: locale === lang ? "var(--color-surface)" : "transparent",
            }}
          >
            <span>{flags[lang]}</span>
            <span>{t(lang)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
