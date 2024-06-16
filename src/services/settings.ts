import { Tables } from "@/types/database";
import { supabase } from "./supabase";

export async function getSettings() {
  const { data } = await supabase
    .from("settings")
    .select("*")
    .maybeSingle()
    .throwOnError();

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: any) {
  const { data } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single()
    .throwOnError();

  return data;
}
