import { createDeleteHandler, createPutHandler } from "../../../../../lib/admin-resource-handlers";

export const PUT = createPutHandler("services");
export const DELETE = createDeleteHandler("services");
