import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import UploadWaste from './pages/UploadWaste'
import ImpactDashboard from './pages/ImpactDashboard'
import Requests from './pages/Requests'
import Messages from './pages/Messages'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import IndustryProfile from './pages/IndustryProfile'
import { useState, useEffect } from 'react'
import PremiumBackground from './components/PremiumBackground'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) setUser(userInfo)
  }, [])

  const Layout = ({ children }) => (
    <div className="flex h-screen bg-transparent overflow-hidden relative">
      <PremiumBackground />
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      <div className="flex w-full h-full relative z-10">
        <Sidebar user={user} setUser={setUser} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar user={user} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )

  return (
    <Routes>
      <Route path="/" element={user ? <Layout><Dashboard /></Layout> : <Landing />} />
      <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
      <Route path="/marketplace" element={user ? <Layout><Marketplace /></Layout> : <Navigate to="/login" />} />
      <Route path="/upload" element={user ? <Layout><UploadWaste /></Layout> : <Navigate to="/login" />} />
      <Route path="/impact" element={user ? <Layout><ImpactDashboard /></Layout> : <Navigate to="/login" />} />
      <Route path="/requests" element={user ? <Layout><Requests /></Layout> : <Navigate to="/login" />} />
      <Route path="/messages" element={user ? <Layout><Messages /></Layout> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Layout><IndustryProfile /></Layout> : <Navigate to="/login" />} />
      <Route path="/profile/:id" element={user ? <Layout><IndustryProfile /></Layout> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
