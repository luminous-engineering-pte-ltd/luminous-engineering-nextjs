"use client";

import ResourceManager, { ImageCell, StatusPill } from "./ResourceManager";

export default function TeamManager() {
  return (
    <ResourceManager
      resource="team"
      title="Team Members"
      description="Manage team member profiles"
      createLabel="Add Team Member"
      emptyText="Add the first team member profile."
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "designation", label: "Designation" },
        { name: "image", label: "Image", type: "file", accept: "image/*" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "facebook", label: "Facebook" },
        { name: "linkedin", label: "LinkedIn" },
        { name: "github", label: "GitHub" },
        { name: "twitter", label: "Twitter" },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "active",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" }
          ]
        }
      ]}
      columns={[
        { key: "image", label: "Image", render: (item) => <ImageCell src={item.image} alt={item.name} /> },
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "status", label: "Status", render: (item) => <StatusPill value={item.status} /> },
        { key: "updatedAt", label: "Updated", render: (item) => new Date(item.updatedAt).toLocaleDateString() }
      ]}
    />
  );
}
