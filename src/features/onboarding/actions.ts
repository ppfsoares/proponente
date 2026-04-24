"use server";

import { saveUserProfile } from "./services/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleOnboarding(formData: FormData) {
  const name = formData.get("name") as string;
  const area = formData.get("area") as string;
  const state = formData.get("state") as string;
  const userId = formData.get("userId") as string || "temp-user-id"; // In real auth, get from session

  if (!name || !area || !state) {
    throw new Error("Missing required fields");
  }

  await saveUserProfile({ name, area, state, userId });

  revalidatePath("/");
  redirect("/feed");
}
