"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAdmin, type LoginState } from "./actions";

const initialState: LoginState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0f4fc9] px-5 text-sm font-bold text-white transition hover:bg-[#0b3fa5] disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">อีเมลผู้ดูแล</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="popstorecomputer@gmail.com"
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">รหัสผ่าน</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#0f4fc9] focus:ring-2 focus:ring-blue-100"
        />
      </label>

      {state.message ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
