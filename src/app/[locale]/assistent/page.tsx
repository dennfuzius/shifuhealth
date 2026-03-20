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
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-10 text-center">
        <div
          className="w-12 h-1 rounded-full mx-auto mb-8"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <h1 className="mb-4">
          {t("title")}
        </h1>
        <p
          className="font-body text-base leading-relaxed max-w-xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("subtitle")}
        </p>
      </section>

      {/* Embedded chat */}
      <section className="mx-auto max-w-[720px] px-6 pb-6">
        <ShifuChat height="600px" embedded />
        <p
          className="font-body text-xs italic text-center mt-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {tc("demoNote")}
        </p>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className="card p-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="icon-container mb-5">
                {card.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                {t(card.titleKey)}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
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
