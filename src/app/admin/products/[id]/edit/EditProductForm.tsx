"use client";

import type React from "react";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { updateProduct, type EditProductState } from "./actions";

type Option = {
  id: number;
  name: string;
};

type ProductFormValue = {
  id: number;
  name: string;
  price: string;
  categoryId: number | null;
  brandId: number | null;
  fbPostUrl: string;
  imageUrl: string;
};

type EditProductFormProps = {
  product: ProductFormValue;
  categories: Option[];
  brands: Option[];
};

const initialState: EditProductState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-md bg-[#0f4fc9] px-5 text-sm font-bold text-white transition hover:bg-[#0b3fa5] disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
    </button>
  );
}

function extractImageUrlFromHtml(html: string) {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);

  return match?.[1] ?? "";
}

export function EditProductForm({ product, categories, brands }: EditProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useActionState(updateProduct, initialState);
  const [previewUrl, setPreviewUrl] = useState(product.imageUrl);
  const [imageSourceUrl, setImageSourceUrl] = useState("");
  const [dropMessage, setDropMessage] = useState("เปลี่ยนรูปด้วยการลากรูป, paste รูป, วาง URL หรือคลิกเลือกไฟล์");

  function setSelectedFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setDropMessage("ไฟล์ที่เลือกไม่ใช่รูปภาพ");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }

    setImageSourceUrl("");
    setPreviewUrl(URL.createObjectURL(file));
    setDropMessage(`เลือกไฟล์ใหม่แล้ว: ${file.name}`);
  }

  function setRemoteImageUrl(url: string) {
    const cleanUrl = url.trim();

    if (!cleanUrl) return;

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setImageSourceUrl(cleanUrl);
    setPreviewUrl(cleanUrl);
    setDropMessage("ใช้ URL รูปภาพใหม่ ระบบจะดึงมาเก็บในเว็บเราเมื่อกดบันทึก");
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      setSelectedFile(file);
      return;
    }

    const uri = event.dataTransfer.getData("text/uri-list");
    const text = event.dataTransfer.getData("text/plain");
    const html = event.dataTransfer.getData("text/html");
    const imageUrl = uri || extractImageUrlFromHtml(html) || text;

    setRemoteImageUrl(imageUrl);
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const file = Array.from(event.clipboardData.files).find((item) =>
      item.type.startsWith("image/"),
    );

    if (file) {
      setSelectedFile(file);
      return;
    }

    setRemoteImageUrl(event.clipboardData.getData("text/plain"));
  }

  return (
    <form action={formAction} className="space-y-6">
      <input name="id" type="hidden" value={product.id} readOnly />
      <input name="currentImageUrl" type="hidden" value={product.imageUrl} readOnly />
      <input name="imageSourceUrl" type="hidden" value={imageSourceUrl} readOnly />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-slate-700">ชื่อสินค้า</span>
          <input
            name="name"
            type="text"
            required
            defaultValue={product.name}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">ราคา</span>
          <input
            name="price"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            defaultValue={product.price}
            onChange={(event) => {
              event.target.value = event.target.value.replace(/\D/g, "");
            }}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">ประเภทสินค้า</span>
          <select
            name="categoryId"
            required
            defaultValue={product.categoryId ?? ""}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled>
              เลือกประเภทสินค้า
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">รุ่น / แบรนด์</span>
          <select
            name="brandId"
            required
            defaultValue={product.brandId ?? ""}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled>
              เลือกรุ่นหรือแบรนด์
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">URL โพสต์ Facebook</span>
          <input
            name="fbPostUrl"
            type="url"
            required
            defaultValue={product.fbPostUrl}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="sm:col-span-2">
          <span className="text-sm font-semibold text-slate-700">รูปภาพสินค้า</span>
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setSelectedFile(file);
            }}
          />

          <div
            role="button"
            tabIndex={0}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            onPaste={handlePaste}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                fileInputRef.current?.click();
              }
            }}
            className="mt-2 grid min-h-64 cursor-pointer place-items-center overflow-hidden rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/40 p-4 text-center outline-none transition hover:border-[#0f4fc9] hover:bg-blue-50 focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-80 w-full rounded-md object-contain"
            />
          </div>

          <input
            type="url"
            placeholder="หรือวาง URL รูปภาพใหม่ที่นี่"
            value={imageSourceUrl}
            onChange={(event) => setRemoteImageUrl(event.target.value)}
            className="mt-3 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">{dropMessage}</p>
        </div>
      </div>

      {state.message ? (
        <div
          role="status"
          className={`rounded-md border px-4 py-3 text-sm ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="flex items-center justify-end border-t border-slate-200 pt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
