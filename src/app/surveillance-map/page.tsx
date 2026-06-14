'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Crosshair, Camera, Radio, AlertTriangle, Activity, Wifi, Terminal } from 'lucide-react';

const locations = [
  { id: 'nf', name: 'Norfolk', x: 50, y: 55, systems: [{ type: 'ShotSpotter', count: 32, risk: 'High' }, { type: 'ALPR', count: 145, risk: 'High' }, { type: 'Drone', count: 2, risk: 'Medium' }] },
  { id: 'vb', name: 'Virginia Beach', x: 75, y: 60, systems: [{ type: 'ALPR', count: 210, risk: 'High' }, { type: 'CCTV', count: 400, risk: 'Low' }] },
  { id: 'nn', name: 'Newport News', x: 25, y: 30, systems: [{ type: 'ShotSpotter', count: 15, risk: 'High' }, { type: 'ALPR', count: 45, risk: 'Medium' }] },
  { id: 'hm', name: 'Hampton', x: 45, y: 35, systems: [{ type: 'ALPR', count: 88, risk: 'Medium' }] },
  { id: 'pt', name: 'Portsmouth', x: 35, y: 58, systems: [{ type: 'ALPR', count: 56, risk: 'Medium' }, { type: 'CCTV', count: 120, risk: 'Low' }] },
  { id: 'sp', name: 'Chesapeake', x: 55, y: 75, systems: [{ type: 'ALPR', count: 130, risk: 'High' }] },
];

const getSystemIcon = (type: string) => {
  switch (type) {
    case 'ShotSpotter': return <Crosshair className="w-4 h-4 text-fuchsia-500" />;
    case 'ALPR': return <Camera className="w-4 h-4 text-cyan-400" />;
    case 'Drone': return <Radio className="w-4 h-4 text-yellow-400" />;
    case 'CCTV': return <Shield className="w-4 h-4 text-emerald-400" />;
    default: return <Activity className="w-4 h-4 text-gray-400" />;
  }
};

const getSystemColor = (type: string) => {
  switch (type) {
    case 'ShotSpotter': return 'text-fuchsia-500 border-fuchsia-500/50 bg-fuchsia-500/10';
    case 'ALPR': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10';
    case 'Drone': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
    case 'CCTV': return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10';
    default: return 'text-gray-400 border-gray-400/50 bg-gray-400/10';
  }
};

export default function SurveillanceMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [glitch, setGlitch] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono overflow-hidden relative selection:bg-cyan-900 selection:text-cyan-100 p-4 md:p-8">
      {/* Background Grid & Cyberpunk Effects */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <motion.div 
        animate={{ y: ["0%", "100%"] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent z-0 pointer-events-none mix-blend-screen"
      />

      <div className="max-w-7xl mx-auto relative z-10 h-full min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-cyan-900/50 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Wifi className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <div>
              <h1 className={`text-2xl font-bold tracking-wider text-cyan-100 ${glitch ? 'translate-x-1' : ''}`}>IRN // INJUNCTION SHIELD</h1>
              <p className="text-xs text-cyan-500 tracking-widest uppercase">Hampton Roads Surveillance Mapping v1.0.4</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" /> Live Uplink</div>
            <div className="px-3 py-1 border border-cyan-900 bg-cyan-950/30 text-cyan-400">STATUS: DECENTRALIZED</div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12 lg:pb-0">
          
          {/* Map Area */}
          <div className="lg:col-span-2 relative bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center backdrop-blur-sm min-h-[400px]">
            <div className="absolute inset-0 border border-cyan-500/20 m-4 rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/10 to-transparent" />
            
            {/* Map Container */}
            <div className="relative w-full max-w-2xl aspect-[4/3] m-8 border border-slate-800/80 bg-slate-950/80 rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)]">
              
              {/* Pseudo-map graphic details */}
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20% 10% Q 30% 15% 40% 10% T 60% 20% T 80% 10%" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" />
                <path d="M 10% 30% Q 20% 35% 40% 25% T 70% 40%" fill="none" stroke="#d946ef" strokeWidth="1" strokeDasharray="4,8" opacity="0.5" />
                <path d="M 15% 80% Q 30% 60% 50% 70% T 85% 65%" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,6" opacity="0.4" />
                <path d="M 45% 45% L 55% 55%" fill="none" stroke="#eab308" strokeWidth="1" opacity="0.3" />
                <circle cx="50%" cy="55%" r="20%" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.1" />
              </svg>

              {/* Location Nodes */}
              {locations.map((loc) => {
                const isActive = activeLocation.id === loc.id;
                
                return (
                  <motion.button
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className="absolute group transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative">
                      {/* Pulse effect if active */}
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 bg-cyan-400 rounded-full"
                        />
                      )}
                      
                      {/* Core node */}
                      <div className={`w-4 h-4 rounded-full border-2 z-10 relative flex items-center justify-center transition-colors ${
                        isActive ? 'bg-cyan-400 border-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'bg-slate-800 border-cyan-600 group-hover:border-cyan-400'
                      }`}>
                        <div className="w-1 h-1 bg-slate-950 rounded-full" />
                      </div>
                      
                      {/* Label */}
                      <div className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider px-2 py-1 rounded border backdrop-blur-md transition-all ${
                        isActive 
                          ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                          : 'bg-slate-900/80 border-slate-700 text-slate-400 opacity-0 group-hover:opacity-100'
                      }`}>
                        {loc.name}
                      </div>

                      {/* Data indicators */}
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1"
                        >
                          {loc.systems.map((sys, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-700 p-1 rounded">
                              {getSystemIcon(sys.type)}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 flex flex-col backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Terminal className="w-32 h-32" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest">
                      {activeLocation.name}
                    </h2>
                    <div className="text-xs text-slate-500 mt-1 uppercase flex items-center gap-2">
                      <span>Sector {activeLocation.id.toUpperCase()}</span>
                      <span>//</span>
                      <span className="text-cyan-600">Grid {activeLocation.x}:{activeLocation.y}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cyan-900 flex items-center justify-center bg-cyan-950/30 text-cyan-500">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-fuchsia-500" />
                    Detected Contracts
                  </h3>
                  
                  {activeLocation.systems.map((sys, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-3 rounded-lg border ${getSystemColor(sys.type)} flex justify-between items-center`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-950/50 rounded border border-current opacity-80">
                          {getSystemIcon(sys.type)}
                        </div>
                        <div>
                          <div className="font-semibold tracking-wide">{sys.type}</div>
                          <div className="text-xs opacity-70 uppercase tracking-wider">{sys.count} active units</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs uppercase px-2 py-1 rounded border ${
                          sys.risk === 'High' ? 'bg-fuchsia-950/50 border-fuchsia-900 text-fuchsia-400' :
                          sys.risk === 'Medium' ? 'bg-yellow-950/50 border-yellow-900 text-yellow-400' :
                          'bg-emerald-950/50 border-emerald-900 text-emerald-400'
                        }`}>
                          {sys.risk} Risk
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button className="w-full py-3 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800 hover:border-cyan-500 transition-all rounded text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 group cursor-pointer">
                    <Shield className="w-4 h-4 group-hover:animate-pulse" />
                    Deploy Counter-Measures
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
