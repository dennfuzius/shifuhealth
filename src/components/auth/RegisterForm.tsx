"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "./AuthCard";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!consent) {
      setError("Please accept the privacy policy.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(t("registerError"));
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const inputClass =
    "w-full font-body text-sm px-4 py-3 rounded-btn outline-none transition-colors";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  if (success) {
    return (
      <AuthCard title={t("registerTitle")}>
        <div className="text-center py-6">
          <p
            className="font-body text-base mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            {t("registerSuccess")}
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
    <AuthCard title={t("registerTitle")}>
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
        <div>
          <label
            className="font-body text-sm font-medium block mb-1.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            className="font-body text-sm font-medium block mb-1.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("passwordConfirm")}
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            minLength={6}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span
            className="font-body text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("privacyConsent")}{" "}
            <Link
              href="/datenschutz"
              className="underline"
              style={{ color: "var(--color-primary)" }}
            >
              &rarr;
            </Link>
          </span>
        </label>

        {error && (
          <p className="font-body text-sm" style={{ color: "#c44" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full font-body text-sm font-semibold py-3 rounded-btn transition-all"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "..." : t("registerButton")}
        </button>

        <p
          className="text-center font-body text-sm pt-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("hasAccount")}{" "}
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
