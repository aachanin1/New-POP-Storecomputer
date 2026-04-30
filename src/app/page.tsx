import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { ReviewGallery } from "@/components/ReviewGallery";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";
import { getVisibleProducts } from "@/lib/product-queries";
import {
  brandName,
  companyName,
  companyNameEn,
  companyRegistration,
  lazadaUrl,
  lineText,
  lineUrl,
  mapsUrl,
  reviewImages,
  siteUrl,
  storeAddress,
  storeDescription,
  storeFacebookUrl,
  storeMapImage,
  storePhones,
} from "@/lib/store-info";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "POP Store Computer",
  description:
    "เลือกซื้อคอมพิวเตอร์มือสอง Notebook Business, PC และ All in One จาก POP Store Computer พร้อมรับประกัน 3 เดือน ตรวจสอบ S/N ได้",
  alternates: {
    canonical: "/",
  },
};

const trustPoints = [
  "รับประกัน 3 เดือนเต็ม",
  "ตรวจสอบ Serial Number ได้",
  "บริษัทจดทะเบียนถูกต้อง",
  "สินค้าหมดสัญญาเช่าจากบริษัทในไทย",
];

const motionChips = [
  "พร้อมส่ง",
  "Notebook Business",
  "PC",
  "All in One",
  "HP",
  "Dell",
  "Lenovo",
  "Acer",
  "ประกัน 3 เดือน",
  "เช็ค S/N ได้",
];

const sectionLinks = [
  { href: "#latest-products", label: "สินค้ามาใหม่" },
  { href: "#reviews", label: "รีวิวหน้าร้าน" },
  { href: "#store-map", label: "แผนที่ร้าน" },
];

