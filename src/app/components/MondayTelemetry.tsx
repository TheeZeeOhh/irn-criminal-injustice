'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const telemetryMessages = [
  "FERPA Violation Blocked: Unauthorized access attempt to minor records.",
  "Off-Duty Fraud Anomaly Detected: Irregular billing patterns logged.",
  "Surveillance Node 0x4A Status: Active - Gathering facial recognition data.",
  "Injunction Shield: Active. Defense protocol loaded.",
  "System Alert: Civil Rights violation flagged in precinct 4.",
  "Auditing Log: Transparency ledger updated.",
  "Warning: Data manipulation attempt logged from internal IP.",
  "MONDAY_OS Neural Net: Analyzing bodycam footage stream #33.",
  "Connection Established: Secure peer-to-peer relay node online.",
  "Alert: Potential use of force incident reported. Flagged for review."
];

export default function MondayTelemetry() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with a few logs
    setLogs([
      "MONDAY_OS Boot Sequence Initiated...",
      "Connecting to decentralized nodes...",
      "System Online."
    ]);

    const interval = setInterval(() => {
      setLogs((prevLogs) => {
        const newLog = `[${new Date().toISOString().substring(11, 19)}] ${telemetryMessages[Math.floor(Math.random() * telemetryMessages.length)]}`;
        const updatedLogs = [...prevLogs, newLog];
        return updatedLogs.slice(-20); // Keep last 20 logs
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-3xl mt-12 bg-black border border-[#333] rounded-lg overflow-hidden shadow-lg" style={{ fontFamily: 'var(--font-dm-mono)' }}>
      <div className="bg-[#111] px-4 py-2 border-b border-[#333] flex justify-between items-center">
        <span className="text-xs text-[#D4A843] tracking-widest uppercase">Monday_OS Telemetry Terminal</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 h-48 overflow-y-auto text-xs sm:text-sm text-green-400 space-y-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        {logs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
