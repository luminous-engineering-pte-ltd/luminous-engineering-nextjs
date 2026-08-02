import { createListHandler, createPostHandler } from "../../../../lib/admin-resource-handlers";

export const GET = createListHandler("blog");
export const POST = createPostHandler("blog");
