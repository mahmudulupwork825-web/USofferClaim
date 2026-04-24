/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Shield, ChevronRight, AlertTriangle, Zap, Clock, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(576); // 9:36 in seconds
  const [spotsLeft, setSpotsLeft] = useState(17);
  const [claimedCount, setClaimedCount] = useState(0);
  const [geoStatus, setGeoStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    let isMounted = true;
    
    // Quick Geo Check
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'true') {
      setGeoStatus('allowed');
    } else {
      fetch('https://get.geojs.io/v1/ip/country.json')
        .then(res => res.json())
        .then(data => {
          if (!isMounted) return;
          if (data.country === 'US') {
            setGeoStatus('allowed');
          } else {
            setGeoStatus('denied');
          }
        })
        .catch(() => {
          if (!isMounted) return;
          // In case of adblocker or fetch error, fail open
          setGeoStatus('allowed');
        });
    }

    const timer = setTimeout(() => setShowContent(true), 100);
    
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    let animationFrame: number;
    const startTimestamp = Date.now();
    const duration = 2500;
    const endValue = 2847;

    const step = () => {
      const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      setClaimedCount(Math.floor(easeOut * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(countdown);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTA = () => {
    window.location.href = "https://YOUR-OFFER-LINK";
  };

  if (geoStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#070908] flex items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-[#22C55E]/20 border-t-[#22C55E] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (geoStatus === 'denied') {
    return (
      <div className="min-h-screen bg-[#070908] text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-[#F59E0B] mb-6" />
        <h1 className="text-3xl font-black mb-4">Region Not Supported</h1>
        <p className="text-gray-400 max-w-sm">
          We're sorry, this promotional offer is currently only available to residents of the United States.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070908] text-white font-sans selection:bg-[#22C55E] selection:text-white overflow-x-hidden flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-[440px] flex items-center justify-between px-6 py-6 pt-8">
        <div className="flex items-center space-x-2">
          <div className="bg-[#22C55E] p-1.5 rounded-lg">
            <Shield className="w-5 h-5 text-black" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Offer<span className="text-[#22C55E]">Eligibility</span>Check
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-[#121413] border border-white/10 px-3 py-1.5 rounded-full">
          <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[12px] font-bold text-gray-300 flex items-center gap-1.5 uppercase tracking-wide">
            🇺🇸 US Live
          </span>
        </div>
      </header>

      <main className="relative max-w-[440px] w-full flex flex-col px-6 pb-20">
        
        <div className="flex flex-col gap-2 mb-10 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#1B180A]/80 border border-[#F59E0B]/30 rounded-full w-fit"
          >
            <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
            <span className="text-[10px] font-black text-[#F59E0B] uppercase tracking-[0.18em]">
              Limited Promotional Access
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#1E293B]/80 border border-[#3B82F6]/30 rounded-full w-fit"
          >
             <span className="text-base leading-none">🇺🇸</span>
             <span className="text-[10px] font-black text-[#60A5FA] uppercase tracking-[0.18em]">
               Available for US residents only
             </span>
          </motion.div>
        </div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-[54px] sm:text-[60px] font-black tracking-tighter leading-[0.9] font-display">
            Check Your <br/>
            <span className="text-[#22C55E]">US Reward</span> <br/>
            <span className="text-[#22C55E]">Eligibility</span>
          </h1>
          
          <p className="text-gray-400 text-[17px] font-medium leading-relaxed max-w-[380px]">
            Limited-time promotional access for eligible users in the United States. Check if you qualify in under 30 seconds.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3 mb-10"
        >
          {[
            {
              title: "100% Free — No Card Needed",
              desc: "Zero payment info. Nothing to enter, nothing to cancel.",
              icon: <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
            },
            {
              title: "Instant Eligibility Check",
              desc: "See if you qualify for this US-only reward — completely free.",
              icon: <Shield className="w-6 h-6 text-[#22C55E]" />
            },
            {
              title: "Done in Under 30 Seconds",
              desc: "3 quick questions. No signup, no waiting, no hassle.",
              icon: <Clock className="w-6 h-6 text-[#22C55E]" />
            }
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-4 p-5 rounded-2xl bg-[#0F1110] border border-white/5 hover:border-white/10 transition-all">
              <div className="bg-[#22C55E]/10 p-2.5 rounded-xl border border-[#22C55E]/20">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-[18px] tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-[14px] font-medium leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Urgency Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#0F1110] border border-[#F59E0B]/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-[#F59E0B]/10 p-2 rounded-lg shrink-0 mt-1 focus:ring-opacity-50">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div className="space-y-5 w-full">
              <p className="text-[17px] font-bold text-gray-200 leading-snug">
                This promotional access may close anytime due to limited availability.
              </p>
              
              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold text-sm tracking-tight uppercase">Closes in:</span>
                  <span className="font-mono text-[#F59E0B] font-black text-2xl tabular-nums tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-bold text-sm tracking-tight uppercase">Spots remaining:</span>
                  <span className="font-black text-[#F59E0B] text-lg">
                    {spotsLeft} left
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button & Social Proof */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-20px" }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="px-2 flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              filter: "brightness(1.05)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative group transition-all duration-200"
          >
            <div className="absolute -inset-1.5 bg-[#14532D] rounded-[22px] blur-sm opacity-50 group-hover:opacity-100 group-hover:blur-md transition duration-300"></div>
            <button
              onClick={handleCTA}
              className="relative w-full bg-[#22C55E] hover:bg-[#16A34A] text-black py-6 px-2 rounded-2xl text-[20px] sm:text-[22px] font-black tracking-tight transition-all flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(34,197,94,0.3)] group-hover:shadow-[0_25px_60px_rgba(34,197,94,0.45)] border-4 border-[#14532D]"
            >
              Continue to Eligibility Check
              <ChevronRight className="w-7 h-7 stroke-[4] transition-transform group-hover:translate-x-1.5 shrink-0" />
            </button>
          </motion.div>

          <p className="mt-3 text-gray-400 text-[13px] font-semibold flex items-center gap-1.5 opacity-90">
            <span className="text-[#22C55E]">✔</span> Over 10,000 US users checked this week
          </p>

          <p className="mt-5 text-gray-500 text-[14px] font-bold flex items-center gap-2">
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-base"
            >
              👆
            </motion.span> 
            Tap to verify your eligibility instantly
          </p>

          <div className="mt-8 flex items-center space-x-3 py-2 px-4 rounded-full">
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#4ADE80] border-2 border-[#070908]"></div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B] border-2 border-[#070908]"></div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#10B981] border-2 border-[#070908]"></div>
            </div>
            <p className="text-[15px] font-medium text-gray-400">
               <span className="font-black text-white">{claimedCount.toLocaleString()}</span> Americans claimed today
            </p>
          </div>

          <div className="w-full h-px bg-white/5 my-12"></div>
          
          <p className="text-[12px] text-gray-600 font-medium leading-relaxed text-center max-w-[380px]">
            © 2026 OfferEligibilityCheck. This page contains promotional content and may redirect to third-party offers. Eligibility and rewards are determined by the third-party provider.
          </p>
        </motion.div>

      </main>
    </div>
  );
}



