import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'
import { Recycle, ArrowRight } from 'lucide-react'
import PremiumBackground from '../components/PremiumBackground'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e, demoEmail = null, demoPassword = null) => {
    if (e) e.preventDefault()
    const loginEmail = demoEmail || email
    const loginPassword = demoPassword || password
    
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { 
        email: loginEmail, 
        password: loginPassword 
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUser(data)
      window.location.href = '/'
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-transparent">
      
      <PremiumBackground />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 glass border-white/10 rounded-[2rem] shadow-2xl mb-6">
            <Recycle className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Welcome <span className="text-primary-500 text-gradient">Back</span></h1>
          <p className="text-slate-400 mt-3 text-lg font-medium tracking-tight">Enterprise Access to Circularity</p>
        </div>

        <div className="glass p-10 rounded-[3rem] shadow-2xl border border-white/5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="name@industry.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 glass border-white/5 rounded-2xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center space-x-3 group"
            >
              <span>Authorize Access</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              type="button"
              onClick={() => handleLogin(null, 'admin@lmw.co.in', 'password123')}
              className="w-full bg-slate-900 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-800 hover:text-white transition-all border border-white/5 flex items-center justify-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
              <span>Quick Demo Access (No Password Required)</span>
            </button>
          </form>

          <p className="text-center text-slate-500 mt-10 text-sm font-medium">
            New Industrial Partner? 
            <Link to="/register" className="text-primary-500 font-black ml-2 hover:text-primary-400 transition-colors">Apply for Membership</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

