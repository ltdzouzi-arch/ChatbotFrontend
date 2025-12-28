// Define types
export type Theme = 'dark' | 'gradient';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Theme configurations
export const themeStyles = {
  chatInput: {
    dark: {
      container: 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 shadow-2xl',
      input: 'bg-transparent text-gray-100 placeholder-gray-400',
      button: 'text-gray-400 hover:text-gray-200 hover:bg-gray-700',
      send: 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg',
      hint: 'text-gray-400',
      border: 'border-gray-700',
    },
    gradient: {
      container: 'bg-gradient-to-r from-white to-indigo-50/80 border-indigo-200 shadow-xl',
      input: 'bg-transparent text-gray-900 placeholder-indigo-400',
      button: 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100',
      send: 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg',
      hint: 'text-indigo-600',
      border: 'border-indigo-200',
    },
  },
  
  chatMessage: {
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
  },
  
  background: {
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    gradient: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
  },
  
  text: {
    dark: {
      primary: 'text-gray-100',
      secondary: 'text-gray-400',
      accent: 'text-indigo-400',
    },
    gradient: {
      primary: 'text-gray-900',
      secondary: 'text-indigo-600',
      accent: 'text-purple-600',
    },
  },
};

// Type for theme styles
export type ThemeStyles = typeof themeStyles;