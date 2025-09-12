import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as relations from "./relations";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client, schema: { ...schema, ...relations } });

export { db };
