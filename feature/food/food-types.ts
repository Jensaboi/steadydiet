import { Database } from "@/lib/supabase/database.types";

export type Food = Database["public"]["Tables"]["foods"]["Row"];

export type FoodServing = Database["public"]["Tables"]["food_servings"]["Row"];
