import RecentFoodSearch from "@/feature/diary/components/RecentFoodSearch";
import { Suspense } from "react";

export default async function FoodPage() {
  return (
    <section className="p-4">
      <Suspense>
        <RecentFoodSearch />
      </Suspense>
    </section>
  );
}
