'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SpeechService } from '@/lib/speechUtils';
import { X, Mic } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function Finbot() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hello there! I'm FinBot, your personal financial assistant and stock market advisor. I'm here to help you make informed decisions about investments, market analysis, and financial planning. What would you like to explore today?"
    }
  ]);
  const speechService = useRef<SpeechService>(null);

  useEffect(() => {
    // Initialize speech service on client side
    speechService.current = SpeechService.getInstance();
  }, []);

  const handleMicToggle = async () => {
    if (!speechService.current) return;

    if (isListening) {
      speechService.current.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.current.startListening(
        // On result callback
        async (text) => {
          setIsListening(false);
          
          // Add user message to chat
          setMessages(prev => [...prev, { type: 'user', content: text }]);
          
          // Process the voice input and get response
          const response = await processUserInput(text);
          
          // Add bot response to chat
          setMessages(prev => [...prev, { type: 'bot', content: response }]);
          
          // Speak the response
          setIsSpeaking(true);
          await speechService.current?.speak(response);
          setIsSpeaking(false);
        },
        // On error callback
        (error) => {
          console.error('Speech recognition error:', error);
          setIsListening(false);
        }
      );
    }
  };

  // Process user input and return appropriate response
  const processUserInput = async (input: string): Promise<string> => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm your financial assistant. How can I help you today?";
    }
    if (lowerInput.includes('invest') && lowerInput.includes('stock market')) {
      return "To invest in the Indian stock market, you'll need to: 1. Open a demat account with a broker 2. Complete your KYC 3. Link your bank account 4. Start with blue-chip stocks or index funds. Would you like me to explain any of these steps in detail?";
    }
    if (lowerInput.includes('swp') || lowerInput.includes('systematic withdrawal')) {
      return "SWP (Systematic Withdrawal Plan) is a strategy where you regularly withdraw a fixed amount from your mutual fund investments. It's useful for generating regular income from your investments. Would you like to know more about how SWP works?";
    }
    if (lowerInput.includes('mutual fund') && lowerInput.includes('beginner')) {
      return "For beginners, I recommend starting with: 1. Large-cap index funds 2. Balanced advantage funds 3. Conservative hybrid funds. These offer good diversification and lower risk. Would you like specific fund recommendations?";
    }
    if (lowerInput.includes('stock') || lowerInput.includes('market')) {
      return "The stock market is currently active. Would you like me to check specific stocks for you or provide general market updates?";
    }
    
    return "I understand you're asking about: " + input + ". Could you please be more specific about what you'd like to know?";
  };

  return (
    <div className="fixed inset-0 bg-[#4339F2] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
            <span className="text-white text-xl sm:text-2xl">✨</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">FinBot</h1>
            <p className="text-sm sm:text-base text-white/80">Your Financial Advisor</p>
          </div>
        </div>
        <button className="text-white/80 hover:text-white p-2">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Messages and Quick Actions */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
        {/* Bot Message */}
        <div className="bg-[#4339F2] text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
          <span className="text-2xl sm:text-3xl mb-3 sm:mb-4 inline-block">👋</span>
          <p className="text-base sm:text-xl font-medium mb-3 sm:mb-4">
            Hello there! I'm FinBot, your personal financial assistant and stock market advisor.
            I'm here to help you make informed decisions about investments, market analysis, and financial planning.
          </p>
          <p className="text-base sm:text-xl">What would you like to explore today?</p>
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <button 
            className="w-full bg-white/10 hover:bg-white/20 text-white text-left p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base"
            onClick={() => handleMicToggle()}
          >
            How can I invest in the Indian stock market?
          </button>
          <button 
            className="w-full bg-white/10 hover:bg-white/20 text-white text-left p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base"
            onClick={() => handleMicToggle()}
          >
            Explain SWP strategy
          </button>
          <button 
            className="w-full bg-white/10 hover:bg-white/20 text-white text-left p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-colors text-sm sm:text-base"
            onClick={() => handleMicToggle()}
          >
            What are the best mutual funds for beginners?
          </button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 sm:p-4">
        <div className="bg-white/10 rounded-full p-2 sm:p-4 flex items-center justify-between">
          <span className="text-white/80 ml-3 sm:ml-4 text-sm sm:text-base">Type your message...</span>
          <button 
            onClick={() => handleMicToggle()}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white p-3 sm:p-4 rounded-full transition-colors"
          >
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
              <path d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Microphone Button */}
      <div className="fixed bottom-3 sm:bottom-4 right-3 sm:right-4">
        <button
          onClick={handleMicToggle}
          className={`p-3 sm:p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
            isListening 
              ? 'bg-red-600 animate-pulse' 
              : 'bg-[#4339F2]'
          } text-white`}
          aria-label={isListening ? "Stop listening" : "Start voice chat"}
        >
          <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
} 