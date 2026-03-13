import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  BarChart3, 
  LogOut, 
  Recycle,
  User,
  MessageSquare,
  Mail 
} from 'lucide-react'

const Sidebar = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
    navigate('/login')
  }

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Marketplace', icon: ShoppingBag, path: '/marketplace' },
    { title: 'Upload Waste', icon: PlusCircle, path: '/upload' },
    { title: 'Requests', icon: MessageSquare, path: '/requests' },
    { title: 'Messages', icon: Mail, path: '/messages' },
    { title: 'My Profile', icon: User, path: '/profile' },
    { title: 'Impact Dashboard', icon: BarChart3, path: '/impact' },
  ]

  return (
    <div className="w-72 glass text-slate-400 flex flex-col h-full border-r border-white/5 backdrop-blur-xl z-50">
      <div className="p-8 flex items-center space-x-3 mb-4">
        <div className="bg-primary-500 p-2.5 rounded-2xl shadow-lg shadow-primary-500/20">
          <Recycle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-black text-2xl text-white tracking-tight leading-none">SCIEP</h1>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">Industrial Circularity</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-xl shadow-primary-500/20' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
