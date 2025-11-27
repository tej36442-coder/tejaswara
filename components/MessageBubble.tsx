import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import { Icons } from './Icon';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isModel = message.role === Role.MODEL;

  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isModel ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border ${
          isModel 
            ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
            : 'bg-slate-800 border-slate-600 text-slate-300'
        }`}>
          {isModel ? <Icons.Bot size={16} /> : <Icons.User size={16} />}
        </div>

        {/* Content Bubble */}
        <div className={`relative px-5 py-4 rounded-2xl border backdrop-blur-sm ${
          isModel
            ? 'bg-slate-900/60 border-cyan-900/50 text-slate-100 rounded-tl-none'
            : 'bg-cyan-950/30 border-cyan-800/30 text-cyan-50 rounded-tr-none'
        }`}>
          {/* Header for Model */}
          {isModel && (
            <div className="flex items-center space-x-2 mb-2 border-b border-cyan-900/30 pb-1">
              <span className="font-hud text-xs font-bold text-cyan-500 tracking-wider">J.A.R.V.I.S.</span>
              {message.isStreaming && (
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              )}
            </div>
          )}

          <div className={`prose prose-invert prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 max-w-none text-sm md:text-base ${isModel ? 'text-slate-200' : 'text-slate-200'}`}>
            <ReactMarkdown
               components={{
                code(props) {
                    const {children, className, ...rest} = props
                    return (
                        <code {...rest} className={`${className} text-cyan-300 bg-slate-950 px-1 py-0.5 rounded border border-cyan-900/30`}>
                        {children}
                        </code>
                    )
                },
                pre(props) {
                    const {children, ...rest} = props
                    return (
                        <pre {...rest} className="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-cyan-900/30 my-2 shadow-inner">
                        {children}
                        </pre>
                    )
                }
               }}
            >
                {message.content}
            </ReactMarkdown>
          </div>
          
          <div className={`text-[10px] font-mono mt-2 opacity-50 ${isModel ? 'text-cyan-500' : 'text-slate-400'} text-right`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          {/* Decorative Corner (HUD style) */}
          {isModel && (
             <>
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50"></div>
             </>
          )}

        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
