"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./UserMenu";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/blog" as const, label: t("blog") },
    { href: "/assistent" as const, label: t("assistant") },
    { href: "/ueber-tcm" as const, label: t("aboutTcm") },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        backgroundColor: "rgba(248, 245, 241, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(226, 219, 213, 0.5)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span
            className="font-logo text-[20px] font-semibold"
            style={{ color: "var(--color-text-body)", letterSpacing: "-0.5px" }}
          >
            Shifu Health
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[14px] transition-colors duration-200 hover:text-[var(--color-text-body)]"
              style={{
                color:
                  pathname === link.href
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />

          {/* Auth: login button or user menu */}
          {!loading &&
            (user ? (
              <UserMenu />
            ) : (
              <Link
                href="/login"
                className="font-body text-[14px] font-medium px-5 py-2 rounded-[10px] transition-colors duration-200"
                style={{
                  border: "1.5px solid var(--color-border)",
                  color: "var(--color-text-body)",
                }}
              >
                {t("login")}
              </Link>
            ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 active:scale-95 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-[2px] mb-[5px] transition-all duration-200"
            style={{
              backgroundColor: "var(--color-text-body)",
              transform: menuOpen
                ? "rotate(45deg) translateY(7px)"
                : "none",
            }}
          />
          <span
            className="block w-5 h-[2px] mb-[5px] transition-all duration-200"
            style={{
              backgroundColor: "var(--color-text-body)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-[2px] transition-all duration-200"
            style={{
              backgroundColor: "var(--color-text-body)",
              transform: menuOpen
                ? "rotate(-45deg) translateY(-7px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-4"
          style={{
            backgroundColor: "rgba(248, 245, 241, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(226, 219, 213, 0.5)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[16px] py-1"
              style={{
                color:
                  pathname === link.href
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="pt-2 flex items-center gap-4"
          >
            <LanguageSwitcher />
            {!loading &&
              (user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-[14px] font-medium px-5 py-2 rounded-[10px] transition-colors"
                  style={{
                    border: "1.5px solid var(--color-border)",
                    color: "var(--color-text-body)",
                  }}
                >
                  {t("login")}
                </Link>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
