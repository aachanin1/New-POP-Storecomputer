"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { products } from "@/db/schema";
import { parseOptionalId } from "@/lib/product-utils";

export async function toggleProductVisibility(formData: FormData) {
  await requireAdminSession();

  const id = parseOptionalId(formData.get("id"));
  const nextVisible = formData.get("nextVisible") === "true";

  if (!id) {
    throw new Error("ไม่พบรหัสสินค้า");
  }

  await db
    .update(products)
    .set({ isVisible: nextVisible })
    .where(eq(products.id, id));

  revalidatePath("/");
  revalidatePath("/admin/products");
}
