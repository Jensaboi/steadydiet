import * as z from "zod";

export const createFoodEntrySchema = z.object({
  user_id: z.string({ message: "User ID is required" }),
  meal_type_id: z.string({ message: "Meal type is required" }),
  food_id: z.string({ message: "Food ID is required" }),
  food_serving_id: z.string().optional(),
  amount: z.number().min(0.01, { message: "Amount cannot be empty" }),
  calories: z.number().min(0, { message: "Enter calories amount" }),
  protein: z.number().min(0, { message: "Enter protein amount" }),
  carbs: z.number().min(0, { message: "Enter carbs amount" }),
  fat: z.number().min(0, { message: "Enter fat amount" }),
  consumed_at: z.string({ message: "Consumed at is required" }),
});
