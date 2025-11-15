import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { noteId, userId, action } = req.body;
    if (!noteId || !userId || !action) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const { data: noteData, error: fetchError } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .single();
    if (fetchError || !noteData)
      throw fetchError || new Error("Note not found");

    let aiPrompt = "";
    if (action === "expand") {
      aiPrompt = `
      You are an AI assistant that expands notes for a personal sticky-notes board.
      Your task is to take the original note and make it more detailed, while keeping it concise, practical, and focused.

      Input:
      - Original Note: "${noteData.content}"

      Instructions:
      - Expand on the ideas in the note.
      - Provide additional examples, actionable steps, or clarifications.
      - Keep the content relevant and practical; do not add unrelated information.
      - Use Markdown formatting:
        - Headings for sections if appropriate.
        - Bullet points or checklists for tasks or lists.
        - Bold or italics to emphasize key points.
      - Limit output to around 5–12 sentences per section.
      - Output ONLY the expanded note content; do NOT include explanations or metadata.
      `;
    } else if (action === "restyle") {
      aiPrompt = `
      You are an AI assistant that restyles notes for a personal sticky-notes board.
      Your task is to improve the formatting and readability of the note without changing its content or meaning.

      Input:
      - Original Note: "${noteData.content}"
      
      Instructions:
      - Keep the original content exactly the same; do not add new ideas.
      - Use Markdown formatting:
        - Headings for distinct sections.
        - Bullet points or checklists for lists and tasks.
        - Bold or italics to emphasize key points.
        - Break long paragraphs into shorter, digestible blocks.
        - Keep it clear, readable, and visually structured.
        - Output ONLY the restyled note content; do NOT add explanations or extra text.
      `;
    } else {
      return res.status(400).json({ error: "Unknown action" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            action === "expand"
              ? "Expand notes with actionable content. Markdown only."
              : "Restyle notes for readability and formatting. Markdown only.",
        },
        { role: "user", content: aiPrompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const aiContent =
      completion.choices[0]?.message?.content?.trim() || noteData.content;

    const { data, error } = await supabase
      .from("notes")
      .update({ content: aiContent })
      .eq("id", noteId)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ message: "Note updated", note: data });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
