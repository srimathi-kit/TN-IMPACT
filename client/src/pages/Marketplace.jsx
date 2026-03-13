import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { 
  Search, 
  Filter, 
  MapPin, 
  Package, 
  Building2, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Recycle, 
  Scan, 
  Database, 
  Info,
  Tag,
  ShieldCheck,
  Zap,
  Leaf,
  ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import API_BASE_URL from '../api'

const Magnetic = ({ children }) => {
  const ref = useRef(null)
  
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
      className="inline-block w-full"
    >
      {children}
    </div>
  )
}

const HolographicHUD = ({ type }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl z-20 flex flex-col p-8 pb-32 pointer-events-none border-2 border-primary-500/50 rounded-[2.5rem]"
  >
    <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-500 shadow-[0_0_15px_#a855f7] animate-scan pointer-events-none"></div>
    
    <div className="flex justify-between items-start mb-8">
      <div className="bg-primary-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-primary-500/20">
        <Scan className="w-3 h-3" /> AI SCAN ACTIVE
      </div>
      <div className="text-primary-400 font-mono text-[10px] bg-slate-900/50 px-2 py-1 rounded border border-white/5 animate-pulse">
        TRS: {Math.random().toString(36).substring(7).toUpperCase()}
      </div>
    </div>

    <div className="space-y-5 font-mono">
      <div className="flex justify-between border-b border-white/10 pb-2">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">SPEC GRADE</span>
        <span className="text-[13px] text-primary-400 font-black tracking-tighter shadow-sm">INDUSTRIAL A+</span>
      </div>
      <div className="flex justify-between border-b border-white/10 pb-2">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">MATERIAL PURITY</span>
        <span className="text-[13px] text-white font-black tracking-tighter">98.24%</span>
      </div>
      <div className="flex justify-between border-b border-white/10 pb-2">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">ECO FOOTPRINT</span>
        <span className="text-[13px] text-emerald-400 font-black tracking-tighter">S-TIER</span>
      </div>
      <div className="flex justify-between border-b border-white/10 pb-2">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">CO2 OFFSET</span>
        <span className="text-[13px] text-emerald-400 font-black tracking-tighter">12.4kg / UNIT</span>
      </div>
    </div>

    <div className="mt-auto">
      <div className="text-[9px] text-primary-500/50 font-black uppercase tracking-[0.3em] mb-2">Neural Analysis in Progress...</div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_15px_#a855f7]"
        ></motion.div>
      </div>
    </div>
  </motion.div>
)

const MaterialFlowModal = ({ item, onClose }) => {
  if (!item) return null

  const lifecycleStages = [
    { id: 'extraction', label: 'Primary Sourcing', icon: Building2, color: '#fca5a5' },
    { id: 'production', label: 'Industrial Processing', icon: Cpu, color: '#a5b4fc' },
    { id: 'usage', label: 'Manufacturing Utility', icon: Package, color: '#93c5fd' },
    { id: 'now', label: 'Current Waste State', icon: Info, color: '#fbbf24' },
    { id: 'exchange', label: 'SCIEP Interchange', icon: Recycle, color: '#10b981' },
    { id: 'future', label: 'Circular Value Generation', icon: Zap, color: '#c084fc' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 circuit-pattern"></div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-5xl rounded-[3rem] border border-white/10 p-12 relative overflow-hidden flex flex-col h-[80vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-2xl glass-light hover:bg-slate-800 transition-colors z-50"
        >
          <ArrowRight className="rotate-180" />
        </button>

        <div className="mb-10">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
            Lifecycle <span className="text-primary-500">Visualization</span>
          </h2>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest">{item.wasteType} // Circular Impact Analysis 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</p>
        </div>

        {/* Global Spec Header */}
        <div className="grid grid-cols-4 gap-6 mb-12">
           <div className="bg-slate-900/50 p-5 rounded-3xl border border-white/5 shadow-2xl">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Available Quantity</p>
             <p className="text-3xl font-black text-white tabular-nums tracking-tighter">{item.quantity}</p>
           </div>
           <div className="bg-slate-900/50 p-5 rounded-3xl border border-white/5 shadow-2xl">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Facility Location</p>
             <p className="text-sm font-black text-white leading-tight uppercase tracking-tight">{item.location}</p>
           </div>
           <div className="bg-slate-900/50 p-5 rounded-3xl border border-white/5 shadow-2xl">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Industrial Partner</p>
             <p className="text-sm font-black text-white leading-tight uppercase tracking-tight">{item.industry?.industryName}</p>
           </div>
           <div className="bg-slate-900/50 p-5 rounded-3xl border border-white/5 shadow-2xl">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">Verification</p>
             <div className="flex items-center gap-2 mt-1">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
               <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">ISO-9001 CERTIFIED</p>
             </div>
           </div>
        </div>

        <div className="flex-1 relative flex items-center justify-between gap-4">
          {/* Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                 <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path d="M 50 150 Q 250 50 450 150 T 850 150" fill="none" stroke="url(#flowGrad)" strokeWidth="2" className="animate-circuit" />
          </svg>

          {lifecycleStages.map((stage, idx) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="relative z-10 flex flex-col items-center group w-32"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg relative overflow-hidden"
                style={{ backgroundColor: `${stage.color}10`, border: `1px solid ${stage.color}30` }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <stage.icon className="w-6 h-6" style={{ color: stage.color }} />
                {stage.id === 'now' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                )}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-center text-slate-300 group-hover:text-white transition-colors">
                {stage.label}
              </p>
              {idx < lifecycleStages.length - 1 && (
                <div className="hidden lg:block absolute left-full top-8 w-12 border-t border-dashed border-white/20"></div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-auto p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5 grid grid-cols-3 gap-12 shadow-inner">
           <div className="flex flex-col gap-1">
             <p className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.2em]">Environmental Benefit</p>
             <p className="text-3xl font-black text-white tabular-nums tracking-tighter">-{Math.floor(Math.random() * 50) + 120}.5 kg CO2</p>
           </div>
           <div className="flex flex-col gap-1 border-x border-white/10 px-12">
             <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.2em]">Circular Efficiency</p>
             <p className="text-3xl font-black text-white tabular-nums tracking-tighter">98.2% Purity</p>
           </div>
           <div className="flex flex-col gap-1">
             <p className="text-[11px] text-purple-500 font-black uppercase tracking-[0.2em]">Economic Value</p>
             <p className="text-3xl font-black text-white tabular-nums tracking-tighter">Premium Tier</p>
           </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Marketplace = () => {
  const [wasteItems, setWasteItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [requestSent, setRequestSent] = useState(null)
  const [selectedForFlow, setSelectedForFlow] = useState(null) // New state for modal
  
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/waste`)
        setWasteItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const filteredItems = wasteItems.filter(item => 
    item.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.industry?.industryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRequest = async (item) => {
    try {
      if (item.industry._id === userInfo._id) {
        alert("You cannot request your own material.")
        return
      }
      
      await axios.post(`${API_BASE_URL}/requests`, {
        receiver: item.industry._id,
        wasteItem: item._id,
        message: `Industrial exchange request for ${item.wasteType} waste.`
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
      
      setRequestSent(item._id)
      setTimeout(() => setRequestSent(null), 3000)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Failed to send request. Please log in again.")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Waste <span className="text-primary-500 text-gradient">Marketplace</span>
          </h1>
          <p className="text-slate-400 mt-1">Acquire secondary raw materials to fuel your circular production.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search materials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 glass border-slate-200/50 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none w-80 shadow-sm transition-all text-sm"
            />
          </div>
          <button className="p-3.5 glass border-slate-200/50 rounded-2xl hover:bg-slate-50 transition-all shadow-sm group">
            <Filter className="h-5 w-5 text-slate-600 group-hover:text-primary-600" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredItems.map((item) => (
            <Magnetic key={item._id}>
              <motion.div 
                variants={itemAnim}
                whileHover={{ 
                  y: -15,
                  rotateX: 5,
                  rotateY: -5,
                  z: 50,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group perspective-1000 preserve-3d cursor-pointer"
                onClick={() => setSelectedForFlow(item)}
              >
                  <AnimatePresence>
                    <div className="group-hover:block hidden">
                      <HolographicHUD type={item.wasteType} />
                    </div>
                  </AnimatePresence>

                  <div className="h-56 bg-slate-900 relative overflow-hidden group">
                <img 
                  src={
                    item.image && item.image.startsWith('http') ? item.image :
                    item.image && item.image.trim() !== '' ? `${API_BASE_URL.replace('/api', '')}/${item.image}` :
                    item.wasteType === 'Plastic' ? '/images/plastic_waste.png' :
                    item.wasteType === 'Fabric' ? '/images/fabric_waste.png' :
                    item.wasteType === 'Metal' ? '/images/metal_waste.png' :
                    item.wasteType === 'Chemical' ? '/images/chemical_waste.png' :
                    item.wasteType === 'Wood' ? '/images/wood_waste.png' :
                    item.wasteType === 'Paper' ? '/images/paper_waste.png' :
                    item.wasteType === 'Food' ? '/images/food_waste.png' :
                    item.wasteType === 'E-Waste' ? '/images/ewaste.png' :
                    '/images/metal_waste.png'
                  } 
                  alt={item.wasteType} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 glass border-white/40 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-700 shadow-xl">
                    {item.wasteType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize">{item.wasteType} Waste</h3>
                    <div className="flex items-center text-slate-500 text-sm mt-1">
                      <Building2 className="h-3.5 w-3.5 mr-1" />
                      <span>{item.industry?.industryName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-600 font-bold">{item.quantity}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Quantity</p>
                  </div>
                </div>

                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  <span>{item.location}</span>
                </div>

                <div className="bg-primary-50/50 p-4 rounded-2xl mb-6 border border-primary-100/50 flex items-start space-x-3">
                  <div className="mt-1">
                    <div className="bg-primary-100 p-1.5 rounded-lg">
                      <Recycle className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-primary-600 tracking-[0.1em]">Circular Strategy</p>
                    <p className="text-sm text-slate-700 font-bold mt-0.5 leading-tight">
                      Best For: {
                        item.wasteType === 'Fabric' ? 'Textile Transformation' :
                        item.wasteType === 'Plastic' ? 'Polymer Reprocessing' :
                        item.wasteType === 'Metal' ? 'Precision Smelting' :
                        item.wasteType === 'Wood' ? 'Biomass or Composite' :
                        'Specialized Circularity'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-30">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRequest(item); }}
                    disabled={requestSent === item._id}
                    className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${
                      requestSent === item._id 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                        : 'bg-slate-900 text-white hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary-500/30'
                    }`}
                  >
                    {requestSent === item._id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 animate-bounce" />
                        <span>Success</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Request</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate('/messages', { state: { contact: item.industry } }); }}
                    className="p-4 glass border-slate-200/50 text-slate-600 rounded-2xl hover:bg-primary-50 hover:text-primary-600 transition-all shadow-sm group"
                    title="Message Industry"
                  >
                    <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedForFlow(item); }}
                    className="p-4 glass border-white/10 text-white rounded-2xl hover:bg-primary-500/20 hover:text-primary-400 transition-all shadow-sm group"
                    title="View Lifecycle"
                  >
                    <Database className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
            </div>
          </motion.div>
        </Magnetic>
      ))}
      </motion.div>
      )}
      <AnimatePresence>
        {selectedForFlow && (
          <MaterialFlowModal 
            item={selectedForFlow} 
            onClose={() => setSelectedForFlow(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}


export default Marketplace

