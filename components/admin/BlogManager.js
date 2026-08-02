"use client";

import ResourceManager, { ImageCell, StatusPill } from "./ResourceManager";

export default function BlogManager() {
  return (
    <ResourceManager
      resource="blog"
      title="Blog"
      description="Create and manage blog posts"
      createLabel="Create Blog"
      emptyText="Draft the first admin-managed blog post."
      fields={[
        { name: "title", label: "Blog Title", required: true },
        { name: "slug", label: "Slug", placeholder: "auto-generated from title" },
        { name: "thumbnail", label: "Thumbnail", type: "file", accept: "image/*" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Rich Text Content", type: "richtext", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "draft",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" }
          ]
        }
      ]}
      columns={[
        { key: "thumbnail", label: "Thumbnail", render: (item) => <ImageCell src={item.thumbnail} alt={item.title} /> },
        { key: "title", label: "Title" },
        { key: "status", label: "Status", render: (item) => <StatusPill value={item.status} /> },
        { key: "updatedAt", label: "Updated", render: (item) => new Date(item.updatedAt).toLocaleDateString() }
      ]}
    />
  );
}
