"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getDemoResponse, getTypingDelay, type ShifuResponse } from "@/lib/shifuqi-demo-responses";

/* ── SVG helpers ──────────────────────────────────────── */

function YinYangAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: "var(--color-primary)",
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1" />
        <path d="M8 1a7 7 0 000 14c0-3.9-3.5-7-3.5-7S8 4.9 8 1z" fill="white" opacity="0.4" />
        <circle cx="8" cy="4.5" r="1" fill="white" opacity="0.6" />
        <circle cx="8" cy="11.5" r="1" stroke="white" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M3 9h12m0 0l-4-4m4 4l-4 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <YinYangAvatar />
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{
          backgroundColor: "white",
          border: "1px solid var(--color-border)",
          borderRadius: "16px 16px 16px 4px",
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ── Markdown bold helper ─────────────────────────────── */

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/* ── Types ────────────────────────────────────────────── */

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  followUps?: string[];
};

type ShifuChatProps = {
  height?: string;
  showHeader?: boolean;
  embedded?: boolean;
};

/* ── Main component ───────────────────────────────────── */

export default function ShifuChat({
  height = "100%",
  showHeader = true,
  embedded = false,
}: ShifuChatProps) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: t("welcome"),
      followUps: [t("chip1"), t("chip2"), t("chip3"), t("chip4"), t("chip5")],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      const delay = getTypingDelay();
      setTimeout(() => {
        const response: ShifuResponse = getDemoResponse(trimmed, locale);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response.text,
          followUps: response.followUps,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping, locale]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const borderRadius = embedded ? "var(--radius-card)" : "16px";

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height,
        borderRadius,
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
        boxShadow: embedded ? "var(--shadow-card)" : "0 8px 40px rgba(61,43,31,0.15)",
      }}
    >
      {/* Header */}
      {showHeader && (
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              backgroundColor: "var(--color-surface)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="var(--color-primary)" strokeWidth="1" />
              <path d="M8 1a7 7 0 000 14c0-3.9-3.5-7-3.5-7S8 4.9 8 1z" fill="var(--color-primary)" opacity="0.2" />
              <circle cx="8" cy="4.5" r="1" fill="var(--color-primary)" opacity="0.4" />
              <circle cx="8" cy="11.5" r="1" stroke="var(--color-primary)" strokeWidth="0.6" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[14px] font-medium text-white leading-tight">
              Shifu Qi
            </p>
            <p className="font-body text-[11px] text-white leading-tight" style={{ opacity: 0.7 }}>
              {t("online")}
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "bot" ? (
                <div className="flex items-start gap-2">
                  <YinYangAvatar />
                  <div className="max-w-[85%]">
                    <div
                      className="px-4 py-3 font-body text-[14px] leading-[1.65]"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid var(--color-border)",
                        borderRadius: "16px 16px 16px 4px",
                        color: "var(--color-text)",
                      }}
                    >
                      {renderBold(msg.text)}
                    </div>
                    {/* Follow-up chips */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.followUps.map((chip) => (
                          <button
                            key={chip}
                            onClick={() => handleSend(chip)}
                            className="font-body text-[12px] px-3 py-1.5 transition-all duration-150 hover:opacity-80"
                            style={{
                              backgroundColor: "var(--color-surface)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "20px",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div
                    className="max-w-[80%] px-4 py-3 font-body text-[14px] leading-[1.65]"
                    style={{
                      backgroundColor: "var(--color-text)",
                      color: "var(--color-bg)",
                      borderRadius: "16px 16px 4px 16px",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("inputPlaceholder")}
          className="flex-1 font-body text-[14px] px-4 py-2.5 outline-none"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "24px",
            color: "var(--color-text)",
          }}
        />
        <button
          onClick={() => handleSend(input)}
          className="flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:opacity-85"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
          }}
        >
          <SendIcon />
        </button>
      </div>

      {/* Disclaimer */}
      <div
        className="text-center px-3 pb-2 flex-shrink-0"
      >
        <p className="font-body text-[11px]" style={{ color: "var(--color-text-muted)" }}>
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
