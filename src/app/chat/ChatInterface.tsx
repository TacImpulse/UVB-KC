"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, type ChatMessage } from "@/stores/appStore";
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon,
  PlusIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  BookmarkIcon,
  ChevronDownIcon,
  PhotoIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
import { Bot, User, Sparkles } from "lucide-react";
import VoiceVisualizer from "@/components/animated/VoiceVisualizer";

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

const SAMPLE_RESPONSES = [
  "I've analyzed the codebase and identified several optimization opportunities. The main bottleneck appears to be in the state management layer. I recommend refactoring the Zustand stores to use selectors for derived state.",
  "Based on my analysis of the uploaded image, I can see a complex UI layout with multiple nested components. The color scheme follows a dark mode pattern with neon green accents. I suggest the following improvements for accessibility...",
  "I've completed the voice analysis. The audio exhibits a fundamental frequency of approximately 185 Hz with harmonics extending to 8 kHz. The spectral centroid suggests a clear, bright tonal quality. Here are the detailed metrics...",
  "Looking at the system logs, I found 3 potential issues: 1) Memory allocation spike in the render cycle, 2) Unoptimized image loading on the media page, 3) WebSocket connection timeout. I've prepared fixes for all three.",
];

export default function ChatInterface() {
  const { threads, activeThreadId, addThread, addMessage, setActiveThread, isRecording, setIsRecording } =
    useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  const createNewThread = () => {
    const thread = {
      id: generateId(),
      title: "New Conversation",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      context: "",
    };
    addThread(thread);
    setActiveThread(thread.id);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    let threadId = activeThreadId;
    if (!threadId) {
      const thread = {
        id: generateId(),
        title: input.slice(0, 40) + (input.length > 40 ? "..." : ""),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        context: "",
      };
      addThread(thread);
      setActiveThread(thread.id);
      threadId = thread.id;
    }

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: Date.now(),
      type: "text",
    };
    addMessage(threadId!, userMsg);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response =
        SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      const aiMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: Date.now(),
        type: "text",
      };
      addMessage(threadId!, aiMsg);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Thread sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thread list */}
        <div className="w-64 border-r border-uvb-border/40 flex flex-col flex-shrink-0">
          <div className="p-3">
            <button
              onClick={createNewThread}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg btn-primary text-sm"
            >
              <PlusIcon className="w-4 h-4" />
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {threads.map((thread) => (
              <motion.button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                  activeThreadId === thread.id
                    ? "bg-uvb-deep-teal/30 text-uvb-text-primary border border-uvb-neon-green/10"
                    : "text-uvb-text-secondary hover:bg-uvb-light-gray/30 hover:text-uvb-text-primary"
                }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 flex-shrink-0 text-uvb-text-muted" />
                  <span className="truncate">{thread.title}</span>
                </div>
                <span className="text-[10px] text-uvb-text-muted block mt-0.5">
                  {new Date(thread.updatedAt).toLocaleDateString()}
                </span>
              </motion.button>
            ))}
            {threads.length === 0 && (
              <div className="px-3 py-8 text-center">
                <Bot className="w-8 h-8 mx-auto mb-2 text-uvb-text-muted" />
                <p className="text-xs text-uvb-text-muted">
                  Start a conversation with KnightBot
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!activeThread || activeThread.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-uvb-deep-teal to-uvb-steel-blue flex items-center justify-center mb-6"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(57,255,20,0.1)",
                      "0 0 40px rgba(57,255,20,0.2)",
                      "0 0 20px rgba(57,255,20,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bot className="w-10 h-10 text-uvb-neon-green" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-display)] text-uvb-text-primary">
                  KnightBot AI Assistant
                </h3>
                <p className="text-sm text-uvb-text-secondary max-w-md mb-8">
                  Your multi-modal AI companion. Ask questions, analyze media,
                  process voice, and more.
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-lg">
                  {[
                    { icon: "🧠", label: "Long-form reasoning", desc: "Deep analysis" },
                    { icon: "🎤", label: "Voice analysis", desc: "Audio processing" },
                    { icon: "👁️", label: "Vision analytics", desc: "Image understanding" },
                    { icon: "🌐", label: "Browser use", desc: "Web interaction" },
                  ].map((feat) => (
                    <button
                      key={feat.label}
                      className="text-left p-3 rounded-lg bg-uvb-dark-gray/50 border border-uvb-border/30 hover:border-uvb-neon-green/20 transition-all"
                      onClick={() => setInput(`Tell me about ${feat.label.toLowerCase()}`)}
                    >
                      <span className="text-lg">{feat.icon}</span>
                      <p className="text-sm font-medium text-uvb-text-primary mt-1">
                        {feat.label}
                      </p>
                      <p className="text-xs text-uvb-text-muted">{feat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {activeThread.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-4 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-uvb-deep-teal to-uvb-steel-blue flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-uvb-neon-green" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-uvb-deep-teal/40 border border-uvb-deep-teal/40 text-uvb-text-primary"
                          : "bg-uvb-dark-gray/60 border border-uvb-border/30 text-uvb-text-primary"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-uvb-text-muted">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                        {msg.role === "assistant" && (
                          <div className="flex gap-1">
                            <button className="p-0.5 rounded hover:bg-uvb-light-gray/40 text-uvb-text-muted hover:text-uvb-text-secondary transition-colors">
                              <DocumentDuplicateIcon className="w-3 h-3" />
                            </button>
                            <button className="p-0.5 rounded hover:bg-uvb-light-gray/40 text-uvb-text-muted hover:text-uvb-text-secondary transition-colors">
                              <ArrowPathIcon className="w-3 h-3" />
                            </button>
                            <button className="p-0.5 rounded hover:bg-uvb-light-gray/40 text-uvb-text-muted hover:text-uvb-text-secondary transition-colors">
                              <BookmarkIcon className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-9 h-9 rounded-lg bg-uvb-royal-purple/40 border border-uvb-royal-purple/30 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-uvb-brushed-silver" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-uvb-deep-teal to-uvb-steel-blue flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-uvb-neon-green" />
                </div>
                <div className="bg-uvb-dark-gray/60 border border-uvb-border/30 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-uvb-neon-green/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          delay: i * 0.15,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-uvb-border/40">
            {isRecording && (
              <div className="mb-3 flex items-center gap-3 p-3 rounded-lg bg-uvb-deep-teal/20 border border-uvb-neon-green/20">
                <div className="w-3 h-3 rounded-full bg-red-500 status-pulse" />
                <span className="text-sm text-uvb-text-secondary">
                  Recording...
                </span>
                <VoiceVisualizer isActive={true} />
                <button
                  onClick={() => setIsRecording(false)}
                  className="ml-auto p-1.5 rounded-lg hover:bg-uvb-light-gray/40 text-uvb-text-secondary"
                >
                  <StopIcon className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-end gap-3">
              <div className="flex gap-1">
                <button
                  onClick={() => setInputMode("text")}
                  className={`p-2 rounded-lg transition-colors ${
                    inputMode === "text"
                      ? "bg-uvb-deep-teal/30 text-uvb-neon-green"
                      : "text-uvb-text-muted hover:text-uvb-text-secondary"
                  }`}
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setInputMode("voice");
                    setIsRecording(!isRecording);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    inputMode === "voice"
                      ? "bg-uvb-deep-teal/30 text-uvb-neon-green"
                      : "text-uvb-text-muted hover:text-uvb-text-secondary"
                  }`}
                >
                  <MicrophoneIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message KnightBot..."
                  className="input-field resize-none min-h-[44px] max-h-32 pr-12"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <button className="p-1 rounded text-uvb-text-muted hover:text-uvb-text-secondary transition-colors">
                    <PhotoIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded text-uvb-text-muted hover:text-uvb-text-secondary transition-colors">
                    <FilmIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() && !isRecording}
                className="p-3 rounded-lg btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
