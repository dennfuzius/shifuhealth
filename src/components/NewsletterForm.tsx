"use client";

import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("newsletter");

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      >
        <input
          type="email"
          placeholder={t("placeholder")}
          className="flex-1 px-6 py-3 font-body text-[14px] outline-none"
          style={{
            backgroundColor: "white",
            color: "var(--color-text)",
            border: "none",
            borderRadius: "50px",
          }}
        />
        <button
          type="submit"
          className="px-8 py-3 font-body text-[13px] font-medium text-white transition-all duration-200 ease-in-out hover:opacity-90"
          style={{
            backgroundColor: "var(--color-accent)",
            borderRadius: "50px",
          }}
        >
          {t("cta")}
        </button>
      </form>
      <p className="font-body text-[12px] text-white mt-4" style={{ opacity: 0.7 }}>
        {t("privacy")}
      </p>
    </div>
  );
}
