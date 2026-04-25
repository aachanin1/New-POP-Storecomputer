import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
          POP Storecomputer
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Product Catalog
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          จัดการข้อมูลสินค้าและรูปภาพสำหรับแคตตาล็อกของร้าน
        </p>
        <Link
          href="/admin/add-product"
          className="mt-8 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          เพิ่มสินค้า
        </Link>
      </div>
    </main>
  );
}
