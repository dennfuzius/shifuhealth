"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollAnimator from "@/components/ScrollAnimator";

/* ── SVG Decorations ───────────────────────────────────── */

function BotanicalHero() {
  return (
    <svg
      className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none"
      width="500" height="500" viewBox="0 0 500 500" fill="none"
      style={{ opacity: 0.07 }}
    >
      <circle cx="250" cy="250" r="230" stroke="var(--color-accent)" strokeWidth="0.8" />
      <circle cx="250" cy="250" r="180" stroke="var(--color-accent)" strokeWidth="0.6" />
      <circle cx="250" cy="250" r="130" stroke="var(--color-accent)" strokeWidth="0.4" />
      <path d="M250 20c0 70-50 120-50 190s50 120 50 50" stroke="var(--color-accent)" strokeWidth="1" />
      <path d="M250 20c0 70 50 120 50 190s-50 120-50 50" stroke="var(--color-accent)" strokeWidth="1" />
      <path d="M90 150c60 35 95 70 160 100" stroke="var(--color-accent)" strokeWidth="0.8" />
      <path d="M410 150c-60 35-95 70-160 100" stroke="var(--color-accent)" strokeWidth="0.8" />
      <path d="M120 380c50-25 85-60 130-85" stroke="var(--color-accent)" strokeWidth="0.8" />
      <path d="M380 380c-50-25-85-60-130-85" stroke="var(--color-accent)" strokeWidth="0.8" />
      {/* Leaf details */}
      <ellipse cx="200" cy="160" rx="30" ry="15" transform="rotate(-30 200 160)" stroke="var(--color-accent)" strokeWidth="0.6" />
      <ellipse cx="300" cy="160" rx="30" ry="15" transform="rotate(30 300 160)" stroke="var(--color-accent)" strokeWidth="0.6" />
      <ellipse cx="180" cy="320" rx="25" ry="12" transform="rotate(20 180 320)" stroke="var(--color-accent)" strokeWidth="0.6" />
      <ellipse cx="320" cy="320" rx="25" ry="12" transform="rotate(-20 320 320)" stroke="var(--color-accent)" strokeWidth="0.6" />
    </svg>
  );
}

function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03 }}>
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--color-text)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function WaveTexture() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }} preserveAspectRatio="none">
      <path d="M0 60 Q 200 20, 400 60 T 800 60 T 1200 60 T 1600 60" stroke="var(--color-primary)" strokeWidth="1" fill="none" />
      <path d="M0 120 Q 200 80, 400 120 T 800 120 T 1200 120 T 1600 120" stroke="var(--color-primary)" strokeWidth="0.8" fill="none" />
      <path d="M0 180 Q 200 140, 400 180 T 800 180 T 1200 180 T 1600 180" stroke="var(--color-primary)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M14 8v6l3.5 2.5" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 21C7 21 9 7 21 7C21 7 19 21 7 21Z" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 21C11 17 15 13 21 7" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconQi() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4c0 6-5 10-5 14a5 5 0 0010 0c0-4-5-8-5-14z" stroke="var(--color-primary)" strokeWidth="1.5" />
    </svg>
  );
}

function IconYinYang() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M14 3a11 11 0 000 22c0-6.1-5.5-11-5.5-11S14 9.1 14 3z" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="14" cy="8.5" r="1.5" fill="var(--color-primary)" opacity="0.3" />
      <circle cx="14" cy="19.5" r="1.5" stroke="var(--color-primary)" strokeWidth="0.8" />
    </svg>
  );
}

function IconFiveEl() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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

function YinYangSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="var(--color-primary-lt)" strokeWidth="1" />
      <path d="M7 1a6 6 0 000 12c0-3.3-3-6-3-6s3-2.7 3-6z" fill="var(--color-primary-lt)" opacity="0.3" />
    </svg>
  );
}

/* ── Element config ────────────────────────────────────── */

const elementColors: Record<string, string> = {
  wood: "var(--color-primary)",
  fire: "#C4855A",
  earth: "var(--color-gold)",
  metal: "#B5A898",
  water: "#7A9BAE",
};

