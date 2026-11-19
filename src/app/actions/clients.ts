"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MEASUREMENT_FIELDS } from "@/lib/measurements";

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function dateOfBirth(formData: FormData) {
  const value = str(formData, "dateOfBirth");
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function measurementPayload(formData: FormData) {
  const data: Record<string, string | null> = {
    customerNote: str(formData, "customerNote"),
  };

  for (const field of MEASUREMENT_FIELDS) {
    data[field.key] = str(formData, field.key);
  }

  return data;
}

export async function createClient(formData: FormData) {
  const fullName = str(formData, "fullName");
  if (!fullName) {
    throw new Error("Client full name is required");
  }

  const client = await prisma.client.create({
    data: {
      fullName,
      email: str(formData, "email"),
      phoneNumber: str(formData, "phoneNumber"),
      gender: str(formData, "gender"),
      dateOfBirth: dateOfBirth(formData),
      measurement: {
        create: measurementPayload(formData),
      },
    },
  });

  revalidatePath("/");
  redirect(`/clients/${client.id}`);
}

export async function updateClientInfo(clientId: number, formData: FormData) {
  const fullName = str(formData, "fullName");
  if (!fullName) {
    throw new Error("Client full name is required");
  }

  await prisma.client.update({
    where: { id: clientId },
    data: {
      fullName,
      email: str(formData, "email"),
      phoneNumber: str(formData, "phoneNumber"),
      gender: str(formData, "gender"),
      dateOfBirth: dateOfBirth(formData),
    },
  });

  revalidatePath(`/clients/${clientId}`);
  redirect(`/clients/${clientId}`);
}

export async function updateMeasurements(clientId: number, formData: FormData) {
  const payload = measurementPayload(formData);

  await prisma.measurement.upsert({
    where: { clientId },
    create: { clientId, ...payload },
    update: payload,
  });

  revalidatePath(`/clients/${clientId}`);
  redirect(`/clients/${clientId}`);
}

export async function deleteClient(clientId: number) {
  await prisma.client.delete({ where: { id: clientId } });
  revalidatePath("/");
  redirect("/");
}
