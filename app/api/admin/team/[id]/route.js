import { createDeleteHandler, createPutHandler } from "../../../../../lib/admin-resource-handlers";

export const PUT = createPutHandler("team");
export const DELETE = createDeleteHandler("team");
