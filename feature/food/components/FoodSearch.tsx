"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanBarcode, SquarePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import FoodItem from "./FoodItem";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LogFoodEntryForm from "@/feature/diary/components/LogFoodEntryForm";
import { FoodAndEntryAndServing, MealType } from "@/feature/diary/diary-types";

export default function FoodSearch({
  recentFoodEntries,
  mealTypes,
}: {
  recentFoodEntries: FoodAndEntryAndServing[];
  mealTypes: MealType[];
}) {
  const [query, setQuery] = useState("");

  const [selectedFood, setSelectedFood] =
    useState<FoodAndEntryAndServing | null>(null);

  const foods = useQuery({
    queryKey: ["food"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .ilike("name_description", `%${query}%`)
        .limit(20);

      if (error)
        throw new Error(
          error.message ?? "An unexpected error occured searching foods.",
        );

      return data;
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Input value={query} onChange={e => setQuery(e.target.value)} />
        <div className="flex items-center justify-center w-full gap-2 py-4">
          <Button className="flex-1 flex flex-col">
            <ScanBarcode />
          </Button>
          <Button className="flex-1 flex flex-col">
            <SquarePlus />
          </Button>
        </div>
      </div>
      <ul className="flex flex-col gap-2 w-full ">
        {recentFoodEntries.filter(item =>
          item.food.name_description
            .toLowerCase()
            .startsWith(query.toLowerCase()),
        ).length > 0
          ? recentFoodEntries
              .filter(item =>
                item.food.name_description
                  .toLowerCase()
                  .startsWith(query.toLowerCase()),
              )
              .map(item => (
                <FoodItem
                  key={item.entry!.id}
                  onSelect={() => setSelectedFood(item)}
                  name={item.food.name_description}
                  productName={item.food.product_name}
                  calories={item.entry!.calories}
                  serving={
                    item.entry?.food_serving_id
                      ? `${item.entry.amount} ${item.foodServing!.label}`
                      : `${item.entry!.amount} ${item.food.nutrition_measure}`
                  }
                />
              ))
          : foods.data?.map(food => (
              <FoodItem
                key={food.id}
                onSelect={() =>
                  setSelectedFood({
                    food: food,
                    entry: null,
                    foodServing: null,
                  })
                }
                name={food.name_description}
                productName={food.product_name}
                calories={food.calories_per_100}
                serving={`100${food.nutrition_measure}`}
              />
            ))}
      </ul>

      <Dialog
        open={selectedFood ? true : false}
        onOpenChange={open => {
          if (!open) setSelectedFood(null);
        }}
      >
        <DialogContent>
          {selectedFood && (
            <LogFoodEntryForm mealTypes={mealTypes} foodData={selectedFood} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
