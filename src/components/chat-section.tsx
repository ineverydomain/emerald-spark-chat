import React, { useState, useEffect, useRef } from 'react';
import { ChatContainer, ChatHeader, ChatMessages, Message, ChatInput } from '@/components/ui/chat-container';
import { Button } from '@/components/ui/button';

// Healthcare knowledge base with consistent responses
const healthcareResponses = {
  fever: {
    diagnosis: "Based on your symptoms of fever, you might have a viral or bacterial infection.",
    additional_symptoms: "Other symptoms may include: chills, sweating, headache, muscle aches, fatigue, and loss of appetite.",
    precautions: "Stay hydrated with ORS, take paracetamol for fever (avoid aspirin), get complete rest, monitor temperature regularly, and seek medical attention if fever persists for more than 3 days or exceeds 103°F (39.4°C)."
  },
  headache: {
    diagnosis: "Your headache symptoms suggest it could be tension headache, migraine, or other causes.",
    additional_symptoms: "Other symptoms may include: sensitivity to light/sound, nausea, vomiting, throbbing pain, and visual disturbances.",
    precautions: "Rest in a dark, quiet room, apply cold/warm compress, stay hydrated, maintain regular sleep schedule, manage stress, and consult a neurologist if headaches are frequent or severe."
  },
  cough: {
    diagnosis: "Your cough symptoms suggest possible respiratory infection, allergies, or irritation.",
    additional_symptoms: "Other symptoms may include: throat irritation, phlegm production, chest congestion, shortness of breath, and fatigue.",
    precautions: "Stay hydrated, use honey for soothing (avoid for children under 1 year), avoid irritants like smoke, get adequate rest, use a humidifier, and consult a doctor if cough persists for more than 2 weeks or is accompanied by blood."
  },
  "stomach pain": {
    diagnosis: "Your stomach pain symptoms can indicate acidity, gastritis, indigestion, or other digestive issues.",
    additional_symptoms: "Other symptoms may include: burning sensation, bloating, nausea, loss of appetite, and pain after eating.",
    precautions: "Eat small frequent meals, avoid spicy and oily foods, don't skip meals, drink plenty of water, avoid alcohol and smoking, take antacids if needed, and consult a gastroenterologist if symptoms persist."
  },
  emergency: {
    diagnosis: "This appears to be a serious medical situation that requires immediate attention.",
    additional_symptoms: "Emergency symptoms include: severe chest pain, difficulty breathing, severe bleeding, loss of consciousness, or severe allergic reactions.",
    precautions: "🚨 SEEK IMMEDIATE MEDICAL ATTENTION: Call emergency services (108/102 in India, 911 in US), go to the nearest hospital emergency room, or contact your doctor immediately. Do not delay medical care for emergencies."
  }
};

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
      addBotMessage("🌿 Welcome to SwasthSaathi! I'm your AI health assistant. Please describe your symptoms, and I'll provide guidance. Remember, this is for informational purposes only - consult a doctor for serious concerns.");
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

  const analyzeSymptoms = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Emergency keywords
    const emergencyKeywords = ['emergency', 'severe pain', 'chest pain', 'can\'t breathe', 'unconscious', 'bleeding heavily', 'heart attack', 'stroke'];
    if (emergencyKeywords.some(keyword => input.includes(keyword))) {
      const response = healthcareResponses.emergency;
      return `🚨 **EMERGENCY DETECTED:**\n\n${response.diagnosis}\n\n**Additional Emergency Signs:**\n${response.additional_symptoms}\n\n**IMMEDIATE ACTION REQUIRED:**\n${response.precautions}`;
    }
    
    // Regular symptom matching
    for (const [symptom, response] of Object.entries(healthcareResponses)) {
      if (symptom !== 'emergency' && input.includes(symptom)) {
        return `🏥 **Condition Analysis:**\n\n${response.diagnosis}\n\n**Additional Symptoms to Watch:**\n${response.additional_symptoms}\n\n🛡️ **Recommended Precautions:**\n${response.precautions}\n\n⚠️ **Important:** This is AI-generated guidance. Please consult a healthcare professional for proper diagnosis and treatment.`;
      }
    }

    // Default response
    return `Thank you for sharing your symptoms. While I can provide general health information, I recommend consulting with a healthcare professional for a proper evaluation of your condition.\n\n🆘 **For emergencies, please:**\n• Call emergency services immediately (108/102 in India)\n• Visit the nearest hospital\n• Contact your doctor\n\nPlease describe your specific symptoms like fever, headache, cough, or stomach pain for more targeted guidance.`;
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

  const quickSymptoms = ['Fever', 'Headache', 'Cough', 'Stomach Pain'];

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