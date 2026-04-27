import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { productBrands, productCategories, products } from "@/db/schema";

import { AdminShell } from "../../../AdminShell";
import { EditProductForm } from "./EditProductForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAdminSession();

  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    notFound();
  }

  const [categories, brands] = await Promise.all([
    db.select().from(productCategories).orderBy(asc(productCategories.name)),
    db.select().from(productBrands).orderBy(asc(productBrands.name)),
  ]);

  return (
    <AdminShell
      title="แก้ไขสินค้า"
      description="แก้ไขข้อมูลสินค้า ราคา ประเภท รุ่น ลิงก์ Facebook หรือเปลี่ยนรูปสินค้าได้จากหน้านี้"
    >
      <div className="mb-4">
        <Link
          href="/admin/products"
          className="text-sm font-bold text-[#0f4fc9] hover:text-[#0b3fa5]"
        >
          ← กลับไปหน้าจัดการสินค้า
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <EditProductForm product={product} categories={categories} brands={brands} />
      </div>
    </AdminShell>
  );
}
