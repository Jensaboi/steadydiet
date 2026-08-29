import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seedFoodData() {
  // 1. Read Excel file
  const filePath = path.join(__dirname, "/LivsmedelsDB_202608292054.xlsx");

  const buffer = fs.readFileSync(filePath);

  // 2. Parse workbook
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  console.log(workbook.SheetNames);

  // 3. Get the sheet you want
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // 4. Convert rows to JavaScript objects
  const foods = XLSX.utils.sheet_to_json(sheet);
  foods.shift(); //remove the first row which contains the column names

  const keyNames = Object.values(foods.shift()); // Get the column names from the first row

  const result = [];

  for (const food of foods) {
    const values = Object.values(food);

    const foodObject: Record<string, any> = {};

    keyNames.forEach((key, index) => {
      foodObject[key] = values[index];
    });

    const parsedFoodObject = {
      created_by: null,
      barcode: null,
      status: "verified",
      product_name: foodObject["Gruppering"],
      name_description: foodObject["Livsmedelsnamn"],
      nutrition_measure: "g",
      calories_per_100: foodObject["Energi (kcal)"],
      protein_per_100: foodObject["Protein (g)"],
      fat_per_100: foodObject["Fett, totalt (g)"],
      carbs_per_100: foodObject["Kolhydrater, tillgängliga (g)"],
    };

    result.push(parsedFoodObject);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  );

  const { data, error } = await supabase.from("foods").insert(result);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
  }
}

seedFoodData();
