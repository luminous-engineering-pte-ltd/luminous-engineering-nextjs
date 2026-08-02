import { createListHandler, createPostHandler } from "../../../../lib/admin-resource-handlers";

export const GET = createListHandler("team");
export const POST = createPostHandler("team");
