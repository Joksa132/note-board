import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { folderId } = req.body;

    if (!folderId) {
      return res.status(400).json({ error: "Missing folderId" });
    }

    const { error: notesError } = await supabase
      .from("notes")
      .update({ folder_id: null })
      .eq("folder_id", folderId);

    if (notesError) throw notesError;

    const { error: folderError } = await supabase
      .from("folders")
      .delete()
      .eq("id", folderId);

    if (folderError) throw folderError;

    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
