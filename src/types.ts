export type ImageSize = "1K" | "2K" | "4K";

export interface StoryboardScene {
  id: string;
  title: string;
  description: string;
  visual_prompt: string;
  imageUrl?: string;
  isGenerating?: boolean;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}
