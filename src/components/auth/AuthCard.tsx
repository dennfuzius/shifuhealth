"use client";

import type { ReactNode } from "react";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="w-full rounded-card p-8 md:p-10"
        style={{
          maxWidth: 420,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="text-center mb-8">
          <span
            className="font-logo text-[22px] font-semibold block mb-4"
            style={{ color: "var(--color-text-body)" }}
          >
            Shifu Health
          </span>
          <h1
            className="font-body text-xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
}
