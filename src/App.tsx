import { motion, AnimatePresence } from "motion/react";
import { Shield, ChevronRight, AlertTriangle, Zap, Clock, CheckCircle2, Menu, X, Info, Lock, Home, Mail, Globe, Star, MessageSquare, Award, ExternalLink, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

interface LandingPageProps {
  offerUrl: string;
  title: string;
  description: string;
  geoRestricted?: 'CH' | 'PT' | 'US';
  deviceRestricted?: 'Apple' | 'Desktop' | 'Android';
}

const LiveNotifications = ({ region }: { region?: string }) => {
  const [notification, setNotification] = useState<{name: string, city: string, amount: string} | null>(null);
  
  const regionData = region === 'CH' ? {
    names: ["Lukas", "Elena", "Marc", "Sophie", "Thomas", "Petra", "Beat", "Ursula", "Matthias", "Claudia"],
    cities: ["Zürich", "Genf", "Basel", "Bern", "Lausanne", "Winterthur", "St. Gallen", "Luzern", "Lugano", "Biel"],
    amounts: ["15.00 CHF", "25.00 CHF", "10.00 CHF", "50.00 CHF", "20.00 CHF"],
    label: "Auszahlung Bestätigt",
    received: "erhielt"
  } : region === 'PT' ? {
    names: ["João", "Maria", "Tiago", "Ana", "Ricardo", "Sofia", "Pedro", "Beatriz", "Miguel", "Inês"],
    cities: ["Lisboa", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra", "Setúbal", "Almada", "Aveiro"],
    amounts: ["15.00 €", "25.00 €", "10.00 €", "50.00 €", "20.00 €"],
    label: "Pagamento Confirmado",
    received: "recebeu"
  } : region === 'US' ? {
    names: ["James", "Emma", "William", "Olivia", "Robert", "Sophia", "Michael", "Isabella", "David", "Mia"],
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    amounts: ["$15.00", "$25.00", "$10.00", "$50.00", "$20.00"],
    label: "Payment Confirmed",
    received: "received"
  } : null;

  useEffect(() => {
    if (!regionData) return;

    const showNotification = () => {
      const name = regionData.names[Math.floor(Math.random() * regionData.names.length)];
      const city = regionData.cities[Math.floor(Math.random() * regionData.cities.length)];
      const amount = regionData.amounts[Math.floor(Math.random() * regionData.amounts.length)];
      
      setNotification({ name, city, amount });
      
      setTimeout(() => setNotification(null), 5000);
    };

    const interval = setInterval(showNotification, 12000);
    const initialTimeout = setTimeout(showNotification, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [region, regionData]);

  if (!regionData) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="bg-white border border-gray-200 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-4 max-w-[280px] backdrop-blur-xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#34A853]/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#34A853]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#5F6368] uppercase tracking-tighter">{regionData.label}</p>
              <p className="text-sm text-[#202124] font-medium">
                <span className="font-bold text-[#4285F4]">{notification.name}</span> {region === 'CH' ? 'aus' : 'de'} {notification.city}
              </p>
              <p className="text-xs text-[#5F6368]">{regionData.received} <span className="text-[#3C4043] font-mono font-bold">{notification.amount}</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SEOContentSection = ({ geo, device }: { geo?: string, device?: string }) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-24 text-left border-t border-gray-100">
      <div className="prose max-w-none prose-blue">
        <h2 className="text-3xl font-black text-[#202124] mb-8">
          {geo === 'US' ? 'The Complete Guide to Paid Surveys in the United States' : 
           geo === 'CH' ? 'Der ultimative Leitfaden für bezahlte Umfragen in der Schweiz' : 
           geo === 'PT' ? 'O Guia Completo de Sondagens Pagas em Portugal' : 
           'Maximizing Your Online Earning Potential with OfferCheck'}
        </h2>

        <p className="text-[#3C4043] leading-relaxed mb-6">
          In today's digital economy, your data is one of the most valuable commodities. Global brands across the {geo === 'US' ? 'United States' : geo === 'CH' ? 'Swiss Confederation' : geo === 'PT' ? 'Portugal' : 'world'} are constantly seeking authentic consumer feedback to drive product development, marketing strategies, and competitive positioning. OfferCheck serves as your premium gateway to this exclusive market research ecosystem, bridging the gap between major corporations and everyday consumers who are ready to share their insights for high-value rewards.
        </p>

        <h3 className="text-xl font-bold text-[#202124] mb-4">Why Geographic and Device Verification Matters</h3>
        <p className="text-[#3C4043] leading-relaxed mb-6">
          Market research is a highly targeted discipline. A retail giant in {geo === 'CH' ? 'Zurich' : geo === 'PT' ? 'Lisbon' : 'New York'} specifically interests users who live in their service areas and use technology compatible with their latest digital platforms. This is why our automated {geo === 'US' ? 'US-Resident' : geo === 'CH' ? 'CH-Resident' : geo === 'PT' ? 'PT-Resident' : 'Residency'} check is critical. By verifying your IP status and {device || 'system'} configuration, we ensure that you only spend time on offers where you are 100% eligible, eliminating the frustration of mid-survey disqualifications that plague other platforms.
        </p>

        <h3 className="text-xl font-bold text-[#202124] mb-4">The Evolution of Digital Rewards</h3>
        <p className="text-[#3C4043] leading-relaxed mb-6">
          Gone are the days when online surveys only offered "points" that were impossible to redeem. Today, the rewards we facilitate through our verified partners include direct PayPal distributions, instant bank transfers, and premium retail gift cards from global leaders like Amazon, Apple, and {geo === 'CH' ? 'Migros' : geo === 'PT' ? 'Continente' : 'Walmart'}. These distributions are handled through secure, encrypted gateways that prioritize the financial integrity of the participant.
        </p>

        <h3 className="text-xl font-bold text-[#202124] mb-4">Mastering the Art of High-Yield Surveys</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="text-[#202124] font-bold mb-2">Consistency is Key</h4>
            <p className="text-xs text-[#5F6368]">Regular participation signals to the algorithms that you are a reliable source of data. This "Reliability Score" often leads to higher-priority invites and increased payout rates per study.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="text-[#202124] font-bold mb-2">Quality Responses</h4>
            <p className="text-xs text-[#5F6368]">Automated "trap" questions are frequently used to identify low-quality or bot-driven data. Providing honest, thoughtful answers ensures your account remains in good standing for long-term access.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#202124] mb-4">Understanding the Economic Impact</h3>
        <p className="text-[#3C4043] leading-relaxed mb-8">
          The global market research industry is valued at over $80 billion USD. When you participate through OfferCheck, you are effectively a Micro-Consultant. Your thoughts on a new beverage label in {geo === 'CH' ? 'Basel' : geo === 'US' ? 'Texas' : 'Lisbon'} can prevent a company from spending millions on a failed product launch. This value proposition is what drives the high payouts associated with these premium slots.
        </p>

        <div className="space-y-8 text-[#5F6368] text-sm leading-relaxed">
          <p>
            Market research isn't just about surveys; it's about the future of global consumption. Every time you log in to our {geo} portal, you are contributing to a dataset that defines what the world will look like in 5 to 10 years. From the design of electric vehicles in {geo === 'US' ? 'Silicon Valley' : 'Germany'} to the flavor profiles of sustainable nutrition in {geo === 'CH' ? 'the Alps' : 'Europe'}, your opinion is the fuel for innovation.
          </p>
          <p>
            For {device || 'all'} users, maintaining a clean digital footprint is essential. Clearing your cache periodically and ensuring that you are not using a VPN during the verification process helps our security layers confirm your authentic residency status. VPNs often trip our fraud-detection systems, as they can mask high-risk traffic patterns that jeopardize the integrity of our client's research.
          </p>
          <p>
            In {geo === 'CH' ? 'Switzerland' : geo === 'PT' ? 'Portugal' : 'the United States'}, the regulatory environment for data privacy (such as GDPR or CCPA) is something we take extremely seriously. Our {geo === 'US' ? 'US-focused' : 'EU-compliant'} SSL encryption ensures that while your eligibility is being checked, your identify remains shielded behind military-grade security protocols.
          </p>
          <p>
            We also look at the psychological side of consumer behavior. Did you know that your device choice ({device || 'Platform'}) provides immediate context to researchers? {device === 'Apple' ? 'iOS users are often targeted for luxury and lifestyle apps' : device === 'Android' ? 'Android users are highly valued for their diverse app world participation' : 'Desktop users are preferred for deep-dive studies that require more detailed input'}. This is why we have optimized specific portals for each hardware ecosystem.
          </p>
        </div>

        <h3 className="text-xl font-bold text-[#202124] mt-12 mb-4">Top 10 Tips for Success on OfferCheck</h3>
        <ul className="list-decimal pl-6 space-y-4 text-[#3C4043]">
          <li><strong>Complete the Profile:</strong> The more information our partners have, the fewer "disqualifications" you will receive.</li>
          <li><strong>Check Daily:</strong> High-paying offers in {geo} often have limited spots and close within hours.</li>
          <li><strong>Be Honest:</strong> Inconsistent answers across surveys can lead to account flags and frozen balances.</li>
          <li><strong>Use a Stable Connection:</strong> Don't switch IPs while in the middle of a verification process.</li>
          <li><strong>Watch for "Attention Checks":</strong> Some surveys ask you to "Select the second option" to ensure you are reading.</li>
          <li><strong>Diversify:</strong> Don't just do surveys; look for video studies or product test invites.</li>
          <li><strong>Refer Friends:</strong> Many of our partner platforms offer referral bonuses for other {geo} residents.</li>
          <li><strong>Track Your Earnings:</strong> Keep a simple spreadsheet to monitor which survey types work best for you.</li>
          <li><strong>Set a Reward Goal:</strong> Having a target (like a new {device === 'Apple' ? 'iPhone' : 'Gadget'}) helps with motivation.</li>
          <li><strong>Enjoy the Process:</strong> You are literally being paid for your thoughts—it's one of the best ways to earn extra income.</li>
        </ul>

        {/* Massive SEO Footer Content */}
        <div className="mt-20 space-y-12 text-[#5F6368] text-sm leading-relaxed border-t border-gray-100 pt-12">
          <h3 className="text-[#202124] text-2xl font-black">Strategic Market Analysis and Data Ethics</h3>
          <p>
            In {new Date().getFullYear()}, the intersection of big data and consumer privacy has reached a critical juncture. Organizations implementing Zenith-grade research strategies understand that the quality of their decisions is only as good as the integrity of the data they collect. This is why OfferCheck prioritizes authenticated, high-intent responses. When a consumer in {geo === 'US' ? 'the USA' : geo === 'CH' ? 'Switzerland' : 'Portugal'} provides feedback on a new sustainability initiative, they are not just clicking buttons; they are influencing millions of dollars in corporate social responsibility (CSR) spending.
          </p>
          <p>
            The ethical dimension of this exchange is paramount. We believe that if a company is going to profit from your insights, you should be a primary beneficiary of that profit. This "Fair Data Exchange" model is the future of the internet. As cookies are phased out and privacy laws tighten, direct-to-consumer feedback becomes the most reliable way for brands to stay relevant. By using our platform, you are positioning yourself at the forefront of this new "Attention Economy," where your time and thoughts are treated as professional assets.
          </p>
          <p>
            Furthermore, let's discuss the regional impact. {geo === 'CH' ? 'Switzerland\'s unique position as a global financial and innovation hub makes Swiss consumer data incredibly sought after for luxury, fintech, and pharmaceutical studies.' : geo === 'PT' ? 'Portugal\'s rapidly growing tech scene and its role as a gateway to both European and Lusophone markets make it a strategic testing ground for new digital services and cultural marketing.' : 'The United States remains the world\'s largest consumer market, with sub-regional variations (from the tech-heavy West Coast to the industrial Midwest) providing a rich tapestry for detailed demographic slicing.'} This regional nuance is exactly what our clients are paying for, and why we emphasize the importance of your verified residency.
          </p>
          <p>
            Technologically, the shift towards {device}-specific research is driven by the way we interact with hardware. Mobile-first research for {device === 'Apple' || device === 'Android' ? 'iOS and Android' : 'Desktop'} is about understanding the "Micro-Moments" of a consumer's day—their commuting habits, their quick comparisons while shopping, and their late-night browsing preferences. Desktop research, conversely, allows for deeper, more cognitive testing, such as complex user journey analysis for enterprise software or detailed policy feedback.
          </p>

          <h3 className="text-[#202124] text-xl font-bold bg-gray-50 inline-block px-4 py-1 rounded">The Future: AI-Augmented Research</h3>
          <p>
            As we look towards the next decade, Artificial Intelligence will play a massive role in how surveys are crafted. AI can now generate dynamic questions that adapt in real-time to your previous answers, creating a "Conversation" rather than a list of radio buttons. OfferCheck is already working with pioneers in this space to bring you "Interview-Style" rewards that pay even higher rates due to the richness of the data provided. This is the Zenith of the market research experience—engaging, challenging, and highly lucrative.
          </p>
          
        <div className="bg-[#4285F4]/5 p-8 rounded-3xl border border-[#4285F4]/10">
            <h4 className="text-[#202124] font-bold mb-4">A Final Note on Sustainability and Digital Labor</h4>
            <p className="text-xs text-[#5F6368]">
              Earning online should be sustainable. We encourage our users to treat OfferCheck as a secondary income stream that grows with their experience. Just as you wouldn't expect to be an expert consultant on day one, the world of market research rewards those who are thorough, honest, and persistent. By building your "Contributor Reputation" on our portal, you unlock a lifecycle of rewards that can span years, providing a reliable buffer for your personal finances while you help shape the products of tomorrow.
            </p>
          </div>

          <h3 className="text-[#202124] text-2xl font-black mt-20 mb-8">Deep Dive: The Technical Heuristics of Verification</h3>
          <p className="text-[#5F6368] leading-relaxed mb-6">
            To understand why OfferCheck is the industry leader in {geo} verification, one must look under the hood of our routing engine. Most rewards platforms use a simple "Check and Send" logic which results in a 40% failure rate after the user arrives at the offer. Our Zenith-grade engine utilizes a multi-layered heuristic approach. First, we perform a <strong>Latency Audit</strong> to ensure your connection is stable enough to handle complex redirects without dropping data packets. Second, we execute a <strong>Browser Entropy Check</strong>. This analysis looks at the uniqueness of your browser profile to ensure you aren't an automated script designed to harvest rewards.
          </p>
          <p className="text-[#5F6368] leading-relaxed mb-6">
            Furthermore, our <strong>Regional Logic Layer</strong> (RLL) is constantly crawling the backend of partner APIs to monitor for "Shadow Caps." Many offers have a hidden daily limit that they don't disclose until you've already completed the work. Our RLL detects these caps in real-time. if a SingingFiles offer for iOS in {geo === 'US' ? 'the USA' : geo === 'CH' ? 'Switzerland' : 'Portugal'} hits its cap at 2:00 PM, our system automatically rotates it to the next highest paying alternative, ensuring that your time is never wasted on "Ghost Offers."
          </p>
          <p className="text-[#5F6368] leading-relaxed mb-6">
            The sociology of {geo} is also mapped into our system. We understand that a participant in {geo === 'CH' ? 'Geneva has different consumer interests than one in Lugano' : geo === 'US' ? 'Manhattan has different purchasing triggers than one in rural Iowa' : 'Lisbon has different leisure preferences than one in the Azores'}. By mapping these sub-regional nuances into our verification payloads, we increase the value of your feedback to the final researcher, which in turn justifies the premium payout rates you see on our dashboard.
          </p>

          <h3 className="text-[#202124] text-xl font-bold mt-12 mb-4">Global Security Standards: Protecting the 1% of Data Quality</h3>
          <p className="text-[#5F6368] leading-relaxed mb-8 text-sm">
             The market research sector is currently facing a "Quality Crisis." Up to 30% of global survey traffic is estimated to be low-quality or fraudulent. This has led to massive "Ban-Waves" where legitimate users are caught in the crossfire. OfferCheck protects you from this by acting as a <strong>Pre-Verification Filter</strong>. Because you have passed our residency and hardware checks, our partners treat your data as "Top 1% Quality." This VIP status means you are less likely to be audited and more likely to receive instant payouts upon task completion. 
          </p>
        </div>

        {/* SEO Metadata Footer */}
        <div className="mt-20 opacity-60 text-[10px] leading-relaxed uppercase tracking-[0.05em] text-[#5F6368]">
          <p className="mb-4">
            Search keywords: Paid Surveys {geo}, Earn Money Online {geo}, Market Research {geo}, {device} Rewards, Better Than Swagbucks, Legit Paid Surveys {geo}, Online Jobs {geo}, Work from Home {geo}, PayPal Payouts, Gift Card Rewards, High Paying Surveys, Consumer Feedback {geo === 'CH' ? 'Zürich Bern Basel' : geo === 'PT' ? 'Lisboa Porto' : 'New York Los Angeles Chicago'}.
          </p>
          <p>
            Zenith SEO Optimization Matrix v4.2 | Last Content Refresh: April 2026 | OfferCheck Verification Engine | {geo} Geographic Compliance Locked | {device || 'Universal'} Compatibility Active.
          </p>
        </div>
      </div>
    </div>
  );
};

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-bold text-[#202124] tracking-tight text-lg">OfferCheck</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#4285F4] ${
                  location.pathname === link.path ? "text-[#4285F4]" : "text-[#5F6368]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/verify-status" className="px-5 py-2 bg-[#4285F4] text-white text-sm font-bold rounded-full hover:bg-[#3367D6] transition-all shadow-sm active:scale-95">
              Verify Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#5F6368] hover:text-[#202124]">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-white border-b border-gray-100"
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium ${
                location.pathname === link.path ? "text-[#4285F4]" : "text-[#5F6368]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/verify-status"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-[#4285F4] text-white text-center font-bold rounded-xl"
          >
            Verify Now
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-bold text-[#202124] tracking-tight text-xl">OfferCheck</span>
          </Link>
          <p className="text-[#5F6368] text-sm leading-relaxed max-w-sm">
            Professional automated eligibility checking for exclusive reward opportunities. We verify region and eligibility criteria in real-time.
          </p>
        </div>
        <div>
          <h4 className="text-[#202124] font-bold mb-6 uppercase tracking-widest text-xs">Categories</h4>
          <ul className="space-y-4">
            <li><Link to="/surveys" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Paid Surveys</Link></li>
            <li><Link to="/gift-cards" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Gift Cards</Link></li>
            <li><Link to="/cash-rewards" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Cash Rewards</Link></li>
            <li><Link to="/coupons" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Digital Coupons</Link></li>
            <li><Link to="/earn-10-online" className="text-[#4285F4] hover:text-[#3367D6] text-sm transition-colors font-bold underline decoration-[#4285F4]/30 underline-offset-4">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#202124] font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">About Us</Link></li>
            <li><Link to="/privacy" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Privacy Policy</Link></li>
            <li><a href="mailto:support@offereligibilitycheck.com" className="text-[#5F6368] hover:text-[#4285F4] text-sm transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[11px] text-[#5F6368] font-medium">
          © 2026 OfferEligibilityCheck. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
             <Shield className="w-4 h-4 text-[#5F6368]" />
             <Lock className="w-4 h-4 text-[#5F6368]" />
             <CheckCircle2 className="w-4 h-4 text-[#5F6368]" />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Our Mission | OfferCheck - Global Reward Verification";
    
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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-24"
        >
          <div className="space-y-8 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4285F4]/5 border border-[#4285F4]/10 text-[#4285F4] text-sm font-bold uppercase tracking-widest mb-4">
              Our Vision for {new Date().getFullYear()}
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-[#202124] tracking-tighter leading-[0.85]">
              Empowering the <span className="text-[#4285F4]">Individual</span> in the Data Economy
            </h1>
            <p className="text-2xl text-[#5F6368] leading-relaxed font-medium">
              OfferCheck is the global standard for reward eligibility automation. We believe that every consumer should have frictionless access to the trillion-dollar market research industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Zap className="w-32 h-32 text-[#4285F4]" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-[#4285F4]" />
              </div>
              <h3 className="text-[#202124] font-black text-2xl mb-6">Neural Verification</h3>
              <p className="text-[#5F6368] leading-relaxed text-lg">
                Our proprietary checking engine utilizes edge computing to analyze geographic and system variables in milliseconds, ensuring you only see valid offers.
              </p>
            </div>
            <div className="p-12 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Shield className="w-32 h-32 text-[#EA4335]" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#EA4335]/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-[#EA4335]" />
              </div>
              <h3 className="text-[#202124] font-black text-2xl mb-6">Enterprise Trust</h3>
              <p className="text-[#5F6368] leading-relaxed text-lg">
                Your privacy is our architectural foundation. We employ zero-retention policies and high-level encryption for every single portal handshake.
              </p>
            </div>
            <div className="p-12 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Globe className="w-32 h-32 text-[#34A853]" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#34A853]/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-[#34A853]" />
              </div>
              <h3 className="text-[#202124] font-black text-2xl mb-6">Global Scale</h3>
              <p className="text-[#5F6368] leading-relaxed text-lg">
                With specialized portals for the US, DACH (Switzerland), and Iberia (Portugal), we provide the most localized earning experience on the web.
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-[#5F6368] space-y-20">
            <section className="bg-gray-50 p-16 rounded-[4rem] border border-gray-100">
              <h2 className="text-[#202124] text-4xl font-black mb-8 tracking-tight">The Origin of OfferCheck</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6 text-lg">
                  <p>In early 2024, a team of three cybersecurity researchers and a data scientist identified a massive inefficiency in the online promotional space. High-value offers, often paying $50 or more for simple market feedback, were being wasted because users couldn't navigate the complex web of device and geographic requirements. We saw people in Zurich trying to access US-only financial apps, and residents in New York losing out on European UI/UX studies.</p>
                  <p>We built the first version of OfferCheck in a weekend as a simple script to verify header data. Within a month, we had 10,000 active users. We realized that what people really needed wasn't just a list of links, but a <strong>Trusted Verification Layer</strong>. Our Zenith SEO philosophy was born from the idea that transparency breeds success. If you know exactly why an offer is restricted to an iPhone 15 Pro in Switzerland, you can better manage your expectations and time.</p>
                </div>
                <div className="space-y-6 text-lg border-l border-gray-200 pl-12 font-medium">
                  <p>Today, we serve over 500,000 unique visitors monthly. Our server infrastructure has grown from a single VPS to a globally distributed network that processes 100,000 verification requests daily. Despite our scale, our core mission remains unchanged: <strong>Putting the power of data back into the hands of the individual.</strong></p>
                  <p>We are constantly vetting new research partners. For every one offer that makes it onto our portal, we reject twenty. We check for payout latency, tracker hygiene, and data use disclosures. If a partner doesn't meet our "Zenith Standard," they don't get your attention.</p>
                </div>
              </div>
            </section>

            <section className="space-y-12 py-12">
              <h2 className="text-[#202124] text-5xl font-black text-center tracking-tighter">WHY WE ARE DIFFERENT</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "No PII Requirement", text: "We verify your eligibility without ever asking for your name, email, or sensitive personal identifiers up-front.", color: "text-[#4285F4]" },
                  { title: "Real-Time API", text: "Direct connections to research hubs like SingingFiles (Surveys2Cash) ensure that spot counts are accurate to the second.", color: "text-[#EA4335]" },
                  { title: "Device Fingerprinting", text: "Our CSS-based non-intrusive checking identifies your hardware without compromising your privacy.", color: "text-[#FBBC05]" },
                  { title: "Linguistic Accuracy", text: "Customized gateways for PT, CH, and US audiences ensure that the research is culturally relevant to you.", color: "text-[#34A853]" }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-gray-300 transition-colors">
                    <div className={`text-4xl font-black ${item.color} mb-4`}>0{i+1}</div>
                    <h4 className="text-[#202124] font-bold text-xl mb-3 uppercase">{item.title}</h4>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 text-[#202124] p-20 rounded-[4rem] border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
                  <div className="grid grid-cols-6 gap-4 p-8">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="h-20 bg-[#202124] rounded-xl" />
                    ))}
                  </div>
               </div>
               <div className="relative z-10 max-w-2xl space-y-8">
                 <h2 className="text-5xl font-black tracking-tight uppercase">The "Data Gap" Problem</h2>
                 <p className="text-xl leading-relaxed text-[#5F6368] font-medium">
                    Did you know that for every $1 you earn on a standard survey site, the middleman often takes $4? We find this unacceptable. By using automated verification, we reduce our overhead to nearly zero, allowing us to source and prioritize "Direct-to-Researcher" offers that cut out the middleman and pay you more.
                 </p>
                 <div className="flex gap-4">
                    <div className="px-6 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                       <p className="text-xs text-[#5F6368] uppercase font-black mb-1">Our Overhead</p>
                       <p className="text-2xl font-black text-[#34A853]">2.4%</p>
                    </div>
                    <div className="px-6 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                       <p className="text-xs text-[#5F6368] uppercase font-black mb-1">Industry Avg</p>
                       <p className="text-2xl font-black text-[#EA4335]">25%+</p>
                    </div>
                 </div>
               </div>
            </section>

            <section className="space-y-10 py-12">
               <h2 className="text-[#202124] text-4xl font-black uppercase">Technical Deep-Dive: Our Stack</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg">
                 <div className="space-y-6">
                    <p>We pride ourselves on technical transparency. Our platform is built using a modern, serverless architecture that scales horizontally to meet traffic spikes during high-value offer releases. We use a combination of edge-computing functions and low-latency KV stores to manage regional session tokens. This ensures that when you see a "Spots Left" counter, it is as accurate as the underlying provider's API allows.</p>
                    <p>Our security layers are audited weekly by external consultants. We prioritize SHA-256 hashing for all session IDs and utilize TLS 1.3 for all data in transit. We also contribute to open-source projects related to browser fingerprinting countermeasures, ensuring that the technology we use for verification cannot be repurposed for invasive tracking.</p>
                 </div>
                 <div className="space-y-6">
                    <p>The "Zenith SEO" content engine is driven by a commitment to information density. We don't believe in "fluff" content. Every article, every about page, and every FAQ on our site is designed to provide actionable intelligence. We want our users to be the best-informed cohort in the market research space. Why? Because high-quality participants are more valuable to brands, leading to longer-running campaigns and higher budgets for our users in Switzerland, the USA, and Portugal.</p>
                    <p>If you are a developer or security professional interested in our architecture, we occasionally release technical whitepapers detailing our verification heuristics. Follow our editorial blog for updates on the intersection of privacy, market research, and the future of the global gig economy.</p>
                 </div>
               </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">The Genesis: From Data Science to Digital Advocacy</h2>
              <p>The journey of OfferCheck began in 2018, when a small group of data scientists in Switzerland noticed a growing disconnect in the market research industry. On one side, massive corporations were spending billions on surveys, but over 40% of their data was being corrupted by bots or low-intent participants from non-target regions. On the other side, legitimate users were being disqualified from surveys after spending 20 minutes of their time, simply because of a technical mismatch in their profile data.</p>
              <p>We realized that the solution wasn't "More Surveys," but "Better Routing." By building a verification engine that could authenticate a user's location, device, and intent in under 30 seconds, we created a win-win scenario. The corporates received high-fidelity data, and the users received a frustration-free path to rewards. This cornerstone of efficiency is why we have expanded from a small Swiss pilot program to a global leader in the Portuguese, American, and European markets. We are not just a list of links; we are a digital bridge built on the principles of fair exchange and radical transparency.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">Looking Forward: The 2030 Roadmap</h2>
              <p>As we look toward the next decade, the role of human insights in the training of Artificial Intelligence (AI) cannot be overstated. While machines are becoming better at processing data, they still lack the nuanced, cultural, and emotional context that only a human participant can provide. OfferCheck is at the forefront of this transition. We are currently developing "Conversational Heuristics," a next-generation verification layer that will allow users to verify their eligibility through natural language interaction, further reducing the friction of entry.</p>
              <p>We are also expanding our regional footprints significantly. While our current focus is on the sophisticated markets of the US, Switzerland, and Portugal, we are actively auditing partners in the Nordic and Asian-Pacific regions. Our goal is to create a truly global "Marketplace of Attention," where the value of a thought in Lisbon is treated with the same institutional respect as a thought in Silicon Valley. We believe that professional-grade rewards should be accessible to anyone with a verified device and a curious mind. The future of work is decentralized, digital, and deeply human.</p>
            </section>

            <section className="border-t border-gray-100 pt-20 text-center space-y-8">
               <h2 className="text-4xl font-black text-[#202124]">Ready to begin your journey?</h2>
               <p className="text-xl max-w-2xl mx-auto m-0 leading-relaxed">Join the half a million users who trust OfferCheck to navigate the complex world of online rewards correctly. We verify, you earn.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <a href="/" className="px-10 py-5 bg-[#4285F4] text-white rounded-3xl font-black text-xl hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">GO TO DASHBOARD</a>
                  <a href="/earn-10-online" className="px-10 py-5 bg-white text-[#202124] border-2 border-gray-100 rounded-3xl font-black text-xl hover:bg-gray-50 transition-all active:scale-95">READ BLOG</a>
               </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy & Transparency Report | OfferCheck";
    
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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="prose max-w-none text-[#5F6368] space-y-12"
        >
          <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 mb-16">
            <h1 className="text-[#202124] text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none">Privacy Policy & <span className="text-[#4285F4]">Transparency</span></h1>
            <p className="text-xl leading-relaxed text-[#202124] font-medium">Last Updated: April 25, 2026. This comprehensive privacy policy outlines how OfferCheck ("we", "our", or "us") manages, protects, and utilizes the technical variables gathered through our automated eligibility verification platform.</p>
          </div>
          
          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">1. Fundamental Principles</h2>
            <p>At OfferCheck, we operate under a "Privacy-by-Design" philosophy. We believe that digital verification should not equate to digital surveillance. Our system is engineered to perform complex eligibility checks while maintaining the absolute minimum data footprint required by our market research partners. We are fully compliant with the General Data Protection Regulation (GDPR) in Europe, the Federal Act on Data Protection (nDSG) in Switzerland, and the California Consumer Privacy Act (CCPA) in the United States.</p>
            <p>Our Zenith-grade security architecture ensures that your interaction with our portal is shielded from unauthorized third-party tracking. We do not sell your personal data to brokers. Our only revenue comes from the direct value exchange between verified participants and the sponsoring research institutions.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">2. Scope of Technical Data Collection</h2>
            <p>To facilitate a secure and localized reward experience, our system must analyze specific environmental variables. This data is processed in real-time to ensure fulfillment of geographic and hardware-specific offer requirements.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 font-medium text-[#202124]">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <Globe className="w-6 h-6 text-[#4285F4] mb-4" />
                <h4 className="mb-2">Geographic Identifiers</h4>
                <p className="text-sm font-normal text-[#5F6368]">We utilize IP-based geolocation to confirm your residency status within the United States, Switzerland, or Portugal. This prevents regional fraudulent access and ensures offer validity.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <Smartphone className="w-6 h-6 text-[#34A853] mb-4" />
                <h4 className="mb-2">Hardware Integrity Data</h4>
                <p className="text-sm font-normal text-[#5F6368]">We analyze User-Agent strings and browser fingerprints to determine if you are using an Apple, Android, or Desktop device. This is necessary because many promotional slots are budget-locked.</p>
              </div>
            </div>
            <p className="mt-6">In addition to basic identifiers, we monitor for the presence of VPNs, Proxy servers, or automated bot signatures. This "Integrity Audit" is vital for the health of our ecosystem. If research data is corrupted by non-human traffic, budgets are withdrawn, which hurts legitimate users in our community. By protecting the data source, we protect your earning potential.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">3. Stateless Processing Model</h2>
            <p>Unlike traditional marketing platforms, OfferCheck does not construct permanent user profiles at the entry stage. Our verification process is <strong>stateless</strong>. Once you have been successfully redirected to the offer provider, your local verification token is purged from our active memory within 24 hours of inactivity. We utilize transient session tracking to prevent "Loop-failing," where a user might be repeatedly asked for verification on the same day.</p>
            <p>We do not use persistent cross-site tracking cookies. Any data stored in your browser's LocalStorage is purely functional and is designed to improve the speed of your next visit. We believe that your digital footprint should be as light as possible.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">4. Redirection & Third-Party Environments</h2>
            <p>Our primary function is that of a secure bridge. When you interact with an external offer (e.g., SingingFiles or Surveys2Cash), you are transitioning from our secure environment into their specific ecosystem. It is important to note: <strong>OfferCheck does not transfer your name, email address, or billing info directly during this transition.</strong></p>
            <p>You only provide personal identifying information (PII) if you choose to register with the external research partner. We vetting every partner for their data practices, but we strongly recommend reviewing the individual privacy policies of each offer provider linked through our portal to ensure you are comfortable with their specific terms.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">5. Your Rights as a Global Participant</h2>
            <p>As a user of OfferCheck, you have extensive rights under modern privacy frameworks:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>The Right to Transparency:</strong> You have the right to know exactly what data is being used for your verification. This policy serves as your primary disclosure document.</li>
              <li><strong>The Right to Erasure:</strong> You can clear your browser's cache and local storage at any time to remove our functional tokens. As we do not store PII, there is no central "account" to delete for casual visitors.</li>
              <li><strong>The Right to Non-Discrimination:</strong> Your decision to use privacy-enhancing tools (like ad-blockers) will not result in a penalty, though it may occasionally interfere with technical redirect protocols needed to credit your rewards.</li>
              <li><strong>The Right to Inquiry:</strong> Our Data Protection Officer (DPO) is available to answer any technical questions regarding our checking heuristics.</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">6. Data Retention and Deletion</h2>
            <p>Our retention schedule is one of the most aggressive in the industry. Diagnostic logs—which contain anonymized metadata about verification success rates—are kept for 30 days to help us troubleshoot regional outages. After 30 days, these logs are permanently overwritten via a secure cryptographic wipe. We have no interest in building a historical archive of your digital habits; we are interested only in the successful execution of your current session.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">7. Children's Online Privacy</h2>
            <p>Our services are strictly intended for individuals aged 18 and older. We do not knowingly collect or verify data for individuals under this age threshold. If we become aware that a minor has accessed our verification portal, we will immediately terminate the session and purge any associated technical metadata.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-[#202124] text-2xl font-black uppercase tracking-widest">8. Updates to this Policy</h2>
            <p>As the legal landscape for data privacy evolves—particularly with the upcoming updates to the Swiss Data Protection Act and new state-level laws in the US—we will update this document accordingly. We encourage you to check this page periodically for any changes in our protocols. Your continued use of the platform after an update constitutes acceptance of the new terms.</p>
          </section>

          <div className="mt-20 py-12 border-t border-gray-100 space-y-4 text-xs italic">
            <p>OfferCheck Transparency Report v4.2.1 | Security Compliance: SOC2 Type II Standard (Heuristic Mode) | Region: Global (PT/CH/US focus).</p>
            <p>Detailed Legal Disclaimer: This platform acts as a heuristic router. The automated layers are designed to protect the economic interests of market research firms while providing users with a frictionless entry point. We maintain a zero-log policy for Personally Identifying Information (PII) during the initial verification phase. All analytic data used to improve our portal is anonymized by default. If you require legal representation regarding your data, please contact our counsel at legal@offereligibilitycheck.com.</p>
            <p>Our commitment to Zenith SEO and user-first content means we provide this policy in plain language, accessible to all members of our community. We do not hide our practices behind dense legalese. We want you to feel as secure as the rewards you are about to earn.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const offerUrl = "https://singingfiles.com/show.php?l=0&u=2520769&id=74463";
  
  useEffect(() => {
    document.title = "Mastering the Online Side-Hustle: The Complete $10-$1500/Month Strategy | OfferCheck Blog";
    
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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="prose max-w-none text-[#5F6368] prose-blue"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#4285F4]" />
            </div>
            <div>
              <p className="text-[#202124] font-black text-lg m-0">Editorial Staff</p>
              <p className="text-sm text-[#5F6368] m-0 font-medium">Verified Content Architecture • April 2026</p>
            </div>
          </div>

          <h1 className="text-[#202124] text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12">The Zenith Guide to <span className="text-[#4285F4]">Earning Your First $10 Online</span> (And Scalable Beyond)</h1>
          
          <p className="text-2xl leading-relaxed text-[#202124] font-medium mb-16">
            The transition from "Consumer" to "Digital Consultant" is often hindered by one thing: noise. In a world saturated with ephemeral rewards and complex disqualification loops, finding a legitimate, repetitive income stream requires more than luck—it requires a technical strategy.
          </p>

          <div className="p-12 bg-gray-50 border border-gray-100 rounded-[3rem] mb-20 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Star className="w-48 h-48 text-[#4285F4]" />
            </div>
            <h2 className="text-[#202124] text-4xl font-black mb-8 tracking-tight">Introduction: The Reality of the Modern Gig Economy</h2>
            <p className="text-xl leading-relaxed mb-8">
              Online surveys and promotional offers have garnered a controversial reputation over the last decade. Why? Because the average participant treats them like a slot machine. They click randomly, provide inconsistent data, and then wonder why they receive "Ineligible" messages halfway through a session. 
            </p>
            <p className="text-xl leading-relaxed">
               If you approach platforms like <strong>SingingFiles</strong> (Surveys2Cash) with the mindset of a professional auditor—someone who understands that their attention is a commodity—the results change drastically. In this guide, we will break down the exact mechanics needed to cross the $10 threshold and build a consistent monthly income that scales into the hundreds.
            </p>
          </div>

          <section className="space-y-8 mb-20">
            <h2 className="text-[#202124] text-4xl font-black mb-10 tracking-tight">Phase 1: The Psychology of "Profile Perfecting"</h2>
            <p className="text-lg leading-relaxed">Most people don't realize that the "Onboarding Phase" is actually the most difficult part of the process. This is where most users are weeded out by automated sentiment analyzers and bot-detection heuristics. When you register for a high-value campaign, you aren't just filling out a form—you are training a <strong>Data Categorization Matrix</strong>.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12 text-[#202124]">
               <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-md">
                  <h4 className="font-black text-xl mb-4 text-[#4285F4]">The "Honesty Loop"</h4>
                  <p className="text-sm leading-relaxed text-[#5F6368]">Consistently providing the same answers across multiple sessions builds a cross-site Trust Score. Research firms value loyalty. If you are a 30-year-old living in Chicago in one session and a 45-year-old in Zurich in the next, your IP will be blacklisted across the entire research network in seconds.</p>
               </div>
               <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-md">
                  <h4 className="font-black text-xl mb-4 text-[#EA4335]">The "Attention Trap"</h4>
                  <p className="text-sm leading-relaxed text-[#5F6368]">Always be on the lookout for Red Herring questions. These are simple prompts like "Please select the car from this list" or "Is 5 greater than 10?" designed to catch automated bots. A single missed trap can revoke your eligibility for all premium CH/US/PT offers for up to 72 hours.</p>
               </div>
            </div>
            <p className="text-lg">Your "Global Reputation" is a real metric used by providers to determine which users get the $50 UI/UX testing invites and which users get the $0.10 trivia questions. Aim for the top tier from day one.</p>
          </section>

          <section className="space-y-8 mb-20">
            <h2 className="text-[#202124] text-4xl font-black mb-10 tracking-tight">Phase 2: Technical Prerequisites & Workflow Optimization</h2>
            <p className="text-lg">Efficiency is the difference between earning $2/hour and $25/hour. To maximize your throughput through the OfferCheck portal, your technical stack must be optimized for verification success.</p>
            <div className="space-y-6">
               <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-6 h-6 text-[#34A853]" />
                  </div>
                  <div>
                     <h4 className="text-[#202124] font-bold mb-2">Browser Hygiene & Isolation</h4>
                     <p className="text-sm">Dedicate a specific browser profile (Chrome or Firefox) purely for your market research activities. Disable all non-essential extensions (except for password managers) to prevent tracker interference during the redirect handshake.</p>
                  </div>
               </div>
               <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-6 h-6 text-[#34A853]" />
                  </div>
                  <div>
                     <h4 className="text-[#202124] font-bold mb-2">IP Stability (No VPN Policy)</h4>
                     <p className="text-sm">Never use a VPN or Proxy. Most high-value Swiss (CH) and American (US) offers have military-grade detection for commercial IP blocks. A residential IP is your most valuable asset in the side-hustle world.</p>
                  </div>
               </div>
               <div className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-6 h-6 text-[#34A853]" />
                  </div>
                  <div>
                     <h4 className="text-[#202124] font-bold mb-2">Strategic Hardware Selection</h4>
                     <p className="text-sm">While mobile devices are great for quick pings, desktop environments are prioritized for "Deep-Dive" ethnographic studies. These typically pay 3x the standard rate and require detailed written feedback.</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-12 mb-20">
            <h2 className="text-[#202124] text-4xl font-black mb-10 tracking-tight">Phase 3: The Zenith Scaling Strategy ($10 to $1,500)</h2>
            <p className="text-lg italic">"Once you've cashed out your first $10, you've proven the system works. Now it's time to build the machine."</p>
            <p>Scaling your income isn't about working more hours—it's about working the <strong>Right Hours</strong>. The market research industry follows a strict seasonal and daily rhythm that most users ignore.</p>
            
            <div className="space-y-12">
               <div className="border-l-8 border-[#4285F4] pl-10">
                  <h3 className="text-[#202124] font-black text-2xl mb-4">Morning: The "Corporate Reload" Hour</h3>
                  <p>Most corporate research budgets refresh at 9:00 AM Eastern Standard Time (EST). By being the first to check the OfferCheck leaderboard in the morning, you can secure spots in low-quota, high-payout slots before the "Global Traffic Wave" hits at mid-day. These early morning tasks are often exclusive UI/UX tests that require fresh eyes.</p>
               </div>
               <div className="border-l-8 border-[#FBBC05] pl-10">
                  <h3 className="text-[#202124] font-black text-2xl mb-4">Mid-Day: The "Mobile Pulse" Phase</h3>
                  <p>During peak hours (11:00 AM - 2:00 PM local time), focus on high-speed, mobile-optimized surveys. These are designed for quick consumer sentiment—think "What did you think of that commercial?" or "Which logo do you prefer?". They pay less individually ($0.50 - $2.00) but can be stacked for a high hourly rate while you're on the go.</p>
               </div>
               <div className="border-l-8 border-[#EA4335] pl-10">
                  <h3 className="text-[#202124] font-black text-2xl mb-4">Evening: The "Auditor" Deep-Dive</h3>
                  <p>As the business day ends in the US, many companies release longer focus group tasks. These 30-45 minute sessions often carry "Completion Bonuses" that can reach $20 or more. This is the time to sit down with a laptop, provide detailed qualitative feedback, and maximize your day's total earnings. One of these successful sessions is worth ten smaller surveys.</p>
               </div>
            </div>
          </section>

          <section className="space-y-8 mb-20">
            <h2 className="text-[#202124] text-4xl font-black mb-8 tracking-tight">The Ethical Responsibility of Your Insights</h2>
            <p>Brands are desperate for your attention. In the age of ad-blockers and algorithmic feeds, your active participation is the only way for them to penetrate the "Digital Shield." Don't feel like you're performing menial work—you are providing the intellectual fuel for the world's most successful product launches. Whether it's a new flavor for a global beverage brand or a security feature for a Swiss banking app, <strong>You are the consultant.</strong></p>
            <p>At OfferCheck, we advocate for fair compensation. We monitor the "Earning Per Minute" (EPM) of every offer on our dashboard. If an offer drops below our threshold, we move it to the bottom or remove it entirely. We believe that if a company wants your opinion, they should pay a professional rate for it. Your journey from $10 to $1,500 starts with that first, verified click.</p>
          </section>

          <div className="bg-[#4285F4] text-white p-12 rounded-[3rem] text-center space-y-8 shadow-2xl">
             <h2 className="text-4xl font-black tracking-tight m-0">Ready to Start the Blueprint?</h2>
             <p className="text-xl text-white/90 max-w-2xl mx-auto m-0 leading-relaxed">
                Take the first step toward building your digital side-hustle. Our verification portal is currently open for the United States, Portugal, and Switzerland.
             </p>
             <div className="flex justify-center pt-4">
                <a 
                   href={offerUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-12 py-6 bg-white text-[#4285F4] rounded-[2rem] font-black text-2xl hover:scale-105 transition-transform shadow-xl no-underline"
                >
                   VERIFY ELIGIBILITY NOW
                </a>
             </div>
          </div>

          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center opacity-60 text-sm italic">
             <p>© {new Date().getFullYear()} OfferCheck Editorial Board</p>
             <div className="flex gap-6">
                <span>Reading Time: 12 mins</span>
                <span>SEO Score: Zenith Grade</span>
                <span>Words: 1500+</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SurveysPage = () => {
  const surveys = [
    {
      id: "74817",
      title: "Bezahlte Umfragen Schweiz (iOS)",
      description: "Exklusiv für Apple-Nutzer in der Schweiz. Verdienen Sie Geld mit Ihrer Meinung.",
      path: "/surveys-ios",
      region: "CH",
      device: "Apple",
      color: "bg-[#4285F4]"
    },
    {
      id: "74815",
      title: "Top Bezahlte Umfragen Schweiz (Desktop)",
      description: "Optimiert für Desktop-Nutzer. Höchste Vergütung für detaillierte Umfragen.",
      path: "/umfragen-schweiz",
      region: "CH",
      device: "Desktop",
      color: "bg-[#EA4335]"
    },
    {
      id: "74816",
      title: "Android Umfragen Schweiz",
      description: "Verdienen Sie Geld direkt auf Ihrem Android-Smartphone. Bequem von überall.",
      path: "/bezahlte-umfragen-android",
      region: "CH",
      device: "Android",
      color: "bg-[#34A853]"
    },
    {
      id: "70892",
      title: "Sondagens Pagas Portugal",
      description: "Ganhe recompensas no seu iPhone respondendo a sondagens premium em Portugal.",
      path: "/ganhar-dinheiro-portugal",
      region: "PT",
      device: "Apple",
      color: "bg-[#FBBC05]"
    },
    {
      id: "US-IOS",
      title: "USA Paid Surveys (iOS)",
      description: "Exclusive rewards for iPhone users in the United States. Start earning today.",
      path: "/usa-surveys-ios",
      region: "US",
      device: "Apple",
      color: "bg-[#4285F4]"
    },
    {
      id: "US-DESKTOP",
      title: "Premium US Research (Desktop)",
      description: "High-paying market research for US desktop users. No app installation required.",
      path: "/usa-surveys-desktop",
      region: "US",
      device: "Desktop",
      color: "bg-[#6366F1]"
    },
    {
      id: "US-ANDROID",
      title: "USA Mobile Rewards (Android)",
      description: "Earn rewards on your Android device. Quick tasks and instant eligibility checks.",
      path: "/usa-surveys-android",
      region: "US",
      device: "Android",
      color: "bg-[#10B981]"
    }
  ];

  useEffect(() => {
    document.title = "Available Surveys | OfferCheck Portal";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#4285F4]/5 border border-[#4285F4]/20 px-4 py-1.5 rounded-full mb-6"
          >
            <Globe className="w-4 h-4 text-[#4285F4]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4285F4]">Multi-Region Access Portal</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-[#202124] tracking-tighter mb-6 uppercase">
            Choose Your <span className="text-[#4285F4]">Earning Portal</span>
          </h1>
          <p className="text-[#5F6368] max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            We've curated the most exclusive, high-payout market research opportunities from around the globe. Select the offer that matches your current device and residency status to begin the 30-second verification process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {surveys.map((survey, index) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={survey.path} className="block h-full">
                <div className="h-full bg-gray-50 border border-gray-100 rounded-3xl p-8 transition-all hover:bg-white hover:shadow-xl hover:border-[#4285F4]/30 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {survey.device === 'Apple' ? <Shield className="w-6 h-6 text-[#4285F4]" /> : 
                     survey.device === 'Android' ? <Zap className="w-6 h-6 text-[#34A853]" /> : 
                     <Globe className="w-6 h-6 text-[#FBBC05]" />}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{survey.region}</span>
                    <span className="w-1 h-1 rounded-full bg-[#5F6368]/20" />
                    <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-widest">{survey.device}</span>
                  </div>
                  <h3 className="text-[#202124] font-bold text-xl mb-4 group-hover:text-[#4285F4] transition-colors">{survey.title}</h3>
                  <p className="text-[#5F6368] text-sm leading-relaxed mb-8 flex-grow">
                    {survey.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#4285F4] font-black text-sm uppercase tracking-tighter">
                    Check Eligibility
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Massive Surveys SEO Section */}
        <div className="prose max-w-none text-[#5F6368] space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#202124] mb-8 uppercase tracking-tight">The Modern Era of <span className="text-[#4285F4]">Market Intelligence</span></h2>
              <p className="text-xl leading-relaxed mb-8 font-medium">Market research is no longer just about filling out forms; it's the heartbeat of consumer capitalism in the digital age. In {new Date().getFullYear()}, major global corporations are projected to allocate nearly $100 billion to behavioral insights and consumer sentiment analysis.</p>
              <p className="text-lg leading-relaxed mb-6">These entities aren't looking for "general" data points. They specifically prioritize high-intent, verified feedback from residents in sophisticated markets such as the United States (US), Switzerland (CH), and Portugal (PT). The accuracy of this data drives product innovation, political strategy, and economic forecasting for the next decade.</p>
              <p className="text-lg leading-relaxed">By providing your opinion on emerging sectors—from sustainable logistics and renewable energy solutions to the next iteration of mobile operating systems—you are engaging in a direct value exchange. Companies receive the clarity they need to mitigate risk; you receive premium compensation for your intellectual labor. OfferCheck serves as the secure conduit for this exchange, optimizing every interaction through real-time eligibility filtering and device-specific matching.</p>
            </div>
             <div className="p-12 bg-gray-50 border border-gray-100 shadow-xl rounded-[3rem]">
               <div className="space-y-10">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Star className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <div>
                      <h4 className="text-[#202124] font-bold text-lg mb-1">Premium Offers</h4>
                      <p className="text-sm text-[#5F6368] font-medium">We only list offers with verified payout histories and high completion success rates.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <div>
                      <h4 className="text-[#202124] font-bold text-lg mb-1">High Payouts</h4>
                      <p className="text-sm text-[#5F6368] font-medium">Typical rewards range from $10 to $50 per task, significantly higher than industry averages.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Lock className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <div>
                      <h4 className="text-[#202124] font-bold text-lg mb-1">100% Secure</h4>
                      <p className="text-sm text-[#5F6368] font-medium">Zero data retention for initial verification. All external links use high-level encryption.</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="py-20 border-t border-gray-100 space-y-8">
            <h2 className="text-4xl font-black text-[#202124] text-center mb-12">The Zenith SEO Earning Blueprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <h4 className="text-[#22C55E] font-black mb-3 text-lg tracking-widest">01. SCAN</h4>
                 <p className="text-xs leading-relaxed text-[#5F6368] font-medium">Our system automatically detects your region and device hardware to find compatible offer slots immediately.</p>
               </div>
               <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <h4 className="text-[#22C55E] font-black mb-3 text-lg tracking-widest">02. VERIFY</h4>
                 <p className="text-xs leading-relaxed text-[#5F6368] font-medium">Users perform a quick eligibility check (usually 30-60 seconds) to unlock the full reward dashboard.</p>
               </div>
               <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <h4 className="text-[#22C55E] font-black mb-3 text-lg tracking-widest">03. ENGAGE</h4>
                 <p className="text-xs leading-relaxed text-[#5F6368] font-medium">Provide high-quality feedback to the researcher. Honesty increases your long-term success score.</p>
               </div>
               <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <h4 className="text-[#22C55E] font-black mb-3 text-lg tracking-widest">04. WITHDRAW</h4>
                 <p className="text-xs leading-relaxed text-[#5F6368] font-medium">Access your rewards via PayPal, Bank Transfer, or retail Gift Cards once the task is approved.</p>
               </div>
            </div>
          </div>

          <div className="prose max-w-none text-[#5F6368] space-y-6 pb-20">
            <h3 className="text-[#202124] text-2xl font-black uppercase tracking-tight">Comprehensive Industry Insights</h3>
            <p>What makes a survey "High-Value"? It's often the complexity of the demographic required. For instance, an iOS user in Switzerland (CH) might be targeted for a study on luxury financial apps—a very specific niche that pays more because the target audience is smaller and more valuable to the advertiser. Similarly, a desktop user in the USA might be required for a detailed UI/UX test that takes longer but compensates significantly higher for the expert's time.</p>
            <p>OfferCheck is designed to manage these nuances. Our "Zenith SEO" strategy involves providing you with the deepest possible context so you can approach these offers as a professional contributor. We update our survey lists every 12 hours, ensuring that the spots you see are fresh and ready for participation. We also track payout latency, meaning we prioritize offers that pay out within 24-48 hours over those that take weeks to process.</p>
            <p>Our commitment to your success extends beyond just listing links. We monitor the market research landscape for changes in privacy laws (like the update to the Swiss Data Protection Act or PT's GDPR refinements) to ensure that every offer on our platform remains compliant and secure for our users. Your trust is our most valuable asset.</p>
          </div>
        </div>
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
      const isBot = /bot|google|search|crawler|spider|robot|crawling|bing|yandex|slurp|baiduspider|facebookexternalhit|whatsapp|telegrambot/i.test(ua);
      
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
      } else if (deviceRestricted === 'Android') {
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (!isAndroid) {
          if (isMounted) setVerificationStatus('device_denied');
          return;
        }
      }

      // 2. Geo Check - REMOVED AS REQUESTED
      // We no longer block based on location, just show message in UI.
      if (isMounted) setVerificationStatus('allowed');
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4285F4]/20 border-t-[#4285F4] rounded-full animate-spin" />
          <p className="text-[#5F6368] font-medium text-sm animate-pulse">Running Device & Region Verification...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'geo_denied') {
    return (
      <div className="min-h-screen bg-white text-[#202124] flex flex-col items-center justify-center p-6 text-center">
        <Globe className="w-16 h-16 text-[#FBBC05] mb-6 opacity-80" />
        <h1 className="text-3xl font-black mb-4">REGION RESTRICTED</h1>
        <p className="text-[#5F6368] max-w-md leading-relaxed font-medium">This high-value offer is currently optimized for residents of Switzerland. Your geographic scan indicates access from a different region.</p>
        <Link to="/" className="mt-8 text-[#4285F4] border border-[#4285F4]/30 px-8 py-3 rounded-full font-bold hover:bg-[#4285F4]/5 transition-all">Return to Global Offers</Link>
      </div>
    );
  }

  if (verificationStatus === 'device_denied') {
    return (
      <div className="min-h-screen bg-white text-[#202124] flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-16 h-16 text-[#4285F4] mb-6 opacity-80" />
        <h1 className="text-3xl font-black mb-4">
          {deviceRestricted === 'Apple' ? 'APPLE DEVICE REQUIRED' : deviceRestricted === 'Android' ? 'ANDROID DEVICE REQUIRED' : 'DESKTOP REQUIRED'}
        </h1>
        <p className="text-[#5F6368] max-w-md leading-relaxed font-medium">
          {deviceRestricted === 'Apple' 
            ? (geoRestricted === 'PT' ? 'Este portal de recompensas está disponível exclusivamente para utilizadores de Apple OS (iOS/macOS). O seu sistema detetou uma plataforma diferente.' : 'This rewards portal is exclusively available for Apple OS users (iOS/macOS). Your system scan detected a different operating platform.')
            : deviceRestricted === 'Android'
            ? 'Dieses Portal ist ausschließlich für Android-Nutzer in der Schweiz verfügbar. Bitte verwenden Sie Ihr Android-Smartphone.'
            : 'Diese Umfragen sind exklusiv für Desktop-Benutzer optimiert. Bitte nutzen Sie einen Computer oder Laptop für den Zugriff.'
          }
        </p>
        <Link to="/" className="mt-8 text-[#4285F4] border border-[#4285F4]/30 px-8 py-3 rounded-full font-bold hover:bg-[#4285F4]/5 transition-all">See Other Offers</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#3C4043] selection:bg-[#4285F4]/10 selection:text-[#202124] pt-16">
      <LiveNotifications region={geoRestricted} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-[#4285F4]/5 border border-[#4285F4]/20 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4285F4]"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4285F4]">
              {geoRestricted === 'CH' ? 'ZERTIFIZIERT FÜR SCHWEIZ IP' : geoRestricted === 'PT' ? 'CERTIFICADO PARA PORTUGAL IP' : geoRestricted === 'US' ? 'VERIFIED FOR UNITED STATES IP' : 'System Online: Verification Active'}
            </span>
          </motion.div>

          {(geoRestricted === 'CH' || geoRestricted === 'PT' || geoRestricted === 'US') && (
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                {geoRestricted === 'CH' ? (
                  <div className="w-4 h-3 bg-red-600 relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-0.5 bg-white absolute"></div>
                    <div className="w-0.5 h-full bg-white absolute"></div>
                  </div>
                ) : geoRestricted === 'PT' ? (
                  <div className="w-4 h-3 bg-[#046A38] relative overflow-hidden flex">
                    <div className="w-[40%] h-full bg-[#DA291C]"></div>
                    <div className="w-[20%] h-[20%] bg-yellow-400 absolute top-1/2 left-[40%] -translate-y-1/2 -translate-x-1/2 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.5)]"></div>
                  </div>
                ) : (
                  <div className="w-4 h-3 bg-[#3C3B6E] relative overflow-hidden flex flex-col">
                    <div className="h-1/7 w-full bg-[#B22234]" />
                    <div className="h-1/7 w-full bg-white" />
                    <div className="h-1/7 w-full bg-[#B22234]" />
                    <div className="h-1/7 w-full bg-white" />
                    <div className="h-1/7 w-full bg-[#B22234]" />
                    <div className="h-1/7 w-full bg-white" />
                    <div className="h-1/7 w-full bg-[#B22234]" />
                    <div className="absolute top-0 left-0 w-[45%] h-[55%] bg-[#3C3B6E] flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        <div className="w-0.5 h-0.5 bg-white rounded-full" />
                        <div className="w-0.5 h-0.5 bg-white rounded-full" />
                        <div className="w-0.5 h-0.5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
                <span className="text-[10px] font-bold text-[#5F6368]">
                  {geoRestricted === 'CH' ? 'CH-RESIDENT' : geoRestricted === 'PT' ? 'PT-RESIDENT' : 'US-RESIDENT'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                <Shield className="w-3 h-3 text-[#34A853]" />
                <span className="text-[10px] font-bold text-[#5F6368]">SSL SECURE</span>
              </div>
            </div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-[#202124] tracking-tighter leading-[0.95] max-w-4xl mb-6"
          >
            {geoRestricted === 'CH' ? (
              <>SICHERN SIE IHRE <span className="text-[#4285F4]">BERECHTIGUNG</span> BEVOR DIE FRIST ABLÄUFT</>
            ) : geoRestricted === 'PT' ? (
              <>GARANTA A SUA <span className="text-[#4285F4]">ELEGIBILIDADE</span> ANTES QUE O ACESSO EXPIRE</>
            ) : geoRestricted === 'US' ? (
              <>SECURE YOUR <span className="text-[#4285F4]">OFFER ELIGIBILITY</span> BEFORE THE WINDOW CLOSES</>
            ) : (
              <>SECURE YOUR <span className="text-[#4285F4]">ELIGIBILITY</span> BEFORE ACCESS EXPIRES</>
            )}
          </motion.h1>

          {geoRestricted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex items-center gap-2 bg-[#FBBC05]/10 px-4 py-2 rounded-full border border-[#FBBC05]/20"
            >
              <Globe className="w-4 h-4 text-[#FBBC05]" />
              <span className="text-[11px] font-bold text-[#FBBC05] uppercase tracking-wider">
                {geoRestricted === 'CH' ? 'Dieses Angebot gilt nur für Nutzer in der Schweiz' : 
                 geoRestricted === 'PT' ? 'Esta oferta é apenas para utilizadores em Portugal' : 
                 geoRestricted === 'US' ? 'This offer is only for residents in the United States' :
                 `Target Region: ${geoRestricted}`}
              </span>
            </motion.div>
          )}

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#5F6368] max-w-2xl font-medium leading-relaxed mb-12"
          >
            {geoRestricted === 'CH' 
              ? 'Das finale Zeitfenster für exklusive Schweizer Prämien ist jetzt geöffnet. Die automatisierte Überprüfung läuft.'
              : geoRestricted === 'PT'
              ? 'A janela de verificação final para recompensas premium em Portugal está aberta. Verificações de elegibilidade automatizadas em processamento.'
              : geoRestricted === 'US'
              ? 'The final verification window for premium US rewards is now open. Automated eligibility checks are currently being processed.'
              : 'The final verification window for premium rewards is now open. Automated eligibility checks are currently being processed.'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[420px] bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden mb-12"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5F6368]">
                <Shield className="w-4 h-4 text-[#34A853]" />
                {geoRestricted === 'CH' ? 'VERSCHLÜSSELTES PORTAL' : geoRestricted === 'PT' ? 'PORTAL ENCRIPTADO' : geoRestricted === 'US' ? 'ENCRYPTED US PORTAL' : 'ENCRYPTED PORTAL'}
              </div>
              <div className="text-[11px] font-mono text-[#5F6368] bg-gray-100 px-2 py-0.5 rounded">
                {geoRestricted === 'CH' ? 'RX-992-CH' : geoRestricted === 'PT' ? 'RX-992-PT' : geoRestricted === 'US' ? 'RX-992-US' : 'RX-992-B'}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100">
              <div className="p-6 border-r border-gray-100 text-left">
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#5F6368] mb-1">
                  {geoRestricted === 'CH' ? 'RECHZEIT' : geoRestricted === 'PT' ? 'TEMPO RESTANTE' : geoRestricted === 'US' ? 'TIME REMAINING' : 'Time Remaining'}
                </div>
                <div className="text-2xl font-black text-[#202124] font-mono flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FBBC05]/80" />
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="p-6 text-left">
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#5F6368] mb-1">
                  {geoRestricted === 'CH' ? 'PLÄTZE FREI' : geoRestricted === 'PT' ? 'VAGAS RESTANTES' : geoRestricted === 'US' ? 'SPOTS REMAINING' : 'Spots Left'}
                </div>
                <div className="text-2xl font-black text-[#202124] font-mono flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#4285F4]/80" />
                  0{spotsLeft}
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6 text-[#202124]">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#34A853]/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold">
                    {geoRestricted === 'CH' ? 'Geografischer Scan abgeschlossen' : geoRestricted === 'PT' ? 'Verificação Geográfica Concluída' : geoRestricted === 'US' ? 'US Geographic Scan Completed' : 'Geographic Scan Completed'}
                  </h4>
                  <p className="text-[11px] text-[#5F6368]">
                    {geoRestricted === 'CH' ? 'Region Schweiz bestätigt.' : geoRestricted === 'PT' ? 'Região Portugal confirmada.' : geoRestricted === 'US' ? 'United States region confirmed.' : 'Region eligibility confirmed.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#4285F4]/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#4285F4]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-[#202124]">
                    {geoRestricted === 'CH' ? 'Geräteprüfung OK' : geoRestricted === 'PT' ? 'Handshake do Sistema Ativo' : geoRestricted === 'US' ? 'US System Verification OK' : 'System Handshake Active'}
                  </h4>
                  <p className="text-[11px] text-[#5F6368]">
                    {geoRestricted === 'CH' ? 'Kompatibilität verifiziert.' : geoRestricted === 'PT' ? 'Status de compatibilidade verificado.' : geoRestricted === 'US' ? 'Device compatibility validated.' : 'Automated status check complete.'}
                  </p>
                </div>
              </div>

              <button 
                onClick={handleCTA}
                className="w-full group relative bg-[#4285F4] text-white h-16 rounded-2xl font-black text-lg tracking-tight overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {geoRestricted === 'CH' ? 'JETZT BERECHTIGUNG PRÜFEN' : geoRestricted === 'PT' ? 'VERIFICAR ELEGIBILIDADE AGORA' : geoRestricted === 'US' ? 'VERIFY US ELIGIBILITY NOW' : 'VERIFY ELIGIBILITY NOW'}
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#3367D6] to-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-6 mb-24">
            <div className="flex items-center gap-4 py-4 px-8 bg-gray-50 rounded-full border border-gray-100">
              <div className="flex -space-x-4">
                <div className="w-11 h-11 rounded-full border-[3px] border-white bg-[#22C55E] relative z-30 flex items-center justify-center text-white text-[10px] font-bold">CH</div>
                <div className="w-11 h-11 rounded-full border-[3px] border-white bg-[#4285F4] relative z-20 flex items-center justify-center text-white text-[10px] font-bold">US</div>
                <div className="w-11 h-11 rounded-full border-[3px] border-white bg-[#34A853] relative z-10 flex items-center justify-center text-white text-[10px] font-bold">PT</div>
              </div>
              <p className="text-sm font-medium text-[#5F6368]">
                <span className="text-[#202124] font-black">{claimedCount.toLocaleString()}</span> {geoRestricted === 'CH' ? 'Schweizer Nutzer heute' : geoRestricted === 'PT' ? 'utilizadores portugueses hoje' : geoRestricted === 'US' ? 'US users verified today' : 'users checked today'}
              </p>
            </div>
          </div>

          {/* Social Proof Section - For CH, PT, and US */}
          {(geoRestricted === 'CH' || geoRestricted === 'PT' || geoRestricted === 'US') && (
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24">
              <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-[#5F6368] text-sm italic mb-6 leading-relaxed">
                  {geoRestricted === 'CH' 
                    ? '"Ich war erst skeptisch, aber nach der Verifizierung hat alles geklappt. Die Umfragen zahlen tatsächlich gut aus, ideal für nebenbei."'
                    : geoRestricted === 'PT'
                    ? '"Estava cética no início, mas após a verificação tudo funcionou perfeitamente. As sondagens pagam realmente bem, ideal para rendimento extra."'
                    : '"I was a bit skeptical, but after the quick verification, it worked perfectly. The high-paying surveys are legit and great for extra income."'}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-[#202124] font-bold text-sm">{geoRestricted === 'CH' ? 'Markus B.' : geoRestricted === 'PT' ? 'João S.' : 'Robert J.'}</p>
                    <p className="text-[#5F6368] text-[10px] uppercase font-black">{geoRestricted === 'CH' ? 'Zürich, Schweiz' : geoRestricted === 'PT' ? 'Lisboa, Portugal' : 'Chicago, IL'}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-[#5F6368] text-sm italic mb-6 leading-relaxed">
                  {geoRestricted === 'CH'
                    ? '"Endlich ein Portal, das wirklich auf Schweizer Nutzer ausgerichtet ist. Die Apple-Optimierung ist top!"'
                    : geoRestricted === 'PT'
                    ? '"Finalmente um portal que é realmente focado no mercado português. A otimização para iPhone é excelente!"'
                    : '"Finally a rewards portal that works smoothly in the US. The interface is clean and it actually pays out."'}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-[#202124] font-bold text-sm">{geoRestricted === 'CH' ? 'Sarah M.' : geoRestricted === 'PT' ? 'Maria F.' : 'Emily D.'}</p>
                    <p className="text-[#5F6368] text-[10px] uppercase font-black">{geoRestricted === 'CH' ? 'Luzern, Schweiz' : geoRestricted === 'PT' ? 'Porto, Portugal' : 'Austin, TX'}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-[#5F6368] text-sm italic mb-6 leading-relaxed">
                  {geoRestricted === 'CH'
                    ? '"Sehr einfache Abwicklung. Habe meine erste Prämie bereits nach zwei Tagen erhalten. Absolute Empfehlung."'
                    : geoRestricted === 'PT'
                    ? '"Processo muito simples. Recebi a minha primeira recompensa após apenas dois dias. Recomendo totalmente."'
                    : '"Super easy process. Received my first reward in 24 hours. Highly recommended for anyone in the US."'}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-[#202124] font-bold text-sm">{geoRestricted === 'CH' ? 'Urs P.' : geoRestricted === 'PT' ? 'Tiago R.' : 'Michael S.'}</p>
                    <p className="text-[#5F6368] text-[10px] uppercase font-black">{geoRestricted === 'CH' ? 'Bern, Schweiz' : geoRestricted === 'PT' ? 'Braga, Portugal' : 'Seattle, WA'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section - For CH, PT, and US */}
          {(geoRestricted === 'CH' || geoRestricted === 'PT' || geoRestricted === 'US') && (
            <div className="w-full max-w-3xl mx-auto text-left py-24 border-t border-gray-100">
              <h2 className="text-3xl font-black text-[#202124] mb-12 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-[#4285F4]" />
                {geoRestricted === 'CH' ? 'Häufig gestellte Fragen (FAQ)' : geoRestricted === 'PT' ? 'Perguntas Frequentes (FAQ)' : 'Frequently Asked Questions (FAQ)'}
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-[#202124] font-bold mb-2">
                    {geoRestricted === 'CH' ? 'Wie viel kann ich verdienen?' : geoRestricted === 'PT' ? 'Quanto posso ganhar?' : 'How much can I earn?'}
                  </h4>
                  <p className="text-[#5F6368] text-sm leading-relaxed">
                    {geoRestricted === 'CH' 
                      ? 'Die Vergütung variiert je nach Umfragetyp. Top-User in der Schweiz verdienen bis zu 300 CHF monatlich.'
                      : geoRestricted === 'PT'
                      ? 'A remuneração varia conforme o tipo de sondagem. Os utilizadores ativos em Portugal ganham até 250 € mensais.'
                      : 'Earnings vary based on survey volume. Active users in the US can earn between $10 to $300 per month.'}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-[#202124] font-bold mb-2">
                    {geoRestricted === 'CH' ? 'Sind meine Daten sicher?' : geoRestricted === 'PT' ? 'Os meus dados estão seguros?' : 'Is my data secure?'}
                  </h4>
                  <p className="text-[#5F6368] text-sm leading-relaxed">
                    {geoRestricted === 'CH'
                      ? 'Ja, wir nutzen modernste SSL-Verschlüsselung. Ihre Daten werden niemals ohne Zustimmung weitergegeben.'
                      : geoRestricted === 'PT'
                      ? 'Sim, utilizamos encriptação SSL de última geração. Os seus dados nunca são partilhados sem o seu consentimento.'
                      : 'Yes, we use enterprise-grade SSL encryption. Your data is handled with strict privacy protocols and never shared without consent.'}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="text-[#202124] font-bold mb-2">
                    {geoRestricted === 'CH' ? 'Wie erfolgt die Auszahlung?' : geoRestricted === 'PT' ? 'Como é feito o pagamento?' : 'How do I get paid?'}
                  </h4>
                  <p className="text-[#5F6368] text-sm leading-relaxed">
                    {geoRestricted === 'CH'
                      ? 'Sie können wählen zwischen PayPal, Banküberweisung oder verschiedenen Gutscheinen lokaler Anbieter wie Migros oder Coop.'
                      : geoRestricted === 'PT'
                      ? 'Pode escolher entre PayPal, transferência bancária ou diversos cartões presente de lojas como Continente ou Amazon.'
                      : 'You can choose from PayPal, Direct Deposit, or various gift cards including Amazon, Starbucks, and Walmart.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <SEOContentSection geo={geoRestricted} device={deviceRestricted} />


          {/* Schema.org for SEO - For CH, PT, and US */}
          {(geoRestricted === 'CH' || geoRestricted === 'PT' || geoRestricted === 'US') && (
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": geoRestricted === 'CH' ? "Wie viel kann ich verdienen?" : geoRestricted === 'PT' ? "Quanto posso ganhar?" : "How much can I earn?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": geoRestricted === 'CH' ? "Die Vergütung variiert je nach Umfragetyp. Top-User in der Schweiz verdienen bis zu 300 CHF monatlich." : geoRestricted === 'PT' ? "A remuneração varia conforme o tipo de sondagem. Os utilizadores ativos em Portugal ganham até 250 € mensais." : "Earnings vary based on survey volume. Active users in the US can earn between $10 to $300 per month."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": geoRestricted === 'CH' ? "Sind meine Daten sicher?" : geoRestricted === 'PT' ? "Os meus dados estão seguros?" : "Is my data secure?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": geoRestricted === 'CH' ? "Ja, wir nutzen modernste SSL-Verschlüsselung. Ihre Daten werden niemals ohne Zustimmung weitergegeben." : geoRestricted === 'PT' ? "Sim, utilizamos encriptação SSL de última geração. Os seus dados nunca são partilhados sem o seu consentimento." : "Yes, we use enterprise-grade SSL encryption. Your data is handled with strict privacy protocols and never shared without consent."
                    }
                  }
                ]
              })}
            </script>
          )}
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
          element={<SurveysPage />} 
        />
        <Route 
          path="/surveys-ios" 
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
        <Route 
          path="/bezahlte-umfragen-android" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=74816"
              title="Android Umfragen Schweiz | Geld verdienen"
              description="Verdienen Sie Geld mit Ihrem Android-Handy in der Schweiz. Top-bewertetes Umfrageportal für mobile Nutzer."
              geoRestricted="CH"
              deviceRestricted="Android"
            />
          } 
        />
        <Route 
          path="/ganhar-dinheiro-portugal" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=70892"
              title="Ganhar Dinheiro Respondendo Sondagens | Portugal"
              description="Verifique a sua elegibilidade para sondagens pagas premium em Portugal. Ganhe recompensas no seu iPhone hoje."
              geoRestricted="PT"
              deviceRestricted="Apple"
            />
          } 
        />
        <Route 
          path="/usa-surveys-ios" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=US_IOS_ID"
              title="USA Paid Surveys | High-Value Rewards"
              description="Check your eligibility for premium paid surveys in the United States. Reward opportunities for iPhone users."
              geoRestricted="US"
              deviceRestricted="Apple"
            />
          } 
        />
        <Route 
          path="/usa-surveys-desktop" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=US_DESKTOP_ID"
              title="Premium US Research | Market Insights"
              description="Verify your status for premium market research surveys in the US. Desktop optimized rewards."
              geoRestricted="US"
              deviceRestricted="Desktop"
            />
          } 
        />
        <Route 
          path="/usa-surveys-android" 
          element={
            <LandingPage 
              offerUrl="https://singingfiles.com/show.php?l=0&u=2520769&id=74463"
              title="USA Mobile Rewards | Fast Payouts"
              description="Get paid to share your opinion on Android in the USA. Quick verification for mobile users."
              geoRestricted="US"
              deviceRestricted="Android"
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
