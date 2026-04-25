import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "POP Storecomputer Admin",
  description: "Product catalog admin for POP Storecomputer.",
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
