"use client";

import ResourceManager, { ImageCell, StatusPill } from "./ResourceManager";

export default function ServicesManager() {
  return (
    <ResourceManager
      resource="services"
      title="Services"
      description="Manage Luminius service offerings"
      createLabel="Add Service"
      emptyText="Create the first admin-managed service record."
      fields={[
        { name: "title", label: "Service Title", required: true },
        { name: "slug", label: "Slug", placeholder: "auto-generated from title" },
        { name: "category", label: "Category" },
        { name: "image", label: "Service Image", type: "file", accept: "image/*" },
        { name: "summary", label: "Short Summary", type: "textarea" },
        { name: "description", label: "Full Description", type: "textarea" },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "active",
          options: [
            { label: "Active", value: "active" },
            { label: "Draft", value: "draft" }
          ]
        }
      ]}
      columns={[
        { key: "image", label: "Image", render: (item) => <ImageCell src={item.image} alt={item.title} /> },
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status", render: (item) => <StatusPill value={item.status} /> },
        { key: "updatedAt", label: "Updated", render: (item) => new Date(item.updatedAt).toLocaleDateString() }
      ]}
    />
  );
}
