import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { processUserChatQuery } from '../utils/aiBaristaLogic';
import { QUICK_PROMPTS } from '../data/faqData';
import { useCart } from '../context/CartContext';
import { Bot, Send, X, Sparkles, ShoppingBag, Trash2 } from 'lucide-react';

export default function Chatbot() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: '☕ Welcome to **Oak & Bean**! I am your AI Barista Assistant. Ask me anything about our coffee menu, ingredients, allergens, address, seating, pricing, discount promo codes, or online delivery!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserChatQuery(query);
      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: response.text,
        items: response.items || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Chat history cleared. How can I assist you with your Oak & Bean coffee experience today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 p-4 rounded-full bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-extrabold shadow-lg flex items-center gap-2 border border-white/20 dark:border-amber-300/40"
          aria-label="Open AI Barista Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">
            AI Barista Assistant
          </span>
        </motion.button>
      )}

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] glass-panel rounded-3xl border border-[#E5DCD3] dark:border-amber-400/30 shadow-2xl flex flex-col overflow-hidden text-[#2C1A14] dark:text-white"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#FDFBF7] dark:bg-[#160F0B]/90 border-b border-[#E5DCD3] dark:border-coffee-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] flex items-center justify-center text-white dark:text-[#160F0B] shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-serif font-bold text-[#2C1A14] dark:text-white flex items-center gap-1.5">
                    Oak & Bean AI Barista <Sparkles className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085] animate-pulse" />
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block -mt-0.5">
                    🟢 Online & Ready to Answer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className="p-1.5 rounded-lg text-[#5C4337] dark:text-coffee-400 hover:text-[#2C1A14] dark:hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#5C4337] dark:text-coffee-400 hover:text-[#2C1A14] dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Preset Prompts */}
            <div className="p-2.5 bg-[#F5EFE6] dark:bg-coffee-900/60 border-b border-[#E5DCD3] dark:border-coffee-800 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.replace(/^[^\w]+/, '').trim())}
                  className="shrink-0 px-3 py-1 rounded-full bg-white dark:bg-[#160F0B] border border-[#E5DCD3] dark:border-coffee-700 hover:border-[#C67C4E] text-[11px] font-bold text-[#3D291F] dark:text-coffee-200 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold rounded-tr-none shadow-md'
                        : 'bg-white dark:bg-coffee-900/90 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-100 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}

                    {msg.items && msg.items.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-[#E5DCD3] dark:border-coffee-800">
                        {msg.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#FDFBF7] dark:bg-coffee-950/80 p-2.5 rounded-xl border border-[#E5DCD3] dark:border-amber-400/30 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                              <div className="truncate">
                                <span className="font-bold text-[#2C1A14] dark:text-amber-200 block text-[11px] truncate">{item.name}</span>
                                <span className="text-[10px] text-[#5C4337] dark:text-coffee-400">${item.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(item)}
                              className="px-2.5 py-1 rounded-lg bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold text-[10px] shrink-0 hover:opacity-90 shadow-sm flex items-center gap-1 uppercase tracking-wider"
                            >
                              <ShoppingBag className="w-3 h-3" /> Add
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                  <span className="text-[9px] text-[#855E4C] dark:text-coffee-400 mt-1 px-1 font-semibold">{msg.timestamp}</span>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[#5C4337] dark:text-coffee-400 italic text-xs font-semibold">
                  <Bot className="w-4 h-4 text-[#C67C4E] dark:text-amber-400 animate-bounce" />
                  <span>AI Barista is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-[#160F0B]/95 border-t border-[#E5DCD3] dark:border-coffee-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about menu, address, seating, code..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#FDFBF7] dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium placeholder-coffee-400 focus:border-[#C67C4E] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:opacity-90 text-white dark:text-[#160F0B] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
