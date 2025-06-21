'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SpeechService } from '@/lib/speechUtils';
import { X, Mic, Send, Bot, User, CornerDownLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function Finbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const speechService = useRef<SpeechService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    speechService.current = SpeechService.getInstance();
    setMessages([
      {
        type: 'bot',
        content:
          "Hello! I'm FinBot, your personal financial assistant. How can I help you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const processAndRespond = async (text: string) => {
    setMessages((prev) => [...prev, { type: 'user', content: text }]);
    setInputValue('');

    const response = await processUserInput(text);

    setMessages((prev) => [...prev, { type: 'bot', content: response }]);

    await speechService.current?.speak(response);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      processAndRespond(inputValue);
    }
  };

  const handleMicClick = () => {
    if (!speechService.current) return;
    if (isListening) {
      speechService.current.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.current.startListening(
        (text) => {
          setIsListening(false);
          processAndRespond(text);
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setIsListening(false);
        }
      );
    }
  };

  const processUserInput = async (input: string): Promise<string> => {
    // This function can be expanded with a real NLP service
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('invest')) return "To invest in the stock market, you need a demat account, KYC, and a linked bank account. Starting with index funds is a great first step.";
    if (lowerInput.includes('swp')) return "A Systematic Withdrawal Plan (SWP) provides regular income by letting you withdraw a fixed amount from your mutual funds periodically.";
    if (lowerInput.includes('mutual fund')) return "For beginners, large-cap index funds or balanced advantage funds are excellent choices due to their diversification and lower risk.";
    return `I've received your query about: "${input}". While my capabilities are currently in development, a financial expert from our team will review this and get in touch with you shortly.`;
  };

  const quickActions = [
    "How do I invest in stocks?",
    "Explain SWP.",
    "Best mutual funds for beginners?",
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-32px)] max-w-md h-[70vh] max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green-light rounded-full">
                  <Bot className="h-6 w-6 text-brand-green" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-green">FinBot</h2>
                  <p className="text-sm text-slate-500">Your Financial AI Assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                  {msg.type === 'bot' && <Bot className="h-6 w-6 text-slate-400 flex-shrink-0" />}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.type === 'bot'
                        ? 'bg-brand-green-light text-slate-800 rounded-bl-none'
                        : 'bg-brand-green text-white rounded-br-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.type === 'user' && <User className="h-6 w-6 text-slate-400 flex-shrink-0" />}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-400 mb-2">QUICK ACTIONS</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map(action => (
                    <button key={action} onClick={() => processAndRespond(action)} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <footer className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <Button type="button" size="icon" variant="ghost" onClick={handleMicClick} className={isListening ? 'text-red-500' : 'text-slate-500'}>
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" className="bg-brand-green text-white hover:bg-teal-600 flex-shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
        {!isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <Button
                onClick={toggleChat}
                variant="outline"
                className="rounded-full w-auto h-12 px-4 bg-white/80 backdrop-blur-sm text-brand-green shadow-lg hover:bg-slate-50 border-slate-200/80 transition-all flex items-center gap-2"
                >
                <span className="text-sm font-semibold">Ask FinBot</span>
                <Check size={16}/>
                </Button>
            </motion.div>
        )}
        </AnimatePresence>
        
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 bg-brand-green text-white shadow-lg hover:bg-teal-600 transition-transform hover:scale-110"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'x' : 'bot'}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Bot size={24} />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>
    </>
  );
}
