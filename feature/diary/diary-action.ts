"use server";

import { requireUser } from "../auth/auth-data";
import { createClient } from "@/lib/supabase/server";
import { createFoodEntrySchema } from "./diary-schema";
import { FoodEntryInsert } from "./diary-types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFoodEntry(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const user = await requireUser();

  const userId = user.sub;

  const foodInsert: FoodEntryInsert = {
    user_id: userId,
    meal_type_id: formData.get("mealType") as string,
    food_id: (formData.get("foodId") as string) ?? null,
    food_serving_id: formData.get("servingId") as string,
    amount: parseFloat(formData.get("amount") as string),
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    consumed_at: formData.get("date") as string,
  };

  const result = createFoodEntrySchema.safeParse(foodInsert);

  if (!result.success) {
    return { ...prevState, success: false, error: result.error.message };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("food_entries")
    .insert(result.data);

  if (error) {
    return { ...prevState, success: false, error: error.message };
  }

  revalidatePath("/diary");
  revalidatePath("/food");

  redirect("/diary?date=" + result.data.consumed_at);
}
