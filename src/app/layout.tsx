import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "POP Store Computer | คอมพิวเตอร์สภาพดี ราคาคุ้ม รับประกัน 3 เดือน",
    template: "%s | POP Store Computer",
  },
  description:
    "POP Store Computer โดยบริษัท ป๊อบ สโตร์ จำกัด จำหน่ายคอมพิวเตอร์ All in One, PC และ Notebook Business สภาพดี ราคาคุ้ม ตรวจสอบ Serial Number ได้ พร้อมรับประกัน 3 เดือน",
  keywords: [
    "POP Store Computer",
    "ป๊อบ สโตร์ จำกัด",
    "คอมพิวเตอร์มือสอง",
    "คอมพิวเตอร์สภาพดี",
    "Notebook Business",
    "All in One",
    "อุปกรณ์ไอที",
    "จัดสเปคคอม",
    "รับประกัน 3 เดือน",
  ],
  openGraph: {
    title: "POP Store Computer | คอมพิวเตอร์สภาพดี ราคาคุ้ม",
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
