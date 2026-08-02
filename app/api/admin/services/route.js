import { createListHandler, createPostHandler } from "../../../../lib/admin-resource-handlers";

export const GET = createListHandler("services");
export const POST = createPostHandler("services");
