import { Button } from "@/components/ui/button";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import { PlusIcon } from "lucide-react";

export default function FoodItem({
  name,
  calories,
  serving,
  productName,
  onSelect,
}: {
  name: string;
  productName: string;
  calories: number;
  serving: string;
  onSelect: () => void;
}) {
  return (
    <Item
      asChild
      variant="outline"
      className="flex justify-between items-center"
    >
      <li>
        <div>
          <ItemTitle>{name}</ItemTitle>

          <ItemDescription>
            {calories} kcal, {serving}, {productName}
          </ItemDescription>
        </div>
        <Button onClick={onSelect} title="Add item" variant="outline">
          <PlusIcon />
        </Button>
      </li>
    </Item>
  );
}
