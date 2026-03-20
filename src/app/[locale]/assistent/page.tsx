"use client";

import { useTranslations } from "next-intl";
import ShifuChat from "@/components/ShifuChat";

/* ── Info card icons ──────────────────────────────────── */

function IconGear() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path
        d="M12 1v2m0 18v2m-9-11H1m22 0h-2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v5c0 5.25-3.4 10.15-8 11.5C7.4 21.15 4 16.25 4 11V6l8-4z"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="var(--color-primary)" strokeWidth="1.5" />
      <path d="M2 12h20M12 2c3 3 4.5 6 4.5 10s-1.5 7-4.5 10c-3-3-4.5-6-4.5-10S9 5 12 2z" stroke="var(--color-primary)" strokeWidth="1.2" />
    </svg>
  );
}

export default function AssistantPage() {
  const t = useTranslations("assistant");
  const tc = useTranslations("chat");

  const infoCards = [
    { icon: <IconGear />, titleKey: "infoCard1Title" as const, textKey: "infoCard1Text" as const },
    { icon: <IconShield />, titleKey: "infoCard2Title" as const, textKey: "infoCard2Text" as const },
    { icon: <IconGlobe />, titleKey: "infoCard3Title" as const, textKey: "infoCard3Text" as const },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 text-center">
        <h1
          className="font-body text-[28px] md:text-[42px] font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {t("title")}
        </h1>
        <p
          className="font-body text-[16px] leading-[1.75] max-w-xl mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("subtitle")}
        </p>
      </section>

      {/* Embedded chat */}
      <section className="mx-auto max-w-[720px] px-5 pb-6">
        <ShifuChat height="600px" embedded />
        <p
          className="font-body text-[12px] italic text-center mt-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {tc("demoNote")}
        </p>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="card p-6"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--color-primary-lt)", opacity: 0.85 }}
              >
                {card.icon}
              </div>
              <h3
                className="font-body text-[16px] font-medium mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {t(card.titleKey)}
              </h3>
              <p
                className="font-body text-[14px] leading-[1.7]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t(card.textKey)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
