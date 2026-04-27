"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { productBrands, productCategories } from "@/db/schema";
import { cleanText, parseOptionalId } from "@/lib/product-utils";

export type CatalogSettingState = {
  ok: boolean;
  message: string;
};

const emptyState = {
  ok: false,
  message: "",
};

function normalizeName(name: string) {
  return name.replace(/\s+/g, " ").trim();
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.toLowerCase().includes("duplicate")) {
    return "มีรายการนี้อยู่แล้ว";
  }

  return fallback;
}

export async function addCategory(
  _previousState: CatalogSettingState = emptyState,
  formData: FormData,
): Promise<CatalogSettingState> {
  await requireAdminSession();

  const name = normalizeName(cleanText(formData.get("name")));

  if (!name) {
    return { ok: false, message: "กรุณากรอกชื่อประเภทสินค้า" };
  }

  try {
    await db.insert(productCategories).values({ name });
    revalidateCatalogPaths();

    return { ok: true, message: "เพิ่มประเภทสินค้าเรียบร้อย" };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: getErrorMessage(error, "เพิ่มประเภทสินค้าไม่สำเร็จ"),
    };
  }
}

export async function addBrand(
  _previousState: CatalogSettingState = emptyState,
  formData: FormData,
): Promise<CatalogSettingState> {
  await requireAdminSession();

  const name = normalizeName(cleanText(formData.get("name")));

  if (!name) {
    return { ok: false, message: "กรุณากรอกชื่อรุ่นหรือแบรนด์" };
  }

  try {
    await db.insert(productBrands).values({ name });
    revalidateCatalogPaths();

    return { ok: true, message: "เพิ่มรุ่น/แบรนด์เรียบร้อย" };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: getErrorMessage(error, "เพิ่มรุ่น/แบรนด์ไม่สำเร็จ"),
    };
  }
}

function revalidateCatalogPaths() {
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/admin/catalog-settings");
  revalidatePath("/admin/add-product");
}

export async function updateCategory(formData: FormData) {
  await requireAdminSession();

  const id = parseOptionalId(formData.get("id"));
  const name = normalizeName(cleanText(formData.get("name")));

  if (!id || !name) {
    return;
  }

  try {
    await db
      .update(productCategories)
      .set({ name })
      .where(eq(productCategories.id, id));
    revalidateCatalogPaths();
  } catch (error) {
    console.error(error);
  }
}

export async function updateBrand(formData: FormData) {
  await requireAdminSession();

  const id = parseOptionalId(formData.get("id"));
  const name = normalizeName(cleanText(formData.get("name")));

  if (!id || !name) {
    return;
  }

  try {
    await db
      .update(productBrands)
      .set({ name })
      .where(eq(productBrands.id, id));
    revalidateCatalogPaths();
  } catch (error) {
    console.error(error);
  }
}
