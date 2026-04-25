import { motion } from "motion/react";
import { Shield, ChevronRight, AlertTriangle, Zap, Clock, CheckCircle2, Menu, X, Info, Lock, Home, Mail, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

interface LandingPageProps {
  offerUrl: string;
  title: string;
  description: string;
  geoRestricted?: 'CH';
  deviceRestricted?: 'Apple' | 'Desktop';
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Surveys", path: "/surveys" },
    { name: "Gift Cards", path: "/gift-cards" },
    { name: "Cash Rewards", path: "/cash-rewards" },
    { name: "Coupons", path: "/coupons" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070908]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Shield className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">OfferCheck</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#22C55E] ${
                  location.pathname === link.path ? "text-[#22C55E]" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/verify-status" className="px-4 py-2 bg-[#22C55E] text-black text-sm font-bold rounded-md hover:bg-[#1ea34d] transition-all transform hover:scale-105">
              Verify Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-[#0a0c0b] border-b border-white/5"
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium ${
                location.pathname === link.path ? "text-[#22C55E]" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/verify-status"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-[#22C55E] text-black text-center font-bold rounded-md"
          >
            Verify Now
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#070908] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
              <Shield className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <span className="font-bold text-white tracking-tight text-xl">OfferCheck</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Professional automated eligibility checking for exclusive reward opportunities. We verify region and eligibility criteria in real-time.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Categories</h4>
          <ul className="space-y-4">
            <li><Link to="/surveys" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Paid Surveys</Link></li>
            <li><Link to="/gift-cards" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Gift Cards</Link></li>
            <li><Link to="/cash-rewards" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Cash Rewards</Link></li>
            <li><Link to="/coupons" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Digital Coupons</Link></li>
            <li><Link to="/earn-10-online" className="text-[#22C55E]/80 hover:text-[#22C55E] text-sm transition-colors font-bold underline decoration-[#22C55E]/30 underline-offset-4">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">About Us</Link></li>
            <li><Link to="/privacy" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Privacy Policy</Link></li>
            <li><a href="mailto:support@offereligibilitycheck.com" className="text-gray-500 hover:text-[#22C55E] text-sm transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[11px] text-gray-600 font-medium">
          © 2026 OfferEligibilityCheck. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
             <Shield className="w-4 h-4 text-gray-700" />
             <Lock className="w-4 h-4 text-gray-700" />
             <CheckCircle2 className="w-4 h-4 text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | OfferEligibilityCheck";
    
    // Canonical link injection
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://offereligibilitycheck.com/about');
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070908] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your Trusted Portal for <span className="text-[#22C55E]">Offer Verification</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">We simplify the complex world of online rewards by providing a seamless, automated entry point for US residents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Automated Checking</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Our advanced geolocation technology automatically filters eligibility based on your IP and residency status.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Privacy Focused</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We do not store your personal data locally. All verification processes are temporary and focused on eligibility criteria.</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-gray-400">
            <h2 className="text-white text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="mb-4">
              OfferEligibilityCheck was founded to bridge the gap between premium promotional companies and their intended audience. Frequently, users are frustrated by "ineligible" messages after completing long surveys. 
              Our utility solves this by checking the fundamental criteria (Location, Offer Availability, and Status) *before* you engage with the full offer.
            </p>
            <p>
              We operate globally with a focus on verified markets to ensure that the rewards we promote are valid, current, and accessible to our user base.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy | OfferEligibilityCheck";
    
    // Canonical link injection
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://offereligibilitycheck.com/privacy');
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070908] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="prose prose-invert max-w-none prose-sm text-gray-400"
        >
          <h1 className="text-white text-3xl font-bold mb-8">Privacy Policy</h1>
          <p className="mb-8">Last Updated: April 25, 2026</p>
          
          <h3 className="text-white text-xl font-bold mt-8 mb-4">1. Information We Collect</h3>
          <p className="mb-4">
            We collect minimal technical information to provide our services:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your IP address and geolocation (to determine eligibility).</li>
            <li>Device type and browser information for optimization.</li>
            <li>Referral source (if applicable).</li>
          </ul>

          <h3 className="text-white text-xl font-bold mt-8 mb-4">2. How We Use Information</h3>
          <p className="mb-6">
            Information is used solely to verify eligibility requirements for specific reward regions. We do not sell or rent this technical data to third parties.
          </p>

          <h3 className="text-white text-xl font-bold mt-8 mb-4">3. Third-Party Links</h3>
          <p className="mb-6">
            Our service redirects to third-party offer providers. Once you leave our platform, you are subject to the privacy policies of those external sites. We encourage you to review their terms.
          </p>

          <h3 className="text-white text-xl font-bold mt-8 mb-4">4. Cookies</h3>
          <p className="mb-6">
            We use essential cookies to maintain your eligibility session and prevent duplicate automated checks.
          </p>

          <h3 className="text-white text-xl font-bold mt-8 mb-4">5. Contact Info</h3>
          <p className="mb-6">
            For privacy inquiries, contact support at <span className="text-[#22C55E]">support@offereligibilitycheck.com</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const offerUrl = "https://singingfiles.com/show.php?l=0&u=2520769&id=74463";
  
  useEffect(() => {
    document.title = "How I Earned My First $10 Online: A Step-by-Step Guide | OfferCheck Blog";
    
    // Canonical link injection
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://offereligibilitycheck.com/earn-10-online');
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#070908] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="prose prose-invert max-w-none text-gray-400 prose-green"
        >
          <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-8">How I Earned My First $10 Online: A Step-by-Step Guide with <span className="text-[#22C55E]">SingingFiles</span></h1>
          
          <p className="text-xl leading-relaxed mb-8">
            Are you looking for a legit way to make a little extra cash from home? I recently tried out <strong>SingingFiles</strong> (also known as Surveys2Cash), and to my surprise, I made my first $10 pretty quickly—just by answering surveys! If you’ve been wondering how this works (or if it’s worth your time), here’s my honest, step-by-step experience and exactly how you can do it too.
          </p>

          <hr className="border-white/5 my-12" />

          <h2 className="text-white text-2xl font-bold mb-4">Why I Tried SingingFiles</h2>
          <p className="mb-6">
            Let’s face it: there are a ton of “get paid for surveys” sites out there. Some are great, some are scams. I had heard mixed things about survey sites—and I wanted something <strong>simple</strong>, with real payouts, and preferably a fast start. That’s why I decided to sign up for <strong>SingingFiles</strong> after reading several positive reviews.
          </p>

          <h2 className="text-white text-2xl font-bold mb-4">Step 1: Quick & Easy Sign Up</h2>
          <p className="mb-4 font-bold text-white">Signing up was fast and straightforward. Here’s what you’ll need:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Name and email address</li>
            <li>U.S. residency (18+)</li>
            <li>Basic demographic info (age, address, phone)</li>
          </ul>
          <p className="mb-6 italic">
            <strong>Tip:</strong> Be honest in your details—SingingFiles uses this info to match you with the right surveys.
          </p>

          <h2 className="text-white text-2xl font-bold mb-4">Step 2: Complete the Onboarding Questionnaire</h2>
          <p className="mb-6">
            As soon as I joined, I was taken to a brief questionnaire. This is <strong>super important</strong>—it unlocks higher-paying surveys by helping the system understand what offers are most relevant for you. I spent about 2 minutes filling it out, and then I started seeing available surveys right away.
          </p>

          <h2 className="text-white text-2xl font-bold mb-4">Step 3: Take Your First Survey (and Get Paid!)</h2>
          <p className="mb-6">
            The first survey I qualified for was only about 10 minutes long. After submitting it, I received a confirmation email and saw my account balance increase. 
            <strong> Pro tip:</strong> Sometimes you may be screened out of a few surveys at first—don’t be discouraged! The more you complete, the more matches you'll get.
          </p>

          <h2 className="text-white text-2xl font-bold mb-4">Step 4: Reach the Payout Threshold</h2>
          <p className="mb-6">
            Many survey sites make you wait forever to cash out, but <strong>SingingFiles</strong> lets you <strong>cash out as soon as you hit $10</strong> (which I did in under a week, doing surveys in my spare time). They pay via several options (usually PayPal or gift cards), and I chose PayPal for instant access.
          </p>

          <h2 className="text-white text-2xl font-bold mb-4">Step 5: Cash Out and Celebrate!</h2>
          <p className="mb-12">
            About 24 hours after cashing out, my $10 PayPal payment hit my account. No hidden fees, no confusing hoops. Just simple, real money for surveys.
          </p>

          <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 p-8 rounded-3xl mb-12">
            <h3 className="text-white text-2xl font-black mb-6">Ready to get started?</h3>
            <p className="mb-8 text-gray-300">Join thousands of others earning their first $10 through our verified portal.</p>
            <a 
              href={offerUrl}
              className="inline-flex items-center gap-2 bg-[#22C55E] text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              SIGN UP FOR SINGINGFILES
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <h2 className="text-white text-2xl font-bold mb-4">Should You Try SingingFiles?</h2>
          <p className="mb-12">
            If you’re looking for a quick, zero-risk way to earn a few dollars during your downtime, <strong>I definitely recommend trying SingingFiles</strong>. It won’t make you rich, but it’s one of the most hassle-free survey sites I’ve used—and that first payout feels great!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const LandingPage = ({ offerUrl, title, description, geoRestricted, deviceRestricted }: LandingPageProps) => {
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(576); // 9:36 in seconds
  const [spotsLeft, setSpotsLeft] = useState(17);
  const [claimedCount, setClaimedCount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'checking' | 'allowed' | 'geo_denied' | 'device_denied'>('checking');

  useEffect(() => {
    // Update meta tags dynamically for SEO
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    // Canonical link injection
    const location = window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://offereligibilitycheck.com${location === '/' ? '/' : location}`);
    
    window.scrollTo(0, 0);

    let isMounted = true;
    
    const runChecks = async () => {
      // 0. Robust Bot Bypass for SEO & Inspection Tools
      const ua = navigator.userAgent.toLowerCase();
      const isBot = /bot|googlebot|crawler|spider|robot|crawling|bingbot|yandex|slurp|baiduspider|facebookexternalhit|whatsapp|telegrambot/i.test(ua);
      
      if (isBot) {
        if (isMounted) {
          console.log("Bot detected as:", ua, "- Bypassing restrictions");
          setVerificationStatus('allowed');
        }
        return;
      }

      // 1. Device Check
      if (deviceRestricted === 'Apple') {
        const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
        if (!isApple) {
          if (isMounted) setVerificationStatus('device_denied');
          return;
        }
      } else if (deviceRestricted === 'Desktop') {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          if (isMounted) setVerificationStatus('device_denied');
          return;
        }
      }

      // 2. Geo Check
      if (geoRestricted) {
        try {
          const res = await fetch('https://get.geojs.io/v1/ip/country.json');
          const data = await res.json();
          if (!isMounted) return;
          if (data.country === geoRestricted) {
            setVerificationStatus('allowed');
          } else {
            setVerificationStatus('geo_denied');
          }
        } catch (error) {
          if (isMounted) setVerificationStatus('allowed'); // Fallback
        }
      } else {
        if (isMounted) setVerificationStatus('allowed');
      }
    };

    runChecks();

    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Dynamic Spots Simulation
    const spotsTimer = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev <= 3) return prev;
        return Math.random() > 0.85 ? prev - 1 : prev;
      });
    }, 4500);

    const targetClaimed = 1422;
    let current = 0;
    const animationFrame = requestAnimationFrame(function animate() {
      if (current < targetClaimed) {
        current += 11;
        setClaimedCount(Math.min(current, targetClaimed));
        requestAnimationFrame(animate);
      }
    });

    const fadeIn = setTimeout(() => setShowContent(true), 200);

    return () => {
      isMounted = false;
      clearInterval(timer);
      clearInterval(spotsTimer);
      clearTimeout(fadeIn);
      cancelAnimationFrame(animationFrame);
    };
  }, [title, description, geoRestricted, deviceRestricted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTA = () => {
    window.location.href = offerUrl;
  };

  if (verificationStatus === 'checking') {
    return (
      <div className="min-h-screen bg-[#070908] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#22C55E]/20 border-t-[#22C55E] rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm animate-pulse">Running Device & Region Verification...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'geo_denied') {
    return (
      <div className="min-h-screen bg-[#070908] text-white flex flex-col items-center justify-center p-6 text-center">
        <Globe className="w-16 h-16 text-yellow-500 mb-6 opacity-50" />
        <h1 className="text-3xl font-black mb-4">REGION RESTRICTED</h1>
        <p className="text-gray-400 max-w-md leading-relaxed font-medium">This high-value offer is currently optimized for residents of Switzerland. Your geographic scan indicates access from a different region.</p>
        <Link to="/" className="mt-8 text-[#22C55E] border border-[#22C55E]/30 px-8 py-3 rounded-2xl font-bold hover:bg-[#22C55E]/10 transition-all">Return to Global Offers</Link>
      </div>
    );
  }

  if (verificationStatus === 'device_denied') {
    return (
      <div className="min-h-screen bg-[#070908] text-white flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-16 h-16 text-[#22C55E] mb-6 opacity-50" />
        <h1 className="text-3xl font-black mb-4">{deviceRestricted === 'Apple' ? 'APPLE DEVICE REQUIRED' : 'DESKTOP REQUIRED'}</h1>
        <p className="text-gray-400 max-w-md leading-relaxed font-medium">
          {deviceRestricted === 'Apple' 
            ? 'This rewards portal is exclusively available for Apple OS users (iOS/macOS). Your system scan detected a different operating platform.'
            : 'Diese Umfragen sind exklusiv für Desktop-Benutzer optimiert. Bitte nutzen Sie einen Computer oder Laptop für den Zugriff.'
          }
        </p>
        <Link to="/" className="mt-8 text-[#22C55E] border border-[#22C55E]/30 px-8 py-3 rounded-2xl font-bold hover:bg-[#22C55E]/10 transition-all">See Other Offers</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070908] text-[#E0E0E0] selection:bg-[#22C55E]/30 selection:text-white pt-16">
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-[#22C55E]/5 border border-[#22C55E]/20 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22C55E]">System Online: Verification Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] max-w-4xl mb-6"
          >
            SECURE YOUR <span className="text-[#22C55E]">ELIGIBILITY</span> BEFORE ACCESS EXPIRES
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed mb-12"
          >
            The final verification window for premium rewards is now open. Automated eligibility checks are currently being processed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[420px] bg-[#0A0C0B] border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden mb-12"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                ENCRYPTED PORTAL
              </div>
              <div className="text-[11px] font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                RX-992-B
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-white/5">
              <div className="p-6 border-r border-white/5 text-left">
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-1">Time Remaining</div>
                <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500/50" />
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="p-6 text-left">
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-1">Spots Left</div>
                <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#22C55E]/50" />
                  0{spotsLeft}
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">Geographic Scan Completed</h4>
                  <p className="text-[11px] text-gray-500">Region eligibility confirmed.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">System Handshake Active</h4>
                  <p className="text-[11px] text-gray-500">Automated status check complete.</p>
                </div>
              </div>

              <button 
                onClick={handleCTA}
                className="w-full group relative bg-[#22C55E] text-black h-16 rounded-2xl font-black text-lg tracking-tight overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  VERIFY ELIGIBILITY NOW
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#22C55E] via-[#4ade80] to-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 py-4 px-8 bg-white/[0.02] rounded-full border border-white/5">
              <div className="flex -space-x-4">
              <div className="w-11 h-11 rounded-full border-[3px] border-[#070908] bg-[#22C55E] relative z-30" />
              <div className="w-11 h-11 rounded-full border-[3px] border-[#070908] bg-[#F59E0B] relative z-20" />
              <div className="w-11 h-11 rounded-full border-[3px] border-[#070908] bg-[#22C55E] relative z-10" />
            </div>
              <p className="text-sm font-medium text-gray-400">
                <span className="text-white font-bold">{claimedCount.toLocaleString()}</span> users checked today
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73209"
              title="Reward Eligibility Check | Verified Access Portal"
              description="Check your eligibility for exclusive rewards and promotional offers. 100% free, automated eligibility check for verified users."
            />
          } 
        />
        <Route 
          path="/verify-status" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73805"
              title="Exclusive Reward Verification | Limited Access"
              description="Unlock access to premium reward programs. Our automated eligibility checker confirms your status in seconds. 100% free for verified residents."
            />
          } 
        />
        <Route 
          path="/check-rewards" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73805"
              title="Verify Your Claim | Premium Rewards Portal"
              description="Check your eligibility for premium rewards. Limited time promotional portal for verified residents. 30-second verification process."
            />
          } 
        />
        <Route 
          path="/gift-cards" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73209"
              title="Retail Gift Card Eligibility | Verified Access"
              description="Check eligibility for high-value retail gift cards. Automated status verification for verified residents only."
            />
          } 
        />
        <Route 
          path="/cash-rewards" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73805"
              title="Instant Cash Reward Status | Global Portal"
              description="Verify your status for premium cash reward programs. Fast, secure, and automated eligibility check for residents."
            />
          } 
        />
        <Route 
          path="/coupons" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=73209"
              title="Premium Digital Coupons | Verification Portal"
              description="Check your eligibility for exclusive digital coupons and savings. Valid for verified residents."
            />
          } 
        />
        <Route 
          path="/surveys" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=74817"
              title="Bezahlte Umfragen Schweiz | Geld verdienen mit Ihrer Meinung"
              description="Überprüfen Sie Ihre Berechtigung für hochbezahlte Online-Umfragen in der Schweiz. Verdienen Sie Geld mit Ihrer Meinung über unser automatisiertes Verifizierungsportal."
              geoRestricted="CH"
              deviceRestricted="Apple"
            />
          } 
        />
        <Route 
          path="/umfragen-schweiz" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=74815"
              title="Top Bezahlte Umfragen Schweiz | Desktop Portal"
              description="Exklusive Umfragen für Schweizer Desktop-Nutzer. Überprüfen Sie jetzt Ihre Berechtigung und fangen Sie an zu verdienen."
              geoRestricted="CH"
              deviceRestricted="Desktop"
            />
          } 
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/earn-10-online" element={<BlogPostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
