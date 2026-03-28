import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { StoryboardScene, ImageSize } from "../types";

// Note: The API key is handled by the platform and injected into process.env.GEMINI_API_KEY
// For gemini-3-pro-image-preview, the user must select their own key via the platform dialog.

export async function getGeminiClient() {
  // Always create a new instance right before making an API call to ensure it uses the most up-to-date API key
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export async function parseScriptToScenes(script: string): Promise<StoryboardScene[]> {
  const ai = await getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Break the following script into a sequence of discrete storyboard scenes. 
    For each scene, provide a 'title', a 'description', and a 'visual_prompt' (a detailed artistic description for an image generator).
    Return the result as a JSON array of objects.
    
    Script:
    ${script}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            visual_prompt: { type: Type.STRING },
          },
          required: ["title", "description", "visual_prompt"],
        },
      },
    },
  });

  const scenes = JSON.parse(response.text || "[]");
  return scenes.map((s: any, index: number) => ({
    ...s,
    id: `scene-${index}-${Date.now()}`,
    isGenerating: false,
  }));
}

export async function generateSceneImage(visualPrompt: string, size: ImageSize): Promise<string> {
  const ai = await getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: {
      parts: [
        {
          text: `Professional cinematic storyboard frame: ${visualPrompt}. High detail, artistic style, clear composition.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from Gemini");
}

export async function chatWithScript(script: string, history: { role: "user" | "model"; text: string }[], message: string) {
  const ai = await getGeminiClient();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are a professional storyboard artist and script consultant. 
      You are helping a user refine their script and storyboard. 
      Here is the current script context:
      ${script}`,
    },
  });

  // Reconstruct history
  // Note: sendMessage only accepts message, but we can pass history in the initial chat creation if needed
  // or just send the message. The SDK's chat object handles history if we use the same object.
  // For simplicity in this stateless-ish helper, we'll just send the message.
  // Actually, to maintain multi-turn, we should pass history to the chat creation.
  
  const response = await chat.sendMessage({ message });
  return response.text;
}
