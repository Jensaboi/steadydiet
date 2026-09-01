import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoodAndEntryAndServing, MealType } from "../diary-types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export type LogFoodEntryFormProps = {
  foodData: FoodAndEntryAndServing;
  mealTypes: MealType[];
};

export default function LogFoodEntryForm({
  foodData,
  mealTypes,
}: LogFoodEntryFormProps) {
  const { data, error } = useQuery({
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

  return (
    <form className="">
      <div>
        <h1 className="text-lg font-semibold">{food.name_description}</h1>
        <span className="font-medium">{food.product_name}</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        <label className="flex items-center gap-2">
          <span>Serving: </span>
          <Select name="serving" defaultValue="1">
            <SelectTrigger>
              <SelectValue placeholder="Select a serving" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1{food.nutrition_measure}</SelectItem>
              <SelectItem value="100">100{food.nutrition_measure}</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex items-center gap-2" htmlFor="amount">
          <span>Amount: </span>
          <Input name="amount" id="amount" type="number" />
        </label>

        <label className="flex items-center gap-2">
          <span>Meal:</span>
          <Select>
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
    </form>
  );
}
