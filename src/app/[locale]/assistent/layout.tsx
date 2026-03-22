import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "assistant" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function AssistentLayout({ children }: { children: ReactNode }) {
  return children;
}
