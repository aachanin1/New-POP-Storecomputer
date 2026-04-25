import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema";

const databaseUrl =
  process.env.DATABASE_URL ??
  "mysql://pop_user:pop_password@localhost:3306/pop_storecomputer";

const globalForDb = globalThis as typeof globalThis & {
  mysqlPool?: mysql.Pool;
};

const pool = globalForDb.mysqlPool ?? mysql.createPool(databaseUrl);

if (process.env.NODE_ENV !== "production") {
  globalForDb.mysqlPool = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
