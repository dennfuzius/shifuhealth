"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "./AuthCard";

export default function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(t("loginError"));
      setLoading(false);
      return;
    }

    router.refresh();
    router.push(redirect || "/");
  };

  const inputClass =
    "w-full font-body text-sm px-4 py-3 rounded-btn outline-none transition-colors";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  return (
    <AuthCard title={t("loginTitle")}>
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
            className={inputClass}
            style={inputStyle}
          />
        </div>

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
          {loading ? "..." : t("loginButton")}
        </button>

        <div className="text-center space-y-2 pt-2">
          <Link
            href="/passwort-vergessen"
            className="font-body text-sm block transition-colors hover:underline"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("forgotLink")}
          </Link>
          <p
            className="font-body text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("noAccount")}{" "}
            <Link
              href="/registrieren"
              className="font-semibold transition-colors hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              {t("registerLink")}
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}
