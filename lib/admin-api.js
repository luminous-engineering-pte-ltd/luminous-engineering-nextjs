import { ObjectId } from "mongodb";
import { requireAdminApiSession } from "./admin-auth";

export async function withAdminApi(handler) {
  const authResult = await requireAdminApiSession();
  if (authResult.error) {
    return authResult.error;
  }

  try {
    return await handler(authResult.session);
  } catch (error) {
    console.error("Admin API error:", error);
    return Response.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export function parsePagination(searchParams) {
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "8", 10), 1), 50);
  const search = (searchParams.get("search") || "").trim();
  return { page, limit, search, skip: (page - 1) * limit };
}

export function toObjectId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

export function serializeDocument(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id?.toString(),
    createdAt: doc.createdAt?.toISOString?.() || doc.createdAt,
    updatedAt: doc.updatedAt?.toISOString?.() || doc.updatedAt
  };
}

export function cleanString(value, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function slugify(value) {
  return cleanString(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function required(value) {
  return Boolean(typeof value === "string" && value.trim());
}
