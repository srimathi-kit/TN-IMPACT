import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'
import { 
  Building2, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Globe2, 
  BarChart3, 
  Package, 
  ArrowLeft,
  Calendar,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const IndustryProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [industry, setIndustry] = useState(null)
  const [loading, setLoading] = useState(true)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        // If no ID, show current user profile
        const targetId = id || userInfo._id
        const { data } = await axios.get(`${API_BASE_URL}/auth/profile/${targetId}`, {
           headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        setIndustry(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchIndustry()
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  )

  if (!industry) return <div className="p-8 text-center glass rounded-3xl">Industry not found.</div>

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header / Cover */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 p-3 glass border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute -bottom-1 left-12 translate-y-1/2 flex items-center space-x-6">
          <div className="h-32 w-32 glass border-white/40 rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-center bg-white/10">
            <Building2 className="h-16 w-16 text-white" />
          </div>
          <div className="pb-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-black text-white tracking-tight">{industry.industryName}</h1>
              <div className="bg-green-400/20 backdrop-blur-md p-1 rounded-full">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <p className="text-primary-100 font-medium flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1 opacity-70" />
              {industry.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[2.5rem] shadow-sm"
          >
            <h2 className="text-lg font-black text-white mb-6 flex items-center">
              <Award className="h-5 w-5 mr-3 text-primary-500" />
              Industrial Stats
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 glass-light rounded-2xl border-white/5">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-bold text-slate-300">Circular Rate</span>
                </div>
                <span className="text-lg font-black text-primary-500">84%</span>
              </div>
              <div className="flex items-center justify-between p-4 glass-light rounded-2xl border-white/5">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-bold text-slate-300">CO2 Saved</span>
                </div>
                <span className="text-lg font-black text-blue-500">12.4t</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-[2.5rem] shadow-sm"
          >
            <h2 className="text-lg font-black text-white mb-6">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-600 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-sm">{industry.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <Globe2 className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-sm">Industrial Network Member</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <Calendar className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-sm">Joined March 2026</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: About & More */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[2.5rem] shadow-sm min-h-[400px]"
          >
            <h2 className="text-2xl font-black text-white mb-6 underline decoration-primary-500/30 decoration-4 underline-offset-8">About Industrial Operations</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8 font-medium">
              {industry.industryName} is a leading player in the {industry.industryType} sector, dedicated to pioneering circular manufacturing processes. Our facility in {industry.location} specializes in sustainable raw material utilization and waste-to-wealth transformations.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg font-medium">
              Through the SCIEP network, we aim to eliminate industrial landfill contributions by 2030, partnering with regional leaders to create a closed-loop ecosystem for {industry.industryType} byproducts.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
               <div className="p-8 glass-light rounded-[2rem] border-white/5">
                  <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-3">Primary Output</h4>
                  <p className="text-primary-500 font-bold text-lg">{industry.industryType} Secondary Raw Materials</p>
               </div>
               <div className="p-8 glass-light rounded-[2rem] border-white/5">
                  <h4 className="font-black text-slate-500 uppercase tracking-widest text-[10px] mb-3">Certification</h4>
                  <p className="text-primary-500 font-bold text-lg">ISO 14001 Circularity Certified</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default IndustryProfile
