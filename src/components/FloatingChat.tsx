"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import ShifuChat from "./ShifuChat";

/* ── Yin-Yang icon for the button ─────────────────────── */

function YinYangIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11.5" stroke="white" strokeWidth="1.2" />
      <path
        d="M13 1.5a11.5 11.5 0 000 23c0-6.35-5.75-11.5-5.75-11.5S13 7.85 13 1.5z"
        fill="white"
        opacity="0.4"
      />
      <circle cx="13" cy="7" r="1.5" fill="white" opacity="0.7" />
      <circle cx="13" cy="19" r="1.5" stroke="white" strokeWidth="0.8" />
    </svg>
  );
}

export default function FloatingChat() {
  const t = useTranslations("chat");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Hide on the dedicated assistant page (chat is already embedded there)
  // usePathname returns the internal route key, not the localized slug
  const isAssistantPage = pathname === "/assistent";

  // Remember if user has clicked before (hide label)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const clicked = sessionStorage.getItem("shifuqi-clicked");
      if (clicked) setHasClicked(true);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    if (!hasClicked) {
      setHasClicked(true);
      sessionStorage.setItem("shifuqi-clicked", "1");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
  };

  const handleMinimize = () => {
    setMinimized(true);
  };

  if (isAssistantPage) return null;

  return (
    <>
      {/* Chat popup */}
      {open && !minimized && (
        <div
          className="fixed z-50"
          style={{
            bottom: 80,
            right: 20,
            width: 380,
            height: 560,
          }}
        >
          {/* Header overlay with close/minimize buttons */}
          <div
            className="absolute top-0 right-0 z-10 flex items-center gap-1 pr-3 pt-3"
          >
            <button
              onClick={handleMinimize}
              className="flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ width: 28, height: 28 }}
              aria-label="Minimize"
            >
              <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                <path d="M1 1h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={handleClose}
              className="flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ width: 28, height: 28 }}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ShifuChat height="100%" />
        </div>
      )}

      {/* Floating button */}
      <div className="fixed z-50" style={{ bottom: 20, right: 20 }}>
        {/* Label above button */}
        {!hasClicked && !open && (
          <div
            className="absolute -top-8 right-0 whitespace-nowrap font-body text-[13px] animate-fade-in-up"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("label")}
          </div>
        )}

        <button
          onClick={open ? handleClose : handleOpen}
          className="flex items-center justify-center animate-pulse-glow transition-transform duration-200 hover:scale-105"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            boxShadow: "0 4px 16px rgba(123, 158, 135, 0.4)",
          }}
          aria-label="Shifu Qi Chat"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <YinYangIcon />
          )}
        </button>
      </div>
    </>
  );
}
