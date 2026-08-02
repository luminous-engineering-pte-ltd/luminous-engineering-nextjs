"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
    currentPassword: "",
    newPassword: ""
  });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function upload(file) {
    if (!file) return;
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    const response = await fetch("/api/admin/uploads", { method: "POST", credentials: "include", body: uploadForm }).catch(() => null);
    if (!response?.ok) {
      setError("Profile picture upload failed.");
      return;
    }
    const data = await response.json();
    setForm((state) => ({ ...state, image: data.url }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).catch(() => null);

    if (!response?.ok) {
      const data = await response?.json().catch(() => ({}));
      setError(data?.message || "Unable to update profile.");
      setSaving(false);
      return;
    }

    setForm((state) => ({ ...state, currentPassword: "", newPassword: "" }));
    setNotice("Profile updated successfully.");
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
        {form.image ? (
          <img src={form.image} alt={form.name || "Admin"} className="h-36 w-36 rounded-full object-cover" />
        ) : (
          <div className="grid h-36 w-36 place-items-center rounded-full bg-yellow-400 font-display text-5xl font-bold text-[#1a1a1a]">
            {(form.name || "A").charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="mt-6 font-display text-3xl font-semibold">{form.name || "Admin"}</h2>
        <p className="mt-2 text-sm text-slate-400">{form.email}</p>
        <input type="file" accept="image/*" onChange={(event) => upload(event.target.files?.[0])} className="mt-6 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-yellow-400 file:px-4 file:py-3 file:text-sm file:font-bold file:text-[#1a1a1a]" />
      </section>

      <section className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">Profile</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Admin Account</h2>

        {notice ? <Banner tone="success" message={notice} onClose={() => setNotice("")} /> : null}
        {error ? <Banner tone="error" message={error} onClose={() => setError("")} /> : null}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Name" value={form.name} onChange={(value) => setForm((state) => ({ ...state, name: value }))} required />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm((state) => ({ ...state, email: value }))} required />
          <Field label="Current Password" type="password" value={form.currentPassword} onChange={(value) => setForm((state) => ({ ...state, currentPassword: value }))} />
          <Field label="New Password" type="password" value={form.newPassword} onChange={(value) => setForm((state) => ({ ...state, newPassword: value }))} />
        </div>

        <div className="mt-7 flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary rounded-full px-6 py-3 text-sm font-bold disabled:opacity-60">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </section>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required, minLength }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        minLength={minLength}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-yellow-400/20 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/10"
      />
    </label>
  );
}

function Banner({ tone, message, onClose }) {
  const classes = tone === "success" ? "border-green-400/25 bg-green-500/10 text-green-100" : "border-red-400/25 bg-red-500/10 text-red-100";
  return (
    <div className={`mt-5 flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm ${classes}`}>
      {message}
      <button type="button" onClick={onClose} className="font-bold">
        x
      </button>
    </div>
  );
}
