import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Stack Learn",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
