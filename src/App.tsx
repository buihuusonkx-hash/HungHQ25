/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Send, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  Trash2, 
  Download, 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  Key,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { StoryboardScene, ImageSize, ChatMessage } from "./types";
import { parseScriptToScenes, generateSceneImage, getGeminiClient } from "./lib/gemini";

// Extend window for AI Studio platform functions
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function App() {
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState<StoryboardScene[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize>("1K");
  const [isParsing, setIsParsing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const checkApiKey = async () => {
    if (window.aistudio) {
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } catch (e) {
        console.error("Error checking API key:", e);
      }
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Assume success as per guidelines
    }
  };

  const handleGenerateStoryboard = async () => {
    if (!script.trim()) return;
    setIsParsing(true);
    try {
      const parsedScenes = await parseScriptToScenes(script);
      setScenes(parsedScenes);
      
      // Automatically start generating images for each scene
      for (const scene of parsedScenes) {
        generateImageForScene(scene.id, scene.visual_prompt);
      }
    } catch (error) {
      console.error("Error parsing script:", error);
    } finally {
      setIsParsing(false);
    }
  };

  const generateImageForScene = async (sceneId: string, visualPrompt: string) => {
    // Check if key is needed
    if (!hasApiKey) {
      await handleSelectKey();
    }

    setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: true } : s));
    
    try {
      const imageUrl = await generateSceneImage(visualPrompt, imageSize);
      setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, imageUrl, isGenerating: false } : s));
    } catch (error) {
      console.error("Error generating image:", error);
      setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, isGenerating: false } : s));
      
      // If it's a "Requested entity was not found" error, reset key state
      if (error instanceof Error && error.message.includes("not found")) {
        setHasApiKey(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatting) return;
    
    const userMessage: ChatMessage = { role: "user", text: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatting(true);

    try {
      const ai = await getGeminiClient();
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a professional storyboard artist and script consultant. 
          You are helping a user refine their script and storyboard. 
          Current Script: ${script}`,
        },
      });

      const response = await chat.sendMessage({ message: chatInput });
      const modelMessage: ChatMessage = { role: "model", text: response.text || "Sorry, I couldn't process that." };
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, { role: "model", text: "Error: Failed to connect to Gemini." }]);
    } finally {
      setIsChatting(false);
    }
  };

  const downloadStoryboard = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ script, scenes }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "storyboard.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">ScriptBoard AI</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {!hasApiKey && (
            <button 
              onClick={handleSelectKey}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-full transition-all text-sm font-medium"
            >
              <Key className="w-4 h-4" />
              Connect API Key
            </button>
          )}
          
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {(["1K", "2K", "4K"] as ImageSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setImageSize(size)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  imageSize === size ? "bg-white text-black" : "text-white/50 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button 
            onClick={downloadStoryboard}
            disabled={scenes.length === 0}
            className="p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-30"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Script Input */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase text-white/50 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Script Input
              </h2>
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste your script here... e.g., 'INT. COFFEE SHOP - DAY. A robot walks in and orders a red skateboard...'"
              className="w-full h-[400px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-none placeholder:text-white/20"
            />
            <button
              onClick={handleGenerateStoryboard}
              disabled={isParsing || !script.trim()}
              className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
            >
              {isParsing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Storyboard
                </>
              )}
            </button>
          </div>

          {/* Chat Preview / Toggle */}
          <button 
            onClick={() => setShowChat(!showChat)}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-600/20 transition-all">
                <MessageSquare className="w-6 h-6 text-white/50 group-hover:text-orange-500" />
              </div>
              <div className="text-left">
                <p className="font-bold">AI Assistant</p>
                <p className="text-xs text-white/40">Discuss script & scenes</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-white/20 transition-transform ${showChat ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Right Column: Storyboard Grid */}
        <div className="lg:col-span-8">
          {scenes.length === 0 ? (
            <div className="h-[600px] border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-white/20" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No Storyboard Generated</h3>
                <p className="text-white/40 max-w-sm mx-auto">Upload or paste a script to start generating cinematic storyboard frames.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {scenes.map((scene, index) => (
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden group hover:border-white/20 transition-all"
                  >
                    <div className="aspect-video bg-black relative overflow-hidden">
                      {scene.imageUrl ? (
                        <img 
                          src={scene.imageUrl} 
                          alt={scene.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                          {scene.isGenerating ? (
                            <>
                              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Generating Frame...</p>
                            </>
                          ) : (
                            <button 
                              onClick={() => generateImageForScene(scene.id, scene.visual_prompt)}
                              className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                            >
                              <RefreshCw className="w-6 h-6 text-white/50" />
                            </button>
                          )}
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                          Shot {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-2">
                      <h4 className="font-bold text-lg">{scene.title}</h4>
                      <p className="text-sm text-white/60 line-clamp-3">{scene.description}</p>
                      
                      <div className="pt-4 flex items-center justify-between">
                        <button 
                          onClick={() => generateImageForScene(scene.id, scene.visual_prompt)}
                          className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-orange-500 transition-all flex items-center gap-2"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Regenerate
                        </button>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setScenes(prev => prev.filter(s => s.id !== scene.id))}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-white/40 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold">AI Consultant</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Gemini 3.1 Pro</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <MessageSquare className="w-12 h-12" />
                  <p className="text-sm">Ask me about your script, character designs, or shot compositions.</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-orange-600 text-white rounded-tr-none" 
                      : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                  }`}>
                    <div className="prose prose-invert prose-sm">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50">
              <div className="relative">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm focus:ring-orange-500 focus:border-orange-500 resize-none h-20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isChatting}
                  className="absolute right-3 bottom-3 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  {isChatting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for chat */}
      {showChat && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowChat(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
        />
      )}
    </div>
  );
}
