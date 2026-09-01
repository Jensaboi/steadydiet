"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "../auth/auth-data";

export async function getRecentFoodEntries() {
  await requireUser();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("food_entries")
    .select("*, foods(*), food_servings(*)")
    .order("consumed_at", { ascending: true });

  if (error)
    throw new Error(
      error.message ??
        "An unexpected error occured fetching recent food entries...",
    );

  return data.map(({ foods, food_servings, ...item }) => ({
    food: foods,
    foodServing: food_servings,
    entry: item,
  }));
}

export async function getMealTypes() {
  await requireUser();

  const supabase = await createClient();

  const { data, error } = await supabase.from("meal_types").select("*");

  if (error)
    throw new Error(
      error?.message ??
        "An unexpected error occured happen fetching meal types...",
    );

  return data;
}
