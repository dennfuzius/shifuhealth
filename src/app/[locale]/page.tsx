import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NewsletterForm from "@/components/NewsletterForm";

/* ── Inline SVG icons ─────────────────────────────────────── */

function IconHistory() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M16 10v6l4 3" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBridge() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22c4-8 8-12 12-12s8 4 12 12" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16" x2="10" y2="22" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="16" x2="22" y2="22" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFree() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6l2.5 5.5L24 12.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1z" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconQi() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.3" />
      <path d="M20 8c0 8-6 12-6 18a6 6 0 0012 0c0-6-6-10-6-18z" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function IconYinYang() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M20 4a16 16 0 010 32c0-8.8-7.2-16-8-16s8-7.2 8-16z" fill="var(--color-primary)" opacity="0.15" />
      <circle cx="20" cy="12" r="2.5" fill="var(--color-primary)" opacity="0.3" />
      <circle cx="20" cy="28" r="2.5" stroke="var(--color-primary)" strokeWidth="1" />
    </svg>
  );
}

function IconElements() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="10" r="4" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="10" cy="24" r="4" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="30" cy="24" r="4" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="14" cy="33" r="3" stroke="var(--color-primary)" strokeWidth="1.2" />
      <circle cx="26" cy="33" r="3" stroke="var(--color-primary)" strokeWidth="1.2" />
      <line x1="20" y1="14" x2="12" y2="21" stroke="var(--color-primary)" strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="14" x2="28" y2="21" stroke="var(--color-primary)" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function BotanicalDecoration() {
  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="210" cy="210" r="200" stroke="var(--color-primary)" strokeWidth="0.8" />
      <circle cx="210" cy="210" r="160" stroke="var(--color-primary)" strokeWidth="0.6" />
      <circle cx="210" cy="210" r="120" stroke="var(--color-primary)" strokeWidth="0.4" />
      {/* Leaves */}
      <path d="M210 10c0 60-40 100-40 160s40 100 40 40" stroke="var(--color-primary)" strokeWidth="1" />
      <path d="M210 10c0 60 40 100 40 160s-40 100-40 40" stroke="var(--color-primary)" strokeWidth="1" />
      <path d="M80 130c50 30 80 60 130 80" stroke="var(--color-primary)" strokeWidth="0.8" />
      <path d="M340 130c-50 30-80 60-130 80" stroke="var(--color-primary)" strokeWidth="0.8" />
      <path d="M100 320c40-20 70-50 110-70" stroke="var(--color-primary)" strokeWidth="0.8" />
      <path d="M320 320c-40-20-70-50-110-70" stroke="var(--color-primary)" strokeWidth="0.8" />
    </svg>
  );
}

/* ── Element colors for Five Elements section ──────────── */
const elementColors: Record<string, string> = {
  wood: "#7B9E87",
  fire: "#C4855A",
  earth: "#D4A96A",
  metal: "#9EAAB0",
  water: "#5A7F9E",
};

