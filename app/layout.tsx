import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteFrame from "@/components/SiteFrame";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stack Learn - Best Study Abroad Consultancy for Indian Students",
  description:
    "Best Study Abroad Consultancy offering end-to-end overseas education support for Indian students. Expert overseas education consultants for Study in UK, USA, Canada, Australia and more with profile evaluation, study visa guidance, IELTS coaching online, and complete study abroad process support.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
