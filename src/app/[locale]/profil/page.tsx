"use client";

import { useTranslations } from "next-intl";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilPage() {
  const t = useTranslations("profile");

  return (
    <div className="mx-auto px-6 pt-28 pb-24" style={{ maxWidth: 680 }}>
      <h1
        className="font-body text-2xl md:text-3xl font-bold mb-8"
        style={{ color: "var(--color-text)" }}
      >
        {t("title")}
      </h1>
      <div
        className="rounded-card p-6 md:p-8"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <ProfileForm />
      </div>
    </div>
  );
}
