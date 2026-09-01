"use server";
import { getMealTypes, getRecentFoodEntries } from "../diary-data";
import FoodSearch from "@/feature/food/components/FoodSearch";

export default async function RecentFoodSearch() {
  const recentEntries = await getRecentFoodEntries();

  const mealTypes = await getMealTypes();

  return <FoodSearch mealTypes={mealTypes} recentFoodEntries={recentEntries} />;
}
