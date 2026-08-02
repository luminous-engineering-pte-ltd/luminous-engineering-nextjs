import { toNextJsHandler } from "better-auth/next-js";
import { ensureAdminAccount, ensureBetterAuthIdentity } from "../../../../lib/admin-auth";
import { COLLECTIONS } from "../../../../lib/admin-collections";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/mongodb";

const handlers = toNextJsHandler(auth);

export async function POST(request) {
  await ensureAdminAccount();

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return Response.json({ message: "Email and password are required." }, { status: 400 });
  }

  const db = await getDb();
  const admin = await db.collection(COLLECTIONS.admins).findOne({ email, role: "admin" });

  if (!admin || password !== admin.password) {
    return Response.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  await ensureBetterAuthIdentity(admin, password);

  const signInRequest = new Request(new URL("/api/auth/sign-in/email", request.url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: new URL(request.url).origin,
      cookie: request.headers.get("cookie") || ""
    },
    body: JSON.stringify({
      email,
      password,
      rememberMe: body.rememberMe !== false
    })
  });

  const response = await handlers.POST(signInRequest);
  if (!response.ok) {
    return Response.json({ message: "Unable to create admin session." }, { status: 500 });
  }

  return response;
}
