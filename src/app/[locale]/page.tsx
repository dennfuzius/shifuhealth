import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream-100 to-earth-100" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-forest-900 leading-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-forest-700 leading-relaxed mb-10">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg bg-forest-800 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-forest-700 transition-colors"
              >
                {t("cta")}
              </Link>
              <Link
                href="/assistent"
                className="inline-flex items-center justify-center rounded-lg border-2 border-sage-500 px-6 py-3 text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors"
              >
                {t("ctaAssistant")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brief intro section */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-sage-100">
            <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center mb-4">
              <span className="text-sage-700 text-lg">🌿</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-800 mb-2">
              {t("feature1Title")}
            </h3>
            <p className="text-sm text-forest-700 leading-relaxed">
              {t("feature1Text")}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-sage-100">
            <div className="w-10 h-10 rounded-full bg-earth-100 flex items-center justify-center mb-4">
              <span className="text-earth-700 text-lg">🍂</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-800 mb-2">
              {t("feature2Title")}
            </h3>
            <p className="text-sm text-forest-700 leading-relaxed">
              {t("feature2Text")}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-sage-100">
            <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center mb-4">
              <span className="text-terracotta-500 text-lg">🤖</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-800 mb-2">
              {t("feature3Title")}
            </h3>
            <p className="text-sm text-forest-700 leading-relaxed">
              {t("feature3Text")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
