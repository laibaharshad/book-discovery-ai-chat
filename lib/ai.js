import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const openrouter = createOpenAICompatible({
  name: "opencode",
  baseURL: "https://opencode.ai/zen/v1",
  apiKey: process.env.OPENCODE_ZEN_API_KEY,
});

// AI behavior and model configuration
export const AI_MODEL = "deepseek-v4-flash-free";

export const SYSTEM_PROMPT =
  "You are a helpful book discovery assistant. Give clear, concise recommendations and explanations based on the user's questions.";
  