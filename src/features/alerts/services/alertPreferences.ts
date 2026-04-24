import prisma from "@/lib/prisma";

export async function updateAlertPreferences(userId: string, preferences: { minDeadline?: number, grantTypes?: string[], channels?: string[] }) {
  // In a real app, you might want to find the first one or make userId unique
  const existing = await prisma.alert.findFirst({
    where: { userId }
  });

  if (existing) {
    return await prisma.alert.update({
      where: { id: existing.id },
      data: preferences,
    });
  }

  return await prisma.alert.create({
    data: {
      userId,
      ...preferences
    }
  });
}
