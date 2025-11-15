import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, folderId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ error: "Missing userId or prompt" });
    }

    const aiPrompt = `
You are generating a short, high-quality note for a personal sticky-notes board.
Task:
Create a concise, helpful, well-formatted note based on the user's request:

    "${prompt}"

Requirements:
- Use clear and compact writing (5–12 sentences or bullet points).
- Prefer Markdown formatting (headings, bullets, checklists, bold, italics, short sections).
- Focus on practical, actionable information.
- Avoid overly long explanations or filler.
- Do not add unrelated ideas.
- Output ONLY the note content, nothing else (no intros, no explanations).

Style Guide:
- If the topic is a task, use a checklist.
- If it is informational, use bulleted facts.
- If it is planning or brainstorming, use step-by-step structure.
- If it is abstract (motivation, ideas), use a short paragraph + 3–5 bullets.

Begin now.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You write concise Markdown notes. You output ONLY the note content — no explanations.",
        },
        {
          role: "user",
          content: aiPrompt,
        },
      ],
      max_tokens: 350,
      temperature: 0.7,
    });

    const aiContent =
      completion.choices[0]?.message?.content?.trim() ||
      "Generated note content unavailable.";

    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        folder_id: folderId,
        content: aiContent,
        pos_x: 100,
        pos_y: 100,
        width: 300,
        height: 300,
        color: ["yellow", "black"],
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      message: "AI note created successfully",
      note: data,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      error: err.message || "Failed to generate AI note",
    });
  }
}
