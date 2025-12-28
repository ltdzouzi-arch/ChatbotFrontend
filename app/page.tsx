"use client";

import { useState, useRef, useEffect } from "react";
import ChatbotHeader from "@/components/ChatbotHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { Message, Theme } from "@/config/theme";

// Empty initial messages - chat starts fresh
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>("gradient");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      let response = "";
      if (currentTheme === "dark") {
        response = `🌙 **Dark Mode**: I received: "${input}"\n\nIn dark mode, the interface is sleek and easy on the eyes. How else can I assist you in this cool theme?`;
      } else {
        response = `🌈 **Gradient Mode**: I received: "${input}"\n\nThe vibrant gradient theme makes our conversation more colorful! What would you like to explore next?`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content: `Chat cleared! I'm ready to help you in ${currentTheme} mode.`,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "gradient" : "dark");
  };

  return (
    <div
      className={`flex flex-col h-screen transition-all duration-300 ${
        currentTheme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      }`}
    >
      <ChatbotHeader
        onClearChat={handleClearChat}
        messageCount={messages.length}
        isTyping={isLoading}
        currentTheme={currentTheme}
        onThemeToggle={toggleTheme}
      />

      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full p-4 md:p-6">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-6 p-2 md:p-4 custom-scrollbar">
          {messages.length === 1 && messages[0].id === "1" ? (
            // Welcome message
            <div className="text-center py-8">
              <div
                className={`inline-block p-6 rounded-2xl backdrop-blur-sm border mb-4 ${
                  currentTheme === "dark"
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-gradient-to-r from-white/80 to-indigo-50/50 border-indigo-100"
                }`}
              >
                <p
                  className={`${
                    currentTheme === "dark"
                      ? "text-gray-400"
                      : "text-indigo-600"
                  }`}
                >
                  Start a conversation with the AI assistant
                </p>
              </div>
            </div>
          ) : (
            // Show messages
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isCopied={copiedMessageId === message.id}
                onCopy={() => handleCopyMessage(message.content, message.id)}
                theme={currentTheme}
              />
            ))
          )}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentTheme === "dark"
                    ? "bg-gray-800"
                    : "bg-gradient-to-r from-indigo-100 to-purple-100"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full animate-spin border-3 ${
                    currentTheme === "dark"
                      ? "border-gray-700 border-t-indigo-400"
                      : "border-indigo-200 border-t-indigo-500"
                  }`}
                />
              </div>
              <span
                className={`text-sm ${
                  currentTheme === "dark" ? "text-gray-400" : "text-indigo-600"
                }`}
              >
                Thinking...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          theme={currentTheme}
        />
      </div>

      <footer className="text-center py-4">
        <div
          className={`text-sm ${
            currentTheme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p className="text-xs opacity-80">
            © {new Date().getFullYear()} Hiba chatbot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
