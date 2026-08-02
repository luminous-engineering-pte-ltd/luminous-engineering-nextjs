import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "luminius_admin";

if (!uri) {
  throw new Error("MONGODB_URI is required");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._luminiusMongoClientPromise) {
    client = new MongoClient(uri);
    global._luminiusMongoClientPromise = client.connect();
  }
  clientPromise = global._luminiusMongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongoClient() {
  return clientPromise;
}

export async function getDb() {
  const mongoClient = await getMongoClient();
  return mongoClient.db(dbName);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}
