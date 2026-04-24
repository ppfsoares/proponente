"use server";

import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  // Mock login
  const email = formData.get("email");
  const password = formData.get("password");

  if (email && password) {
    redirect("/feed");
  }
}
