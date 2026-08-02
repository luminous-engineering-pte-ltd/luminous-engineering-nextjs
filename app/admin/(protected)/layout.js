import AdminShell from "../../../components/admin/AdminShell";
import { requireAdminSession } from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }) {
  const session = await requireAdminSession();
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
