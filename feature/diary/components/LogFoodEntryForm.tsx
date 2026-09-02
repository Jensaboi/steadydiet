"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "@/lib/utils";
import { FoodAndEntryAndServing, MealType } from "../diary-types";
import { Input } from "@/components/ui/input";
import FoodMacros from "./FoodMacros";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LogFoodEntryFormProps = {
  foodData: FoodAndEntryAndServing;
  mealTypes: MealType[];
};

export default function LogFoodEntryForm({
  foodData,
  mealTypes,
}: LogFoodEntryFormProps) {
  const servingQuery = useQuery({
    queryKey: ["serving"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("food_servings")
        .select("*")
        .or(`food_id.eq.${null}`);

      if (error) console.log(error.message);

      return data;
    },
  });

  const food = foodData.food;
  const foodServing = foodData?.foodServing;
  const entry = foodData?.entry;

  const [amount, setAmount] = useState<number>(entry ? entry.amount : 1);
  const [serving, setServing] = useState<string | null>(
    entry ? entry.food_serving_id : null,
  );
  const [mealType, setMealType] = useState<string | null>(
    entry ? entry.meal_type_id : null,
  );

  return (
    <form className="">
      <div>
        <h1 className="text-lg font-semibold">{food.name_description}</h1>
        <span className="font-medium">{food.product_name}</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label className="flex items-center gap-2">
          <span>Serving: </span>
          <Select name="serving" value={serving} onValueChange={setServing}>
            <SelectTrigger>
              <SelectValue placeholder="Select a serving" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>1{food.nutrition_measure}</SelectItem>
              {foodServing && (
                <SelectItem value={foodServing.id}>
                  {foodServing.label}
                </SelectItem>
              )}
              {/* {serving.data?.map(serving => (
                <SelectItem key={serving.id} value={serving.id}>
                  {serving.label}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </label>

        <label className="flex items-center gap-2" htmlFor="amount">
          <span>Amount: </span>
          <Input
            name="amount"
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Meal:</span>
          <Select name="mealType" value={mealType} onValueChange={setMealType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a meal" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map(meal => (
                <SelectItem key={meal.id} value={meal.id}>
                  {capitalizeFirstLetter(meal.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <FoodMacros
        calories={
          ((food.calories_per_100 / 100) * amount).toFixed(
            1,
          ) as unknown as number
        }
        protein={
          ((food.protein_per_100 / 100) * amount).toFixed(
            1,
          ) as unknown as number
        }
        carbs={
          ((food.carbs_per_100 / 100) * amount).toFixed(1) as unknown as number
        }
        fat={
          ((food.fat_per_100 / 100) * amount).toFixed(1) as unknown as number
        }
      />
    </form>
  );
}
