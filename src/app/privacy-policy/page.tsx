import type { Metadata } from "next";
import Link from "next/link";

import {
  brandName,
  companyName,
  lineText,
  lineUrl,
  storeAddress,
  storeFacebookUrl,
  storePhones,
} from "@/lib/store-info";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "นโยบายความเป็นส่วนตัวและการใช้คุกกี้ของ POP Store Computer ตามแนวทาง PDPA",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-bold text-[#0f4fc9] hover:text-[#0b3fa5]">
          ← กลับหน้าแรก
        </Link>

        <h1 className="mt-5 text-3xl font-extrabold">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          นโยบายฉบับนี้อธิบายวิธีที่ {brandName} โดย {companyName} เก็บ ใช้ และดูแลข้อมูลส่วนบุคคลของผู้ใช้งานเว็บไซต์
          เพื่อให้สอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
        </p>

        <section className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-950">1. ข้อมูลที่เราอาจเก็บรวบรวม</h2>
            <p className="mt-2">
              เราอาจเก็บข้อมูลที่ท่านติดต่อกับร้าน เช่น ชื่อ ช่องทางติดต่อ รายละเอียดสินค้าที่สนใจ
              รวมถึงข้อมูลการใช้งานเว็บไซต์พื้นฐาน เช่น คุกกี้ อุปกรณ์ เบราว์เซอร์ และหน้าที่เข้าชม
              เพื่อปรับปรุงประสบการณ์ใช้งานเว็บไซต์
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
            <p className="mt-2">
              ใช้เพื่อให้ข้อมูลสินค้า ตอบคำถามลูกค้า ประสานงานการสั่งซื้อ ปรับปรุงเว็บไซต์
              วิเคราะห์ประสิทธิภาพการใช้งาน และรักษาความปลอดภัยของระบบ
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">3. การใช้คุกกี้</h2>
            <p className="mt-2">
              เว็บไซต์อาจใช้คุกกี้เพื่อจดจำการตั้งค่าและช่วยให้เว็บไซต์ทำงานได้ดีขึ้น
              หากในอนาคตมีการติดตั้งเครื่องมือวิเคราะห์หรือโฆษณา เช่น Google Analytics หรือ Facebook Pixel
              เราจะใช้ตามความยินยอมของผู้ใช้งาน
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">4. การเปิดเผยข้อมูล</h2>
            <p className="mt-2">
              เราจะไม่ขายข้อมูลส่วนบุคคลของท่านให้บุคคลภายนอก แต่อาจเปิดเผยเท่าที่จำเป็นกับผู้ให้บริการที่เกี่ยวข้อง
              เช่น ระบบเว็บไซต์ ระบบโฮสติ้ง หรือหน่วยงานตามกฎหมายเมื่อมีหน้าที่ต้องปฏิบัติตาม
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">5. ระยะเวลาเก็บรักษาข้อมูล</h2>
            <p className="mt-2">
              เราจะเก็บข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ในการให้บริการ การติดต่อกลับ การปฏิบัติตามกฎหมาย
              หรือเพื่อประโยชน์โดยชอบด้วยกฎหมายของร้าน
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">6. สิทธิของเจ้าของข้อมูล</h2>
            <p className="mt-2">
              ท่านมีสิทธิขอเข้าถึง แก้ไข ลบ ระงับการใช้ หรือถอนความยินยอมในการประมวลผลข้อมูลส่วนบุคคล
              โดยสามารถติดต่อร้านผ่านช่องทางด้านล่าง
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">7. ช่องทางติดต่อ</h2>
            <p className="mt-2">{companyName}</p>
            <p>{storeAddress}</p>
            <p>โทร {storePhones.join(", ")}</p>
            <p>
              Line:{" "}
              <a href={lineUrl} target="_blank" rel="noreferrer" className="font-bold text-emerald-700">
                {lineText}
              </a>
            </p>
            <p>
              Facebook:{" "}
              <a href={storeFacebookUrl} target="_blank" rel="noreferrer" className="font-bold text-[#0f4fc9]">
                {brandName}
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
