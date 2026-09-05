"use client";
import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter, formatDate } from "@/lib/utils";
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
import { useSearchParams } from "next/navigation";
import { createFoodEntry } from "../diary-action";
import { Button } from "@/components/ui/button";

export type LogFoodEntryFormProps = {
  foodData: FoodAndEntryAndServing;
  mealTypes: MealType[];
};

export default function LogFoodEntryForm({
  foodData,
  mealTypes,
}: LogFoodEntryFormProps) {
  const [state, formAction, isPending] = useActionState(createFoodEntry, null);

  const { data: servings, error: servingsError } = useQuery({
    queryKey: ["serving"],
    initialData: [],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("food_servings")
        .select("*")
        .or(`food_id.eq.${null}`);

      if (error) console.log(error.message);

      return data ? data : [];
    },
  });

  const searchParams = useSearchParams();
  const date = searchParams.get("date") || formatDate(new Date());

  const food = foodData.food;
  const foodServing = foodData?.foodServing;
  const entry = foodData?.entry;

  const [amount, setAmount] = useState<number>(entry ? entry.amount : 1);
  const [servingId, setServingId] = useState<string | undefined>(
    entry?.food_serving_id ? entry.food_serving_id : "1",
  );
  const [mealType, setMealType] = useState<string | undefined>(
    entry ? entry.meal_type_id : undefined,
  );

  const serving = [...servings, foodServing].find(s => s?.id === servingId);

  const calories = serving
    ? ((food.calories_per_100 / 100) * serving.amount * amount).toFixed(1)
    : ((food.calories_per_100 / 100) * amount).toFixed(1);
  const protein = serving
    ? ((food.protein_per_100 / 100) * serving.amount * amount).toFixed(1)
    : ((food.protein_per_100 / 100) * amount).toFixed(1);
  const carbs = serving
    ? ((food.carbs_per_100 / 100) * serving.amount * amount).toFixed(1)
    : ((food.carbs_per_100 / 100) * amount).toFixed(1);
  const fat = serving
    ? ((food.fat_per_100 / 100) * serving.amount * amount).toFixed(1)
    : ((food.fat_per_100 / 100) * amount).toFixed(1);

  const labelClassName = "text-sm font-medium";

  return (
    <form action={formAction} className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-lg font-semibold">{food.name_description}</h1>
        <span className="font-medium">{food.product_name}</span>
      </div>

      <div className="w-full grid grid-cols-[100px_minmax(0,1fr)] gap-2 items-center">
        <label htmlFor="serving" className={labelClassName}>
          Serving:
        </label>
        <Select name="serving" value={servingId} onValueChange={setServingId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a serving" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1"}>1{food.nutrition_measure}</SelectItem>
            {foodServing && (
              <SelectItem value={foodServing.id}>
                {foodServing.label}
              </SelectItem>
            )}

            {servings?.map(serving => (
              <SelectItem key={serving.id} value={serving.id}>
                {serving.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label htmlFor="amount" className={labelClassName}>
          Amount:
        </label>
        <Input
          name="amount"
          id="amount"
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <label htmlFor="mealType" className={labelClassName}>
          Meal:
        </label>
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

        <label htmlFor="date" className={labelClassName}>
          Date:
        </label>
        <Input name="date" id="date" type="date" defaultValue={date} />
      </div>

      <FoodMacros
        calories={calories as unknown as number}
        protein={protein as unknown as number}
        carbs={carbs as unknown as number}
        fat={fat as unknown as number}
      />

      {state?.error && (
        <div className="text-red-500 text-sm font-medium">{state.error}</div>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Adding food..." : "Add food"}
        </Button>
      </div>
    </form>
  );
}
