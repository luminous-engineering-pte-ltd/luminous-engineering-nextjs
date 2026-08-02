"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "D" },
  { label: "Services", href: "/admin/services", icon: "S" },
  { label: "Blog", href: "/admin/blog", icon: "B" },
  { label: "Team Members", href: "/admin/team", icon: "T" },
  { label: "Settings", href: "/admin/settings", icon: "G" },
  { label: "Profile", href: "/admin/profile", icon: "P" }
];

export default function AdminShell({ children, user }) {
  const pathname = usePathname() || "/admin";
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
    return ["Admin", ...parts.map((part) => part.replace(/-/g, " "))];
  }, [pathname]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    }).catch(() => null);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#070a16] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(30,58,138,0.18),transparent_30%)]" />
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-72 flex-col border-r border-yellow-400/15 bg-[#080d1d]/95 backdrop-blur-xl">
        <SidebarContent pathname={pathname} onLogout={handleLogout} loggingOut={loggingOut} />
      </aside>

      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close sidebar"
          className={`absolute inset-0 bg-black/60 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-[86vw] max-w-80 border-r border-yellow-400/15 bg-[#080d1d] transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent pathname={pathname} onNavigate={() => setSidebarOpen(false)} onLogout={handleLogout} loggingOut={loggingOut} />
        </aside>
      </div>

      <div className="relative lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-yellow-400/15 bg-[#070a16]/90 backdrop-blur-xl">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-yellow-400/25 text-yellow-300 transition hover:bg-yellow-400/10 lg:hidden"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="text-xl leading-none">≡</span>
              </button>
              <div>
                <nav className="flex flex-wrap items-center gap-2 text-xs capitalize text-slate-400">
                  {breadcrumbs.map((item, index) => (
                    <span key={`${item}-${index}`} className={index === breadcrumbs.length - 1 ? "text-yellow-300" : ""}>
                      {index > 0 ? <span className="mr-2 text-slate-600">/</span> : null}
                      {item}
                    </span>
                  ))}
                </nav>
                <h1 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                  {breadcrumbs[breadcrumbs.length - 1] === "Admin" ? "Dashboard" : titleCase(breadcrumbs[breadcrumbs.length - 1])}
                </h1>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-3 rounded-full border border-yellow-400/20 bg-white/[0.04] px-2 py-2 pr-4 transition hover:border-yellow-400/45 hover:bg-yellow-400/10"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <Avatar user={user} />
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold text-white">{user?.name || "Admin"}</span>
                  <span className="block text-xs text-slate-400">{user?.email}</span>
                </span>
              </button>
              {profileOpen ? (
                <div className="absolute right-0 mt-3 w-64 rounded-md border border-yellow-400/20 bg-[#0c1226] p-2 shadow-2xl shadow-black/40">
                  <Link href="/admin/profile" className="block rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-yellow-400/10 hover:text-yellow-300">
                    Profile
                  </Link>
                  <Link href="/admin/settings" className="block rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-yellow-400/10 hover:text-yellow-300">
                    Settings
                  </Link>
                  <button
                    type="button"
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-red-200 transition hover:bg-red-500/10"
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <main className="admin-page-transition px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, onNavigate, onLogout, loggingOut }) {
  return (
    <div className="flex h-full flex-col p-5">
      <Link href="/" className="mb-8 flex items-center gap-3" onClick={onNavigate}>
        <Image src="/images/luminous-logo.png" width={172} height={46} alt="Luminius Engineering" priority />
      </Link>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-yellow-400 text-[#1a1a1a] shadow-lg shadow-yellow-500/20"
                  : "text-slate-300 hover:bg-white/[0.05] hover:text-yellow-300"
              }`}
            >
              <span className={`grid h-8 w-8 place-items-center rounded-md text-xs font-bold ${active ? "bg-black/10" : "bg-white/[0.06] text-yellow-300"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="mt-2 flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-white/[0.06] text-xs font-bold text-red-200">L</span>
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </nav>

      <div className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">System</p>
        <p className="mt-2 text-sm text-slate-300">Admin-only control panel protected by Better Auth sessions.</p>
      </div>
    </div>
  );
}

function Avatar({ user }) {
  if (user?.image) {
    return <img src={user.image} alt={user.name || "Admin"} className="h-10 w-10 rounded-full object-cover" />;
  }

  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 font-bold text-[#1a1a1a]">
      {(user?.name || "A").charAt(0).toUpperCase()}
    </span>
  );
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
