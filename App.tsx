import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import { Message, Role } from './types';
import { sendMessageStream, initializeChat } from './services/geminiService';
import { INITIAL_GREETING } from './constants';
import { Icons } from './components/Icon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Chat on Mount
  useEffect(() => {
    initializeChat();
    // Add initial greeting after a short delay for effect
    const timer = setTimeout(() => {
      setMessages([{
        id: uuidv4(),
        role: Role.MODEL,
        content: INITIAL_GREETING,
        timestamp: Date.now()
      }]);
      setIsInitialized(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReset = () => {
    initializeChat();
    setMessages([{
        id: uuidv4(),
        role: Role.MODEL,
        content: "Protocols reset. Memory wiped. Ready for new instructions, Sir.",
        timestamp: Date.now()
    }]);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: Role.USER,
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Placeholder for AI response
    const aiMessageId = uuidv4();
    const aiPlaceholder: Message = {
      id: aiMessageId,
      role: Role.MODEL,
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    setMessages((prev) => [...prev, aiPlaceholder]);

    try {
      await sendMessageStream(text, (chunkText) => {
        setMessages((prev) => {
          return prev.map((msg) => {
            if (msg.id === aiMessageId) {
              return {
                ...msg,
                content: msg.content + chunkText,
              };
            }
            return msg;
          });
        });
      });
    } catch (error) {
        // Error handling visual
        setMessages((prev) => {
            return prev.map((msg) => {
              if (msg.id === aiMessageId) {
                return {
                  ...msg,
                  content: "**SYSTEM ERROR**: Communication link severed. Please check your API configuration or network status.",
                };
              }
              return msg;
            });
        });
    } finally {
      setIsLoading(false);
      setMessages((prev) => {
        return prev.map((msg) => {
          if (msg.id === aiMessageId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        });
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      
      {/* Background HUD Grid Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <Header onReset={handleReset} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {!isInitialized && (
               <div className="flex flex-col items-center justify-center h-[50vh] text-cyan-500/50 animate-pulse">
                  <Icons.Cpu size={64} className="mb-4" />
                  <p className="font-hud tracking-widest text-lg">INITIALIZING SYSTEMS...</p>
               </div>
            )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
