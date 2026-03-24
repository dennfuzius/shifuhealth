"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function UserMenu() {
  const t = useTranslations("nav");
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full flex items-center justify-center font-body text-sm font-bold transition-transform hover:scale-105"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
        }}
        aria-label="User menu"
      >
        {initials}
      </button>

      {open && (
        <div
          className="absolute right-0 top-12 w-48 rounded-card py-2 z-50"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-body text-sm transition-colors hover:bg-[var(--color-bg)]"
            style={{ color: "var(--color-text)" }}
          >
            {t("profile")}
          </Link>
          <Link
            href="/favoriten"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-body text-sm transition-colors hover:bg-[var(--color-bg)]"
            style={{ color: "var(--color-text)" }}
          >
            {t("favorites")}
          </Link>
          <div
            className="my-1 mx-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          />
          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="block w-full text-left px-4 py-2.5 font-body text-sm transition-colors hover:bg-[var(--color-bg)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
