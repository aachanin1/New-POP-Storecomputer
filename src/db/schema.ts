import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: text("price").notNull(),
  fbPostUrl: varchar("fb_post_url", { length: 2048 }).notNull(),
  imageUrl: varchar("image_url", { length: 2048 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
