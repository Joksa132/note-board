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
    const { userId, folderId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          folder_id: folderId || null,
          color: ["yellow", "black"],
          width: 250,
          height: 250,
          pos_x: 0,
          pos_y: 0,
          content: null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ note: data });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
