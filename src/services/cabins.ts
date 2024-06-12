import { Regex } from "lucide-react";
import { supabase, supabaseUrl } from "./supabase";
import { Database, Tables, Enums } from "@/types/database";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createCabin(newCabin: Tables<"cabins">) {
  const imageName = `${Math.random()}-${newCabin.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  const { data, error } = await supabase.from("cabins").insert({
    ...newCabin,
    image: imagePath,
  });

  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image!);

  // prevent new cabin from being created if error
  if (storageError && data) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image was not uploaded to the bucket.");
  }

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin: Tables<"cabins">, id: number) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  console.log(data);
  return data;
}
