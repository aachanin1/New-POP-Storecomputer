import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "POP Store Computer | คอมพิวเตอร์มือสอง อุปกรณ์ไอที จัดสเปคคอม",
    template: "%s | POP Store Computer",
  },
  description:
    "POP Store Computer โดยบริษัท ป๊อบ สโตร์ จำกัด จำหน่ายคอมพิวเตอร์มือสอง อุปกรณ์ไอที และบริการจัดสเปคคอม พร้อมดูรายละเอียดสินค้าและสั่งซื้อผ่าน Facebook",
  keywords: [
    "POP Store Computer",
    "ป๊อบ สโตร์ จำกัด",
    "คอมพิวเตอร์มือสอง",
    "อุปกรณ์ไอที",
    "จัดสเปคคอม",
    "โน้ตบุ๊กมือสอง",
    "ร้านคอม",
  ],
  openGraph: {
    title: "POP Store Computer | คอมพิวเตอร์มือสอง อุปกรณ์ไอที จัดสเปคคอม",
    description:
      "Catalog สินค้าไอทีจาก POP Store Computer ดูราคา รายละเอียด และสั่งซื้อผ่าน Facebook",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
