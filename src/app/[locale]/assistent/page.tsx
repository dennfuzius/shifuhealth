import { useTranslations } from "next-intl";

export default function AssistantPage() {
  const t = useTranslations("assistant");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-forest-700">{t("subtitle")}</p>
      </div>

      <div className="rounded-2xl border border-sage-200 bg-white p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-serif font-semibold text-forest-900 mb-3">
          {t("comingSoon")}
        </h2>
        <p className="text-forest-700 leading-relaxed max-w-md mx-auto">
          {t("comingSoonText")}
        </p>
      </div>
    </div>
  );
}
