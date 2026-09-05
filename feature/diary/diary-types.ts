import { Database } from "@/lib/supabase/database.types";
import { Food, FoodServing } from "../food/food-types";

export type FoodEntry = Database["public"]["Tables"]["food_entries"]["Row"];

export type FoodEntryInsert =
  Database["public"]["Tables"]["food_entries"]["Insert"];

export type MealType = Database["public"]["Tables"]["meal_types"]["Row"];

export type FoodAndEntryAndServing = {
  food: Food;
  entry: FoodEntry | null;
  foodServing: FoodServing | null;
};
