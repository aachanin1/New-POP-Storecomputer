import Link from "next/link";
import type React from "react";

import { logoutAdmin } from "./login/actions";

type AdminShellProps = {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
};

const navItems = [
  { href: "/admin/products", label: "จัดการสินค้า" },
  { href: "/admin/add-product", label: "เพิ่มสินค้า" },
  { href: "/admin/catalog-settings", label: "ประเภท / รุ่น" },
];

export function AdminShell({
  children,
  eyebrow = "Admin",
  title,
  description,
}: AdminShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f4fc9]">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>

          <nav className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-[#0f4fc9] transition hover:-translate-y-0.5 hover:bg-blue-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-100"
            >
              ดูหน้าเว็บ
            </Link>
          </nav>
        </header>

        {children}
      </section>
    </main>
  );
}
