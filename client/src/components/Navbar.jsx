import React, { useState, useEffect } from 'react'
import { Search, Bell, User, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api'

const Navbar = ({ user }) => {
  const [notifications, setNotifications] = useState(0)

  useEffect(() => {
    if (!user) return
    const fetchCounts = async () => {
      try {
        const timestamp = new Date().getTime()
        const msgRes = await axios.get(`${API_BASE_URL}/messages/count?t=${timestamp}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setNotifications(msgRes.data.count)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCounts()
    const interval = setInterval(fetchCounts, 5000) // Poll every 5s for better responsiveness
    
    // Listen for manual refreshes (useful when user marks as read in Messages.jsx)
    const handleRefresh = () => fetchCounts()
    window.addEventListener('refreshNotifications', handleRefresh)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('refreshNotifications', handleRefresh)
    }
  }, [user])

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 glass border-b border-white/5 shadow-sm">
      <div className="flex items-center glass-light border border-white/5 rounded-2xl px-4 py-2.5 w-[400px] shadow-sm focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500/50 transition-all">
        <Search className="h-4 w-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search materials, industries..." 
          className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/messages" className="relative p-2.5 hover:bg-slate-100 rounded-2xl transition-all group">
          <Bell className="h-6 w-6 text-slate-500 group-hover:text-primary-600" />
          {notifications > 0 && (
            <span className="absolute top-2 right-2 h-5 w-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
              {notifications}
            </span>
          )}
        </Link>
        <Link to="/profile" className="flex items-center space-x-3 pl-6 border-l border-white/5 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white leading-tight group-hover:text-primary-400 transition-colors uppercase tracking-tight">{user?.industryName}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.industryType} Hub</p>
          </div>
          <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform duration-300">
            <User className="h-5 w-5 text-white" />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Navbar

