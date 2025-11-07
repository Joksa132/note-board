import { supabase } from "./supabase";
import type { User } from "./types";

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

export async function registerUser(user: User) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!data) {
    await fetch("/api/auth/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
  }
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
