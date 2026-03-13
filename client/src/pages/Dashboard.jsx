import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Trash2, 
  CheckCircle2, 
  DollarSign,
  ArrowRight,
  Plus,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import API_BASE_URL from '../api'
import { motion } from 'framer-motion'

const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass p-7 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all group"
  >
    <div className="flex items-center justify-between mb-5">
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {trend && (
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase tracking-wider">
            +{trend}%
          </span>
          <span className="text-[10px] text-slate-400 mt-1">vs last month</span>
        </div>
      )}
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
    <p className="text-3xl font-black text-white mt-2 tracking-tight drop-shadow-lg">{value}</p>
    {trend && (
      <p className="text-xs text-green-400 font-bold mt-2">↑ {trend}% vs last month</p>
    )}
  </motion.div>
)

const Dashboard = () => {
  const [data, setData] = useState({
    totalWaste: '4,285 kg',
    wasteReused: '3,120 kg',
    landfillReduced: '72%',
    costSavings: '$12,450'
  })
  const [recommendations, setRecommendations] = useState([])
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/waste/recommendations`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        setRecommendations(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchRecs()
  }, [])

  // Sample chart data
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 900 },
    { name: 'Jun', value: 1200 },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Industry <span className="text-primary-500 text-gradient">Overview</span>
          </h1>
          <p className="text-slate-400 mt-1">Monitor your circular economy performance and waste metrics.</p>
        </div>
        <Link 
          to="/upload" 
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center space-x-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <Plus className="h-5 w-5" />
          <span>Post New Waste</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Waste Uploaded" 
          value={data.totalWaste} 
          icon={Trash2} 
          color="bg-amber-500" 
          trend="12"
          delay={0.1}
        />
        <StatCard 
          title="Waste Reused" 
          value={data.wasteReused} 
          icon={TrendingUp} 
          color="bg-primary-500" 
          trend="18"
          delay={0.2}
        />
        <StatCard 
          title="Landfill Reduced" 
          value={data.landfillReduced} 
          icon={CheckCircle2} 
          color="bg-secondary-500" 
          delay={0.3}
        />
        <StatCard 
          title="Cost Savings" 
          value={data.costSavings} 
          icon={DollarSign} 
          color="bg-emerald-600" 
          trend="24"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass p-8 rounded-[2.5rem] shadow-sm"
        >
          <h2 className="text-lg font-bold mb-6 text-white/90">Waste Recovery Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white/90">Smart Matches</h2>
            <Sparkles className="h-4 w-4 text-primary-500" />
          </div>
          
          {recommendations.length > 0 ? (
            <div className="space-y-6">
              {recommendations.slice(0, 3).map((rec, i) => (
                <Link to="/marketplace" key={i} className="flex items-center space-x-4 p-4 hover:bg-primary-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-primary-100">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{rec.wasteType} Available</p>
                    <p className="text-xs text-slate-500">{rec.industry?.industryName}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-sm text-slate-400">Loading recommended partners...</p>
            </div>
          )}
          
          <button className="w-full mt-6 py-3 text-sm font-bold text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
            View All Connections
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
