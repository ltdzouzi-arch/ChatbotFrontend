'use client';

import { MessageSquare, Bot, Trash2, Sparkles, Zap, Brain, Moon, Palette } from 'lucide-react';
import { useState } from 'react';

type Theme = 'dark' | 'gradient';

interface ChatbotHeaderProps {
  onClearChat: () => void;
  messageCount?: number;
  isTyping?: boolean;
  currentTheme?: Theme;
  onThemeToggle?: () => void;
}

export default function ChatbotHeader({ 
  onClearChat, 
  messageCount = 0,
  isTyping = false,
  currentTheme = 'gradient',
  onThemeToggle
}: ChatbotHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-100/60 backdrop-blur-xl bg-white/90 shadow-sm dark:bg-gray-900/90 dark:border-gray-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Logo with subtle animation */}
            <div className="relative">
              <div className={`absolute inset-0 blur-xl rounded-full transition-all duration-500 ${
                currentTheme === 'dark' 
                  ? 'bg-gradient-to-br from-gray-700/20 to-gray-800/20' 
                  : 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20'
              }`} />
              <div className="relative p-2.5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <Bot className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                  <Sparkles className={`absolute -top-1 -right-1 w-3 h-3 transition-all duration-300 ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-indigo-500'
                  }`} />
                </div>
              </div>
            </div>

            {/* Title and description */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                  Hiba Chat
                </h1>
                <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">AI</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  <span className="font-medium">{messageCount} messages</span>
                  {isTyping && (
                    <>
                      <span className="mx-1">•</span>
                      <span className={`flex items-center ${
                        currentTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'
                      }`}>
                        <span className="flex space-x-0.5">
                          <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
                          <span className="w-1 h-1 bg-current rounded-full animate-pulse delay-100" />
                          <span className="w-1 h-1 bg-current rounded-full animate-pulse delay-200" />
                        </span>
                        <span className="ml-1">Typing...</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Stats badge */}
            <div className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <Brain className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hiba v1.0</span>
            </div>

            {/* Theme Toggle - Minimal */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                aria-label={`Switch to ${currentTheme === 'dark' ? 'gradient' : 'dark'} theme`}
              >
                <div className="relative w-5 h-5">
                  {/* Moon icon for dark theme */}
                  <Moon className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                    currentTheme === 'dark' 
                      ? 'text-gray-700 dark:text-gray-300 opacity-100 scale-100 rotate-0' 
                      : 'text-gray-400 opacity-0 scale-50 rotate-90'
                  }`} />
                  
                  {/* Palette icon for gradient theme */}
                  <Palette className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                    currentTheme === 'gradient' 
                      ? 'text-indigo-600 opacity-100 scale-100 rotate-0' 
                      : 'text-indigo-400 opacity-0 scale-50 -rotate-90'
                  }`} />
                </div>
                
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Switch to {currentTheme === 'dark' ? 'Gradient' : 'Dark'}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
                </div>
              </button>
            )}

            {/* Clear chat button - Minimal and clean */}
            <button
              onClick={onClearChat}
              className="group relative px-3.5 py-2 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-sm transition-all duration-200 flex items-center space-x-2 text-sm font-medium border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              title="Clear conversation"
            >
              <div className="relative">
                <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 dark:group-hover:bg-red-500/20 rounded-full transition-colors duration-200" />
              </div>
              <span className="hidden sm:inline">Clear</span>
              
              {/* Subtle tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Clear conversation
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress bar for messages (optional) */}
        {messageCount > 0 && (
          <div className="mt-3 hidden sm:block">
            <div className="h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r rounded-full transition-all duration-500 ${
                  currentTheme === 'dark' 
                    ? 'from-gray-600 to-gray-500' 
                    : 'from-indigo-500 to-purple-600'
                }`}
                style={{ width: `${Math.min((messageCount / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}