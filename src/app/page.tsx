import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

import { db } from "@/db";
import { productBrands, productCategories, products } from "@/db/schema";
import { formatProductPrice } from "@/lib/product-utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "POP Store Computer",
  description:
    "เลือกซื้อคอมพิวเตอร์ All in One, PC และ Notebook Business สภาพดี ราคาคุ้ม จาก POP Store Computer พร้อมรับประกัน 3 เดือนและตรวจสอบ Serial Number ได้",
  keywords: [
    "POP Store Computer",
    "คอมพิวเตอร์สภาพดี",
    "Notebook Business",
    "All in One",
    "คอมพิวเตอร์มือสอง",
    "รับประกัน 3 เดือน",
    "ตรวจสอบ Serial Number",
  ],
};

const brandName = "POP Store Computer";
const companyName = "บริษัท ป๊อบ สโตร์ จำกัด";
const companyNameEn = "POP STORE CO., LTD.";
const companyRegistration = "0135565005042";
const storeFacebookUrl = "https://www.facebook.com/notebookbypopstore";
const lazadaUrl = "https://www.lazada.co.th/shop/computer-by-pop-store";
const mapsUrl = "https://maps.app.goo.gl/fAiNfjudGbFMuYPa6";
const lineUrl = "https://line.me/R/ti/p/%40477mekuw";
const lineText = "@popstorecomputer";
const storePhones = ["085 871 9771", "082 793 7844"];
const storeAddress = "400/198 หมู่ที่ 8 ต.คูคต อ.ลำลูกกา จ.ปทุมธานี 12130";

const categories = ["All in One", "Notebook Business", "PC ตัวเครื่อง", "Computer Set", "Lenovo"];

const trustPoints = [
  "รับประกัน 3 เดือนเต็ม",
  "ตรวจสอบ Serial Number ได้",
  "บริษัทจดทะเบียนถูกต้อง",
  "สินค้าหมดสัญญาเช่าจากบริษัทในไทย",
];

const motionChips = ["สินค้าพร้อมจัดส่ง", "รับประกันนาน 3 เดือนเต็ม", "เครื่องศูนย์ไทย TH", "แบรนด์ HI-END" , "HP", "Dell", "Lenovo", "Acer", "Asus", "Microsoft", "Apple"];

const credibilityCards = [
  {
    title: "คัดเครื่องใช้งานจริง",
    body: "เหมาะสำหรับงานออฟฟิศ เรียนออนไลน์ งานเอกสาร ธุรกิจ และใช้งานทั่วไปในงบที่คุ้มค่า",
  },
  {
    title: "ซื้อได้อย่างมั่นใจ",
    body: "ร้านดำเนินงานในนามบริษัท ตรวจสอบข้อมูลบริษัทและ Serial Number ของสินค้าได้ชัดเจน",
  },
  {
    title: "ตอบไวหลายช่องทาง",
    body: "สอบถามสินค้าได้ผ่าน Facebook, Line Official, โทรศัพท์ หรือเปิดแผนที่เพื่อเดินทางมาร้าน",
  },
];

