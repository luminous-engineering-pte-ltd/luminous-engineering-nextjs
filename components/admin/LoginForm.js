"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        rememberMe: true
      })
    }).catch(() => null);

    if (!response?.ok) {
      const body = await response?.json().catch(() => ({}));
      setError(body?.message || "Invalid admin credentials.");
      setLoading(false);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060914] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,9,20,0.92),rgba(6,9,20,0.58)_48%,rgba(6,9,20,0.94)),url('/images/hero-bg-2.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(232,185,35,0.2),transparent_28%),radial-gradient(circle_at_84%_74%,rgba(30,58,138,0.22),transparent_34%)]" />
      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="max-w-2xl pt-10 lg:pt-0">
          <div className="inline-flex rounded-md border border-yellow-400/20 bg-black/25 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <Image src="/images/luminous-logo.png" width={206} height={56} alt="Luminius Engineering" priority />
          </div>
          <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.32em] text-yellow-300">Admin Portal</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Command center for Luminius operations.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            A private workspace for managing services, publishing, team profiles, settings, and admin account access.
          </p>
          <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-4 backdrop-blur">
              <span className="block font-semibold text-yellow-200">Protected</span>
              <span className="mt-1 block text-slate-400">HTTP-only sessions</span>
            </div>
            <div className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-4 backdrop-blur">
              <span className="block font-semibold text-yellow-200">Admin Only</span>
              <span className="mt-1 block text-slate-400">No public signup</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-lg border border-yellow-400/25 bg-[#0b1021]/88 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent" />
          <div className="absolute right-0 top-0 h-32 w-32 bg-yellow-400/10 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-yellow-300">Restricted Access</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Admin Login</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Enter the authorized admin credentials to continue.</p>
              </div>
              <div className="hidden h-12 w-12 place-items-center rounded-md border border-yellow-400/20 bg-yellow-400/10 text-lg font-bold text-yellow-200 sm:grid">
                A
              </div>
            </div>

            {error ? (
              <div className="mb-5 rounded-md border border-red-400/35 bg-red-500/12 px-4 py-3 text-sm font-medium text-red-100 shadow-lg shadow-red-950/20">
                {error}
              </div>
            ) : null}

            <label className="block">
              <span className="text-sm font-bold text-slate-100">Email Address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                className="mt-2 w-full rounded-md border border-yellow-400/20 bg-black/30 px-4 py-3.5 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-600 hover:border-yellow-400/40 focus:border-yellow-300 focus:bg-black/40 focus:ring-4 focus:ring-yellow-400/15"
                placeholder="Enter admin email"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-100">Password</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                className="mt-2 w-full rounded-md border border-yellow-400/20 bg-black/30 px-4 py-3.5 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-600 hover:border-yellow-400/40 focus:border-yellow-300 focus:bg-black/40 focus:ring-4 focus:ring-yellow-400/15"
                placeholder="Enter password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-8 w-full overflow-hidden rounded-md bg-gradient-to-r from-yellow-300 via-[#e8b923] to-[#b8941f] px-6 py-4 text-sm font-extrabold text-[#16120a] shadow-[0_18px_45px_rgba(232,185,35,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(232,185,35,0.36)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#16120a]/25 border-t-[#16120a]" />
                ) : null}
                {loading ? "Signing in..." : "Login to Dashboard"}
              </span>
            </button>

            <p className="mt-5 text-center text-xs text-slate-500">Private Luminius administration access</p>
          </div>
        </form>
      </section>
    </main>
  );
}
