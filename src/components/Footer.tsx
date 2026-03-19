import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sage-200 bg-forest-900 text-cream-200 mt-20">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6">
          <span className="text-xl font-serif font-bold text-cream-100">
            Shifu<span className="text-sage-400">Health</span>
          </span>
        </div>
        <p className="text-sm text-cream-300 mb-2">{t("tagline")}</p>
        <p className="text-xs text-cream-400 mb-6">{t("disclaimer")}</p>
        <p className="text-xs text-cream-500">
          © {year} ShifuHealth. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
