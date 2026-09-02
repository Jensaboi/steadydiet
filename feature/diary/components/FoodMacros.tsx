export default function FoodMacros({
  calories,
  protein,
  carbs,
  fat,
}: {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex flex-col items-center justify-center w-full gap-1">
          <span className="text-sm font-medium">Calories</span>
          <span className="text-lg font-semibold">{calories}</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-1">
          <span className="text-sm font-medium">Protein</span>
          <span className="text-lg font-semibold">{protein}g</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-1">
          <span className="text-sm font-medium">Carbs</span>
          <span className="text-lg font-semibold">{carbs}g</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-1">
          <span className="text-sm font-medium">Fat</span>
          <span className="text-lg font-semibold">{fat}g</span>
        </div>
      </div>
    </div>
  );
}

export function FoodMacrosError() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="text-sm font-medium text-red-500">
        Failed to load food macros
      </span>
    </div>
  );
}

export function FoodMacrosEmpty() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <span className="text-sm font-medium text-gray-500">
        No food macros available
      </span>
    </div>
  );
}
