import React, { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { ChatSection } from '@/components/chat-section';

const Index = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleStartChat = () => {
    setIsChatStarted(true);
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-hero)]">
      <HeroSection onStartChat={handleStartChat} />
      <ChatSection />
    </div>
  );
};

export default Index;
