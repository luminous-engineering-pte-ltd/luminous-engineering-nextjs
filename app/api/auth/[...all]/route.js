import { auth } from "../../../../lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export async function POST(request) {
  const pathname = new URL(request.url).pathname;

  if (pathname.endsWith("/sign-up/email")) {
    return Response.json({ message: "Registration is disabled." }, { status: 403 });
  }

  if (pathname.endsWith("/sign-in/email")) {
    return Response.json({ message: "Use the admin login endpoint." }, { status: 403 });
  }

  return handlers.POST(request);
}
