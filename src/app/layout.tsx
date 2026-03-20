import type { ReactNode } from "react";
import "./globals.css";

// Root layout — minimal shell. The [locale] layout handles html/body.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
