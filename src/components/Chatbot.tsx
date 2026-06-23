import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { getChatbotResponse } from '../utils/mockData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am your GeneGuard AI assistant. Ask me questions about DNA markers (APOE, MTHFR, 9p21, BRCA1), risk metrics, health suggestions, or data security!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Trigger bot response after typing delay
    setIsTyping(true);
    setTimeout(() => {
      const responseText = getChatbotResponse(text);
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestions = [
    "Tell me about APOE & Alzheimer's",
    "What does MTHFR genotype mean?",
    "Is my uploaded DNA secure?",
    "Heart disease (9p21) risk alleles"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          title="Open Assistant"
        >
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 text-[9px] text-white items-center justify-center font-bold">1</span>
          </span>
        </button>
      )}

      {/* Chat Pane */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-600 to-blue-700 text-white">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Bot className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">GeneGuard Health Bot</h3>
                <span className="flex items-center text-[10px] text-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1 animate-pulse"></span>
                  Online Genetic Counselor
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950 no-scrollbar"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`p-1.5 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-teal-500" />}
                </div>
                
                <div className="max-w-[75%]">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800/80 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[9px] text-slate-400 block mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800">
                  <Bot className="w-3.5 h-3.5 text-teal-500" />
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide flex items-center mb-1.5">
                <Sparkles className="w-3 h-3 text-yellow-500 mr-1" /> Suggestion Prompts
              </span>
              <div className="flex flex-col space-y-1.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-left text-xs px-2.5 py-1 rounded bg-white dark:bg-slate-850 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask GeneGuard..."
              className="flex-1 bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-150 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-slate-200 dark:focus:border-slate-700 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="ml-2 p-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white shadow transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
