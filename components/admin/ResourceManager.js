"use client";

import { useEffect, useMemo, useState } from "react";

export default function ResourceManager({ resource, title, description, fields, columns, emptyText, createLabel }) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const blankForm = useMemo(
    () =>
      fields.reduce((state, field) => {
        state[field.name] = field.defaultValue || "";
        return state;
      }, {}),
    [fields]
  );
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    setForm(blankForm);
  }, [blankForm]);

  useEffect(() => {
    const timer = setTimeout(() => loadItems(1), 250);
    return () => clearTimeout(timer);
  }, [search, resource]);

  async function loadItems(page = meta.page) {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), limit: "8" });
    if (search.trim()) params.set("search", search.trim());

    const response = await fetch(`/api/admin/${resource}?${params.toString()}`, { credentials: "include" }).catch(() => null);
    if (!response?.ok) {
      setError("Unable to load records.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setItems(data.items || []);
    setMeta(data.meta || { page, pages: 1, total: 0 });
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm(blankForm);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm(
      fields.reduce((state, field) => {
        state[field.name] = item[field.name] || "";
        return state;
      }, {})
    );
    setModalOpen(true);
  }

  async function handleUpload(file, fieldName) {
    if (!file) return;
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      credentials: "include",
      body: uploadForm
    }).catch(() => null);

    if (!response?.ok) {
      setError("Upload failed. Use a JPG, PNG, WebP, GIF, SVG, or ICO file under 4MB.");
      return;
    }

    const data = await response.json();
    setForm((state) => ({ ...state, [fieldName]: data.url }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const response = await fetch(editing ? `/api/admin/${resource}/${editing._id}` : `/api/admin/${resource}`, {
      method: editing ? "PUT" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).catch(() => null);

    if (!response?.ok) {
      const data = await response?.json().catch(() => ({}));
      setError(data?.message || "Unable to save changes.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    setNotice(editing ? "Changes saved successfully." : "Record created successfully.");
    await loadItems(editing ? meta.page : 1);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setSaving(true);
    setError("");
    const response = await fetch(`/api/admin/${resource}/${deleteTarget._id}`, {
      method: "DELETE",
      credentials: "include"
    }).catch(() => null);

    if (!response?.ok) {
      setError("Unable to delete this record.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setDeleteTarget(null);
    setNotice("Record deleted successfully.");
    await loadItems(meta.page);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-yellow-400/15 bg-white/[0.04] p-5 shadow-xl shadow-black/20 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">{title}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">{description}</h2>
            <p className="mt-2 text-sm text-slate-400">{meta.total} total records</p>
          </div>
          <button type="button" onClick={openCreate} className="btn-primary rounded-full px-5 py-3 text-sm font-bold">
            {createLabel}
          </button>
        </div>
        <div className="mt-5">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full rounded-md border border-yellow-400/20 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/10"
          />
        </div>
      </section>

      {notice ? <Notification tone="success" message={notice} onClose={() => setNotice("")} /> : null}
      {error ? <Notification tone="error" message={error} onClose={() => setError("")} /> : null}

      <section className="overflow-hidden rounded-md border border-yellow-400/15 bg-[#0c1226]/80 shadow-xl shadow-black/20">
        {loading ? (
          <SkeletonTable columns={columns.length} />
        ) : items.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-yellow-400/10">
                <thead className="bg-white/[0.03]">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className="px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        {column.label}
                      </th>
                    ))}
                    <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-400/10">
                  {items.map((item) => (
                    <tr key={item._id} className="transition hover:bg-white/[0.035]">
                      {columns.map((column) => (
                        <td key={column.key} className="max-w-xs px-4 py-4 text-sm text-slate-200">
                          {column.render ? column.render(item) : String(item[column.key] || "-")}
                        </td>
                      ))}
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => openEdit(item)} className="rounded-full border border-yellow-400/25 px-3 py-2 text-xs font-bold text-yellow-200 transition hover:bg-yellow-400/10">
                            Edit
                          </button>
                          <button type="button" onClick={() => setDeleteTarget(item)} className="rounded-full border border-red-400/25 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/10">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination meta={meta} onPage={loadItems} />
          </>
        ) : (
          <EmptyState text={emptyText} actionLabel={createLabel} onAction={openCreate} />
        )}
      </section>

      {modalOpen ? (
        <FormModal
          title={editing ? `Edit ${title}` : createLabel}
          fields={fields}
          form={form}
          setForm={setForm}
          onUpload={handleUpload}
          onClose={() => setModalOpen(false)}
          onSubmit={submitForm}
          saving={saving}
        />
      ) : null}

      {deleteTarget ? (
        <ConfirmModal
          title="Delete record?"
          message={`This will permanently delete "${deleteTarget.title || deleteTarget.name || "this record"}".`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          loading={saving}
        />
      ) : null}
    </div>
  );
}

export function ImageCell({ src, alt }) {
  if (!src) return <span className="text-slate-500">No image</span>;
  return <img src={src} alt={alt || "Uploaded image"} className="h-14 w-14 rounded-md object-cover" />;
}

export function StatusPill({ value }) {
  const active = value === "published" || value === "active";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-green-500/15 text-green-200" : "bg-slate-500/15 text-slate-300"}`}>
      {value || "draft"}
    </span>
  );
}

function FormModal({ title, fields, form, setForm, onUpload, onClose, onSubmit, saving }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8">
      <button type="button" aria-label="Close modal" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={onSubmit} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-md border border-yellow-400/20 bg-[#0c1226] p-5 shadow-2xl shadow-black/50 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-yellow-400/20 text-slate-300 transition hover:bg-yellow-400/10">
            x
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <Field key={field.name} field={field} value={form[field.name] || ""} setForm={setForm} onUpload={onUpload} />
          ))}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-full border border-yellow-400/20 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.04]">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary rounded-full px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ field, value, setForm, onUpload }) {
  const common =
    "mt-2 w-full rounded-md border border-yellow-400/20 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/10";
  const wide = field.type === "textarea" || field.type === "richtext" || field.type === "file" ? "md:col-span-2" : "";

  return (
    <label className={`block ${wide}`}>
      <span className="text-sm font-semibold text-slate-200">{field.label}</span>
      {field.type === "textarea" || field.type === "richtext" ? (
        <textarea
          required={field.required}
          rows={field.type === "richtext" ? 10 : 4}
          value={value}
          onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))}
          className={common}
          placeholder={field.placeholder}
        />
      ) : field.type === "select" ? (
        <select value={value} onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))} className={common}>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0c1226]">
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={value}
            onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))}
            className={common}
            placeholder={field.placeholder || "Uploaded file URL"}
          />
          <input type="file" accept={field.accept || "image/*"} onChange={(event) => onUpload(event.target.files?.[0], field.name)} className="text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-yellow-400 file:px-4 file:py-3 file:text-sm file:font-bold file:text-[#1a1a1a]" />
        </div>
      ) : (
        <input
          type={field.type || "text"}
          required={field.required}
          value={value}
          onChange={(event) => setForm((state) => ({ ...state, [field.name]: event.target.value }))}
          className={common}
          placeholder={field.placeholder}
        />
      )}
    </label>
  );
}

