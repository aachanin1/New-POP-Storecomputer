import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

import { db } from "@/db";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "POP Store Computer | Catalog สินค้าไอที",
  description:
    "เลือกซื้อคอมพิวเตอร์มือสอง อุปกรณ์ไอที และบริการจัดสเปคคอมจาก POP Store Computer โดยบริษัท ป๊อบ สโตร์ จำกัด พร้อมลิงก์สั่งซื้อผ่าน Facebook",
  keywords: [
    "POP Store Computer",
    "ป๊อบ สโตร์ จำกัด",
    "คอมพิวเตอร์มือสอง",
    "อุปกรณ์ไอที",
    "จัดสเปคคอม",
    "คอมมือสอง",
    "ร้านคอมพิวเตอร์",
  ],
};

const brandName = "POP Store Computer";
const companyName = "บริษัท ป๊อบ สโตร์ จำกัด";
const storeFacebookUrl = "https://www.facebook.com/notebookbypopstore";
const contactText = "ติดต่อผ่านเพจ Facebook";

const trustBadges = [
  "คัดสินค้าพร้อมใช้งาน",
  "ดูราคาและรายละเอียดได้ทันที",
  "สั่งซื้อผ่านเพจร้านโดยตรง",
];

const confidenceItems = [
  {
    title: "ร้านจริง มีเพจหลัก",
    description: "ทุกการ์ดสินค้าลิงก์ไปยังโพสต์ Facebook ของร้าน เพื่อดูรายละเอียดและสอบถามต่อได้ทันที",
  },
  {
    title: "เหมาะกับงานจริง",
    description: "เลือกสินค้าให้เหมาะกับงานเรียน งานออฟฟิศ ใช้งานทั่วไป และการจัดสเปคคอม",
  },
  {
    title: "Catalog อัปเดตง่าย",
    description: "ทีมร้านเพิ่มสินค้าใหม่จากหลังบ้าน รูป ราคา และลิงก์โพสต์จะแสดงบนหน้าเว็บทันที",
  },
];

async function getProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  const productList = await getProducts();

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="animate-fade-down border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <img
                src="/logo/pop-store-final.jpg"
                alt={brandName}
                className="h-10 w-10 shrink-0 rounded-md object-cover ring-1 ring-slate-200"
                width="80"
                height="80"
                loading="eager"
                decoding="async"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-slate-950">
                  {brandName}
                </p>
                <p className="truncate text-xs font-medium text-slate-500">
                  {companyName}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={storeFacebookUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:translate-y-0 sm:inline-flex"
              >
                Facebook
              </a>
              <Link
                href="/admin/add-product"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              IT Catalog Store
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              คอมพิวเตอร์มือสองและอุปกรณ์ไอที เลือกง่าย ราคาชัดเจน
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {brandName} รวมสินค้าไอทีสำหรับใช้งานจริง พร้อมลิงก์โพสต์ Facebook
              เพื่อดูรายละเอียด สอบถาม และสั่งซื้อกับร้านได้โดยตรง
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge}
                  className="animate-fade-up rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                  style={{ animationDelay: `${160 + index * 90}ms` }}
                >
                  {badge}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1877f2] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f63d6] hover:shadow-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0"
              >
                เลือกดูสินค้า
              </a>
              <a
                href={storeFacebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 active:translate-y-0"
              >
                ติดต่อร้าน
              </a>
            </div>
          </div>

          <div className="animate-float-panel rounded-lg border border-slate-200 bg-slate-950 p-3 shadow-xl shadow-slate-200">
            <div className="shine-frame overflow-hidden rounded-md bg-white">
              <img
                src="/logo/pop-store-final.jpg"
                alt={brandName}
                className="aspect-[4/3] w-full object-cover"
                width="900"
                height="675"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 text-center">
              <div className="rounded-md bg-white/10 px-2 py-3">
                <p className="text-lg font-bold text-white">{productList.length}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-300">สินค้า</p>
              </div>
              <div className="rounded-md bg-white/10 px-2 py-3">
                <p className="text-lg font-bold text-white">FB</p>
                <p className="mt-1 text-[11px] font-medium text-slate-300">สั่งซื้อ</p>
              </div>
              <div className="rounded-md bg-white/10 px-2 py-3">
                <p className="text-lg font-bold text-white">IT</p>
                <p className="mt-1 text-[11px] font-medium text-slate-300">พร้อมใช้</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-700">สินค้าในร้าน</p>
              <h2 className="mt-1 text-2xl font-bold tracking-normal text-slate-950">
                Catalog ล่าสุด
              </h2>
            </div>
            <p className="shrink-0 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {productList.length} รายการ
            </p>
          </div>

          {productList.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {productList.map((product, index) => (
                <article
                  key={product.id}
                  className="product-card group flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100"
                  style={{ animationDelay: `${Math.min(index, 7) * 70}ms` }}
                >
                  <div className="shine-frame relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      width="600"
                      height="600"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-slate-950/90 px-2 py-1 text-[11px] font-semibold text-white">
                      พร้อมขาย
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-950 sm:min-h-12 sm:text-base sm:leading-6">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-lg font-extrabold leading-tight text-red-600 sm:text-xl">
                      {product.price}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      คลิกเพื่อดูรายละเอียดและสอบถามสถานะล่าสุดผ่านโพสต์ร้าน
                    </p>

                    <a
                      href={product.fbPostUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#1877f2] px-3 py-2 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f63d6] focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0 sm:text-sm"
                    >
                      ดูรายละเอียด / สั่งซื้อ
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">
                ยังไม่มีสินค้าใน Catalog
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                เพิ่มสินค้าแรกจากหน้า Admin แล้วกลับมาหน้านี้เพื่อดูการ์ดสินค้าแบบ Grid
              </p>
              <Link
                href="/admin/add-product"
                className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                เพิ่มสินค้า
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          {confidenceItems.map((item, index) => (
            <div
              key={item.title}
              className="animate-fade-up rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="text-base font-bold text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-600 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-start gap-3">
            <img
              src="/logo/pop-store-final.jpg"
              alt={brandName}
              className="h-11 w-11 shrink-0 rounded-md object-cover ring-1 ring-slate-200"
              width="88"
              height="88"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-base font-bold text-slate-950">{brandName}</p>
              <p className="mt-1 font-medium text-slate-700">{companyName}</p>
              <p className="mt-2 max-w-2xl leading-6">
                คอมพิวเตอร์มือสอง อุปกรณ์ไอที และบริการจัดสเปคคอม สำหรับลูกค้าที่ต้องการเครื่องพร้อมใช้ในราคาคุ้มค่า
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <span className="font-semibold text-slate-950">ติดต่อ: {contactText}</span>
            <a
              href={storeFacebookUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-blue-700 hover:text-blue-600"
            >
              facebook.com/notebookbypopstore
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
