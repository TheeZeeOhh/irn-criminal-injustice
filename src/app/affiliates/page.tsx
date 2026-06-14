"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Activity, Network, Terminal, Lock, Power, Key } from "lucide-react";

const affiliates = [
  { id: 1, name: "Black and Pink", status: "Connected", latency: "12ms", color: "text-pink-500" },
  { id: 2, name: "Destination Tomorrow", status: "Connected", latency: "18ms", color: "text-cyan-500" },
  { id: 3, name: "Audre Lorde Project", status: "Syncing", latency: "45ms", color: "text-yellow-500" },
  { id: 4, name: "Sylvia Rivera Law Project", status: "Connected", latency: "14ms", color: "text-purple-500" },
];

export default function AffiliatePortal() {
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Initial boot sequence
    const bootLogs = [
      "INITIALIZING ZK MESH NODE...",
      "ESTABLISHING SECURE CONNECTION TO AFFILIATE NETWORK...",
      "HANDSHAKE PROTOCOL ACCEPTED.",
      "AWAITING INJUNCTION SHIELD DEPLOYMENT COMMAND."
    ];
    
    let currentLogs: string[] = [];
    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        currentLogs = [...currentLogs, `[${new Date().toLocaleTimeString()}] ${log}`];
        setLogs(currentLogs);
      }, index * 600);
    });
  }, []);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const deployShield = () => {
    if (isShieldActive || isDeploying) return;
    setIsDeploying(true);
    addLog("INITIATING INJUNCTION SHIELD DEPLOYMENT...");
    
    setTimeout(() => addLog("VERIFYING AFFILIATE SIGNATURES..."), 1000);
    setTimeout(() => addLog("ZERO-KNOWLEDGE PROOFS VALIDATED."), 2000);
    setTimeout(() => addLog("ROUTING THROUGH DECENTRALIZED MESH..."), 3000);
    setTimeout(() => {
      addLog("INJUNCTION SHIELD SUCCESSFULLY DEPLOYED. NETWORK SECURED.");
      setIsDeploying(false);
      setIsShieldActive(true);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Cyberpunk Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 flex flex-col gap-8 min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter flex items-center gap-3">
              <Network className="text-cyan-400 w-8 h-8" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
                AFFILIATE_PORTAL //
              </span>
            </h1>
            <p className="text-neutral-400 mt-1 text-sm uppercase tracking-wide">Decentralized Autonomous Injunction System</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-bold tracking-wider">ZK MESH SECURE</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800">
              <Lock className="w-4 h-4" />
              <span className="font-semibold tracking-wider">E2E ENCRYPTED</span>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* Left Column: Network Entities */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-pink-400 uppercase tracking-wider">
                <Activity className="w-5 h-5" />
                Active Affiliates
              </h2>
              
              <div className="space-y-3">
                {affiliates.map((aff) => (
                  <div key={aff.id} className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/50 hover:border-neutral-700/80 transition-colors group">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">{aff.name}</span>
                      <span className={`text-xs mt-0.5 font-bold tracking-wider ${aff.color}`}>{aff.status.toUpperCase()}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 bg-black px-2 py-1 rounded border border-neutral-800">{aff.latency}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5 backdrop-blur-md relative overflow-hidden shadow-2xl"
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500"></div>
               <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-400 uppercase tracking-wider">
                <Key className="w-5 h-5" />
                Key Registry
              </h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-2 text-neutral-400 font-bold uppercase tracking-wider">
                    <span>Consensus Threshold</span>
                    <span className="text-purple-400">3 / 4 Sigs</span>
                  </div>
                  <div className="h-2.5 w-full bg-black rounded-full overflow-hidden border border-neutral-800">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 w-3/4 relative">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-black rounded-lg text-xs break-all text-neutral-500 border border-neutral-800 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-purple-400 font-bold mb-1 block">Local Node ID:</span>
                  <span className="font-mono text-neutral-400">0x7F2a9C...3d9b4E</span>
                  <span className="ml-2 text-neutral-600">(IRN_CORE)</span>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column: Deployment & Logs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Deploy Action */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-8 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[300px]"
            >
              {/* Conditional background glow based on state */}
              <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${
                isShieldActive ? 'bg-cyan-500' : isDeploying ? 'bg-yellow-500' : 'bg-pink-500'
              } mix-blend-screen blur-3xl pointer-events-none`}></div>

              <div className="relative z-10 text-center max-w-lg mx-auto">
                <Shield className={`w-24 h-24 mx-auto mb-6 transition-all duration-700 ${
                  isShieldActive ? 'text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] scale-110' : 
                  isDeploying ? 'text-yellow-400 animate-pulse scale-105' : 'text-neutral-700'
                }`} />
                
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Injunction Shield</h2>
                <p className="text-neutral-400 text-sm mb-10 leading-relaxed">
                  Deploy cryptographic legal defenses across the federated network. 
                  This action requires active Zero-Knowledge proofs from all participating nodes.
                </p>
                
                <button 
                  onClick={deployShield}
                  disabled={isDeploying || isShieldActive}
                  className={`
                    relative group px-10 py-5 rounded-lg font-bold text-lg tracking-widest uppercase transition-all duration-300
                    flex items-center gap-3 mx-auto disabled:cursor-not-allowed overflow-hidden
                    ${isShieldActive 
                      ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]' 
                      : isDeploying
                        ? 'bg-yellow-950/50 text-yellow-400 border border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.1)]'
                        : 'bg-pink-600 text-white hover:bg-pink-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] border border-pink-500'
                    }
                  `}
                >
                  {!isShieldActive && !isDeploying && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  )}

                  {isShieldActive ? (
                    <>
                      <Shield className="w-6 h-6" />
                      SHIELD ACTIVE
                    </>
                  ) : isDeploying ? (
                    <>
                      <Zap className="w-6 h-6 animate-bounce" />
                      DEPLOYING...
                    </>
                  ) : (
                    <>
                      <Power className="w-6 h-6" />
                      DEPLOY SHIELD
                    </>
                  )}
                </button>
              </div>
            </motion.section>

            {/* Terminal Output */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#050505] border border-neutral-800/80 rounded-xl flex-1 flex flex-col overflow-hidden min-h-[250px] shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-neutral-800 via-cyan-500/50 to-neutral-800"></div>
              <div className="bg-neutral-900/80 border-b border-neutral-800/80 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 tracking-widest uppercase">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  SYSTEM_LOG // ZK_MESH
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                </div>
              </div>
              <div className="p-5 overflow-y-auto font-mono text-[13px] flex flex-col gap-2 flex-1 relative">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${log.includes("SUCCESSFULLY DEPLOYED") ? "text-cyan-400 font-bold" : 
                                   log.includes("INITIATING") ? "text-pink-400" : 
                                   log.includes("VERIFYING") || log.includes("ROUTING") ? "text-yellow-400" : 
                                   "text-green-500"}`}
                    >
                      <span className="text-neutral-600 mr-2">{'>'}</span>
                      {log}
                    </motion.div>
                  ))}
                  {isDeploying && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-4 bg-yellow-400 inline-block mt-2 ml-4"
                    />
                  )}
                  {!isDeploying && logs.length > 0 && (
                     <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 1 }}
                     className="w-2 h-4 bg-cyan-400/50 inline-block mt-2 ml-4"
                   />
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      
      {/* Global styles for shimmers if needed, but tailwind arbitrary values work well */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
