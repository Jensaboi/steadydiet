export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      food_entries: {
        Row: {
          amount: number;
          calories: number;
          carbs: number;
          consumed_at: string;
          created_at: string | null;
          fats: number;
          food_id: string;
          food_serving_id: string | null;
          id: string;
          meal_type_id: string;
          protein: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount?: number;
          calories: number;
          carbs: number;
          consumed_at?: string;
          created_at?: string | null;
          fats: number;
          food_id: string;
          food_serving_id?: string | null;
          id?: string;
          meal_type_id: string;
          protein: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          calories?: number;
          carbs?: number;
          consumed_at?: string;
          created_at?: string | null;
          fats?: number;
          food_id?: string;
          food_serving_id?: string | null;
          id?: string;
          meal_type_id?: string;
          protein?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "food_entries_food_id_fkey";
            columns: ["food_id"];
            isOneToOne: false;
            referencedRelation: "foods";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "food_entries_food_serving_id_fkey";
            columns: ["food_serving_id"];
            isOneToOne: false;
            referencedRelation: "food_servings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "food_entries_meal_type_id_fkey";
            columns: ["meal_type_id"];
            isOneToOne: false;
            referencedRelation: "meal_types";
            referencedColumns: ["id"];
          },
        ];
      };
      food_servings: {
        Row: {
          amount: number;
          created_at: string | null;
          created_by: string;
          food_id: string;
          id: string;
          label: string;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          created_by: string;
          food_id: string;
          id?: string;
          label: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          created_by?: string;
          food_id?: string;
          id?: string;
          label?: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "food_servings_food_id_fkey";
            columns: ["food_id"];
            isOneToOne: false;
            referencedRelation: "foods";
            referencedColumns: ["id"];
          },
        ];
      };
      foods: {
        Row: {
          barcode: string | null;
          calories_per_100: number;
          carbs_per_100: number;
          created_at: string | null;
          created_by: string | null;
          fat_per_100: number;
          id: string;
          name_description: string;
          nutrition_measure: Database["public"]["Enums"]["nutrition_measure"];
          product_name: string;
          protein_per_100: number;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
        };
        Insert: {
          barcode?: string | null;
          calories_per_100: number;
          carbs_per_100: number;
          created_at?: string | null;
          created_by?: string | null;
          fat_per_100: number;
          id?: string;
          name_description: string;
          nutrition_measure?: Database["public"]["Enums"]["nutrition_measure"];
          product_name: string;
          protein_per_100: number;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Update: {
          barcode?: string | null;
          calories_per_100?: number;
          carbs_per_100?: number;
          created_at?: string | null;
          created_by?: string | null;
          fat_per_100?: number;
          id?: string;
          name_description?: string;
          nutrition_measure?: Database["public"]["Enums"]["nutrition_measure"];
          product_name?: string;
          protein_per_100?: number;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      meal_types: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      recipe_ingredients: {
        Row: {
          created_at: string | null;
          food_serving_amount: number;
          food_serving_id: string;
          id: string;
          recipe_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          food_serving_amount: number;
          food_serving_id: string;
          id?: string;
          recipe_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          food_serving_amount?: number;
          food_serving_id?: string;
          id?: string;
          recipe_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_food_serving_id_fkey";
            columns: ["food_serving_id"];
            isOneToOne: false;
            referencedRelation: "food_servings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipes: {
        Row: {
          calories: number;
          carbs: number;
          created_at: string | null;
          created_by: string;
          description: string | null;
          fats: number;
          id: string;
          name: string;
          protein: number;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          calories: number;
          carbs: number;
          created_at?: string | null;
          created_by: string;
          description?: string | null;
          fats: number;
          id?: string;
          name: string;
          protein: number;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          calories?: number;
          carbs?: number;
          created_at?: string | null;
          created_by?: string;
          description?: string | null;
          fats?: number;
          id?: string;
          name?: string;
          protein?: number;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_goals: {
        Row: {
          calories: number;
          carbs_percentage: number;
          created_at: string | null;
          fats_percentage: number;
          id: string;
          protein_percentage: number;
          starting_weight: number;
          target_weight: number;
          updated_at: string | null;
          user_id: string;
          weight_goal: Database["public"]["Enums"]["weight_goal"];
        };
        Insert: {
          calories: number;
          carbs_percentage: number;
          created_at?: string | null;
          fats_percentage: number;
          id?: string;
          protein_percentage: number;
          starting_weight: number;
          target_weight: number;
          updated_at?: string | null;
          user_id: string;
          weight_goal?: Database["public"]["Enums"]["weight_goal"];
        };
        Update: {
          calories?: number;
          carbs_percentage?: number;
          created_at?: string | null;
          fats_percentage?: number;
          id?: string;
          protein_percentage?: number;
          starting_weight?: number;
          target_weight?: number;
          updated_at?: string | null;
          user_id?: string;
          weight_goal?: Database["public"]["Enums"]["weight_goal"];
        };
        Relationships: [];
      };
      weight_entries: {
        Row: {
          created_at: string | null;
          id: string;
          recorded_at: string;
          updated_at: string | null;
          user_id: string;
          weight_in_kg: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          recorded_at?: string;
          updated_at?: string | null;
          user_id: string;
          weight_in_kg: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          recorded_at?: string;
          updated_at?: string | null;
          user_id?: string;
          weight_in_kg?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      nutrition_measure: "g" | "ml";
      status: "verified" | "unverified" | "rejected";
      user_role: "admin" | "user" | "guest";
      weight_goal: "lose" | "maintain" | "gain";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      nutrition_measure: ["g", "ml"],
      status: ["verified", "unverified", "rejected"],
      user_role: ["admin", "user", "guest"],
      weight_goal: ["lose", "maintain", "gain"],
    },
  },
} as const;
