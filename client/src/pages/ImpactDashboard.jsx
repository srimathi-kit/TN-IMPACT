import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { motion } from 'framer-motion'
import { Leaf, Droplets, Wind, Zap, Award, TrendingUp } from 'lucide-react'

const ImpactDashboard = () => {
  const data = [
    { name: 'Plastic', recycled: 400, wasted: 240 },
    { name: 'Fabric', recycled: 300, wasted: 139 },
    { name: 'Metal', recycled: 200, wasted: 980 },
    { name: 'Wood', recycled: 278, wasted: 390 },
    { name: 'Paper', recycled: 189, wasted: 480 },
  ]

  const pieData = [
    { name: 'Carbon Credits', value: 400 },
    { name: 'Energy Saved', value: 300 },
    { name: 'Water Saved', value: 300 },
  ]

  const COLORS = ['#16a34a', '#0ea5e9', '#f59e0b']

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 animate-in fade-in duration-700"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sustainability Impact</h1>
        <p className="text-slate-500">Visualizing the environmental benefits of your circular exchanges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'CO2 Offset', value: '12.4 Tons', icon: Wind, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Energy Saved', value: '8,400 kWh', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Water Saved', value: '150k Liters', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Green Score', value: '8.4/10', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center space-x-4">
            <div className={`p-4 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold mb-8">Resource Recovery by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Legend />
                <Bar dataKey="recycled" fill="#16a34a" radius={[6, 6, 0, 0]} name="Recovered (kg)" />
                <Bar dataKey="wasted" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Landfill (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold mb-8">Environmental Contribution</h2>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-8 mt-4 text-center">
              {pieData.map((entry, index) => (
                <div key={index}>
                  <p className="text-xs text-slate-400 font-bold uppercase">{entry.name}</p>
                  <p className="font-bold" style={{color: COLORS[index]}}>{entry.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ImpactDashboard
