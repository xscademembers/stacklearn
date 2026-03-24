import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalClientWidgets from "@/components/GlobalClientWidgets";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stack Learn - Study Abroad Made Simple",
  description: "Empowering students to study abroad with expert guidance, global partnerships, and transparent support at every step.",
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
        <Header />
        <GlobalClientWidgets />
        <main className="min-h-screen pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
