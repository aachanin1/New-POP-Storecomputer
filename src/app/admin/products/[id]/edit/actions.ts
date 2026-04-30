"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { db } from "@/db";
import { products } from "@/db/schema";
import {
  importProductImageFromUrl,
  saveUploadedProductImage,
} from "@/lib/product-images";
import { cleanText, parseOptionalId } from "@/lib/product-utils";

export type EditProductState = {
  ok: boolean;
  message: string;
};

function parseProductId(value: FormDataEntryValue | null) {
  const id = parseOptionalId(value);

  if (!id) {
    throw new Error("ไม่พบรหัสสินค้า");
  }

  return id;
}

export async function updateProduct(
  _previousState: EditProductState,
  formData: FormData,
): Promise<EditProductState> {
  await requireAdminSession();

  const id = parseProductId(formData.get("id"));
  const currentImageUrl = cleanText(formData.get("currentImageUrl"));
  const name = cleanText(formData.get("name"));
  const price = cleanText(formData.get("price"));
  const categoryId = parseOptionalId(formData.get("categoryId"));
  const brandId = parseOptionalId(formData.get("brandId"));
  const fbPostUrl = cleanText(formData.get("fbPostUrl"));
  const imageSourceUrl = cleanText(formData.get("imageSourceUrl"));
  const image = formData.get("image");

  if (!name || !price || !categoryId || !brandId || !fbPostUrl) {
    return {
      ok: false,
      message: "กรุณากรอกชื่อสินค้า ราคา ประเภทสินค้า รุ่น/แบรนด์ และ URL โพสต์ Facebook ให้ครบ",
    };
  }

  if (!/^\d+$/.test(price)) {
    return {
      ok: false,
      message: "ราคาต้องเป็นตัวเลขเท่านั้น เช่น 5900",
    };
  }

  try {
    new URL(fbPostUrl);
  } catch {
    return {
      ok: false,
      message: "URL โพสต์ Facebook ไม่ถูกต้อง",
    };
  }

  try {
    let imageUrl = currentImageUrl;

    if (image instanceof File && image.size > 0) {
      imageUrl = await saveUploadedProductImage(image);
    } else if (imageSourceUrl) {
      imageUrl = await importProductImageFromUrl(imageSourceUrl);
    }

    if (!imageUrl) {
      return { ok: false, message: "กรุณาระบุรูปภาพสินค้า" };
    }

    await db
      .update(products)
      .set({
        name,
        price,
        categoryId,
        brandId,
        fbPostUrl,
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}/edit`);

    return { ok: true, message: "บันทึกการแก้ไขสินค้าเรียบร้อย" };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "แก้ไขสินค้าไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
    };
  }
}