async function getProducts() {
  try {
    return await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        fbPostUrl: products.fbPostUrl,
        imageUrl: products.imageUrl,
        isVisible: products.isVisible,
        createdAt: products.createdAt,
        categoryName: productCategories.name,
        brandName: productBrands.name,
      })
      .from(products)
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .leftJoin(productBrands, eq(products.brandId, productBrands.id))
      .where(eq(products.isVisible, true))
      .orderBy(desc(products.createdAt));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  const productList = await getProducts();

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="animate-fade-down sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
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
                <p className="truncate text-base font-bold text-slate-950">{brandName}</p>
                <p className="truncate text-xs font-medium text-slate-500">
                  คอมพิวเตอร์สภาพดี ราคาคุ้ม
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <a
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 active:translate-y-0 sm:inline-flex"
              >
                Line
              </a>
              <a
                href={storeFacebookUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:translate-y-0 sm:inline-flex"
              >
                Facebook
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="border-b border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="animate-fade-up tech-grid relative overflow-hidden rounded-lg border border-blue-100 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_52%,#fff6eb_100%)] p-4 shadow-sm sm:p-5">
              <div className="pointer-events-none absolute right-5 top-5 hidden rounded-full bg-[#ff8a1d] px-3 py-2 text-xs font-extrabold text-white shadow-lg shadow-orange-200 animate-pulse-soft sm:block">
                ราคาคุ้ม
              </div>
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0f4fc9] ring-1 ring-blue-100">
                POP STORE COMPUTER
              </p>
              <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                คอมพิวเตอร์สภาพดี พร้อมใช้งาน ราคาถูก สำหรับลูกค้าทั่วไปและองค์กร
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                จำหน่ายคอมพิวเตอร์ All in One, PC และ Notebook Business คุณภาพดี
                สินค้าหมดสัญญาเช่าจากบริษัทในไทย ตรวจสอบ S/N ได้ทุกเครื่อง
                พร้อมรับประกันเต็ม 3 เดือน
              </p>

              <div className="marquee-mask mt-4 max-w-full rounded-full border border-blue-100 bg-white/80 py-2">
                <div className="marquee-track px-2">
                  {[
                    ...motionChips,
                    ...motionChips,
                    ...motionChips,
                    ...motionChips,
                  ].map((chip, index) => (
                    <span
                      key={`${chip}-${index}`}
                      className="marquee-pill rounded-full bg-[#0f4fc9] px-3 py-1 text-xs font-bold text-white"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <a
                    key={category}
                    href="#products"
                    className="animate-float-chip rounded-full border border-blue-100 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                    style={{ animationDelay: `${index * 130}ms` }}
                  >
                    {category}
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="cta-sweep inline-flex min-h-11 items-center justify-center rounded-md bg-[#1877f2] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f63d6] hover:shadow-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0"
                >
                  ดูสินค้ามาใหม่ →
                </a>
                <a
                  href={lazadaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-orange-100 active:translate-y-0"
                >
                  ดู Lazada Catalog
                </a>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 active:translate-y-0"
                >
                  ทัก Line Official
                </a>
              </div>
            </div>

            <aside className="animate-fade-up motion-delay-2 hidden rounded-lg border border-blue-900 bg-[linear-gradient(160deg,#07122f_0%,#0f4fc9_100%)] p-5 text-white shadow-lg shadow-blue-200 lg:block">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/pop-store-final.jpg"
                  alt={brandName}
                  className="h-14 w-14 rounded-md bg-white object-cover ring-1 ring-white/20"
                  width="112"
                  height="112"
                  loading="eager"
                  decoding="async"
                />
                <div>
                  <p className="text-sm font-bold">{brandName}</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">{companyName}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {trustPoints.map((point, index) => (
                  <div
                    key={point}
                    className="animate-fade-up rounded-md border border-white/15 bg-white/10 px-3 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/15"
                    style={{ animationDelay: `${160 + index * 70}ms` }}
                  >
                    {point}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0f4fc9]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a1d] animate-pulse-soft" />
                สินค้าเด่นของร้าน
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-normal text-slate-950">
                <span className="bg-[linear-gradient(90deg,#0f4fc9,#ff8a1d)] bg-clip-text text-transparent">
                  สินค้ามาใหม่
                </span>
              </h2>
            </div>
            <p className="shrink-0 rounded-md bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-200">
              {productList.length} รายการ
            </p>
          </div>

          {productList.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {productList.map((product, index) => (
                <article
                  key={product.id}
                  className="product-card group flex min-w-0 flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#0f4fc9]/40 hover:shadow-xl hover:shadow-blue-100"
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
                    <span className="absolute left-2 top-2 rounded-md bg-[#0f4fc9] px-2 py-1 text-[11px] font-semibold text-white">
                      {product.categoryName ?? "พร้อมขาย"}
                    </span>
                    <span className="absolute right-2 top-2 rounded-md bg-[#ff8a1d] px-2 py-1 text-[11px] font-extrabold text-white shadow-md">
                      {product.brandName ?? "ราคาคุ้ม"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-950 sm:min-h-12 sm:text-base sm:leading-6">
                      {product.name}
                    </h3>
                    <p className="animate-price-pop mt-2 rounded-md bg-orange-50 px-2 py-2 text-lg font-extrabold leading-tight text-[#df4f00] ring-1 ring-orange-100 sm:text-xl">
                      {formatProductPrice(product.price)}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      สอบถามสถานะล่าสุดและดูรายละเอียดผ่านโพสต์ร้าน
                    </p>

                    <a
                      href={product.fbPostUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-sweep mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#1877f2] px-3 py-2 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f63d6] focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0 sm:text-sm"
                    >
                      ดูรายละเอียด / สั่งซื้อ →
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
                สินค้าจะเริ่มแสดงที่นี่เมื่อมีรายการพร้อมขายในระบบ Catalog
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          {credibilityCards.map((item, index) => (
            <div
              key={item.title}
              className="animate-fade-up rounded-lg border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[linear-gradient(135deg,#0f4fc9,#ff8a1d)] text-sm font-extrabold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-bold text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="tech-grid mx-auto max-w-7xl rounded-lg border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#0f4fc9] ring-1 ring-blue-100">
                Company & Contact
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                ข้อมูลบริษัทและช่องทางติดต่อ
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                ร้านดำเนินงานในนามบริษัท พร้อมข้อมูลติดต่อ แผนที่ และช่องทางสอบถามสินค้า
                เพื่อให้ลูกค้าตรวจสอบและติดต่อได้สะดวก
              </p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md bg-white/85 p-4 ring-1 ring-blue-100">
                <p className="font-semibold text-slate-950">บริษัท</p>
                <p className="mt-2 leading-6 text-slate-600">{companyName}</p>
                <p className="leading-6 text-slate-600">{companyNameEn}</p>
                <p className="leading-6 text-slate-600">เลขทะเบียน {companyRegistration}</p>
              </div>
              <div className="rounded-md bg-white/85 p-4 ring-1 ring-blue-100">
                <p className="font-semibold text-slate-950">โทรศัพท์</p>
                {storePhones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replaceAll(" ", "")}`}
                    className="mt-2 block text-blue-700 hover:text-blue-600"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div className="rounded-md bg-white/85 p-4 ring-1 ring-emerald-100">
                <p className="font-semibold text-slate-950">Line Official</p>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-emerald-700 hover:text-emerald-600"
                >
                  {lineText}
                </a>
              </div>
              <div className="rounded-md bg-white/85 p-4 ring-1 ring-orange-100">
                <p className="font-semibold text-slate-950">ที่อยู่ / แผนที่</p>
                <p className="mt-2 leading-6 text-slate-600">{storeAddress}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block font-semibold text-blue-700 hover:text-blue-600"
                >
                  เปิด Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-950 bg-[linear-gradient(135deg,#07122f_0%,#0f4fc9_70%,#ff8a1d_160%)] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-300 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-start gap-3">
            <img
              src="/logo/pop-store-final.jpg"
              alt={brandName}
              className="h-11 w-11 shrink-0 rounded-md bg-white object-cover ring-1 ring-white/20"
              width="88"
              height="88"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-base font-bold text-white">{brandName}</p>
              <p className="mt-1 font-medium text-slate-300">{companyName}</p>
              <p className="mt-2 max-w-2xl leading-6">
                จำหน่ายคอมพิวเตอร์ All in One, PC และ Notebook Business สภาพดี
                ราคาคุ้ม พร้อมรับประกัน 3 เดือนเต็ม
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a href={`tel:${storePhones[0].replaceAll(" ", "")}`} className="font-semibold text-white">
              โทร {storePhones[0]}
            </a>
            <a
              href={storeFacebookUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-blue-200 hover:text-blue-100"
            >
              Facebook: POP Store Computer
            </a>
            <a
              href={lineUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-200 hover:text-emerald-100"
            >
              Line Official: {lineText}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
