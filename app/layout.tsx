import type { Metadata } from "next";
import { DM_Sans, Outfit, Fugaz_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap", weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", weight: ["400", "500", "600", "700", "800", "900"] });
const fugazOne = Fugaz_One({ subsets: ["latin"], variable: "--font-fugaz", display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "1119wj — blog",
  description: "building things on the web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={cn(dmSans.variable, outfit.variable, fugazOne.variable)} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
