"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { db } from "@/db";
import { products } from "@/db/schema";

export type AddProductState = {
  ok: boolean;
  message: string;
};

const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getFileExtension(file: File) {
  const extension = path.extname(file.name).toLowerCase();
  return extension || ".jpg";
}

export async function addProduct(
  _previousState: AddProductState,
  formData: FormData,
): Promise<AddProductState> {
  const name = cleanText(formData.get("name"));
  const price = cleanText(formData.get("price"));
  const fbPostUrl = cleanText(formData.get("fbPostUrl"));
  const image = formData.get("image");

  if (!name || !price || !fbPostUrl) {
    return {
      ok: false,
      message: "กรุณากรอกชื่อสินค้า ราคา และ URL โพสต์ Facebook ให้ครบ",
    };
  }

  if (!(image instanceof File) || image.size === 0) {
    return {
      ok: false,
      message: "กรุณาอัปโหลดรูปภาพสินค้า",
    };
  }

  if (!allowedImageTypes.has(image.type)) {
    return {
      ok: false,
      message: "รองรับไฟล์รูปภาพ JPEG, PNG, WebP หรือ GIF เท่านั้น",
    };
  }

  try {
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${randomUUID()}${getFileExtension(image)}`;
    const filePath = path.join(uploadDir, filename);
    const bytes = await image.arrayBuffer();

    await writeFile(filePath, Buffer.from(bytes));

    await db.insert(products).values({
      name,
      price,
      fbPostUrl,
      imageUrl: `/uploads/products/${filename}`,
    });

    return {
      ok: true,
      message: "บันทึกสินค้าสำเร็จ",
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "บันทึกไม่สำเร็จ กรุณาตรวจสอบฐานข้อมูลหรือรูปภาพอีกครั้ง",
    };
  }
}