/* ── Homepage ──────────────────────────────────────────── */

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(ellipse at center, var(--color-surface) 0%, var(--color-bg) 70%)",
        }}
      >
        <DotGrid />
        <BotanicalHero />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-0 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Gold accent line */}
            <div className="mb-6" style={{ width: 60, height: 2, backgroundColor: "var(--color-gold)" }} />

            <h1
              className="font-body text-[32px] md:text-[52px] font-bold leading-[1.15] mb-6"
              style={{ color: "var(--color-text)" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="font-body text-[16px] leading-[1.75] mb-6 max-w-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* Inline trust signals */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((item, i) => (
                <span key={i} className="font-body text-[13px] font-medium" style={{ color: "var(--color-primary)" }}>
                  &#10003; {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/assistent" className="btn-primary">
                {t("hero.ctaPrimary")}
              </Link>
              <Link href="/blog" className="btn-secondary">
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            {/* SEO paragraph */}
            <p className="font-body text-[13px] leading-[1.75] max-w-lg" style={{ color: "var(--color-text-muted)" }}>
              {t("hero.seoText")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <span className="section-divider" />

      {/* ═══ SECTION 2: TRUST BAR ═══ */}
      <section
        className="section-surface"
        style={{ borderBottom: "2px solid var(--color-gold)" }}
      >
        <div className="mx-auto max-w-6xl px-5" style={{ padding: "40px 20px" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <IconClock />, text: t("trust.item1") },
              { icon: <IconLeaf />, text: t("trust.item2") },
              { icon: <IconSparkle />, text: t("trust.item3") },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                {item.icon}
                <span className="font-body text-[13px] font-medium tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <span className="section-divider" />

      {/* ═══ SECTION 3: WHAT IS TCM ═══ */}
      <section className="section-bg relative overflow-hidden" style={{ padding: "100px 0" }}>
        <WaveTexture />
        <div className="relative mx-auto max-w-6xl px-5">
          <ScrollAnimator>
            <h2 className="font-body text-[28px] font-bold text-center mb-14" style={{ color: "var(--color-text)" }}>
              {t("tcmIntro.title")}
            </h2>
          </ScrollAnimator>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <IconQi />, titleKey: "qi_title", textKey: "qi_text", quoteKey: "qi_quote" },
              { icon: <IconYinYang />, titleKey: "yinyang_title", textKey: "yinyang_text", quoteKey: "yinyang_quote" },
              { icon: <IconFiveEl />, titleKey: "elements_title", textKey: "elements_text", quoteKey: "elements_quote" },
            ].map((item, i) => (
              <ScrollAnimator key={i}>
                <div className="card p-7 text-center">
                  {/* Icon circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "var(--color-primary-lt)", opacity: 0.85 }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-body text-[18px] font-medium mb-3" style={{ color: "var(--color-text)" }}>
                    {t(`tcmIntro.${item.titleKey}` as "tcmIntro.qi_title")}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.75] mb-4" style={{ color: "var(--color-text-muted)" }}>
                    {t(`tcmIntro.${item.textKey}` as "tcmIntro.qi_text")}
                  </p>
                  {/* Decorative quote */}
                  <p className="font-heading text-[15px] italic" style={{ color: "var(--color-text-muted)" }}>
                    {t(`tcmIntro.${item.quoteKey}` as "tcmIntro.qi_quote")}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <span className="section-divider" />

      {/* ═══ SECTION 4: SHIFU QI ═══ */}
      <section className="section-surface relative" style={{ padding: "100px 0" }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <ScrollAnimator>
              <div className="relative">
                {/* Soft glow behind */}
                <div
                  className="absolute -left-10 -top-10 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, var(--color-primary-lt) 0%, transparent 70%)",
                    opacity: 0.15,
                  }}
                />
                <div className="relative">
                  <h2 className="font-body text-[28px] font-bold mb-5" style={{ color: "var(--color-text)" }}>
                    {t("shifuQi.title")}
                  </h2>
                  <p className="font-body text-[16px] leading-[1.75] mb-6" style={{ color: "var(--color-text-muted)" }}>
                    {t("shifuQi.body")}
                  </p>

                  {/* Bullet points */}
                  <div className="flex flex-col gap-3 mb-8">
                    {[t("shifuQi.bullet1"), t("shifuQi.bullet2"), t("shifuQi.bullet3")].map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="font-body text-[14px]" style={{ color: "var(--color-text)" }}>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/assistent" className="btn-primary">
                    {t("shifuQi.cta")}
                  </Link>
                </div>
              </div>
            </ScrollAnimator>

            {/* Right: Chat mockup */}
            <ScrollAnimator>
              <div className="card p-6">
                <div className="flex flex-col gap-4">
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div
                      className="max-w-[80%] rounded-[12px] rounded-br-[4px] px-4 py-3"
                      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                    >
                      <p className="font-body text-[14px]" style={{ color: "var(--color-text)" }}>
                        {t("shifuQi.chatUser")}
                      </p>
                    </div>
                  </div>
                  {/* Bot bubble */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%]">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <YinYangSmall />
                        <span className="font-body text-[12px] font-medium" style={{ color: "var(--color-primary)" }}>
                          Shifu Qi
                        </span>
                      </div>
                      <div
                        className="rounded-[12px] rounded-bl-[4px] px-4 py-3"
                        style={{ backgroundColor: "var(--color-primary)", color: "white" }}
                      >
                        <p className="font-body text-[14px] leading-[1.65]">
                          {t("shifuQi.chatBot")}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Input mockup */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 mt-2"
                    style={{
                      border: "1px solid var(--color-border)",
                      backgroundColor: "var(--color-bg)",
                      borderRadius: "var(--radius-btn)",
                    }}
                  >
                    <span className="font-body text-[14px] flex-1" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
                      {t("assistant.placeholder")}
                    </span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12m0 0l-4-4m4 4l-4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      <span className="section-divider" />

      {/* ═══ SECTION 5: BLOG PREVIEW ═══ */}
      <section className="section-bg" style={{ padding: "100px 0" }}>
        <div className="mx-auto max-w-6xl px-5">
          <ScrollAnimator>
            <h2 className="font-body text-[28px] font-bold text-center mb-14" style={{ color: "var(--color-text)" }}>
              {t("blogPreview.title")}
            </h2>
          </ScrollAnimator>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((n) => (
              <ScrollAnimator key={n}>
                <div
                  className="card overflow-hidden"
                  style={{
                    boxShadow: "var(--shadow-card)",
                    borderTop: "3px solid var(--color-primary)",
                  }}
                >
                  <div className="h-40" style={{ backgroundColor: "var(--color-surface)" }} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-[12px] font-medium uppercase tracking-wider" style={{ color: "var(--color-primary-lt)" }}>
                        {t(`blogPreview.article${n}Cat` as "blogPreview.article1Cat")}
                      </span>
                      <span className="font-body text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        {t("blogPreview.readTime")}
                      </span>
                    </div>
                    <h3 className="font-body text-[18px] font-medium mt-1 mb-3" style={{ color: "var(--color-text)" }}>
                      {t(`blogPreview.article${n}Title` as "blogPreview.article1Title")}
                    </h3>
                    <p className="font-body text-[14px] leading-[1.75] mb-4" style={{ color: "var(--color-text-muted)" }}>
                      {t(`blogPreview.article${n}Excerpt` as "blogPreview.article1Excerpt")}
                    </p>
                    <span className="font-body text-[13px] font-medium" style={{ color: "var(--color-accent)" }}>
                      {t("blogPreview.readMore")} &rarr;
                    </span>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="btn-secondary">
              {t("blogPreview.allArticles")}
            </Link>
          </div>
        </div>
      </section>

      <span className="section-divider" />

      {/* ═══ SECTION 6: FIVE ELEMENTS ═══ */}
      <section className="section-surface" style={{ padding: "100px 0" }}>
        <div className="mx-auto max-w-6xl px-5">
          <ScrollAnimator>
            <h2 className="font-body text-[28px] font-bold text-center mb-14" style={{ color: "var(--color-text)" }}>
              {t("fiveElements.title")}
            </h2>
          </ScrollAnimator>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {(["wood", "fire", "earth", "metal", "water"] as const).map((el) => (
              <ScrollAnimator key={el}>
                <div
                  className="card p-5 text-center transition-all duration-200 ease-in-out"
                  style={{ borderColor: "var(--color-border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                >
                  {/* Accent dot */}
                  <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ backgroundColor: elementColors[el] }} />

                  {/* Chinese symbol */}
                  <span className="font-heading text-[28px] block mb-1" style={{ color: "var(--color-text)", opacity: 0.2 }}>
                    {t(`fiveElements.${el}Symbol` as "fiveElements.woodSymbol")}
                  </span>

                  <h3 className="font-body text-[16px] font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    {t(`fiveElements.${el}` as "fiveElements.wood")}
                  </h3>
                  <p className="font-body text-[11px] font-medium mb-0.5" style={{ color: "var(--color-primary)" }}>
                    {t(`fiveElements.${el}Organ` as "fiveElements.woodOrgan")}
                  </p>
                  <p className="font-body text-[11px] mb-0.5" style={{ color: "var(--color-gold)" }}>
                    {t(`fiveElements.${el}Season` as "fiveElements.woodSeason")}
                  </p>
                  <p className="font-body text-[11px] mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {t(`fiveElements.${el}Emotion` as "fiveElements.woodEmotion")}
                  </p>
                  <p className="font-body text-[11px] mb-2" style={{ color: "var(--color-accent)" }}>
                    {t(`fiveElements.${el}Taste` as "fiveElements.woodTaste")}
                  </p>
                  <p className="font-body text-[11px] leading-[1.6]" style={{ color: "var(--color-text-muted)" }}>
                    {t(`fiveElements.${el}Text` as "fiveElements.woodText")}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <span className="section-divider" />

      {/* ═══ SECTION 7: NEWSLETTER ═══ */}
      <section style={{ backgroundColor: "var(--color-primary)", padding: "80px 0" }}>
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-body text-[28px] font-bold text-white mb-3">
            {t("newsletter.title")}
          </h2>
          <p className="font-body text-[14px] text-white mb-8" style={{ opacity: 0.8 }}>
            {t("newsletter.subtitle")}
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
