import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

interface ChatContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ChatContainer = ({ children, className }: ChatContainerProps) => {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto",
      "bg-card border border-border rounded-3xl",
      "shadow-[var(--shadow-card)]",
      "overflow-hidden backdrop-blur-xl",
      "transition-all duration-300 hover:shadow-[var(--shadow-glow)]",
      className
    )}>
      {children}
    </div>
  );
};

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onSettingsClick?: () => void;
}

export const ChatHeader = ({ title, subtitle, onSettingsClick }: ChatHeaderProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="bg-gradient-to-r from-primary to-primary-glow p-6 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm opacity-90 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white
                     flex items-center justify-center transition-colors p-0"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
          {onSettingsClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white
                       flex items-center justify-center transition-colors p-0"
            >
              <span className="text-lg">⚙️</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

interface ChatMessagesProps {
  children: React.ReactNode;
  className?: string;
}

export const ChatMessages = ({ children, className }: ChatMessagesProps) => {
  return (
    <div className={cn(
      "flex-1 p-6 overflow-y-auto",
      "bg-gradient-to-b from-background/50 to-card/30",
      "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
      className
    )}>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  className?: string;
}

export const Message = ({ content, isUser, timestamp, className }: MessageProps) => {
  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start",
      "animate-slideUp"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-[var(--shadow-message)]",
        "transition-all duration-200 hover:shadow-lg",
        isUser 
          ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-br-md" 
          : "bg-secondary text-secondary-foreground border border-border rounded-bl-md",
        className
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-2">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  placeholder = "Type your message...", 
  disabled = false 
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-6 bg-card/50 border-t border-border">
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 bg-input border border-border rounded-full
                     text-sm placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                     resize-none max-h-32 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              minHeight: '48px',
              height: 'auto',
            }}
          />
        </div>
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow
                   text-primary-foreground font-medium text-lg
                   hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:scale-105
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                   flex items-center justify-center"
        >
          ✈️
        </button>
      </div>
    </div>
  );
};