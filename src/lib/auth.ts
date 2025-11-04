import { supabase } from "./supabase";

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email || "",
    name:
      data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
    created_at: data.user.created_at,
  };
}

export async function handleLogin(provider: "google" | "github") {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/board` },
  });
  if (error) console.log(error.message);
}

export async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
