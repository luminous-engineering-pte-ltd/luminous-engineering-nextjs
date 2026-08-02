export const COLLECTIONS = {
  admins: "admins",
  services: "admin_services",
  blog: "admin_blog_posts",
  team: "admin_team_members",
  settings: "admin_settings",
  activities: "admin_activities",
  contactMessages: "contact_messages"
};

export async function recordActivity(db, action, detail, type = "update") {
  await db.collection(COLLECTIONS.activities).insertOne({
    action,
    detail,
    type,
    createdAt: new Date()
  });
}
