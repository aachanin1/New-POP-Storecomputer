import { and, desc, eq, like, or } from "drizzle-orm";
import Link from "next/link";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { productBrands, productCategories, products } from "@/db/schema";
import { formatProductPrice } from "@/lib/product-utils";

import { AdminShell } from "../AdminShell";
import { AdminProductFilters } from "./AdminProductFilters";
import { toggleProductVisibility } from "./actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AdminProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    visibility?: string;
  }>;
};

function getVisibilityText(isVisible: boolean) {
  return isVisible ? "กำลังแสดงบนหน้าเว็บ" : "ปิดการแสดงผล";
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  await requireAdminSession();

  const params = await searchParams;
  const search = (params.q ?? "").trim();
  const categoryFilterValue = params.category ?? "";
  const categoryFilter = Number(categoryFilterValue);
  const visibility = params.visibility ?? "all";

  const conditions = [
    search
      ? or(
          like(products.name, `%${search}%`),
          like(products.price, `%${search}%`),
          like(productBrands.name, `%${search}%`),
        )
      : undefined,
    Number.isInteger(categoryFilter) && categoryFilter > 0
      ? eq(products.categoryId, categoryFilter)
      : undefined,
    visibility === "visible"
      ? eq(products.isVisible, true)
      : visibility === "hidden"
        ? eq(products.isVisible, false)
        : undefined,
  ].filter(Boolean);

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [categories, productList] = await Promise.all([
    db.select().from(productCategories).orderBy(productCategories.name),
    db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        fbPostUrl: products.fbPostUrl,
        isVisible: products.isVisible,
        createdAt: products.createdAt,
        categoryName: productCategories.name,
        brandName: productBrands.name,
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .leftJoin(productBrands, eq(products.brandId, productBrands.id))
      .where(whereClause)
      .orderBy(desc(products.createdAt)),
  ]);

  return (
    <AdminShell
      title="จัดการสินค้า"
      description="ค้นหา กรองตามประเภท แก้ไขสินค้า และเปิดหรือปิดการแสดงผลบนหน้าเว็บได้ โดยไม่มีการลบสินค้าออกจากระบบ"
    >
      <div className="mb-4 flex justify-end">
        <Link
          href="/admin/add-product"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#0f4fc9] px-4 text-sm font-bold text-white transition hover:bg-[#0b3fa5]"
        >
          เพิ่มสินค้าใหม่
        </Link>
      </div>

      <AdminProductFilters
        categories={categories}
        initialCategory={Number.isInteger(categoryFilter) && categoryFilter > 0 ? categoryFilterValue : ""}
        initialSearch={search}
        initialVisibility={visibility}
        resultCount={productList.length}
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {productList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {productList.map((product) => (
              <article
                key={product.id}
                className={`grid gap-4 p-4 transition hover:bg-slate-50 sm:grid-cols-[92px_1fr_auto] sm:items-center ${
                  product.isVisible ? "" : "bg-slate-50/70"
                }`}
              >
                <div className="relative h-24 w-24 sm:h-20 sm:w-20">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`h-full w-full rounded-md bg-slate-100 object-cover ring-1 ring-slate-200 ${
                      product.isVisible ? "" : "opacity-45 grayscale"
                    }`}
                  />
                  {!product.isVisible ? (
                    <span className="absolute inset-x-1 bottom-1 rounded bg-slate-950/85 px-1.5 py-1 text-center text-[10px] font-bold text-white">
                      ซ่อนอยู่
                    </span>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="line-clamp-2 text-base font-bold text-slate-950">
                      {product.name}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                        product.isVisible
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                          : "bg-slate-100 text-slate-600 ring-slate-200"
                      }`}
                    >
                      {getVisibilityText(product.isVisible)}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-extrabold text-orange-700">
                    {formatProductPrice(product.price)}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[#0f4fc9] ring-1 ring-blue-100">
                      {product.categoryName ?? "ยังไม่ระบุประเภท"}
                    </span>
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-700 ring-1 ring-orange-100">
                      {product.brandName ?? "ยังไม่ระบุรุ่น"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <form action={toggleProductVisibility}>
                    <input name="id" type="hidden" value={product.id} readOnly />
                    <input
                      name="nextVisible"
                      type="hidden"
                      value={product.isVisible ? "false" : "true"}
                      readOnly
                    />
                    <button
                      type="submit"
                      className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                        product.isVisible
                          ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {product.isVisible ? "ปิดแสดงผล" : "เปิดแสดงผล"}
                    </button>
                  </form>
                  <a
                    href={product.fbPostUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    ดูโพสต์
                  </a>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    แก้ไข
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <h2 className="text-lg font-bold text-slate-950">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h2>
            <p className="mt-2 text-sm text-slate-500">
              ลองล้างตัวกรองหรือค้นหาด้วยคำอื่น
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
