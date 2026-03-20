import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

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
  const baseUrl = "https://www.shifuhealth.com";

  return {
    title: {
      default: t("title"),
      template: `%s | ShifuHealth`,
    },
    description: t("description"),
    keywords: t("keywords"),
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
      url: `${baseUrl}/${locale}`,
      siteName: "ShifuHealth",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "ShifuHealth – Traditional Chinese Medicine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages();
  const baseUrl = "https://www.shifuhealth.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ShifuHealth",
    url: `${baseUrl}/${locale}`,
    description:
      locale === "de"
        ? "ShifuHealth \u2013 Entdecke die Traditionelle Chinesische Medizin (TCM) mit Shifu Qi. Ganzheitliche Empfehlungen zu Ern\u00e4hrung, Heilkr\u00e4utern und Qi-\u00dcbungen."
        : "ShifuHealth \u2013 Explore Traditional Chinese Medicine (TCM) with Shifu Qi. Holistic guidance on nutrition, healing herbs, acupuncture and Qi practices.",
    inLanguage: locale === "de" ? "de" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${locale}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
