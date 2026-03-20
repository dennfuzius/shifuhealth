"use client";

import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder={t("placeholder")}
        className="flex-1 rounded-btn px-4 py-3 font-body text-[14px] outline-none"
        style={{
          backgroundColor: "white",
          color: "var(--color-text)",
          border: "none",
        }}
      />
      <button
        type="submit"
        className="rounded-btn px-6 py-3 font-body text-[13px] font-medium text-white transition-all duration-200 ease-in-out hover:opacity-90"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        {t("cta")}
      </button>
    </form>
  );
}
