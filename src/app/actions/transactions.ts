"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function createTransaction(clientId: number, formData: FormData) {
  const amountRaw = str(formData, "amount");
  if (!amountRaw) {
    throw new Error("Amount is required");
  }

  const amount = Number(amountRaw);
  if (Number.isNaN(amount)) {
    throw new Error("Amount must be a number");
  }

  await prisma.transaction.create({
    data: {
      clientId,
      description: str(formData, "description"),
      amount,
      status: str(formData, "status") ?? "pending",
    },
  });

  revalidatePath(`/clients/${clientId}`);
  revalidatePath(`/clients/${clientId}/transactions`);
  redirect(`/clients/${clientId}/transactions`);
}
