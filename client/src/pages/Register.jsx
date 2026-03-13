import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'
import { Recycle, ArrowRight } from 'lucide-react'
import PremiumBackground from '../components/PremiumBackground'

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    industryName: '',
    industryType: '',
    location: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUser(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12 relative overflow-hidden bg-transparent">
      
      <PremiumBackground />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 glass border-white/10 rounded-[2rem] shadow-2xl mb-6">
            <Recycle className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Join the <span className="text-primary-500 text-gradient">Circular Revolution</span></h1>
          <p className="text-slate-400 mt-3 text-lg font-medium tracking-tight">Register your Industry to start Exchange</p>
        </div>

        <div className="glass p-10 rounded-[3rem] shadow-2xl border border-white/5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Industry Name</label>
              <input 
                name="industryName"
                type="text" 
                onChange={handleChange}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="Industrial Solutions Global"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Industry Type</label>
              <select 
                name="industryType"
                onChange={handleChange}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-white font-medium appearance-none"
                required
              >
                <option value="" className="bg-slate-900">Select Sector</option>
                <option value="Manufacturing" className="bg-slate-900">Manufacturing</option>
                <option value="Textile" className="bg-slate-900">Textile</option>
                <option value="Chemical" className="bg-slate-900">Chemical</option>
                <option value="Construction" className="bg-slate-900">Construction</option>
                <option value="Electronics" className="bg-slate-900">Electronics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Base Location</label>
              <input 
                name="location"
                type="text" 
                onChange={handleChange}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="City, Region"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Corporate Email</label>
              <input 
                name="email"
                type="email" 
                onChange={handleChange}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="admin@industry.com"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Secured Password</label>
              <input 
                name="password"
                type="password" 
                onChange={handleChange}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="md:col-span-2 bg-primary-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center space-x-3 group"
            >
              <span>Initialize Membership</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <p className="text-center text-slate-500 mt-10 text-sm font-medium">
            Already registered? 
            <Link to="/login" className="text-primary-500 font-black ml-2 hover:text-primary-400 transition-colors">Partner Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
