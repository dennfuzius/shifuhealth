"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollAnimator from "@/components/ScrollAnimator";
import ShifuChat from "@/components/ShifuChat";

/* ── SVG Icons ───────────────────────────────────────── */

function IconQi() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path d="M14 4c0 6-5 10-5 14a5 5 0 0010 0c0-4-5-8-5-14z" stroke="var(--color-primary)" strokeWidth="1.5" />
    </svg>
  );
}

function IconYinYang() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M14 3a11 11 0 000 22c0-6.1-5.5-11-5.5-11S14 9.1 14 3z" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="14" cy="8.5" r="1.5" fill="var(--color-primary)" opacity="0.3" />
      <circle cx="14" cy="19.5" r="1.5" stroke="var(--color-primary)" strokeWidth="0.8" />
    </svg>
  );
}

function IconFiveEl() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="3" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="7" cy="17" r="3" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="21" cy="17" r="3" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="10" cy="24" r="2" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="18" cy="24" r="2" stroke="var(--color-primary)" strokeWidth="1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="8" stroke="var(--color-primary)" strokeWidth="1.2" />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Element config ────────────────────────────────────── */

const elements = [
  { key: "wood" as const, color: "var(--el-wood)" },
  { key: "fire" as const, color: "var(--el-fire)" },
  { key: "earth" as const, color: "var(--el-earth)" },
  { key: "metal" as const, color: "var(--el-metal)" },
  { key: "water" as const, color: "var(--el-water)" },
];

/* ── Component ─────────────────────────────────────────── */

