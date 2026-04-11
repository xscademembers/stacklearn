import { MongoClient, Db } from "mongodb";

export const MONGODB_NOT_CONFIGURED_MESSAGE =
  "Database is not configured. Add MONGODB_URI to your .env.local file and restart the dev server.";

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

const uri = process.env.MONGODB_URI;

/** Without these, a bad URI / firewall / Atlas IP block can hang connect() for many minutes. */
const MONGO_CLIENT_OPTIONS = {
  serverSelectionTimeoutMS: 8_000,
  connectTimeoutMS: 10_000,
  socketTimeoutMS: 30_000,
  maxPoolSize: 10,
} as const;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createConnectingClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local file. Example: MONGODB_URI=mongodb+srv://...");
  }
  const mongo = new MongoClient(uri, MONGO_CLIENT_OPTIONS);
  client = mongo;
  return mongo.connect();
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local file. Example: MONGODB_URI=mongodb+srv://...");
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createConnectingClient().catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = createConnectingClient().catch((err) => {
      clientPromise = null;
      client = null;
      throw err;
    });
  }
  return clientPromise;
}

export default getClientPromise;

// Database helper
export async function getDatabase(): Promise<Db> {
  const clientPromise = getClientPromise();
  const client = await clientPromise;
  return client.db("stacklearn");
}

// Collection names
export const COLLECTIONS = {
  LEADS: "leads",
  APPLICATIONS: "applications",
  CONTACTS: "contacts",
  BLOGS: "blogs",
  TESTIMONIALS: "testimonials",
  COURSES: "courses",
  SITE_SETTINGS: "site_settings",
  PAGE_CONTENT: "page_content",
} as const;
