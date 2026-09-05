"use server";

import { requireUser } from "../auth/auth-data";
import { createClient } from "@/lib/supabase/server";
import { createFoodEntrySchema } from "./diary-schema";
import { FoodEntryInsert } from "./diary-types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FoodServing } from "../food/food-types";

export async function createFoodEntry(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const user = await requireUser();

  const userId = user.sub;

  const supabase = await createClient();

  const { data: food, error: foodError } = await supabase
    .from("foods")
    .select("*")
    .eq("id", formData.get("foodId") as string)
    .single();

  if (foodError) {
    return { ...prevState, success: false, error: foodError.message };
  }

  if (!food) {
    return { ...prevState, success: false, error: "Food not found" };
  }

  const { data: serving, error: servingError } = await supabase
    .from("food_servings")
    .select("*")
    .eq("id", formData.get("servingId") as string)
    .single();

  if (servingError) {
    return { ...prevState, success: false, error: servingError.message };
  }

  const foodInsert: FoodEntryInsert = {
    user_id: userId,
    meal_type_id: formData.get("mealType") as string,
    food_id: formData.get("foodId") as string,
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
