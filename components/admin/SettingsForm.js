"use client";

import { useState } from "react";

const sections = [
  {
    title: "Website",
    fields: [
      { name: "websiteName", label: "Website Name" },
      { name: "websiteLogo", label: "Website Logo", type: "file" },
      { name: "favicon", label: "Favicon", type: "file", accept: "image/*,.ico" }
    ]
  },
  {
    title: "Contact",
    fields: [
      { name: "contactEmail", label: "Contact Email", type: "email" },
      { name: "phoneNumber", label: "Phone Number" },
      { name: "address", label: "Address", type: "textarea" }
    ]
  },
  {
    title: "Social",
    fields: [
      { name: "facebook", label: "Facebook" },
      { name: "linkedin", label: "LinkedIn" },
      { name: "github", label: "GitHub" },
      { name: "instagram", label: "Instagram" }
    ]
  },
  {
    title: "SEO",
    fields: [
      { name: "metaTitle", label: "Meta Title" },
      { name: "metaDescription", label: "Meta Description", type: "textarea" },
      { name: "openGraphImage", label: "Open Graph Image", type: "file" }
    ]
  }
];

export default function SettingsForm({ initialSettings }) {
  const [form, setForm] = useState(initialSettings || {});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function upload(file, fieldName) {
    if (!file) return;
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    const response = await fetch("/api/admin/uploads", { method: "POST", credentials: "include", body: uploadForm }).catch(() => null);
    if (!response?.ok) {
      setError("Upload failed.");
      return;
    }
    const data = await response.json();
    setForm((state) => ({ ...state, [fieldName]: data.url }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).catch(() => null);

    if (!response?.ok) {
      setError("Unable to save settings.");
      setSaving(false);
      return;
    }

    const data = await response.json();
    setForm(data.settings || {});
    setNotice("Settings saved successfully.");
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {notice ? <Banner tone="success" message={notice} onClose={() => setNotice("")} /> : null}
      {error ? <Banner tone="error" message={error} onClose={() => setError("")} /> : null}

      {sections.map((section) => (
        <section key={section.title} className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-5 shadow-xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">{section.title}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{section.title} Settings</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {section.fields.map((field) => (
              <Field key={field.name} field={field} value={form[field.name] || ""} setForm={setForm} upload={upload} />
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <button type="submit" disabled={saving} className="btn-primary rounded-full px-6 py-3 text-sm font-bold shadow-xl shadow-black/30 disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

function Field({ field, value, setForm, upload }) {
  const common =
    "mt-2 w-full rounded-md border border-yellow-400/20 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/10";
  const wide = field.type === "textarea" || field.type === "file" ? "md:col-span-2" : "";

  return (
    <label className={`block ${wide}`}>
      <span className="text-sm font-semibold text-slate-200">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea rows={4} value={value} onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))} className={common} />
      ) : field.type === "file" ? (
        <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input value={value} onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))} className={common} />
          <input type="file" accept={field.accept || "image/*"} onChange={(event) => upload(event.target.files?.[0], field.name)} className="text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-yellow-400 file:px-4 file:py-3 file:text-sm file:font-bold file:text-[#1a1a1a]" />
        </div>
      ) : (
        <input type={field.type || "text"} value={value} onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))} className={common} />
      )}
    </label>
  );
}

function Banner({ tone, message, onClose }) {
  const classes = tone === "success" ? "border-green-400/25 bg-green-500/10 text-green-100" : "border-red-400/25 bg-red-500/10 text-red-100";
  return (
    <div className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm ${classes}`}>
      {message}
      <button type="button" onClick={onClose} className="font-bold">
        x
      </button>
    </div>
  );
}
