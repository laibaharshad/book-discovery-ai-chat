import { streamText, convertToModelMessages } from "ai";
import { openrouter, AI_MODEL, SYSTEM_PROMPT } from "../../../lib/ai";

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter(AI_MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    onError({ error }) {
      console.error("AI STREAM ERROR:", error);
    },
  });

  return result.toUIMessageStreamResponse();
}