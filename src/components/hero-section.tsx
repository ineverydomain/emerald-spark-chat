import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onStartChat: () => void;
}

export const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-section');
    chatElement?.scrollIntoView({ behavior: 'smooth' });
    onStartChat();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-slideUp">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                         bg-gradient-to-r from-primary to-primary-glow mb-8
                         shadow-[var(--shadow-glow)] animate-glow">
            <span className="text-3xl">🌿</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary-glow 
                         bg-clip-text text-transparent leading-tight">
            SwasthSaathi
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your intelligent 24/7 AI health companion. Get instant medical guidance in multiple languages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToChat}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)]
                       text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start Health Chat ✨
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/about'}
              className="text-lg px-8 py-6 rounded-full border-border hover:bg-secondary/50
                       transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {[
            { icon: '🌍', text: 'Multi-language Support' },
            { icon: '⚡', text: 'Instant Responses' },
            { icon: '🔒', text: 'Privacy Protected' }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center gap-2 opacity-80 animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-muted-foreground">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};