import toast from "react-hot-toast";
import { supabase, supabaseUrl } from "./supabase";

export async function signUp({
  full_name,
  email,
  password,
}: {
  full_name: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  full_name,
  avatar,
}: {
  password?: string;
  full_name?: string;
  avatar?: string;
}) {
  // update the username OR password
  let updatedData = {} as {
    password?: string;
    data?: { full_name?: string };
  };

  if (password) {
    updatedData.password = password;
  }
  if (full_name) {
    if (!updatedData.data) {
      updatedData.data = {};
    }
    // updatedData = { data: { full_name } };
    updatedData.data.full_name = full_name;
  }

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) {
    return data;
  }

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}
