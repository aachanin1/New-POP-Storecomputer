"use server";

import { redirect } from "next/navigation";

import { signInAdmin, signOutAdmin } from "@/auth";

export type LoginState = {
  message: string;
};

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdmin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = cleanText(formData.get("email"));
  const password = cleanText(formData.get("password"));

  if (!email || !password) {
    return { message: "กรุณากรอกอีเมลและรหัสผ่าน" };
  }

  const isAuthenticated = await signInAdmin(email, password);

  if (!isAuthenticated) {
    return { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  }

  redirect("/admin/add-product");
}

export async function logoutAdmin() {
  await signOutAdmin();
  redirect("/admin/login");
}
