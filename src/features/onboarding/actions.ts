"use server";

import { saveUserProfile } from "./services/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function checkUserProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return !!profile;
}

export async function getUserProfile(userId: string) {
  return await prisma.profile.findUnique({
    where: { userId },
  });
}

export async function handleOnboarding(formData: FormData) {
  const name = formData.get("name") as string;
  const area = formData.get("area") as string;
  const state = formData.get("state") as string;
  const userId = formData.get("userId") as string;

  if (!name || !area || !state || !userId || userId === "temp-user-id") {
    throw new Error("Usuário não autenticado ou campos obrigatórios ausentes");
  }

  await saveUserProfile({ name, area, state, userId });

  revalidatePath("/");
  redirect("/feed");
}
