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

export async function getUserAlerts(userId: string) {
  return await prisma.alert.findFirst({
    where: { userId },
  });
}

export async function saveUserAlerts(data: {
  userId: string;
  minDeadline: number | null;
  grantTypes: string[];
  channels: string[];
  states: string[];
  valueRange: string | null;
}) {
  const existing = await prisma.alert.findFirst({
    where: { userId: data.userId },
  });

  if (existing) {
    return await prisma.alert.update({
      where: { id: existing.id },
      data: {
        minDeadline: data.minDeadline,
        grantTypes: data.grantTypes,
        channels: data.channels,
        states: data.states,
        valueRange: data.valueRange,
      },
    });
  } else {
    return await prisma.alert.create({
      data: {
        userId: data.userId,
        minDeadline: data.minDeadline,
        grantTypes: data.grantTypes,
        channels: data.channels,
        states: data.states,
        valueRange: data.valueRange,
      },
    });
  }
}

export async function getMatchingGrants(filters: {
  states: string[];
  valueRange: string | null;
  grantTypes: string[];
  minDeadline: string | null;
}) {
  const query: any = {
    where: {},
    take: 6,
    orderBy: { deadline: 'asc' },
  };

  if (filters.states && filters.states.length > 0) {
    query.where.state = {
      in: filters.states,
    };
  }

  if (filters.valueRange && filters.valueRange !== "Qualquer") {
    if (filters.valueRange === "Até R$ 50mil") {
      query.where.value = {
        lte: 50000,
      };
    } else if (filters.valueRange === "R$ 50mil - R$ 150mil") {
      query.where.value = {
        gte: 50000,
        lte: 150000,
      };
    } else if (filters.valueRange === "R$ 150mil+") {
      query.where.value = {
        gte: 150000,
      };
    }
  }

  if (filters.grantTypes && filters.grantTypes.length > 0) {
    // Check if the category is in the selected categories.
    // Map to categories available in database.
    // If the database has different names, we just do a direct match or contains.
    query.where.category = {
      in: filters.grantTypes,
    };
  }

  if (filters.minDeadline && filters.minDeadline !== "Qualquer") {
    let days = 0;
    if (filters.minDeadline === "7+ dias") days = 7;
    else if (filters.minDeadline === "15+ dias") days = 15;
    else if (filters.minDeadline === "30+ dias") days = 30;

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + days);

    query.where.deadline = {
      gte: minDate,
    };
  }

  return await prisma.grant.findMany(query);
}
