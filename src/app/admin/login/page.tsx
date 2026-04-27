import { redirect } from "next/navigation";

import { getAdminSession } from "@/auth";

import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function LoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/add-product");
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <img
            src="/logo/pop-store-final.jpg"
            alt="POP Store Computer"
            className="mx-auto h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200"
          />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-[#0f4fc9]">
            Admin Only
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950">
            เข้าสู่ระบบหลังบ้าน
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            สำหรับผู้ดูแลร้าน POP Store Computer เพื่อเพิ่มสินค้าเท่านั้น
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
