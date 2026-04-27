import { redirect } from "next/navigation";

import { requireAdminSession } from "@/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  await requireAdminSession();
  redirect("/admin/products");
}
