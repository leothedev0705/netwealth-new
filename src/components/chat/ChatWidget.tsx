'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Mic, MicOff, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatResponse } from '@/lib/gemini';
import { SpeechService } from '@/lib/speechUtils';
import ReactMarkdown from 'react-markdown';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const starterPrompts = [
  "How can I invest in the Indian stock market?",
  "Explain SWP strategy",
  "What are the best mutual funds for beginners?",
  "Explain SIP investment strategy",
  "How to create a diversified portfolio?",
  "Tell me about tax-saving investments"
];

const ThinkingAnimation = () => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex justify-start"
  >
    <div className="rounded-2xl px-6 py-4 bg-white border border-gray-100 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-600"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        <motion.div 
          className="flex items-center gap-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-blue-600 font-medium">FinBot is thinking</div>
          <div className="flex gap-1">
            {['💰', '📈', '💎'].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
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
      setSpeechError(null);
      speechService.current.startListening(
        // On result callback
        async (text) => {
          setIsListening(false);
          handleSend(text);
        },
        // On error callback
        (error) => {
          setIsListening(false);
          if (error === 'no-speech') {
            setSpeechError('No speech detected. Please try speaking again.');
          } else {
            setSpeechError('Speech recognition error: ' + error);
          }
          console.error('Speech recognition error:', error);
        }
      );
    }
  };

  const handleStopSpeaking = () => {
    if (speechService.current) {
      speechService.current.stop();
      setIsSpeaking(false);
      setIsLoading(false);
    }
  };

  const preprocessTextForSpeech = (text: string) => {
    return text
      // Remove asterisks
      .replace(/\*/g, '')
      // Handle currency formatting
      .replace(/\$(\d+(\.\d+)?)/g, '$1 dollars')
      .replace(/₹(\d+(\.\d+)?)/g, '$1 rupees')
      .replace(/\$(\d+(\.\d+)?)\s*(million|billion|trillion)/gi, '$1 $3 dollars')
      .replace(/₹(\d+(\.\d+)?)\s*(million|billion|trillion)/gi, '$1 $3 rupees')
      // Handle other special characters if needed
      .replace(/[&]/g, 'and')
      .replace(/[%]/g, 'percent');
  };

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      content: content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(content, messages);
      
      const botMessage: Message = {
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response with preprocessing
      if (speechService.current) {
        setIsSpeaking(true);
        try {
          const processedText = preprocessTextForSpeech(response);
          await speechService.current.speak(processedText);
        } catch (error) {
          console.error('Speech error:', error);
        } finally {
          setIsSpeaking(false);
        }
      }
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
    setIsSpeaking(false);
    if (speechService.current) {
      speechService.current.stop();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <Card className="w-[380px] h-[500px] flex flex-col shadow-2xl bg-white border-0">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 p-1.5 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">FinBot</h3>
                    <p className="text-xs text-blue-100">Your Financial Advisor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 rounded-full"
                    onClick={handleClearChat}
                    title="Clear chat"
                  >
                    <svg 
                      className="h-5 w-5" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-white">
                {messages.length === 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg shadow-md">
                      <p className="text-sm font-medium">
                        👋 Hello there! I'm FinBot, your personal financial assistant and stock market advisor. I'm here to help you make informed decisions about investments, market analysis, and financial planning.
                      </p>
                      <p className="text-sm mt-2 text-blue-100">
                        What would you like to explore today?
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-6">
                      {starterPrompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-200"
                          onClick={() => handleSend(prompt)}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        key={index}
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-md ${
                            msg.isUser
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'bg-white border border-gray-100'
                          }`}
                        >
                          {msg.isUser ? (
                            msg.content
                          ) : (
                            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-p:mb-2 last:prose-p:mb-0">
                              <ReactMarkdown
                                components={{
                                  strong: ({ children }) => (
                                    <span className="font-semibold text-blue-700">{children}</span>
                                  ),
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && <ThinkingAnimation />}
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleMicToggle}
                    className={`rounded-full transition-colors ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-50 border-0 focus-visible:ring-blue-500"
                    disabled={isLoading || (isListening && !isSpeaking)}
                  />
                  {isSpeaking ? (
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleStopSpeaking}
                      className="rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    >
                      <VolumeX className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-opacity"
                      disabled={isLoading || isListening || !inputValue.trim()}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-1 rounded-full bg-white"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </form>
              </div>
            </Card>
            {speechError && (
              <div className="text-red-600 text-sm px-4 py-2">{speechError}</div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative mb-2 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Button
                onClick={() => setIsOpen(true)}
                size="icon"
                className="relative h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
              >
                <MessageCircle className="h-7 w-7 text-white" />
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1,
                duration: 0.2,
                ease: "easeOut"
              }}
              className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm border border-gray-100/50 text-sm font-medium text-blue-600/90 whitespace-nowrap flex items-center gap-2"
            >
              <span className="relative">
                Ask FinBot
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-600/20"></span>
              </span>
              <svg className="w-3.5 h-3.5 opacity-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13.6L7.2 18L17.2 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 