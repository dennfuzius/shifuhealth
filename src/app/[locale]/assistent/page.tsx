import { useTranslations } from "next-intl";

export default function AssistantPage() {
  const t = useTranslations("assistant");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-12">
        <h1
          className="font-body text-[28px] md:text-[42px] font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {t("title")}
        </h1>
        <p
          className="font-body text-[16px] leading-[1.75]"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("subtitle")}
        </p>
      </div>

      <div
        className="card p-12 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="var(--color-primary)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </div>
        <h2
          className="font-body text-[28px] font-bold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          {t("comingSoon")}
        </h2>
        <p
          className="font-body text-[16px] leading-[1.75] max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("comingSoonText")}
        </p>
      </div>
    </div>
  );
}
