import { redirect } from "next/navigation";
import LoginForm from "../../../components/admin/LoginForm";
import { ensureAdminAccount, getAdminSession } from "../../../lib/admin-auth";

export const metadata = {
  title: "Admin Login | Luminius Engineering"
};

export default async function AdminLoginPage() {
  await ensureAdminAccount();
  const session = await getAdminSession();

  if (session?.user) {
    redirect("/admin");
  }

  return <LoginForm />;
}
