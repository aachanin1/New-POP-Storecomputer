import { asc } from "drizzle-orm";
import Link from "next/link";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { productBrands, productCategories } from "@/db/schema";

import { AdminShell } from "../AdminShell";
import { AddProductForm } from "./AddProductForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AddProductPage() {
  await requireAdminSession();

  const [categories, brands] = await Promise.all([
    db.select().from(productCategories).orderBy(asc(productCategories.name)),
    db.select().from(productBrands).orderBy(asc(productBrands.name)),
  ]);

  const isReady = categories.length > 0 && brands.length > 0;

  return (
    <AdminShell
      title="เพิ่มสินค้าใหม่"
      description="กรอกข้อมูลสินค้า เลือกประเภทและรุ่น วางรูปจาก Facebook หรืออัปโหลดไฟล์ แล้วบันทึกเข้าฐานข้อมูล MariaDB"
    >
      {!isReady ? (
        <div className="mb-5 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-orange-800">
          ต้องเพิ่มประเภทสินค้าและรุ่น/แบรนด์อย่างน้อยอย่างละ 1 รายการก่อนเพิ่มสินค้า
          <Link href="/admin/catalog-settings" className="ml-2 font-bold underline">
            ไปจัดการประเภท / รุ่น
          </Link>
        </div>
      ) : null}

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <AddProductForm categories={categories} brands={brands} />
      </div>
    </AdminShell>
  );
}
