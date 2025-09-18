import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Health Analysis',
      description: 'Advanced artificial intelligence analyzes your symptoms and provides accurate health guidance based on medical knowledge.'
    },
    {
      icon: '🌍',
      title: 'Multi-Language Support',
      description: 'Communicate in English, Hindi, or Hinglish. Our bot understands and responds in your preferred language.'
    },
    {
      icon: '⚡',
      title: 'Instant Responses',
      description: 'Get immediate health guidance 24/7. No waiting times, no appointments needed.'
    },
    {
      icon: '🏥',
      title: 'Comprehensive Medical Database',
      description: 'Access to extensive medical knowledge covering common symptoms, conditions, and precautionary measures.'
    },
    {
      icon: '🔒',
      title: 'Privacy Protected',
      description: 'Your health information is secure. We prioritize your privacy and confidentiality.'
    },
    {
      icon: '📱',
      title: 'Multi-Platform Access',
      description: 'Available through web, SMS, WhatsApp, and voice calls for convenient access anywhere.'
    }
  ];

  const conditions = [
    'Fever & Temperature Issues',
    'Headaches & Migraines', 
    'Respiratory Problems',
    'Digestive Issues',
    'Skin Conditions',
    'Joint & Muscle Pain',
    'Mental Health Support',
    'Emergency Guidance'
  ];

  return (
    <div className="min-h-screen bg-[image:var(--gradient-hero)]">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow 
                           flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <h1 className="text-2xl font-bold">SwasthSaathi</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="hover:bg-secondary/50"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                         bg-gradient-to-r from-primary to-primary-glow mb-6
                         shadow-[var(--shadow-glow)]">
            <span className="text-3xl">🌿</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary-glow 
                         bg-clip-text text-transparent">
            About SwasthSaathi
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent 24/7 AI health companion, designed to provide instant medical guidance 
            and support in multiple languages. We combine advanced AI technology with medical expertise 
            to make healthcare accessible to everyone.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Supported Conditions */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What We Can Help With</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                SwasthSaathi is trained to recognize and provide guidance for a wide range of 
                common health conditions and symptoms. Our AI analyzes your input and provides 
                relevant medical information and precautionary measures.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Important Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  SwasthSaathi provides general health information and guidance based on AI analysis. 
                  This service is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Always consult with qualified healthcare professionals</strong> for serious 
                  medical concerns, emergencies, or before making any decisions about your health or treatment.
                </p>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm font-medium text-destructive">
                    🚨 For medical emergencies, call your local emergency services immediately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Describe Symptoms', desc: 'Tell us about your health concerns in your preferred language' },
              { step: '2', title: 'AI Analysis', desc: 'Our AI analyzes your symptoms using medical knowledge base' },
              { step: '3', title: 'Get Guidance', desc: 'Receive instant health guidance and precautionary measures' },
              { step: '4', title: 'Consult Doctor', desc: 'For serious concerns, we recommend consulting healthcare professionals' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow 
                             text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Start your health conversation with SwasthSaathi today. Get instant AI-powered 
                health guidance whenever you need it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg"
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)]
                         text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Start Health Chat Now ✨
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;