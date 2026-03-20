import { getTranslations } from "next-intl/server";

export default async function AboutTcmPage() {
  const t = await getTranslations("tcmIntro");

  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <h1 className="font-body text-[28px] md:text-[42px] font-bold mb-6" style={{ color: "var(--color-text)" }}>
        {t("title")}
      </h1>
      <p className="font-body text-[16px] leading-[1.75]" style={{ color: "var(--color-text-muted)" }}>
        {t("qi_text")} {t("yinyang_text")} {t("elements_text")}
      </p>
    </div>
  );
}
