import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/assistent": {
      de: "/assistent",
      en: "/assistant",
    },
    "/ueber-tcm": {
      de: "/ueber-tcm",
      en: "/about-tcm",
    },
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
    "/login": "/login",
    "/registrieren": {
      de: "/registrieren",
      en: "/register",
    },
    "/passwort-vergessen": {
      de: "/passwort-vergessen",
      en: "/forgot-password",
    },
    "/profil": {
      de: "/profil",
      en: "/profile",
    },
    "/favoriten": {
      de: "/favoriten",
      en: "/favorites",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
