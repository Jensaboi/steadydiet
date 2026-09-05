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
      className="flex w-full min-w-0 items-center flex-nowrap truncate"
    >
      <li>
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <ItemTitle className="truncate text-ellipsis">{name}</ItemTitle>

          <ItemDescription className="truncate text-muted-foreground text-xs">
            {calories} kcal, {serving}, {productName}
          </ItemDescription>
        </div>

        <Button
          onClick={onSelect}
          title="Add entry"
          variant="outline"
          className="ml-2 shrink-0"
        >
          <PlusIcon />
        </Button>
      </li>
    </Item>
  );
}
