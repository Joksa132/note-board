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
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const { data: folders, error: fetchError } = await supabase
      .from("folders")
      .select("name")
      .eq("user_id", userId);

    if (fetchError) throw fetchError;

    const existingNames = folders?.map((f) => f.name) || [];
    let newName = "New Folder";
    let counter = 2;

    while (existingNames.includes(newName)) {
      newName = `New Folder ${counter}`;
      counter++;
    }

    const { data, error: insertError } = await supabase
      .from("folders")
      .insert([{ name: newName, user_id: userId }])
      .select()
      .single();

    if (insertError) throw insertError;

    return res.status(200).json({ folder: data });
  } catch (err: any) {
    console.error("Error adding folder:", err);
    return res.status(500).json({ error: err.message });
  }
}
