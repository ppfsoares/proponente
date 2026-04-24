import prisma from "@/lib/prisma";

export async function saveUserProfile(data: { name: string, area: string, state: string, userId: string }) {
  return await prisma.profile.upsert({
    where: { userId: data.userId },
    update: {
      name: data.name,
      areas: [data.area],
      state: data.state,
    },
    create: {
      userId: data.userId,
      name: data.name,
      areas: [data.area],
      state: data.state,
      organizationSize: "Individual", // Default for onboarding step 1
    },
  });
}
