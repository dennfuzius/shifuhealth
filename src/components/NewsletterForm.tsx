"use client";

import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder={t("placeholder")}
          className="flex-1 px-4 py-3 font-body text-sm outline-none transition-colors duration-200"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text-body)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-btn)",
          }}
        />
        <button
          type="submit"
          className="btn-primary text-sm px-6 py-3"
        >
          {t("cta")}
        </button>
      </form>
      <p
        className="font-body text-xs mt-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        {t("privacy")}
      </p>
    </div>
  );
}
