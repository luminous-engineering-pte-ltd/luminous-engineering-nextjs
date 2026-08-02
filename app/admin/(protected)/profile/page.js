import ProfileForm from "../../../../components/admin/ProfileForm";
import { requireAdminSession } from "../../../../lib/admin-auth";

export const metadata = {
  title: "Profile | Luminius Admin"
};

export default async function ProfilePage() {
  const session = await requireAdminSession();
  return <ProfileForm user={session.user} />;
}
