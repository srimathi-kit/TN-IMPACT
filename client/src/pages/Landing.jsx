import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Recycle,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Users,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Box,
  ShieldCheck,
  Globe2,
  ArrowUpRight,
  Building2,
  PackageSearch,
  CheckCircle2,
  Boxes,
  Network
} from 'lucide-react'
import PremiumBackground from '../components/PremiumBackground'

const ImpactLedger = () => {
  const [counts, setCounts] = useState({ co2: 0, waste: 0, revenue: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        co2: prev.co2 + Math.floor(Math.random() * 5),
        waste: prev.waste + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 10)
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-wrap gap-12 mt-16 p-8 glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10">
        <div className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          CO2 Offset (MT)
        </div>
        <div className="text-4xl font-black text-white tabular-nums">
          {counts.co2.toLocaleString()}
        </div>
      </div>

      <div className="relative z-10 border-l border-white/10 pl-12">
        <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          Waste Diverted (Tons)
        </div>
        <div className="text-4xl font-black text-white tabular-nums">
          {counts.waste.toLocaleString()}
        </div>
      </div>

      <div className="relative z-10 border-l border-white/10 pl-12">
        <div className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          Circular Wealth ($)
        </div>
        <div className="text-4xl font-black text-white tabular-nums">
          {counts.revenue.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

const ThreeDRotatingCore = () => (
  <div className="relative w-80 h-80 perspective-1000 hidden lg:block">
    <motion.div
      animate={{
        rotateY: [0, 360],
        rotateX: [15, -15, 15],
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="w-full h-full preserve-3d relative"
    >
      {/* Front Face */}
      <div className="absolute inset-0 glass border-2 border-primary-500/30 rounded-3xl flex items-center justify-center translate-z-[100px] backface-hidden">
        <Recycle className="h-32 w-32 text-primary-500 animate-pulse" />
      </div>
      {/* Back Face */}
      <div className="absolute inset-0 glass border-2 border-blue-500/30 rounded-3xl flex items-center justify-center -translate-z-[100px] rotate-y-180 backface-hidden">
        <Network className="h-32 w-32 text-blue-500" />
      </div>
      {/* Side Faces */}
      <div className="absolute inset-0 glass border-2 border-purple-500/30 rounded-3xl flex items-center justify-center rotate-y-90 translate-z-[100px] backface-hidden">
        <Cpu className="h-32 w-32 text-purple-400" />
      </div>
      <div className="absolute inset-0 glass border-2 border-emerald-500/30 rounded-3xl flex items-center justify-center -rotate-y-90 translate-z-[100px] backface-hidden">
        <Boxes className="h-32 w-32 text-emerald-400" />
      </div>
    </motion.div>
    
    {/* Floating Rings around the core */}
    <motion.div 
      animate={{ rotate: 360, rotateX: 60 }} 
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-primary-500/20 rounded-full"
    ></motion.div>
    <motion.div 
      animate={{ rotate: -360, rotateX: 70 }} 
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-blue-500/10 rounded-full"
    ></motion.div>
  </div>
)

// A highly realistic mockup of the platform's actual usage (Marketplace/Dashboard)
const PlatformMockup = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
    animate={{ opacity: 1, scale: 1, rotate: 2 }}
    whileHover={{ rotate: 0, scale: 1.02 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative w-full max-w-2xl mx-auto cursor-pointer"
  >
    {/* Decorative Glows Behind Mockup */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-600/30 to-blue-600/30 blur-[80px] rounded-full pointer-events-none -z-10 animate-pulse-glow"></div>
    
    <div className="glass rounded-3xl border border-white/10 shadow-2xl shadow-purple-900/20 overflow-hidden">
      {/* Mock Browser Header */}
      <div className="bg-slate-900/80 px-4 py-3 border-b border-white/5 flex items-center space-x-2">
        <div className="flex space-x-1.5 border-r border-white/10 pr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest pl-2">app.sciep.network/marketplace</div>
      </div>
      
      {/* Mock Internal UI */}
      <div className="p-6 bg-[#030712]/90 backdrop-blur-3xl h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-white font-bold tracking-tight">Active Listings</h3>
           <div className="px-3 py-1 glass-light rounded-full text-[10px] text-emerald-400 font-black tracking-widest uppercase border-emerald-500/30"><span className="animate-pulse inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>Live Updates</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Mock Listing 1 */}
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between group hover:border-purple-500/50 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Layers className="h-5 w-5" /></div>
                <span className="text-xs font-bold text-slate-300">4,500 kg</span>
              </div>
              <p className="text-white font-bold text-sm">Automotive Steel Scrap</p>
              <p className="text-[10px] text-slate-400 mt-1">Ashok Leyland • Chennai</p>
            </div>
            <button className="w-full mt-4 py-2 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Submit Request</button>
          </div>
          
          {/* Mock Listing 2 */}
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Recycle className="h-5 w-5" /></div>
                <span className="text-xs font-bold text-slate-300">800 L</span>
              </div>
              <p className="text-white font-bold text-sm">Industrial Solvents</p>
              <p className="text-[10px] text-slate-400 mt-1">Pricol Ltd • Coimbatore</p>
            </div>
            <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">Match Found</button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Floating interaction element */}
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-10, 10] }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      className="absolute -bottom-6 -right-6 glass-light p-4 rounded-2xl border border-emerald-500/30 flex items-center space-x-3 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
    >
      <CheckCircle2 className="text-emerald-400 h-6 w-6" />
      <div>
        <p className="text-white font-bold text-xs">Exchange Secured</p>
        <p className="text-slate-400 text-[10px]">LMW ↔ AutoCorp</p>
      </div>
    </motion.div>
  </motion.div>
)

const StepCard = ({ number, icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ 
      y: -15,
      rotateX: 5,
      rotateY: -5,
      z: 50,
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    className="relative p-8 rounded-[2rem] glass border border-white/5 hover:border-purple-500/30 transition-all group overflow-hidden perspective-1000 preserve-3d shadow-2xl"
  >
    {/* Hover Shimmer Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

    <div className="absolute top-8 right-8 text-6xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors duration-500">0{number}</div>
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="h-6 w-6 text-purple-400" />
    </div>
    <h3 className="text-xl font-black text-white mb-3 preserve-3d translate-z-10">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed preserve-3d translate-z-5">{desc}</p>
  </motion.div>
)

const Magnetic = ({ children }) => {
  const ref = React.useRef(null)
  
  const handleMouseEnter = () => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    window.dispatchEvent(new CustomEvent('magnet-snap', { detail: { x: centerX, y: centerY } }))
  }
  
  const handleMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('magnet-release'))
  }

  return (
    <div 
      ref={ref} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  )
}

const Landing = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-300 overflow-x-hidden relative selection:bg-purple-500/30 font-sans">
      
      <PremiumBackground />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-50">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">SCIEP</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-400">
          <a href="#how-it-works" className="hover:text-purple-400 transition-colors uppercase tracking-[0.1em] text-xs">How it Works</a>
          <a href="#features" className="hover:text-blue-400 transition-colors uppercase tracking-[0.1em] text-xs">Features</a>
          <Link to="/login" className="hover:text-white transition-colors uppercase tracking-[0.1em] text-xs">Platform Login</Link>
          <Link 
            to="/register" 
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold uppercase tracking-[0.1em] text-xs hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="z-10"
          >
            <div className="inline-flex items-center space-x-3 glass-light px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Actively Matching Industries</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.85] tracking-tighter text-white mb-8 perspective-1000">
              SMART <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-blue-400 to-emerald-400">CIRCULAR</span> <br />
              <span className="text-slate-700">PLATFORM</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed">
              The futuristic industrial backbone for the <span className="text-white font-bold italic">Circular Economy</span>. 
              Waste becomes wealth through autonomous matching.
            </p>

            <div className="flex flex-wrap gap-6">
              <Magnetic>
                <Link 
                  to="/register"
                  className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-primary-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                >
                  Launch Exchange
                </Link>
              </Magnetic>
            </div>

            <ImpactLedger />
          </motion.div>

          {/* Right Content (3D Visual) */}
          <div className="relative flex justify-center items-center">
            <ThreeDRotatingCore />
            
            {/* Overlay the Mockup slightly behind/beside it for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-20 blur-sm hover:opacity-100 hover:blur-none hover:scale-100 transition-all duration-1000 -z-10 cursor-pointer">
               <PlatformMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Real Usage / How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-32 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">How the Platform Works</h2>
            <p className="text-slate-400 font-medium">A seamless, practical workflow designed for real-world industrial logistics and secure transactions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              icon={PackageSearch}
              title="Upload Byproducts"
              desc="List your manufacturing waste—whether it's steel offcuts, chemical solvents, or textile scraps. Define quantities, purity, and location using our secure upload portal."
              delay={0.1}
            />
            <StepCard 
              number="2"
              icon={Network}
              title="Algorithmic Matching"
              desc="Our engine scans the network to find verified industries that require your exact byproduct as their primary or secondary raw material input."
              delay={0.3}
            />
            <StepCard 
              number="3"
              icon={Building2}
              title="Direct Exchange"
              desc="Initiate a secure chat directly with the buyer/seller to negotiate logistics. Every completed exchange automatically generates verifiable ESG impact reports."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative z-10 py-24 overflow-hidden text-center max-w-4xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tight text-white">
          Ready to join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Circular Economy?</span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Stop paying for disposal. Start monetizing your waste and sourcing cheaper, sustainable raw materials today.</p>
        <Link 
          to="/register" 
          className="inline-block px-10 py-4 rounded-xl bg-purple-600 text-white font-black uppercase tracking-[0.1em] text-sm hover:bg-purple-500 transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)]"
        >
          Create Enterprise Account
        </Link>
        <p className="mt-20 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Smart Circular Industry Exchange Platform
        </p>
      </footer>
    </div>
  )
}

export default Landing
