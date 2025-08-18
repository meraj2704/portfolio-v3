"use server";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { protectRoute } from "@/src/lib/auth";
import { addServiceData, Service } from "@/src/lib/services-data";

export type ServiceActionState = {
  success: boolean | null;
  error: string | null;
};

export async function createService(
  prevState: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  protectRoute();

  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const longDescription = formData.get("longDescription") as string;
  const icon = formData.get("icon") as Service["icon"];

  if (!title || !shortDescription || !longDescription || !icon) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    const newService: Service = {
      id: uuidv4(),
      title,
      shortDescription,
      longDescription,
      icon,
    };

    addServiceData(newService);
    redirect("/admin/services");
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Failed to create service." };
  }
}
