import type { Metadata } from "next";
import { DM_Sans, Outfit, Fugaz_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MermaidClient } from "@/components/MermaidClient";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap", weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", weight: ["400", "500", "600", "700", "800", "900"] });
const fugazOne = Fugaz_One({ subsets: ["latin"], variable: "--font-fugaz", display: "swap", weight: "400" });
const pretendard = localFont({
  src: [
    { path: "./fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Pretendard-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Pretendard-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Apple SD Gothic Neo", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "1119wj — blog",
  description: "building things on the web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={cn(dmSans.variable, outfit.variable, fugazOne.variable, pretendard.variable)} suppressHydrationWarning>
      <body>
        {children}
        <MermaidClient />
      </body>
    </html>
  );
}
