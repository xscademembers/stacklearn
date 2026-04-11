import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminDashboardShell from "./AdminDashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
