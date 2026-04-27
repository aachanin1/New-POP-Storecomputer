import { asc } from "drizzle-orm";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { productBrands, productCategories } from "@/db/schema";

import { AdminShell } from "../AdminShell";
import { addBrand, addCategory, updateBrand, updateCategory } from "./actions";
import { CatalogManagerPanel } from "./CatalogManagerPanel";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function CatalogSettingsPage() {
  await requireAdminSession();

  const [categories, brands] = await Promise.all([
    db.select().from(productCategories).orderBy(asc(productCategories.name)),
    db.select().from(productBrands).orderBy(asc(productBrands.name)),
  ]);

  return (
    <AdminShell
      title="ประเภทสินค้า / รุ่น"
      description="เพิ่ม ค้นหา และแก้ไขประเภทสินค้าและรุ่น/แบรนด์ได้เองจากหลังบ้าน โดยระบบจะเช็คชื่อซ้ำตั้งแต่ตอนพิมพ์"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <CatalogManagerPanel
          addAction={addCategory}
          emptyText="ยังไม่มีประเภทสินค้า"
          items={categories}
          label="เพิ่มหรือค้นหาประเภทสินค้า"
          placeholder="เช่น Notebook, PC, All in One"
          submitLabel="เพิ่มประเภท"
          title="ประเภททั้งหมด"
          tone="blue"
          updateAction={updateCategory}
        />

        <CatalogManagerPanel
          addAction={addBrand}
          emptyText="ยังไม่มีรุ่นหรือแบรนด์"
          items={brands}
          label="เพิ่มหรือค้นหารุ่น / แบรนด์"
          placeholder="เช่น HP, Lenovo, Dell, Acer"
          submitLabel="เพิ่มรุ่น"
          title="รุ่น/แบรนด์ทั้งหมด"
          tone="orange"
          updateAction={updateBrand}
        />
      </div>
    </AdminShell>
  );
}