export default function HomeContent({ blogPreview }: { blogPreview?: React.ReactNode }) {
  const t = useTranslations();
  const [activeElement, setActiveElement] = useState<typeof elements[number]["key"]>("wood");
  const activeEl = elements.find((e) => e.key === activeElement)!;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="pt-20 pb-10 md:pt-24 md:pb-14" style={{ paddingTop: 72, paddingBottom: 60 }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in-up">
              <div
                className="w-12 h-1 rounded-full mb-8"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <h1 className="text-balance mb-4">{t("hero.title")}</h1>
              <p
                className="font-body text-lg leading-relaxed mb-4 max-w-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((item, i) => (
                  <span key={i} className="font-body text-[14px] font-medium" style={{ color: "var(--color-primary)" }}>
                    &#10003; {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/assistent" className="btn-primary">{t("hero.ctaPrimary")}</Link>
                <Link href="/blog" className="btn-secondary">{t("hero.ctaSecondary")}</Link>
              </div>
              <p className="font-body text-sm leading-relaxed max-w-lg" style={{ color: "var(--color-text-muted)" }}>
                {t("hero.seoText")}
              </p>
            </div>
            <div className="relative hidden md:block">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero-main.jpg"
                  alt="Traditionelle Chinesische Medizin - Kräuter, Tee und Heilwissen von Shifu Health"
                  width={1408} height={768}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/9" }}
                  priority
                  sizes="(max-width: 768px) 0vw, 50vw"
                />
              </div>
              <div
                className="absolute -bottom-4 -left-4 card px-5 py-4 flex items-center gap-3"
                style={{ boxShadow: "var(--shadow-lg)", border: "1px solid rgba(226, 219, 213, 0.5)", borderRadius: "12px" }}
              >
                <div className="icon-container"><IconQi /></div>
                <div>
                  <p className="font-body text-sm font-semibold" style={{ color: "var(--color-text)" }}>2.500+</p>
                  <p className="font-body text-xs" style={{ color: "var(--color-text-muted)" }}>{t("trust.item1")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TCM PRINCIPLES ═══ */}
      <section className="section-surface">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimator>
            <div className="text-center mb-8">
              <h2 className="mb-4">{t("tcmIntro.title")}</h2>
            </div>
          </ScrollAnimator>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <IconQi />, titleKey: "qi_title", textKey: "qi_text", quoteKey: "qi_quote" },
              { icon: <IconYinYang />, titleKey: "yinyang_title", textKey: "yinyang_text", quoteKey: "yinyang_quote" },
              { icon: <IconFiveEl />, titleKey: "elements_title", textKey: "elements_text", quoteKey: "elements_quote" },
            ].map((item, i) => (
              <ScrollAnimator key={i}>
                <div className="card p-5 hover:shadow-md transition-shadow duration-300">
                  <div className="icon-container mb-5">{item.icon}</div>
                  <h3 className="font-body text-xl font-semibold mb-3">
                    {t(`tcmIntro.${item.titleKey}` as "tcmIntro.qi_title")}
                  </h3>
                  <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
                    {t(`tcmIntro.${item.textKey}` as "tcmIntro.qi_text")}
                  </p>
                  <p className="font-body text-sm italic" style={{ color: "var(--color-text-muted)" }}>
                    {t(`tcmIntro.${item.quoteKey}` as "tcmIntro.qi_quote")}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SHIFU QI ═══ */}
      <section className="">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <ScrollAnimator>
              <div>
                <div className="w-12 h-1 rounded-full mb-8" style={{ backgroundColor: "var(--color-primary)" }} />
                <h2 className="mb-5">{t("shifuQi.title")}</h2>
                <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
                  {t("shifuQi.body")}
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {[t("shifuQi.bullet1"), t("shifuQi.bullet2"), t("shifuQi.bullet3")].map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="font-body text-[14px]" style={{ color: "var(--color-text-body)" }}>{bullet}</span>
                    </div>
                  ))}
                </div>
                <Link href="/assistent" className="btn-primary">{t("shifuQi.cta")}</Link>
              </div>
            </ScrollAnimator>
            <ScrollAnimator>
              <div>
                <ShifuChat height="400px" embedded />
                <p className="font-body text-xs italic text-center mt-3" style={{ color: "var(--color-text-muted)" }}>
                  {t("chat.demoNote")}
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* ═══ BLOG PREVIEW (server component slot) ═══ */}
      {blogPreview}

      {/* ═══ FIVE ELEMENTS ═══ */}
      <section className="">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollAnimator>
            <div className="text-center mb-8">
              <h2>{t("fiveElements.title")}</h2>
            </div>
          </ScrollAnimator>
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {elements.map((el) => (
              <button
                key={el.key}
                onClick={() => setActiveElement(el.key)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 active:scale-95 font-body text-sm font-medium"
                style={{
                  backgroundColor: activeElement === el.key ? "var(--color-card)" : "transparent",
                  border: activeElement === el.key ? "1px solid rgba(226, 219, 213, 0.6)" : "1px solid transparent",
                  boxShadow: activeElement === el.key ? "var(--shadow-md)" : "none",
                  color: "var(--color-text-body)",
                }}
              >
                <span className="font-body text-lg" style={{ color: el.color }}>
                  {t(`fiveElements.${el.key}Symbol` as "fiveElements.woodSymbol")}
                </span>
                {t(`fiveElements.${el.key}` as "fiveElements.wood")}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="card p-6 md:p-8" style={{ border: "1px solid rgba(226, 219, 213, 0.4)" }}>
              <div className="text-center mb-6">
                <span className="font-body text-5xl block mb-2" style={{ color: activeEl.color, opacity: 0.3 }}>
                  {t(`fiveElements.${activeElement}Symbol` as "fiveElements.woodSymbol")}
                </span>
                <h3 className="font-body text-2xl font-semibold mb-2">
                  {t(`fiveElements.${activeElement}` as "fiveElements.wood")}
                </h3>
              </div>
              <p className="font-body text-base leading-relaxed text-center mb-8" style={{ color: "var(--color-text-secondary)" }}>
                {t(`fiveElements.${activeElement}Text` as "fiveElements.woodText")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: t("fiveElements.labelOrgan" as "fiveElements.wood"), key: "Organ" },
                  { label: t("fiveElements.labelSeason" as "fiveElements.wood"), key: "Season" },
                  { label: t("fiveElements.labelEmotion" as "fiveElements.wood"), key: "Emotion" },
                  { label: t("fiveElements.labelTaste" as "fiveElements.wood"), key: "Taste" },
                ].map((attr) => (
                  <div key={attr.key} className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
                    <p className="font-body text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{attr.label}</p>
                    <p className="font-body text-sm font-medium" style={{ color: "var(--color-text-body)" }}>
                      {t(`fiveElements.${activeElement}${attr.key}` as "fiveElements.woodOrgan")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="section-surface">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mx-auto card p-8 md:p-10 text-center" style={{ border: "1px solid rgba(226, 219, 213, 0.4)" }}>
            <h2 className="text-2xl md:text-3xl mb-3">{t("newsletter.title")}</h2>
            <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              {t("newsletter.subtitle")}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
