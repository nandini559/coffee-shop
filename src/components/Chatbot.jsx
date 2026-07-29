import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { queryGemmaLocalModel, EXACT_REFUSAL_MESSAGE } from '../utils/aiBaristaLogic';
import { useCart } from '../context/CartContext';
import { Bot, Send, X, Sparkles, ShoppingBag } from 'lucide-react';

export default function Chatbot({ isOpen, setIsOpen, onOpenReservation }) {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: '☕ Welcome to Oak & Bean! I am your AI Barista. Ask me anything about our coffee menu, recommendations, prices, ingredients, opening hours, store location, or table reservations!',
      showSuggestions: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "☕ What's your best seller?",
    "💰 Most expensive coffee?",
    "⚡ Strongest coffee?",
    "🧊 Cold coffee under $6",
    "🥐 Fresh bakery & pastries",
    "⏰ Opening hours & location"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query || !query.trim() || isTyping) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const response = await queryGemmaLocalModel(query, messages);
      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: response.text,
        items: response.items || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: 'bot-err-' + Date.now(),
          sender: 'bot',
          text: EXACT_REFUSAL_MESSAGE,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] md:w-[420px] h-[540px] max-h-[80vh] glass-panel rounded-3xl border border-[#E5DCD3] dark:border-amber-400/30 shadow-2xl flex flex-col overflow-hidden text-[#2C1A14] dark:text-white"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#FDFBF7] dark:bg-[#160F0B]/95 border-b border-[#E5DCD3] dark:border-coffee-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2C1A14] via-[#5C4337] to-[#C67C4E] flex items-center justify-center text-white shadow-sm border border-amber-300/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-serif font-bold text-[#2C1A14] dark:text-white flex items-center gap-1.5">
                  Coffee Companion <Sparkles className="w-3.5 h-3.5 text-[#C67C4E] dark:text-[#F0C085] animate-pulse" />
                </span>
                {/* <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1"> */}
                {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Oak & Bean Assistant • Online
                </span> */}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="Close Chat"
              className="p-2 rounded-xl text-[#5C4337] dark:text-coffee-400 hover:text-[#2C1A14] dark:hover:text-white hover:bg-[#E5DCD3]/50 dark:hover:bg-coffee-900 transition touch-manipulation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Single Scroll Container for Messages & Message-wise Suggestions */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                    ? 'bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold rounded-tr-none shadow-md'
                    : 'bg-white dark:bg-coffee-900/90 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-coffee-100 rounded-tl-none shadow-sm'
                    }`}
                >
                  {msg.text}

                  {/* Message-wise Suggestive Questions inside Bot Welcome Message */}
                  {/* {msg.showSuggestions && (
                    <div className="mt-3 pt-3 border-t border-[#E5DCD3] dark:border-coffee-800 space-y-1.5 w-full">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855E4C] dark:text-coffee-300 block mb-1">
                        Suggested Questions:
                      </span>
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          disabled={isTyping}
                          className="w-full text-left px-3 py-2 rounded-xl bg-[#FDFBF7] dark:bg-coffee-950 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-amber-200 text-xs font-semibold hover:border-[#C67C4E] dark:hover:border-[#F0C085] transition touch-manipulation cursor-pointer flex items-center justify-between group"
                        >
                          <span>{prompt}</span>
                          <span className="text-[10px] text-[#C67C4E] dark:text-[#F0C085] font-bold group-hover:translate-x-0.5 transition-transform">Ask →</span>
                        </button>
                      ))}
                    </div>
                  )} */}

                  {/* Related Recommended Items inside Bot Message */}
                  {/* {msg.items && msg.items.length > 0 && (
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
                            type="button"
                            onClick={() => addToCart(item)}
                            className="px-2.5 py-1 rounded-lg bg-[#2C1A14] dark:bg-[#C67C4E] text-white dark:text-[#160F0B] font-bold text-[10px] shrink-0 hover:opacity-90 shadow-sm flex items-center gap-1 uppercase tracking-wider touch-manipulation cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" /> Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
                <span className="text-[9px] text-[#855E4C] dark:text-coffee-400 mt-1 px-1 font-semibold">{msg.timestamp}</span>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#5C4337] dark:text-coffee-400 italic text-xs font-semibold p-2">
                <Bot className="w-4 h-4 text-[#C67C4E] dark:text-amber-400 animate-bounce" />
                <span> Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-[#160F0B]/95 border-t border-[#E5DCD3] dark:border-coffee-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask about coffee, menu, hours, location..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FDFBF7] dark:bg-coffee-900 border border-[#E5DCD3] dark:border-coffee-800 text-[#2C1A14] dark:text-white text-xs font-medium placeholder-coffee-400 focus:border-[#C67C4E] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 rounded-xl bg-[#2C1A14] dark:bg-[#C67C4E] hover:opacity-90 text-white dark:text-[#160F0B] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition touch-manipulation cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
