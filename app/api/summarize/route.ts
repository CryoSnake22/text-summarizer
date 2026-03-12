import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { text, action } = body ?? {};

  if (!text?.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }
  if (action !== "summarize" && action !== "bullets") {
    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  }

  const systemPrompt =
    action === "summarize"
      ? "You are a summarization assistant. Given the user's text, return a concise paragraph summary. Return only the summary, no extra commentary."
      : "You are a summarization assistant. Given the user's text, extract the key points as a bullet list. Each bullet must be on its own line starting with •. Return only the bullet list, no extra commentary.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    const result = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
