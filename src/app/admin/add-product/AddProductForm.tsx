"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { addProduct, type AddProductState } from "./actions";

const initialState: AddProductState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "กำลังบันทึก..." : "บันทึกสินค้า"}
    </button>
  );
}

export function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(addProduct, initialState);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">ชื่อสินค้า</span>
          <input
            name="name"
            type="text"
            required
            placeholder="เช่น คอมพิวเตอร์ Dell OptiPlex"
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">ราคา</span>
          <input
            name="price"
            type="text"
            required
            placeholder="เช่น 8,900 บาท"
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">รูปภาพสินค้า</span>
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="mt-2 block h-11 w-full rounded-md border border-slate-300 bg-white text-sm text-slate-700 outline-none file:mr-4 file:h-full file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">URL โพสต์ Facebook</span>
          <input
            name="fbPostUrl"
            type="url"
            required
            placeholder="https://www.facebook.com/..."
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          />
        </label>
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
