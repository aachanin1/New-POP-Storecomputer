import { and, desc, eq, like, or } from "drizzle-orm";

import { db } from "@/db";
import { productBrands, productCategories, products } from "@/db/schema";

export type PublicProduct = Awaited<ReturnType<typeof getVisibleProducts>>[number];

export async function getVisibleProducts(limit?: number) {
  const query = db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      fbPostUrl: products.fbPostUrl,
      imageUrl: products.imageUrl,
      updatedAt: products.updatedAt,
      createdAt: products.createdAt,
      categoryId: products.categoryId,
      brandId: products.brandId,
      categoryName: productCategories.name,
      brandName: productBrands.name,
    })
    .from(products)
    .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
    .leftJoin(productBrands, eq(products.brandId, productBrands.id))
    .where(eq(products.isVisible, true))
    .orderBy(desc(products.updatedAt), desc(products.createdAt));

  return limit ? query.limit(limit) : query;
}

export async function getFilteredVisibleProducts({
  brand,
  category,
  q,
}: {
  brand?: string;
  category?: string;
  q?: string;
}) {
  const search = q?.trim() ?? "";
  const categoryId = Number(category ?? "");
  const brandId = Number(brand ?? "");
  const conditions = [
    eq(products.isVisible, true),
    Number.isInteger(categoryId) && categoryId > 0
      ? eq(products.categoryId, categoryId)
      : undefined,
    Number.isInteger(brandId) && brandId > 0 ? eq(products.brandId, brandId) : undefined,
    search
      ? or(
          like(products.name, `%${search}%`),
          like(products.price, `%${search}%`),
          like(productCategories.name, `%${search}%`),
          like(productBrands.name, `%${search}%`),
        )
      : undefined,
  ].filter(Boolean);

  return db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      fbPostUrl: products.fbPostUrl,
      imageUrl: products.imageUrl,
      updatedAt: products.updatedAt,
      createdAt: products.createdAt,
      categoryId: products.categoryId,
      brandId: products.brandId,
      categoryName: productCategories.name,
      brandName: productBrands.name,
    })
    .from(products)
    .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
    .leftJoin(productBrands, eq(products.brandId, productBrands.id))
    .where(and(...conditions))
    .orderBy(desc(products.updatedAt), desc(products.createdAt));
}

export async function getCatalogFilters() {
  const [categories, brands] = await Promise.all([
    db.select().from(productCategories).orderBy(productCategories.name),
    db.select().from(productBrands).orderBy(productBrands.name),
  ]);

  return { categories, brands };
}
