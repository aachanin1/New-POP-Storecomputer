"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

type CategoryOption = {
  id: number;
  name: string;
};

type AdminProductFiltersProps = {
  categories: CategoryOption[];
  initialCategory: string;
  initialSearch: string;
  initialVisibility: string;
  resultCount: number;
};

function buildQueryString(search: string, category: string, visibility: string) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("q", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (visibility !== "all") {
    params.set("visibility", visibility);
  }

  return params.toString();
}

export function AdminProductFilters({
  categories,
  initialCategory,
  initialSearch,
  initialVisibility,
  resultCount,
}: AdminProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [isTyping, setIsTyping] = useState(false);

  const hasFilters = Boolean(search || category || visibility !== "all");
  const showLoading = isTyping || isPending;

  const queryString = useMemo(
    () => buildQueryString(search, category, visibility),
    [category, search, visibility],
  );

  useEffect(() => {
    setIsTyping(true);

    const timer = window.setTimeout(() => {
      setIsTyping(false);
      startTransition(() => {
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [pathname, queryString, router]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setVisibility("all");
  }

  return (
    <>
      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              ค้นหา
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ชื่อสินค้า, ราคา, รุ่น"
              className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              ประเภท
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
            >
              <option value="">ทั้งหมด</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              สถานะ
            </span>
            <select
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">ทั้งหมด</option>
              <option value="visible">แสดงอยู่</option>
              <option value="hidden">ปิดไว้</option>
            </select>
          </label>
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            ล้างตัวกรอง
          </button>
        ) : null}
      </div>

      <div className="mb-3 flex min-h-9 flex-wrap items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
        <p>
          พบสินค้า <span className="font-bold text-slate-950">{resultCount}</span> รายการ
        </p>

        {showLoading ? (
          <div className="inline-flex items-center gap-2 font-semibold text-[#0f4fc9]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-100 border-t-[#0f4fc9]" />
            กำลังค้นหา...
          </div>
        ) : (
          <span className="font-semibold text-emerald-700">พร้อมใช้งาน</span>
        )}
      </div>
    </>
  );
}
