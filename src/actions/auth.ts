"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(pin: string) {
  const correctPin = process.env.ADMIN_PORTAL_PIN;

  if (pin === correctPin) {
    await createSession(pin);
    redirect("/dashboard");
  } else {
    return { error: "Invalid Access Key" };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/dashboard/login");
}
