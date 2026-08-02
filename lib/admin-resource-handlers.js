import { COLLECTIONS, recordActivity } from "./admin-collections";
import { cleanString, parsePagination, required, serializeDocument, slugify, toObjectId, withAdminApi } from "./admin-api";
import { getDb } from "./mongodb";

export const resourceConfigs = {
  services: {
    collection: COLLECTIONS.services,
    singular: "Service",
    searchFields: ["title", "summary", "category", "status"],
    validate: (body) => {
      const title = cleanString(body.title, 180);
      if (!required(title)) return { error: "Service title is required." };
      const status = ["active", "draft"].includes(body.status) ? body.status : "active";
      return {
        data: {
          title,
          slug: slugify(body.slug || title),
          summary: cleanString(body.summary, 500),
          description: cleanString(body.description, 6000),
          image: cleanString(body.image, 1000),
          category: cleanString(body.category, 120),
          status
        }
      };
    }
  },
  blog: {
    collection: COLLECTIONS.blog,
    singular: "Blog post",
    searchFields: ["title", "excerpt", "status"],
    validate: (body) => {
      const title = cleanString(body.title, 180);
      if (!required(title)) return { error: "Blog title is required." };
      if (!required(body.content)) return { error: "Blog content is required." };
      const status = ["published", "draft"].includes(body.status) ? body.status : "draft";
      return {
        data: {
          title,
          slug: slugify(body.slug || title),
          excerpt: cleanString(body.excerpt, 600),
          thumbnail: cleanString(body.thumbnail, 1000),
          content: cleanString(body.content, 30000),
          status
        }
      };
    }
  },
  team: {
    collection: COLLECTIONS.team,
    singular: "Team member",
    searchFields: ["name", "designation", "bio"],
    validate: (body) => {
      const name = cleanString(body.name, 140);
      if (!required(name)) return { error: "Team member name is required." };
      return {
        data: {
          name,
          designation: cleanString(body.designation, 160),
          image: cleanString(body.image, 1000),
          bio: cleanString(body.bio, 2500),
          facebook: cleanString(body.facebook, 1000),
          linkedin: cleanString(body.linkedin, 1000),
          github: cleanString(body.github, 1000),
          twitter: cleanString(body.twitter, 1000),
          status: ["active", "inactive"].includes(body.status) ? body.status : "active"
        }
      };
    }
  }
};

export function createListHandler(resource) {
  return function GET(request) {
    return withAdminApi(async () => {
      const config = resourceConfigs[resource];
      const db = await getDb();
      const { searchParams } = new URL(request.url);
      const { page, limit, search, skip } = parsePagination(searchParams);
      const filter = search
        ? {
            $or: config.searchFields.map((field) => ({
              [field]: { $regex: escapeRegex(search), $options: "i" }
            }))
          }
        : {};

      const [items, total] = await Promise.all([
        db.collection(config.collection).find(filter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit).toArray(),
        db.collection(config.collection).countDocuments(filter)
      ]);

      return Response.json({
        items: items.map(serializeDocument),
        meta: {
          page,
          limit,
          total,
          pages: Math.max(Math.ceil(total / limit), 1)
        }
      });
    });
  };
}

export function createPostHandler(resource) {
  return function POST(request) {
    return withAdminApi(async () => {
      const config = resourceConfigs[resource];
      const body = await request.json().catch(() => ({}));
      const result = config.validate(body);
      if (result.error) return Response.json({ message: result.error }, { status: 400 });

      const db = await getDb();
      const now = new Date();
      const document = { ...result.data, createdAt: now, updatedAt: now };

      if (document.slug) {
        const existing = await db.collection(config.collection).findOne({ slug: document.slug });
        if (existing) return Response.json({ message: "A record with this slug already exists." }, { status: 409 });
      }

      const insert = await db.collection(config.collection).insertOne(document);
      await recordActivity(db, `${config.singular} created`, document.title || document.name, "create");

      return Response.json({ item: serializeDocument({ ...document, _id: insert.insertedId }) }, { status: 201 });
    });
  };
}

export function createPutHandler(resource) {
  return function PUT(request, { params }) {
    return withAdminApi(async () => {
      const config = resourceConfigs[resource];
      const resolvedParams = await params;
      const id = toObjectId(resolvedParams.id);
      if (!id) return Response.json({ message: "Invalid record id." }, { status: 400 });

      const body = await request.json().catch(() => ({}));
      const result = config.validate(body);
      if (result.error) return Response.json({ message: result.error }, { status: 400 });

      const db = await getDb();
      const update = { ...result.data, updatedAt: new Date() };

      if (update.slug) {
        const existing = await db.collection(config.collection).findOne({ slug: update.slug, _id: { $ne: id } });
        if (existing) return Response.json({ message: "A record with this slug already exists." }, { status: 409 });
      }

      const saved = await db.collection(config.collection).findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: "after" });
      if (!saved) return Response.json({ message: "Record not found." }, { status: 404 });

      await recordActivity(db, `${config.singular} updated`, update.title || update.name, "update");
      return Response.json({ item: serializeDocument(saved) });
    });
  };
}

export function createDeleteHandler(resource) {
  return function DELETE(_request, { params }) {
    return withAdminApi(async () => {
      const config = resourceConfigs[resource];
      const resolvedParams = await params;
      const id = toObjectId(resolvedParams.id);
      if (!id) return Response.json({ message: "Invalid record id." }, { status: 400 });

      const db = await getDb();
      const existing = await db.collection(config.collection).findOne({ _id: id });
      if (!existing) return Response.json({ message: "Record not found." }, { status: 404 });

      await db.collection(config.collection).deleteOne({ _id: id });
      await recordActivity(db, `${config.singular} deleted`, existing.title || existing.name, "delete");
      return Response.json({ ok: true });
    });
  };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
