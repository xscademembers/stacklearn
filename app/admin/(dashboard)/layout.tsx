"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiFileText,
  FiStar,
  FiBookOpen,
  FiPhone,
  FiEdit3,
  FiLogOut,
  FiChevronRight,
  FiVideo,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/leads", label: "Leads / Submissions", icon: FiUsers },
  { href: "/admin/blogs", label: "Blog Management", icon: FiFileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: FiStar },
  { href: "/admin/courses", label: "Courses / Training", icon: FiBookOpen },
  { href: "/admin/destination-videos", label: "Destination videos", icon: FiVideo },
  { href: "/admin/contact-info", label: "Contact Details", icon: FiPhone },
  { href: "/admin/content", label: "Page Content", icon: FiEdit3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebar = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="https://storage.googleapis.com/new_client_files/stack%20learn/StackLearn%20-%20%E1%8F%9A%E1%B4%80%C9%AA%20%EA%80%A4%E1%B4%84%E1%B4%8F%C9%B4!!.png"
            alt="Stack Learn"
            width={140}
            height={40}
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
        <p className="text-xs text-slate-400 mt-2">Admin Dashboard</p>
      </div>

      {/* Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <FiChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <Link
          href="/"
          target="_blank"
          className="block text-xs text-slate-400 hover:text-white mb-3 transition-colors"
        >
          View Live Site ↗
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-red-400 transition-colors w-full"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-page-soft overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 flex-shrink-0">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 z-10">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-surface border-b border-border flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-page-soft transition-colors"
            aria-label="Open menu"
          >
            {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-bold text-foreground">
            {navItems.find((i) => isActive(i.href))?.label || "Dashboard"}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
