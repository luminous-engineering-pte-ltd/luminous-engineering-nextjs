import { createDeleteHandler, createPutHandler } from "../../../../../lib/admin-resource-handlers";

export const PUT = createPutHandler("blog");
export const DELETE = createDeleteHandler("blog");
