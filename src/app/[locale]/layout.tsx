import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = "https://shifuhealth.com";

  return {
    title: {
      default: t("title"),
      template: `%s | ShifuHealth`,
    },
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        de: `${baseUrl}/de`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/de`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "ShifuHealth",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
