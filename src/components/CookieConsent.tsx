"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const consentKey = "pop-store-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(consentKey));
  }, []);

  function saveConsent(value: "accepted" | "rejected") {
    window.localStorage.setItem(consentKey, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-100 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-950">เว็บไซต์นี้ใช้คุกกี้</p>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-600">
            เราใช้คุกกี้เพื่อจดจำการตั้งค่าและปรับปรุงประสบการณ์ใช้งานเว็บไซต์
            อ่านรายละเอียดได้ที่{" "}
            <Link href="/privacy-policy" className="font-bold text-[#0f4fc9] underline">
              นโยบายความเป็นส่วนตัว
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => saveConsent("rejected")}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            ปฏิเสธ
          </button>
          <button
            type="button"
            onClick={() => saveConsent("accepted")}
            className="rounded-md bg-[#0f4fc9] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0b3fa5]"
          >
            ยอมรับ
          </button>
        </div>
      </div>
    </div>
  );
}