export default async function HomePage() {
  const latestProducts = await getVisibleProducts(8);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    name: brandName,
    legalName: companyName,
    description: storeDescription,
    url: siteUrl,
    image: `${siteUrl}/logo/pop-store-final.jpg`,
    telephone: storePhones,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeAddress,
      addressCountry: "TH",
    },
    sameAs: [storeFacebookUrl, lazadaUrl, mapsUrl],
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <header className="animate-fade-down sticky top-0 z-40 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo/pop-store-final.jpg"
              alt={brandName}
              className="h-10 w-10 shrink-0 rounded-md object-cover ring-1 ring-slate-200"
              width="80"
              height="80"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-950">{brandName}</p>
              <p className="truncate text-xs font-medium text-slate-500">
                คอมพิวเตอร์สภาพดี ราคาคุ้ม
              </p>
            </div>
          </Link>

          <nav className="section-nav hidden max-w-xl items-center gap-1 overflow-x-auto rounded-full border border-blue-100 bg-blue-50/70 p-1 lg:flex">
            {sectionLinks.map((item) => (
              <SmoothScrollLink
                key={item.href}
                href={item.href as `#${string}`}
                className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold text-slate-600 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0f4fc9] hover:shadow-sm"
              >
                {item.label}
              </SmoothScrollLink>
            ))}
          </nav>

          <nav className="flex items-center gap-2">
            <Link
              href="/products"
              className="rounded-md bg-[#0f4fc9] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0b3fa5]"
            >
              สินค้าทั้งหมด
            </Link>
            <a
              href={storeFacebookUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:inline-flex"
            >
              Facebook
            </a>
          </nav>
        </div>
      </header>

      <div className="section-nav sticky top-16 z-30 overflow-x-auto border-b border-blue-100 bg-white/90 px-4 py-2 backdrop-blur lg:hidden">
        <div className="flex min-w-max gap-2">
          {sectionLinks.map((item) => (
            <SmoothScrollLink
              key={item.href}
              href={item.href as `#${string}`}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-[#0f4fc9] transition hover:bg-blue-100"
            >
              {item.label}
            </SmoothScrollLink>
          ))}
        </div>
      </div>

      <section className="border-b border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8 lg:py-8">
          <div className="animate-fade-up tech-grid relative overflow-hidden rounded-lg border border-blue-100 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_54%,#fff6eb_100%)] p-5 shadow-sm sm:p-7">
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0f4fc9] ring-1 ring-blue-100">
              POP STORE COMPUTER
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              คอมพิวเตอร์มือสองสภาพดี{" "}
              <span className="bg-[linear-gradient(90deg,#0f4fc9_0%,#1877f2_42%,#ff8a1d_100%)] bg-clip-text text-transparent">
                พร้อมใช้งาน ราคาคุ้ม
              </span>{" "}
              สำหรับบ้าน ออฟฟิศ และองค์กร
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              จำหน่าย Notebook Business, PC และ All in One คุณภาพดี สินค้าหมดสัญญาเช่าจากบริษัทในไทย
              ตรวจสอบ S/N ได้ พร้อมรับประกันเต็ม 3 เดือน
            </p>

            <div className="marquee-mask mt-5 rounded-full border border-blue-100 bg-white/80 py-2">
              <div className="marquee-track px-2">
                {[...motionChips, ...motionChips, ...motionChips].map((chip, index) => (
                  <span
                    key={`${chip}-${index}`}
                    className="marquee-pill rounded-full bg-[#0f4fc9] px-3 py-1 text-xs font-bold text-white"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="cta-sweep inline-flex min-h-11 items-center justify-center rounded-md bg-[#1877f2] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#0f63d6]"
              >
                ดูสินค้าทั้งหมด →
              </Link>
              <a
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
              >
                ทัก Line Official
              </a>
            </div>
          </div>

          <aside className="animate-fade-up motion-delay-2 relative flex min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-lg border border-blue-100 bg-[radial-gradient(circle_at_50%_34%,#ffffff_0%,#eff6ff_42%,#fff5e8_100%)] p-6 shadow-lg shadow-blue-100">
            <div className="relative z-10 grid place-items-center">
              <div className="hero-orbit-motion pointer-events-none absolute h-[21rem] w-[21rem] rounded-full border border-dashed border-blue-200 animate-orbit-ring" />
              <div className="hero-orbit-motion pointer-events-none absolute h-[16.5rem] w-[16.5rem] rounded-full border border-orange-200 animate-orbit-ring motion-delay-2" />
              <div className="hero-logo-motion animate-logo-wiggle relative z-10 mx-auto grid h-52 w-52 place-items-center rounded-[2rem] bg-white p-5 shadow-2xl shadow-blue-200 ring-1 ring-blue-100 sm:h-60 sm:w-60">
                <img
                  src="/logo/pop-store-final.jpg"
                  alt={brandName}
                  className="h-full w-full rounded-2xl object-cover"
                  width="512"
                  height="512"
                />
              </div>
            </div>

            <div className="relative z-10 mt-8 text-center">
              <p className="text-lg font-extrabold text-slate-950">{brandName}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{companyName}</p>
            </div>

            <div className="relative z-10 mt-5 grid w-full grid-cols-2 gap-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-md border border-blue-100 bg-white/85 px-3 py-2 text-center text-xs font-bold text-[#0f4fc9] shadow-sm"
                >
                  {point}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="latest-products" className="scroll-mt-28 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0f4fc9]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a1d] animate-pulse-soft" />
                สินค้าเด่นของร้าน
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                สินค้ามาใหม่
              </h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-[#0f4fc9] hover:text-[#0b3fa5]">
              ดูทั้งหมด →
            </Link>
          </div>

          {latestProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">ยังไม่มีสินค้าใน Catalog</h3>
              <p className="mt-2 text-sm text-slate-500">
                สินค้าจะเริ่มแสดงที่นี่เมื่อมีรายการพร้อมขายในระบบ Catalog
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="reviews" className="scroll-mt-28 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <p className="text-sm font-bold text-[#0f4fc9]">ภาพหน้าร้านและการส่งของจริง</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-950">รีวิวความน่าเชื่อถือ</h2>
          </div>
          <ReviewGallery images={reviewImages} />
        </div>
      </section>

      <section id="store-map" className="scroll-mt-28 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="tech-grid mx-auto grid max-w-7xl gap-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-[#0f4fc9]">เดินทางมาที่ร้าน</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">แผนที่ POP Store Computer</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {storeAddress} เปิดบริการทุกวัน 9:00-18:00 น. สามารถเปิด Google Maps หรือทัก Line เพื่อสอบถามเส้นทางได้
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#0f4fc9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b3fa5]"
              >
                เปิด Google Maps
              </a>
              <a
                href={lineUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                Line: {lineText}
              </a>
            </div>
          </div>
          <img
            src={storeMapImage}
            alt="แผนที่การเดินทางไปร้าน POP Store Computer"
            className="w-full rounded-lg border border-slate-200 object-cover shadow-sm"
            loading="lazy"
          />
        </div>
      </section>

      <footer id="contact" className="scroll-mt-28 border-t border-blue-950 bg-[linear-gradient(135deg,#07122f_0%,#0f4fc9_70%,#ff8a1d_160%)] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-300 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-base font-bold text-white">{brandName}</p>
            <p className="mt-1 font-medium">{companyName} / {companyNameEn}</p>
            <p className="mt-1">เลขทะเบียน {companyRegistration}</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a href={`tel:${storePhones[0].replaceAll(" ", "")}`} className="font-semibold text-white">
              โทร {storePhones[0]}
            </a>
            <a href={storeFacebookUrl} target="_blank" rel="noreferrer" className="font-bold text-blue-200">
              Facebook: POP Store Computer
            </a>
            <Link href="/privacy-policy" className="font-bold text-slate-200 hover:text-white">
              นโยบายความเป็นส่วนตัว
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
