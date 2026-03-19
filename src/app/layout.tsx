import type { ReactNode } from "react";

// Root layout — minimal shell. The [locale] layout handles html/body.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
