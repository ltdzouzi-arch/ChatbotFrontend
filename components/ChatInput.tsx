import { Send } from 'lucide-react';
import { Theme } from '@/config/theme';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  theme: Theme;
}

export default function ChatInput({ 
  input, 
  setInput, 
  isLoading, 
  onSend, 
  onKeyPress,
  theme 
}: ChatInputProps) {
  // Theme configurations
  const themeStyles = {
    dark: {
      container: 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 shadow-2xl',
      input: 'bg-transparent text-gray-100 placeholder-gray-400',
      send: 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg',
      hint: 'text-gray-400',
      border: 'border-gray-700',
    },
    gradient: {
      container: 'bg-gradient-to-r from-white to-indigo-50/80 border-indigo-200 shadow-xl',
      input: 'bg-transparent text-gray-900 placeholder-indigo-400',
      send: 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg',
      hint: 'text-indigo-600',
      border: 'border-indigo-200',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`rounded-2xl border p-4 ${currentTheme.container} ${currentTheme.border}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Type your message here..."
            className={`w-full p-4 pr-20 border-0 focus:ring-0 focus:outline-none resize-none max-h-40 min-h-[60px] rounded-xl text-lg ${currentTheme.input}`}
            rows={1}
            disabled={isLoading}
          />
        </div>
        
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className={`p-4 bg-gradient-to-r ${currentTheme.send} text-white rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 flex items-center justify-center`}
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
      
      <div className={`mt-3 text-xs px-3 ${currentTheme.hint}`}>
        <span className="inline-flex items-center space-x-2">
          <kbd className={`px-2 py-1 rounded text-xs ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/30'
          }`}>
            Enter
          </kbd>
          <span>to send •</span>
          <kbd className={`px-2 py-1 rounded text-xs ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-800/30'
          }`}>
            Shift + Enter
          </kbd>
          <span>for new line</span>
        </span>
      </div>
    </div>
  );
}