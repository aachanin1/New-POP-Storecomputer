"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import type { CatalogSettingState } from "./actions";

type CatalogItem = {
  id: number;
  name: string;
};

type Tone = "blue" | "orange";

type CatalogManagerPanelProps = {
  addAction: (
    previousState: CatalogSettingState,
    formData: FormData,
  ) => Promise<CatalogSettingState>;
  emptyText: string;
  items: CatalogItem[];
  label: string;
  placeholder: string;
  submitLabel: string;
  title: string;
  tone: Tone;
  updateAction: (formData: FormData) => Promise<void>;
};

const initialState: CatalogSettingState = {
  ok: false,
  message: "",
};

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function SubmitButton({
  disabled,
  label,
  pendingLabel,
  tone,
}: {
  disabled: boolean;
  label: string;
  pendingLabel: string;
  tone: Tone;
}) {
  const { pending } = useFormStatus();
  const colorClass =
    tone === "blue"
      ? "bg-[#0f4fc9] hover:bg-[#0b3fa5]"
      : "bg-orange-600 hover:bg-orange-700";

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={`h-11 rounded-md px-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-400 ${colorClass}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function SaveButton({ tone }: { tone: Tone }) {
  const { pending } = useFormStatus();
  const colorClass =
    tone === "blue"
      ? "bg-[#0f4fc9] hover:bg-[#0b3fa5]"
      : "bg-orange-600 hover:bg-orange-700";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`h-10 rounded-md px-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-400 ${colorClass}`}
    >
      {pending ? "กำลังบันทึก..." : "บันทึก"}
    </button>
  );
}

export function CatalogManagerPanel({
  addAction,
  emptyText,
  items,
  label,
  placeholder,
  submitLabel,
  title,
  tone,
  updateAction,
}: CatalogManagerPanelProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [state, formAction] = useActionState(addAction, initialState);
  const normalizedQuery = normalizeText(query);
  const duplicateItem = normalizedQuery
    ? items.find((item) => normalizeText(item.name) === normalizedQuery)
    : undefined;

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) return items;

    return items.filter((item) => normalizeText(item.name).includes(normalizedQuery));
  }, [items, normalizedQuery]);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setQuery("");
      inputRef.current?.focus();
    }
  }, [state.ok]);

  const panelTone =
    tone === "blue"
      ? {
          list: "border-blue-100 bg-blue-50/50",
          input: "border-blue-100 text-[#0f4fc9] focus:border-[#0f4fc9] focus:ring-blue-100",
          pill: "bg-blue-50 text-[#0f4fc9] ring-blue-100",
        }
      : {
          list: "border-orange-100 bg-orange-50/50",
          input: "border-orange-100 text-orange-700 focus:border-orange-400 focus:ring-orange-100",
          pill: "bg-orange-50 text-orange-700 ring-orange-100",
        };

  const addDisabled = Boolean(!normalizedQuery || duplicateItem);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <form ref={formRef} action={formAction} className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">{label}</span>
          <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              ref={inputRef}
              name="name"
              type="text"
              required
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
            />
            <SubmitButton
              disabled={addDisabled}
              label={duplicateItem ? "มีอยู่แล้ว" : submitLabel}
              pendingLabel="กำลังเพิ่ม..."
              tone={tone}
            />
          </div>
        </label>

        {normalizedQuery ? (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              duplicateItem
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {duplicateItem
              ? `พบ "${duplicateItem.name}" อยู่แล้ว แก้ไขจากรายการด้านล่างได้เลย`
              : `ยังไม่พบ "${query.trim()}" สามารถกดเพิ่มได้`}
          </div>
        ) : null}

        {state.message ? (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              state.ok
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {state.message}
          </div>
        ) : null}
      </form>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-slate-950">
            {title} ({items.length})
          </p>
          {normalizedQuery ? (
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${panelTone.pill}`}>
              แสดง {filteredItems.length} รายการที่ตรงกัน
            </span>
          ) : null}
        </div>

        <div className="mt-3 max-h-[290px] overflow-y-auto pr-1">
          <div className="grid gap-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isExactMatch = normalizeText(item.name) === normalizedQuery;

                return (
                  <form
                    key={item.id}
                    action={updateAction}
                    className={`grid gap-2 rounded-md border p-2 sm:grid-cols-[1fr_auto] ${panelTone.list} ${
                      isExactMatch ? "ring-2 ring-amber-200" : ""
                    }`}
                  >
                    <input name="id" type="hidden" value={item.id} readOnly />
                    <input
                      name="name"
                      type="text"
                      required
                      defaultValue={item.name}
                      className={`h-10 rounded-md border bg-white px-3 text-sm font-semibold outline-none transition focus:ring-2 ${panelTone.input}`}
                    />
                    <SaveButton tone={tone} />
                  </form>
                );
              })
            ) : (
              <p className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                {normalizedQuery ? "ไม่พบรายการที่ตรงกับคำค้นหา" : emptyText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
