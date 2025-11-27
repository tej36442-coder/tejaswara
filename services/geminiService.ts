import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants";
import { Message, Role } from "../types";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const initializeChat = (): void => {
  const ai = getGenAI();
  chatSession = ai.chats.create({
    model: GEMINI_MODEL,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize J.A.R.V.I.S. protocols.");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });

    for await (const chunk of resultStream) {
      const responseChunk = chunk as GenerateContentResponse;
      if (responseChunk.text) {
        onChunk(responseChunk.text);
      }
    }
  } catch (error) {
    console.error("Error communicating with J.A.R.V.I.S.:", error);
    throw error;
  }
};
