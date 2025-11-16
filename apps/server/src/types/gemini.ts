export type GeminiModel =
  | "gemini-1.5-flash"
  | "gemini-1.5-pro"
  | "gemini-2.0-flash"
  | "gemini-2.0-pro";

export interface GenerateOptions {
  model?: GeminiModel;
  prompt: string;
}

export interface GenerateResponse {
  text: string;
}

export interface EmbedResponse {
  embedding: number[];
}
