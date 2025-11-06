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
    const { folderId, newName } = req.body;

    if (!folderId || !newName) {
      return res.status(400).json({ error: "Missing folderId or newName" });
    }

    const { data: existing, error: existingError } = await supabase
      .from("folders")
      .select("id")
      .eq("name", newName)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existing && existing.id !== folderId) {
      return res.status(400).json({ error: "Folder name already exists" });
    }

    const { error } = await supabase
      .from("folders")
      .update({ name: newName })
      .eq("id", folderId);

    if (error) throw error;

    return res.status(200).json({ message: "Folder renamed successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