/* ── Homepage Component ───────────────────────────────── */

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="section-bg relative overflow-hidden">
        <BotanicalDecoration />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1
              className="font-body text-[28px] md:text-[42px] font-bold leading-[1.2] mb-6"
              style={{ color: "var(--color-text)" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="font-body text-[16px] leading-[1.75] mb-10 max-w-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assistent" className="btn-primary">
                {t("hero.ctaPrimary")}
              </Link>
              <Link href="/blog" className="btn-secondary">
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: TRUST BAR ═══ */}
      <section
        className="section-surface"
        style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <IconHistory />, text: t("trust.item1") },
              { icon: <IconBridge />, text: t("trust.item2") },
              { icon: <IconFree />, text: t("trust.item3") },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                {item.icon}
                <span
                  className="font-body text-[13px] font-medium tracking-wide"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHAT IS TCM ═══ */}
      <section className="section-bg">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2
            className="font-body text-[28px] font-bold text-center mb-14"
            style={{ color: "var(--color-text)" }}
          >
            {t("tcmIntro.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <IconQi />, title: t("tcmIntro.qi_title"), text: t("tcmIntro.qi_text") },
              { icon: <IconYinYang />, title: t("tcmIntro.yinyang_title"), text: t("tcmIntro.yinyang_text") },
              { icon: <IconElements />, title: t("tcmIntro.elements_title"), text: t("tcmIntro.elements_text") },
            ].map((item, i) => (
              <div key={i} className="card p-7 text-center">
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3
                  className="font-body text-[18px] font-medium mb-3"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body text-[14px] leading-[1.75]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: SHIFU QI TEASER ═══ */}
      <section className="section-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h2
                className="font-body text-[28px] font-bold mb-5"
                style={{ color: "var(--color-text)" }}
              >
                {t("shifuQi.title")}
              </h2>
              <p
                className="font-body text-[16px] leading-[1.75] mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("shifuQi.body")}
              </p>
              <Link href="/assistent" className="btn-primary">
                {t("shifuQi.cta")}
              </Link>
            </div>

            {/* Right: Chat mockup */}
            <div className="card p-6">
              <div className="flex flex-col gap-4">
                {/* User bubble */}
                <div className="flex justify-end">
                  <div
                    className="max-w-[80%] rounded-[12px] rounded-br-[4px] px-4 py-3"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    }}
                  >
                    <p className="font-body text-[14px]">{t("shifuQi.chatUser")}</p>
                  </div>
                </div>
                {/* Bot bubble */}
                <div className="flex justify-start">
                  <div
                    className="max-w-[80%] rounded-[12px] rounded-bl-[4px] px-4 py-3"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <p className="font-body text-[13px] font-medium mb-1" style={{ color: "var(--color-primary)" }}>
                      Shifu Qi
                    </p>
                    <p className="font-body text-[14px]" style={{ color: "var(--color-text)" }}>
                      {t("shifuQi.chatBot")}
                    </p>
                  </div>
                </div>
                {/* Input mockup */}
                <div
                  className="flex items-center gap-3 rounded-btn px-4 py-3 mt-2"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                  }}
                >
                  <span className="font-body text-[14px] flex-1" style={{ color: "var(--color-text-muted)", opacity: 0.6 }}>
                    {t("assistant.placeholder")}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: BLOG PREVIEW ═══ */}
      <section className="section-bg">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2
            className="font-body text-[28px] font-bold text-center mb-14"
            style={{ color: "var(--color-text)" }}
          >
            {t("blogPreview.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card overflow-hidden">
                {/* Placeholder image area */}
                <div
                  className="h-40"
                  style={{ backgroundColor: "var(--color-surface)" }}
                />
                <div className="p-6">
                  <span
                    className="font-body text-[12px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--color-primary-lt)" }}
                  >
                    {t(`blogPreview.article${n}Cat` as `blogPreview.article1Cat`)}
                  </span>
                  <h3
                    className="font-body text-[18px] font-medium mt-2 mb-3"
                    style={{ color: "var(--color-text)" }}
                  >
                    {t(`blogPreview.article${n}Title` as `blogPreview.article1Title`)}
                  </h3>
                  <p
                    className="font-body text-[14px] leading-[1.75] mb-4"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`blogPreview.article${n}Excerpt` as `blogPreview.article1Excerpt`)}
                  </p>
                  <span
                    className="font-body text-[13px] font-medium transition-all duration-200 ease-in-out"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {t("blogPreview.readMore")} →
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="btn-secondary">
              {t("blogPreview.allArticles")}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: FIVE ELEMENTS ═══ */}
      <section className="section-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2
            className="font-body text-[28px] font-bold text-center mb-14"
            style={{ color: "var(--color-text)" }}
          >
            {t("fiveElements.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {(["wood", "fire", "earth", "metal", "water"] as const).map((el) => (
              <div key={el} className="card p-5 text-center relative">
                {/* Accent dot */}
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: elementColors[el] }}
                />
                <h3
                  className="font-body text-[18px] font-medium mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {t(`fiveElements.${el}` as `fiveElements.wood`)}
                </h3>
                <p className="font-body text-[12px] font-medium mb-1" style={{ color: "var(--color-primary)" }}>
                  {t(`fiveElements.${el}Organ` as `fiveElements.woodOrgan`)}
                </p>
                <p className="font-body text-[12px] mb-1" style={{ color: "var(--color-gold)" }}>
                  {t(`fiveElements.${el}Season` as `fiveElements.woodSeason`)}
                </p>
                <p className="font-body text-[12px] mb-3" style={{ color: "var(--color-text-muted)" }}>
                  {t(`fiveElements.${el}Emotion` as `fiveElements.woodEmotion`)}
                </p>
                <p className="font-body text-[12px] leading-[1.6]" style={{ color: "var(--color-text-muted)" }}>
                  {t(`fiveElements.${el}Text` as `fiveElements.woodText`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: NEWSLETTER ═══ */}
      <section style={{ backgroundColor: "var(--color-primary)" }}>
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-body text-[28px] font-bold text-white mb-8">
            {t("newsletter.title")}
          </h2>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
