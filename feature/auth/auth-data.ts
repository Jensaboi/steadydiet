"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  const user = data?.claims;

  if (error || !user) return redirect("/login");

  return user;
}
