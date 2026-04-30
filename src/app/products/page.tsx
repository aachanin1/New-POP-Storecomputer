import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { getCatalogFilters, getFilteredVisibleProducts } from "@/lib/product-queries";
import { brandName, storeDescription } from "@/lib/store-info";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด",
  description:
    "ดูสินค้าทั้งหมดของ POP Store Computer พร้อมฟิลเตอร์ประเภทและรุ่น/แบรนด์ Notebook, PC, All in One, HP, Lenovo, Dell, Acer",
  alternates: {
    canonical: "/products",
  },
};

type ProductsPageProps = {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    q?: string;
  }>;
};

function buildHref(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return query ? `/products?${query}` : "/products";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [{ categories, brands }, productList] = await Promise.all([
    getCatalogFilters(),
    getFilteredVisibleProducts(params),
  ]);

  const categoryId = params.category ?? "";
  const brandId = params.brand ?? "";
  const q = params.q?.trim() ?? "";
  const hasFilters = Boolean(categoryId || brandId || q);

  const productJsonLd = productList.slice(0, 12).map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl,
    brand: product.brandName,
    category: product.categoryName,
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      url: product.fbPostUrl,
    },
  }));

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/pop-store-final.jpg"
              alt={brandName}
              className="h-10 w-10 rounded-md object-cover ring-1 ring-slate-200"
              width="80"
              height="80"
            />
            <div>
              <p className="font-bold">{brandName}</p>
              <p className="text-xs text-slate-500">Catalog สินค้าทั้งหมด</p>
            </div>
          </Link>
          <Link href="/" className="text-sm font-bold text-[#0f4fc9] hover:text-[#0b3fa5]">
            กลับหน้าแรก
          </Link>
        </div>
      </header>

      <section className="border-b border-blue-100 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#0f4fc9]">Product Catalog</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">
            สินค้าทั้งหมดของร้าน
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {storeDescription} ใช้ตัวกรองด้านซ้ายเพื่อค้นหาประเภทสินค้าและรุ่นที่ต้องการ
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-5">
            <form className="space-y-5" action="/products">
              <label className="block">
                <span className="text-sm font-bold text-slate-950">ค้นหาสินค้า</span>
                <input
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="เช่น ThinkPad, 5900"
                  className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div>
                <p className="text-sm font-bold text-slate-950">ประเภทสินค้า</p>
                <div className="mt-2 grid gap-2">
                  <Link
                    href={buildHref({ q, brand: brandId })}
                    className={`rounded-md px-3 py-2 text-sm font-semibold ${
                      !categoryId ? "bg-blue-50 text-[#0f4fc9]" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    ทั้งหมด
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={buildHref({ q, brand: brandId, category: String(category.id) })}
                      className={`rounded-md px-3 py-2 text-sm font-semibold ${
                        categoryId === String(category.id)
                          ? "bg-blue-50 text-[#0f4fc9]"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">รุ่น / แบรนด์</p>
                <div className="mt-2 grid max-h-56 gap-2 overflow-y-auto pr-1">
                  <Link
                    href={buildHref({ q, category: categoryId })}
                    className={`rounded-md px-3 py-2 text-sm font-semibold ${
                      !brandId ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    ทั้งหมด
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={buildHref({ q, category: categoryId, brand: String(brand.id) })}
                      className={`rounded-md px-3 py-2 text-sm font-semibold ${
                        brandId === String(brand.id)
                          ? "bg-orange-50 text-orange-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                ค้นหา
              </button>

              {hasFilters ? (
                <Link
                  href="/products"
                  className="block text-center text-sm font-bold text-[#0f4fc9] hover:text-[#0b3fa5]"
                >
                  ล้างตัวกรอง
                </Link>
              ) : null}
            </form>
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm text-slate-600">
                พบสินค้า <span className="font-bold text-slate-950">{productList.length}</span> รายการ
              </p>
              <p className="text-xs font-semibold text-slate-500">แสดงเฉพาะสินค้าที่พร้อมขาย</p>
            </div>

            {productList.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                {productList.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
                <h2 className="text-lg font-bold text-slate-950">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h2>
                <p className="mt-2 text-sm text-slate-500">
                  ลองล้างตัวกรอง หรือค้นหาด้วยคำที่สั้นลง
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
