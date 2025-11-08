import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { noteId, content, color, width, height, pos_x, pos_y } = req.body;

    if (!noteId) return res.status(400).json({ error: "Missing noteId" });

    const { error } = await supabase
      .from("notes")
      .update({
        content,
        color,
        width: Math.round(width),
        height: Math.round(height),
        pos_x,
        pos_y,
      })
      .eq("id", noteId);

    if (error) throw error;

    return res.status(200).json({ message: "Note updated successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
