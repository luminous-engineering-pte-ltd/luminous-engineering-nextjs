import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { withAdminApi } from "../../../../lib/admin-api";

const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
  ["image/x-icon", ".ico"],
  ["image/vnd.microsoft.icon", ".ico"]
]);

export async function POST(request) {
  return withAdminApi(async () => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json({ message: "No file was uploaded." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type) || file.size > 4 * 1024 * 1024) {
      return Response.json({ message: "Unsupported file type or size." }, { status: 400 });
    }

    const extension = allowedTypes.get(file.type);
    const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "admin");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

    return Response.json({ url: `/uploads/admin/${filename}` });
  });
}