function Pagination({ meta, onPage }) {
  return (
    <div className="flex flex-col gap-3 border-t border-yellow-400/10 px-4 py-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
      <span>
        Page {meta.page} of {meta.pages || 1}
      </span>
      <div className="flex gap-2">
        <button type="button" disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)} className="rounded-full border border-yellow-400/20 px-4 py-2 font-bold text-slate-200 transition hover:bg-yellow-400/10 disabled:cursor-not-allowed disabled:opacity-40">
          Previous
        </button>
        <button type="button" disabled={meta.page >= meta.pages} onClick={() => onPage(meta.page + 1)} className="rounded-full border border-yellow-400/20 px-4 py-2 font-bold text-slate-200 transition hover:bg-yellow-400/10 disabled:cursor-not-allowed disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  );
}

function ConfirmModal({ title, message, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <button type="button" aria-label="Close confirmation" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-md border border-red-400/25 bg-[#0c1226] p-6 shadow-2xl shadow-black/50">
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-yellow-400/20 px-4 py-2 text-sm font-bold text-slate-200">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={loading} className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonTable({ columns }) {
  return (
    <div className="p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-3 grid animate-pulse gap-3 rounded-md bg-white/[0.03] p-4" style={{ gridTemplateColumns: `repeat(${Math.min(columns + 1, 5)}, minmax(0, 1fr))` }}>
          {Array.from({ length: Math.min(columns + 1, 5) }).map((__, cell) => (
            <span key={cell} className="h-4 rounded-full bg-white/10" />
          ))}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ text, actionLabel, onAction }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-4 py-12 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-yellow-400/25 bg-yellow-400/10 text-2xl text-yellow-300">+</div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">Nothing here yet</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{text}</p>
      <button type="button" onClick={onAction} className="btn-primary mt-6 rounded-full px-5 py-3 text-sm font-bold">
        {actionLabel}
      </button>
    </div>
  );
}

function Notification({ tone, message, onClose }) {
  const classes = tone === "success" ? "border-green-400/25 bg-green-500/10 text-green-100" : "border-red-400/25 bg-red-500/10 text-red-100";
  return (
    <div className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm ${classes}`}>
      <span>{message}</span>
      <button type="button" onClick={onClose} className="font-bold">
        x
      </button>
    </div>
  );
}
