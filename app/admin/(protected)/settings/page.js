import SettingsForm from "../../../../components/admin/SettingsForm";
import { COLLECTIONS } from "../../../../lib/admin-collections";
import { serializeDocument } from "../../../../lib/admin-api";
import { getDb } from "../../../../lib/mongodb";

export const metadata = {
  title: "Settings | Luminius Admin"
};

export default async function SettingsPage() {
  const db = await getDb();
  const settings = await db.collection(COLLECTIONS.settings).findOne({ _id: "site_settings" });

  return <SettingsForm initialSettings={serializeDocument(settings) || { websiteName: "Luminous Engineering", websiteLogo: "/images/luminous-logo.png", favicon: "/favicon.ico", openGraphImage: "/og-image.jpg" }} />;
}
