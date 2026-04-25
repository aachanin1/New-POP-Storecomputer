import { AddProductForm } from "./AddProductForm";

export const runtime = "nodejs";

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">
            เพิ่มสินค้าใหม่
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            กรอกข้อมูลสินค้า อัปโหลดรูปภาพ แล้วบันทึกเข้าฐานข้อมูล MariaDB
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <AddProductForm />
        </div>
      </section>
    </main>
  );
}
