/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Check, AlertTriangle, ChevronRight, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTA = () => {
    window.location.href = "https://YOUR-OFFER-LINK";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden flex flex-col items-center justify-center p-6 sm:p-0">
      
      <main className="relative max-w-[420px] w-full flex flex-col items-center py-12 md:py-0">
        
        {/* Verification Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full mb-8"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest leading-none">
            Live Status: Open for US Residents
          </span>
        </motion.div>

        {/* Hero Section */}
        <section className="text-center mb-8 space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black tracking-tight leading-[1.1] font-display"
          >
            Claim Your Free <br/>
            <span className="text-blue-500 underline decoration-2 underline-offset-8">US Reward</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg font-medium max-w-[340px] mx-auto leading-snug"
          >
            Limited-time promotional access for eligible users in the United States.
          </motion.p>
        </section>

        {/* Urgency Box */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={showContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-[#1A1A1A] border-l-4 border-amber-500 p-5 rounded-r-lg mb-8"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-500 uppercase tracking-wide">Status Update</p>
              <p className="text-sm text-gray-200 mt-1">This promotional access may close anytime due to limited availability in your region.</p>
            </div>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full space-y-5 mb-10"
        >
          {[
            "No credit card required",
            "Free eligibility check",
            "Takes less than 30 seconds"
          ].map((text, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-1 shrink-0">
                <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
              </div>
              <span className="text-lg font-semibold tracking-tight">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          <motion.button
            onClick={handleCTA}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-5 rounded-xl text-xl font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2"
            id="cta-button"
          >
            Check Availability Now
            <ChevronRight className="w-6 h-6" />
          </motion.button>
          
          <div className="mt-4 flex items-center space-x-2 text-gray-500">
            <Lock className="w-4 h-4 fill-current" />
            <span className="text-xs font-medium uppercase tracking-tighter">Secure 256-Bit Encrypted Portal</span>
          </div>
        </motion.div>

        {/* Footer Disclaimer */}
        <footer className="mt-16 w-full">
          <p className="text-[10px] text-gray-600 text-center leading-relaxed max-w-[320px] mx-auto uppercase tracking-wide">
            Copyright © 2024 Reward Access. This page contains promotional content and may redirect to third-party offers. Eligibility subject to verification.
          </p>
        </footer>
      </main>
    </div>
  );
}

