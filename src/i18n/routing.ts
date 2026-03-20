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
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
