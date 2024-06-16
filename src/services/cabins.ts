import { Regex } from "lucide-react";
import { supabase, supabaseUrl } from "./supabase";
import { Database, Tables, Enums } from "@/types/database";
import { PAGE_SIZE } from "@/utils/constants";

export async function getCabins({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string };
  sortBy?: { field: string; direction: string };
  page: number;
}) {
  let query = supabase
    .from("cabins")
    .select("*", { count: "exact" })
    .throwOnError();

  if (sortBy) {
    console.log("Field to sort the cabins by ", sortBy.field);
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // pagination
  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + PAGE_SIZE + 1;
    query = query.range(from, to);
  }

  const { data: cabins, count } = await query;

  return { cabins, count };
}

export async function createCabin(newCabin: Tables<"cabins">) {
  console.log("New cabin is ", newCabin.image);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // check for duplication
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  const { data, error } = await supabase.from("cabins").insert({
    ...newCabin,
    image: imagePath,
  });

  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image!);

  // prevent new cabin from being created if error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image was not uploaded to the bucket.");
  }

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin: any, id: number) {
  console.log("Cabin for editing is ", newCabin);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) {
    query = query
      .update({ ...newCabin, image: hasImagePath && imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single().throwOnError();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image!);

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
  const { data } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .throwOnError();

  return data;
}
