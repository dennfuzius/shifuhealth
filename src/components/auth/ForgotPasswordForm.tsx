"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "./AuthCard";

export default function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/de/profil`,
    });

    setSent(true);
    setLoading(false);
  };

  const inputClass =
    "w-full font-body text-sm px-4 py-3 rounded-btn outline-none transition-colors";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  if (sent) {
    return (
      <AuthCard title={t("forgotTitle")}>
        <div className="text-center py-6">
          <p
            className="font-body text-base mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            {t("resetSent")}
          </p>
          <Link
            href="/login"
            className="font-body text-sm font-semibold hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            {t("loginLink")}
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title={t("forgotTitle")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="font-body text-sm font-medium block mb-1.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full font-body text-sm font-semibold py-3 rounded-btn transition-all"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "..." : t("resetButton")}
        </button>
        <p
          className="text-center font-body text-sm pt-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            {t("loginLink")}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
