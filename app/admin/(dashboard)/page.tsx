import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { FiUsers, FiMail, FiFileText, FiStar, FiBookOpen } from "react-icons/fi";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const db = await getDatabase();
  const [leads, contacts, applications, blogs, testimonials, courses] = await Promise.all([
    db.collection(COLLECTIONS.LEADS).countDocuments(),
    db.collection(COLLECTIONS.CONTACTS).countDocuments(),
    db.collection(COLLECTIONS.APPLICATIONS).countDocuments(),
    db.collection(COLLECTIONS.BLOGS).countDocuments(),
    db.collection(COLLECTIONS.TESTIMONIALS).countDocuments(),
    db.collection(COLLECTIONS.COURSES).countDocuments(),
  ]);
  return { leads, contacts, applications, blogs, testimonials, courses };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Leads", value: stats.leads, icon: FiUsers, href: "/admin/leads", color: "text-brand" },
    { label: "Contact Submissions", value: stats.contacts, icon: FiMail, href: "/admin/leads", color: "text-blue-500" },
    { label: "Applications", value: stats.applications, icon: FiFileText, href: "/admin/leads", color: "text-purple-500" },
    { label: "Blog Posts", value: stats.blogs, icon: FiFileText, href: "/admin/blogs", color: "text-orange-500" },
    { label: "Testimonials", value: stats.testimonials, icon: FiStar, href: "/admin/testimonials", color: "text-yellow-500" },
    { label: "Courses", value: stats.courses, icon: FiBookOpen, href: "/admin/courses", color: "text-teal-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back!</h2>
        <p className="text-foreground-muted">Here&apos;s an overview of your site.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-surface rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-page-soft ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                  <p className="text-sm text-foreground-muted">{card.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blogs?action=new" className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors">
            + New Blog Post
          </Link>
          <Link href="/admin/testimonials?action=new" className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors">
            + New Testimonial
          </Link>
          <Link href="/admin/courses?action=new" className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors">
            + New Course
          </Link>
          <Link href="/admin/leads" className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-page-soft transition-colors">
            View All Leads
          </Link>
        </div>
      </div>
    </div>
  );
}
