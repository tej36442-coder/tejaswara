import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className="bg-slate-950/90 backdrop-blur-md border-t border-cyan-900/50 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-3 p-2 bg-slate-900/50 border border-cyan-900/30 rounded-xl shadow-lg focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all duration-300">
          
          {/* Decorative left bar */}
          <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-900/30 rounded-r-full"></div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Awaiting instructions..."
            rows={1}
            disabled={isLoading}
            className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-base p-3 pl-4 max-h-32 resize-none focus:outline-none disabled:opacity-50 scrollbar-hide font-sans"
          />

          <div className="flex items-center pb-2 pr-2">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                !input.trim() || isLoading
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]'
              }`}
            >
              {isLoading ? (
                <Icons.Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Icons.Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-2 text-center">
            <p className="text-[10px] text-cyan-900/60 font-mono tracking-widest uppercase">
                Jarvis Systems Secure • Gemini Core Active
            </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
