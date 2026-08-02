import Link from "next/link";
import { COLLECTIONS } from "../../../lib/admin-collections";
import { getDb } from "../../../lib/mongodb";
import { requireAdminSession } from "../../../lib/admin-auth";

export const metadata = {
  title: "Dashboard | Luminius Admin"
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const db = await getDb();

  const [totalServices, totalBlogPosts, totalTeamMembers, recentActivities, contactMessages] = await Promise.all([
    db.collection(COLLECTIONS.services).countDocuments(),
    db.collection(COLLECTIONS.blog).countDocuments(),
    db.collection(COLLECTIONS.team).countDocuments(),
    db.collection(COLLECTIONS.activities).find({}).sort({ createdAt: -1 }).limit(6).toArray(),
    db.collection(COLLECTIONS.contactMessages).find({}).sort({ createdAt: -1 }).limit(4).toArray()
  ]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-md border border-yellow-400/15 bg-white/[0.04] shadow-xl shadow-black/20">
        <div className="relative p-6 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.16),transparent_42%),url('/images/hero-bg-12.jpg')] bg-cover bg-center opacity-55" />
          <div className="absolute inset-0 bg-[#070a16]/78" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-300">Welcome Back</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {session.user.name || "Admin"}, your Luminius command center is ready.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Review content health, manage services, update team profiles, and keep website settings aligned from one private workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Services" value={totalServices} detail="Active service records" />
        <StatCard label="Total Blog Posts" value={totalBlogPosts} detail="Published and draft posts" />
        <StatCard label="Total Team Members" value={totalTeamMembers} detail="Visible team profiles" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Recent Activities" eyebrow="Audit Trail">
          {recentActivities.length ? (
            <div className="space-y-3">
              {recentActivities.slice(0,1).map((activity) => (
                <div key={activity._id.toString()} className="rounded-md border border-yellow-400/10 bg-black/15 p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-white">{activity.action}</p>
                    <p className="text-xs text-slate-500">{formatDate(activity.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{activity.detail}</p>
                </div>
              ))}
            </div>
          ) : (
            <Empty text="Activity will appear after the first content or settings change." />
          )}
        </Panel>

        <Panel title="Latest Contact Messages" eyebrow="Inbox">
          {contactMessages.length ? (
            <div className="space-y-3">
              {contactMessages.map((message) => (
                <div key={message._id.toString()} className="rounded-md border border-yellow-400/10 bg-black/15 p-4">
                  <p className="font-semibold text-white">{message.name || message.email || "Contact message"}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-400">{message.message || message.subject || "No message body."}</p>
                </div>
              ))}
            </div>
          ) : (
            <Empty text="No contact messages have been collected yet." />
          )}
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Quick Actions" eyebrow="Shortcuts">
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickAction href="/admin/services" label="Add Service" />
            <QuickAction href="/admin/blog" label="Create Blog" />
            <QuickAction href="/admin/team" label="Add Team Member" />
            <QuickAction href="/admin/settings" label="Update Settings" />
          </div>
        </Panel>

        <Panel title="System Status" eyebrow="Health">
          <div className="grid gap-3 sm:grid-cols-2">
            <StatusItem label="Authentication" value="Better Auth active" good />
            <StatusItem label="Database" value="MongoDB connected" good />
            <StatusItem label="Sessions" value="HTTP-only cookies" good />
            <StatusItem label="Registration" value="Disabled" good />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-yellow-400/35">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-4 font-display text-5xl font-bold text-yellow-300">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </div>
  );
}

function Panel({ title, eyebrow, children }) {
  return (
    <div className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-5 shadow-xl shadow-black/20 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">{eyebrow}</p>
      <h2 className="mt-2 mb-5 font-display text-2xl font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function QuickAction({ href, label }) {
  return (
    <Link href={href} className="rounded-md border border-yellow-400/20 bg-black/15 px-4 py-4 text-sm font-bold text-slate-100 transition hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-200">
      {label}
    </Link>
  );
}

function StatusItem({ label, value, good }) {
  return (
    <div className="rounded-md border border-yellow-400/10 bg-black/15 p-4">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${good ? "bg-green-400" : "bg-yellow-300"}`} />
        <p className="font-semibold text-white">{label}</p>
      </div>
      <p className="mt-2 text-sm text-slate-400">{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return <div className="rounded-md border border-dashed border-yellow-400/20 bg-black/10 p-6 text-sm text-slate-400">{text}</div>;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}
