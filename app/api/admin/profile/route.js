import { hashPassword } from "better-auth/crypto";
import { COLLECTIONS, recordActivity } from "../../../../lib/admin-collections";
import { cleanString, toObjectId, withAdminApi } from "../../../../lib/admin-api";
import { getDb } from "../../../../lib/mongodb";

export async function PUT(request) {
  return withAdminApi(async (session) => {
    const body = await request.json().catch(() => ({}));
    const name = cleanString(body.name, 140);
    const email = cleanString(body.email, 240).toLowerCase();
    const image = cleanString(body.image, 1000);
    const currentPassword = body.currentPassword || "";
    const newPassword = body.newPassword || "";

    if (!name || !email || !email.includes("@")) {
      return Response.json({ message: "A valid name and email are required." }, { status: 400 });
    }

    if (newPassword && !currentPassword) {
      return Response.json({ message: "Enter the current password before setting a new password." }, { status: 400 });
    }

    const db = await getDb();
    const adminId = toObjectId(session.user._id);
    const authUserId = toObjectId(session.authUser.id);
    if (!adminId || !authUserId) return Response.json({ message: "Invalid admin session." }, { status: 400 });

    const admin = await db.collection(COLLECTIONS.admins).findOne({ _id: adminId, role: "admin" });
    if (!admin) return Response.json({ message: "Admin account not found." }, { status: 404 });

    const emailOwner = await db.collection(COLLECTIONS.admins).findOne({ email, _id: { $ne: adminId } });
    if (emailOwner) return Response.json({ message: "This email address is already in use." }, { status: 409 });

    const update = { name, email, image, updatedAt: new Date() };

    if (newPassword) {
      if (currentPassword !== admin.password) {
        return Response.json({ message: "Current password is incorrect." }, { status: 401 });
      }
      update.password = newPassword;
    }

    await db.collection(COLLECTIONS.admins).updateOne({ _id: adminId }, { $set: update });
    await db.collection("user").updateOne({ _id: authUserId }, { $set: { name, email, image, updatedAt: new Date() } });

    if (newPassword) {
      await db.collection("account").updateOne(
        { userId: authUserId, providerId: "credential" },
        {
          $set: {
            accountId: authUserId.toString(),
            providerId: "credential",
            userId: authUserId,
            password: await hashPassword(newPassword),
            updatedAt: new Date()
          },
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
    }

    await recordActivity(db, "Profile updated", "Admin profile changed", "update");
    return Response.json({ ok: true });
  });
}
