import React from 'react';
import { Icons } from './Icon';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-slate-900 p-2 rounded-full border border-cyan-500/50">
               <Icons.Cpu className="w-6 h-6 text-cyan-400 animate-pulse-glow" />
            </div>
          </div>
          <div>
            <h1 className="font-hud text-2xl font-bold tracking-widest text-white">
              J.A.R.V.I.S.
            </h1>
            <div className="flex items-center space-x-2 text-[10px] text-cyan-500/80 font-mono uppercase tracking-wider">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Online
              </span>
              <span>|</span>
              <span>Ver 2.5.0</span>
            </div>
          </div>
        </div>

        {/* HUD Elements */}
        <div className="hidden sm:flex items-center space-x-6">
          <div className="flex flex-col items-end font-mono text-xs text-slate-500">
            <div className="flex items-center space-x-1 text-cyan-500/60">
               <Icons.Activity size={12} />
               <span>CPU LOAD: 12%</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-500/60">
               <Icons.Shield size={12} />
               <span>SECURE</span>
            </div>
          </div>
          
          <button 
            onClick={onReset}
            className="p-2 text-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-950/30 rounded-full transition-all duration-200 border border-transparent hover:border-cyan-500/30"
            title="Reset Protocol"
          >
            <Icons.Reset size={18} />
          </button>
        </div>

      </div>
      
      {/* Decorative scanline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
    </header>
  );
};

export default Header;
