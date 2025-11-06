import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = req.body.user;
    if (!user) return res.status(400).json({ message: "No user provided" });

    const { error: userError } = await supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email,
        name: user.name || "",
        created_at: user.created_at,
      },
      { onConflict: "id" }
    );

    if (userError) throw userError;

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
