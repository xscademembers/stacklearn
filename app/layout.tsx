import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";
import DynamicScrollUpdates from "@/components/DynamicScrollUpdates";
import LeadsPopup from "@/components/LeadsPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stack Learn - Study Abroad Made Simple",
  description: "Empowering students to study abroad with expert guidance, global partnerships, and transparent support at every step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <DynamicScrollUpdates />
        <main className="min-h-screen pt-28">{children}</main>
        <Footer />
        <ChatWindow />
        <LeadsPopup />
      </body>
    </html>
  );
}
