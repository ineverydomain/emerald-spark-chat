import React, { useState, useEffect, useRef } from 'react';
import { ChatContainer, ChatHeader, ChatMessages, Message, ChatInput } from '@/components/ui/chat-container';
import { Button } from '@/components/ui/button';
import { healthcareService, type AnalysisResult } from '@/lib/healthcare-service';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage = healthcareService.getWelcomeMessage('english');
      addBotMessage(welcomeMessage);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (content: string) => {
    addMessage(content, false);
  };

  const formatAnalysisResult = (result: AnalysisResult): string => {
    if (result.isEmergency) {
      let response = `🚨 **EMERGENCY DETECTED:**\n\n${result.diagnosis}\n\n`;
      
      if (result.additionalSymptoms) {
        response += `**Additional Emergency Signs:**\n${result.additionalSymptoms}\n\n`;
      }
      
      response += `**IMMEDIATE ACTION REQUIRED:**\n${result.precautions}`;
      
      if (result.emergencyNumbers && result.emergencyNumbers.length > 0) {
        response += '\n\n📞 **EMERGENCY NUMBERS - CALL NOW!**\n';
        result.emergencyNumbers.forEach(contact => {
          response += `• **${contact.service}**: ${contact.number} (${contact.description})\n`;
        });
      }
      
      if (result.hospitals && result.hospitals.length > 0) {
        response += '\n\n🏥 **NEAREST HOSPITALS:**\n';
        result.hospitals.slice(0, 3).forEach((hospital, index) => {
          response += `${index + 1}. **${hospital.name}**\n`;
          response += `   📍 ${hospital.address}\n`;
          response += `   📱 ${hospital.phone}\n`;
          response += `   🚗 ${hospital.distance} | ⏱️ ${hospital.time}\n\n`;
        });
      }
      
      return response;
    } else {
      let response = `🏥 **Condition Analysis:**\n\n${result.diagnosis}`;
      
      if (result.additionalSymptoms) {
        response += `\n\n**Additional Symptoms to Watch:**\n${result.additionalSymptoms}`;
      }
      
      if (result.precautions) {
        response += `\n\n🛡️ **Recommended Precautions:**\n${result.precautions}`;
      }
      
      response += `\n\n⚠️ **Important:** This is AI-generated guidance. Please consult a healthcare professional for proper diagnosis and treatment.`;
      
      return response;
    }
  };

  const analyzeSymptoms = (userInput: string): string => {
    const result = healthcareService.analyzeSymptoms(userInput);
    return formatAnalysisResult(result);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, true);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse = analyzeSymptoms(userMessage);
      addBotMessage(botResponse);
      setIsTyping(false);
    }, 1500);
  };

  const quickSymptoms = ['Fever', 'Headache', 'Cough', 'Stomach Pain', 'Diabetes', 'Breathing Problem'];

  const handleQuickSymptom = (symptom: string) => {
    setInputValue(symptom);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <section id="chat-section" className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary 
                         bg-clip-text text-transparent">
            AI Health Assistant
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe your symptoms and get instant health guidance powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick symptoms */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Symptoms</h3>
            <div className="space-y-3">
              {quickSymptoms.map((symptom) => (
                <Button
                  key={symptom}
                  onClick={() => handleQuickSymptom(symptom)}
                  variant="outline"
                  className="w-full justify-start text-left hover:bg-primary/10 
                           transition-all duration-200 hover:scale-105"
                >
                  {symptom}
                </Button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-card rounded-xl border border-border">
              <h4 className="font-semibold text-sm mb-2 text-destructive">⚠️ Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This AI assistant provides general health information only. 
                Always consult qualified healthcare professionals for medical advice, 
                diagnosis, or treatment.
              </p>
            </div>
          </div>

          {/* Chat interface */}
          <div className="lg:col-span-2">
            <ChatContainer className="h-[600px] flex flex-col">
              <ChatHeader 
                title="SwasthSaathi" 
                subtitle="AI Health Assistant"
              />
              
              <ChatMessages className="flex-1">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    content={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl 
                                  rounded-bl-md border border-border animate-pulse">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </ChatMessages>
              
              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                placeholder="Describe your symptoms..."
                disabled={isTyping}
              />
            </ChatContainer>
          </div>
        </div>
      </div>
    </section>
  );
};