import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { auth, bootstrapAuth } from "./auth";
import { COLLECTIONS } from "./admin-collections";
import { serializeDocument } from "./admin-api";
import { getDb } from "./mongodb";

const INITIAL_ADMIN = {
  name: "Luminius Admin",
  email: "admin@luminiusengineering.com",
  password: "luminiusAdmin",
  role: "admin"
};

export async function ensureAdminAccount() {
  const db = await getDb();
  const admins = db.collection(COLLECTIONS.admins);
  await admins.createIndex({ email: 1 }, { unique: true });
  const existing = await admins.findOne({ email: INITIAL_ADMIN.email });
  if (existing) {
    if (await isLegacyHashForInitialPassword(existing.password)) {
      await admins.updateOne(
        { _id: existing._id },
        {
          $set: {
            password: INITIAL_ADMIN.password,
            updatedAt: new Date()
          }
        }
      );
    }
    return;
  }

  const now = new Date();
  await admins.insertOne({
    ...INITIAL_ADMIN,
    createdAt: now,
    updatedAt: now
  });
}

export async function getAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.email) return null;

  const db = await getDb();
  const admin = await db.collection(COLLECTIONS.admins).findOne({
    email: session.user.email.toLowerCase(),
    role: "admin"
  });

  if (!admin) return null;

  return {
    ...session,
    authUser: session.user,
    user: publicAdmin(admin)
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireAdminApiSession() {
  const session = await getAdminSession();
  if (!session?.user) {
    return { error: Response.json({ message: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}

export async function ensureBetterAuthIdentity(admin, password) {
  const db = await getDb();
  const email = admin.email.toLowerCase();
  let existingUser = await db.collection("user").findOne({ email });

  if (!existingUser) {
    await bootstrapAuth.api.signUpEmail({
      body: {
        email,
        password,
        name: admin.name,
        image: admin.image || "",
        rememberMe: false
      },
      headers: new Headers({
        host: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000").host
      })
    });
    existingUser = await db.collection("user").findOne({ email });
    if (!existingUser) return;
  } else {
    await db.collection("user").updateOne(
      { _id: existingUser._id },
      {
        $set: {
          name: admin.name,
          email,
          image: admin.image || "",
          updatedAt: new Date()
        }
      }
    );
  }

  await db.collection("account").updateOne(
    { userId: existingUser._id, providerId: "credential" },
    {
      $set: {
        accountId: existingUser._id.toString(),
        providerId: "credential",
        userId: existingUser._id,
        password: await hashPassword(password),
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
}

export function publicAdmin(admin) {
  const serialized = serializeDocument(admin);
  delete serialized.password;
  return serialized;
}

async function isLegacyHashForInitialPassword(value) {
  if (typeof value !== "string" || value === INITIAL_ADMIN.password || !value.includes(":")) {
    return false;
  }

  try {
    return verifyPassword({ hash: value, password: INITIAL_ADMIN.password });
  } catch {
    return false;
  }
}
