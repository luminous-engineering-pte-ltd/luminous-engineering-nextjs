import { COLLECTIONS, recordActivity } from "../../../../lib/admin-collections";
import { cleanString, serializeDocument, withAdminApi } from "../../../../lib/admin-api";
import { getDb } from "../../../../lib/mongodb";

const SETTINGS_ID = "site_settings";

export async function GET() {
  return withAdminApi(async () => {
    const db = await getDb();
    const settings = await db.collection(COLLECTIONS.settings).findOne({ _id: SETTINGS_ID });
    return Response.json({ settings: serializeDocument(settings) || defaultSettings() });
  });
}

export async function PUT(request) {
  return withAdminApi(async () => {
    const body = await request.json().catch(() => ({}));
    const settings = sanitizeSettings(body);
    const db = await getDb();
    const now = new Date();
    const saved = await db.collection(COLLECTIONS.settings).findOneAndUpdate(
      { _id: SETTINGS_ID },
      { $set: { ...settings, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true, returnDocument: "after" }
    );
    await recordActivity(db, "Settings updated", "Website settings changed", "update");
    return Response.json({ settings: serializeDocument(saved) });
  });
}

function sanitizeSettings(body) {
  return {
    websiteName: cleanString(body.websiteName, 160),
    websiteLogo: cleanString(body.websiteLogo, 1000),
    favicon: cleanString(body.favicon, 1000),
    contactEmail: cleanString(body.contactEmail, 240),
    phoneNumber: cleanString(body.phoneNumber, 80),
    address: cleanString(body.address, 1000),
    facebook: cleanString(body.facebook, 1000),
    linkedin: cleanString(body.linkedin, 1000),
    github: cleanString(body.github, 1000),
    instagram: cleanString(body.instagram, 1000),
    metaTitle: cleanString(body.metaTitle, 180),
    metaDescription: cleanString(body.metaDescription, 500),
    openGraphImage: cleanString(body.openGraphImage, 1000)
  };
}

function defaultSettings() {
  return {
    websiteName: "Luminous Engineering",
    websiteLogo: "/images/luminous-logo.png",
    favicon: "/favicon.ico",
    contactEmail: "",
    phoneNumber: "",
    address: "",
    facebook: "",
    linkedin: "",
    github: "",
    instagram: "",
    metaTitle: "Luminous Engineering",
    metaDescription: "",
    openGraphImage: "/og-image.jpg"
  };
}
