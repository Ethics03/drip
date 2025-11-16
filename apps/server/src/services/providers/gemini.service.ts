import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private client: GoogleGenAI;
  private defaultModel = "gemini-1.5-flash";

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("api key needed");

    this.client = new GoogleGenAI({ apiKey: apiKey });
  }
}
