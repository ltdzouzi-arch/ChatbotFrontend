import { Moon, Palette } from 'lucide-react';
import { Theme } from '@/config/theme';

interface ThemeToggleProps {
  currentTheme: Theme;
  onToggle: () => void;
}

export default function ThemeToggleCircular({ currentTheme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group relative p-4 rounded-full transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {/* Background circle */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        currentTheme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800/20 to-gray-900/20' 
          : 'bg-gradient-to-br from-indigo-500/20 to-purple-600/20'
      }`} />
      
      {/* Rotating icon */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:rotate-180">
          {currentTheme === 'dark' ? (
            <Moon className="w-full h-full text-gray-600 dark:text-gray-400" />
          ) : (
            <Palette className="w-full h-full text-indigo-600" />
          )}
        </div>
      </div>
      
      {/* Pulsing ring */}
      <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
        currentTheme === 'dark' 
          ? 'border-gray-300/30 group-hover:border-gray-400/50' 
          : 'border-indigo-300/30 group-hover:border-indigo-400/50'
      }`} />
    </button>
  );
}