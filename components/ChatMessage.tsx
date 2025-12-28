import { Bot, User, Copy, Check } from 'lucide-react';
import { Theme } from '@/config/theme';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  };
  isCopied: boolean;
  onCopy: () => void;
  theme: Theme;
}

export default function ChatMessage({ message, isCopied, onCopy, theme }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Theme configurations
  const themeStyles = {
    dark: {
      user: {
        bg: 'bg-gradient-to-r from-blue-600 to-indigo-700',
        text: 'text-gray-100',
        time: 'text-blue-300',
        bubble: 'from-blue-600 to-indigo-700 text-gray-100 shadow-lg',
        copy: 'bg-blue-500 hover:bg-blue-400',
        iconBg: 'from-blue-700 to-indigo-800',
      },
      assistant: {
        bg: 'bg-gradient-to-r from-gray-800 to-gray-900',
        text: 'text-gray-100',
        time: 'text-gray-400',
        bubble: 'from-gray-800 to-gray-900 text-gray-100 shadow-xl border border-gray-700',
        copy: 'bg-gray-700 hover:bg-gray-600',
        iconBg: 'from-gray-700 to-gray-800',
      },
    },
    gradient: {
      user: {
        bg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
        text: 'text-white',
        time: 'text-indigo-200',
        bubble: 'from-indigo-500 to-purple-600 text-white shadow-lg',
        copy: 'bg-indigo-400 hover:bg-indigo-300',
        iconBg: 'from-indigo-600 to-purple-700',
      },
      assistant: {
        bg: 'bg-gradient-to-r from-white to-indigo-50',
        text: 'text-gray-900',
        time: 'text-indigo-600',
        bubble: 'from-white to-indigo-50 text-gray-900 shadow-md border border-indigo-100',
        copy: 'bg-indigo-100 hover:bg-indigo-200',
        iconBg: 'from-indigo-100 to-purple-100',
      },
    },
  };

  const currentTheme = themeStyles[theme];
  const roleTheme = isUser ? currentTheme.user : currentTheme.assistant;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
      <div className={`flex max-w-[85%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${
          isUser ? 'ml-4' : 'mr-4'
        } ${roleTheme.iconBg}`}>
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Message bubble */}
        <div className={`relative rounded-2xl px-5 py-4 shadow-lg bg-gradient-to-r ${roleTheme.bubble}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${roleTheme.time}`}>
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className={`text-xs ml-3 ${roleTheme.time}`}>
              {formattedTime}
            </span>
          </div>
          
          <p className={`whitespace-pre-wrap break-words ${roleTheme.text}`}>
            {message.content}
          </p>
          
          {/* Copy button */}
          <button
            onClick={onCopy}
            className={`absolute -bottom-2 ${
              isUser ? 'left-4' : 'right-4'
            } p-2 rounded-full transition-all duration-200 ${roleTheme.copy} shadow-md hover:scale-105`}
            title="Copy message"
            aria-label="Copy message to clipboard"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}