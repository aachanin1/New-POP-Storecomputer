import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
const maxImageBytes = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function getExtensionFromType(contentType: string) {
  if (contentType === "image/png") return ".png";
  if (contentType === "image/webp") return ".webp";
  if (contentType === "image/gif") return ".gif";

  return ".jpg";
}

function getFileExtension(file: File) {
  const extension = path.extname(file.name).toLowerCase();

  return extension || getExtensionFromType(file.type);
}

async function saveImageBuffer(buffer: Buffer, extension: string) {
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  return `/uploads/products/${filename}`;
}

export async function saveUploadedProductImage(file: File) {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("รองรับไฟล์รูปภาพ JPEG, PNG, WebP หรือ GIF เท่านั้น");
  }

  if (file.size > maxImageBytes) {
    throw new Error("รูปภาพต้องมีขนาดไม่เกิน 10MB");
  }

  const bytes = await file.arrayBuffer();

  return saveImageBuffer(Buffer.from(bytes), getFileExtension(file));
}

export async function importProductImageFromUrl(imageSourceUrl: string) {
  let url: URL;

  try {
    url = new URL(imageSourceUrl);
  } catch {
    throw new Error("URL รูปภาพไม่ถูกต้อง");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("รองรับเฉพาะ URL รูปภาพแบบ http หรือ https");
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "POP Store Computer image importer",
    },
  });

  if (!response.ok) {
    throw new Error("ดึงรูปจาก URL นี้ไม่ได้ กรุณาลองลากรูปหรือ paste รูปแทน");
  }

  const contentType = response.headers.get("content-type")?.split(";")[0] ?? "";

  if (!allowedImageTypes.has(contentType)) {
    throw new Error("URL นี้ไม่ได้ชี้ไปที่ไฟล์รูปภาพที่รองรับ");
  }

  const bytes = await response.arrayBuffer();

  if (bytes.byteLength > maxImageBytes) {
    throw new Error("รูปภาพจาก URL ต้องมีขนาดไม่เกิน 10MB");
  }

  return saveImageBuffer(Buffer.from(bytes), getExtensionFromType(contentType));
}
