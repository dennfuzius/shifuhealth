"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollAnimator from "@/components/ScrollAnimator";
import ShifuChat from "@/components/ShifuChat";

/* ── Unsplash images ─────────────────────────────────── */

const images = {
  hero: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  blog1: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
  blog2: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
  blog3: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
} as const;

const blogImages = [images.blog1, images.blog2, images.blog3];

/* ── SVG Decorations ───────────────────────────────────── */

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
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-0 w-full">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
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

            {/* Right: Hero image */}
            <div className="relative hidden md:block">
              <div
                className="absolute -inset-6 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, var(--color-primary-lt) 0%, transparent 70%)",
                  opacity: 0.12,
                }}
              />
              <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
                <Image
                  src={images.hero}
                  alt="Traditional Chinese Medicine — herbal tea ceremony with natural healing herbs"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/3" }}
                  priority
                  sizes="(max-width: 768px) 0vw, 50vw"
                />
                {/* Soft overlay to blend with site palette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, var(--color-surface) 0%, transparent 40%)",
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
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
        <div className="mx-auto max-w-6xl px-5 py-10">
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
      <section className="section-bg relative overflow-hidden py-16 md:py-24">
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
      <section className="section-surface relative py-16 md:py-24">
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

            {/* Right: Live embedded chat */}
            <ScrollAnimator>
              <div>
                <ShifuChat height="400px" embedded />
                <p
                  className="font-body text-[12px] italic text-center mt-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t("chat.demoNote")}
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      <span className="section-divider" />

      {/* ═══ SECTION 5: BLOG PREVIEW ═══ */}
      <section className="section-bg py-16 md:py-24">
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
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blogImages[n - 1]}
                      alt={
                        n === 1
                          ? "Warming ginger tea — TCM winter nutrition"
                          : n === 2
                            ? "Traditional Chinese Medicine healing herbs and spices"
                            : "Meditation and Qi energy practice in nature"
                      }
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
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
      <section className="section-surface py-16 md:py-24">
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
      <section className="py-16 md:py-24" style={{ backgroundColor: "var(--color-primary)" }}>
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
