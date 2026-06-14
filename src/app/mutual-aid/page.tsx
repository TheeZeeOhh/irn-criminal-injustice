'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MutualAidPortal() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const connectWallet = () => {
    setStatusMessage('Connecting to Web3 Provider...');
    setTimeout(() => {
      setWalletConnected(true);
      setStatusMessage('Wallet Connected: 0x7F...3B9A');
    }, 1500);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      setStatusMessage('Please connect your wallet first.');
      return;
    }
    if (!donationAmount) {
      setStatusMessage('Enter a valid amount.');
      return;
    }
    setStatusMessage('Routing funds to Zero-Knowledge Ledger...');
    setTimeout(() => {
      setStatusMessage(`Successfully routed ${donationAmount} ETH to mutual aid pool. Transaction Hash: 0x${Math.random().toString(16).substring(2, 10)}...`);
      setDonationAmount('');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#E8E2D6] pt-24 pb-12 px-6 flex flex-col items-center justify-center font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-[#111] p-8 md:p-12 rounded-xl border border-[#333] shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4A843] opacity-5 blur-[100px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-widest text-[#D4A843]" style={{ fontFamily: 'var(--font-display)' }}>
          ZK-MUTUAL AID PORTAL
        </h1>
        <p className="text-sm md:text-base text-[#8B7E6D] text-center mb-8 max-w-lg mx-auto">
          Route your funds anonymously via our Zero-Knowledge ledger. Support the Injunction Shield and community defense.
        </p>

        <div className="flex flex-col items-center gap-6">
          {!walletConnected ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-[#D4A843] text-[#D4A843] font-bold tracking-widest uppercase hover:bg-[#D4A843] hover:text-black transition-colors rounded-md"
            >
              Connect Wallet
            </motion.button>
          ) : (
            <form onSubmit={handleDonate} className="w-full max-w-md space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#8B7E6D]">Amount (ETH)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-3 rounded outline-none focus:border-[#D4A843] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7E6D]">ETH</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-[#D4A843] text-black font-bold tracking-widest uppercase rounded-md shadow-[0_0_15px_rgba(212,168,67,0.3)] hover:shadow-[0_0_25px_rgba(212,168,67,0.5)] transition-shadow"
              >
                Route Funds
              </motion.button>
            </form>
          )}

          {statusMessage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-[#1a1a1a] border border-[#333] rounded w-full max-w-md text-sm text-center break-words text-green-400"
            >
              {statusMessage}
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
