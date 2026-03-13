import React, { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const PremiumBackground = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [magnet, setMagnet] = useState(null)

  // Smooth springs for the mouse follow effect
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (magnet) {
        // When magnetized, move slightly towards the mouse but stay anchored
        mouseX.set(magnet.x + (e.clientX - magnet.x) * 0.1)
        mouseY.set(magnet.y + (e.clientY - magnet.y) * 0.1)
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
    }

    const handleMagnetSnap = (e) => setMagnet(e.detail)
    const handleMagnetRelease = () => setMagnet(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('magnet-snap', handleMagnetSnap)
    window.addEventListener('magnet-release', handleMagnetRelease)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('magnet-snap', handleMagnetSnap)
      window.removeEventListener('magnet-release', handleMagnetRelease)
    }
  }, [mouseX, mouseY, magnet])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617] overflow-hidden perspective-1000">
      
      {/* 1. Interactive Mouse Spotlight Glow */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-primary-500/10 blur-[120px] mix-blend-screen opacity-50 z-10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: magnet ? 1.5 : 1,
          backgroundColor: magnet ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)'
        }}
        transition={{ scale: { type: 'spring', ...springConfig } }}
      />

      {/* 2. 3D Depth Environment Container */}
      <div className="absolute inset-0 preserve-3d">
        {/* Deep Perspective Layer 1 */}
        <div className="absolute inset-0 opacity-[0.03] preserve-3d" 
             style={{ transform: 'translateZ(-500px) scale(2)' }}>
          <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] animate-rotate-3d"></div>
        </div>

        {/* Medium Depth Layer 2 */}
        <div className="absolute inset-0 opacity-[0.05] preserve-3d" 
             style={{ transform: 'translateZ(-200px) scale(1.5)' }}>
          <div className="absolute inset-0 animate-aurora" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
                 backgroundSize: '100px 100px'
               }}></div>
        </div>
      </div>

      {/* 3. Neural Network Connection Layer (SVG Pulsing) */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Connection Lines with neural pulse */}
        <path d="M 100 200 L 400 500 L 800 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-[neural-pulse_8s_infinite]" style={{ strokeDasharray: '10, 10' }} />
        <path d="M 90% 10% L 70% 40% L 85% 70%" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-[neural-pulse_12s_infinite_1s]" style={{ strokeDasharray: '5, 15' }} />
        <path d="M 20% 80% L 40% 60% L 10% 30%" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-[neural-pulse_10s_infinite_2s]" style={{ strokeDasharray: '20, 10' }} />
      </svg>

      {/* 4. Shooting Stars (Random Streaks) */}
      <div className="absolute top-0 right-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-l from-white to-transparent w-40 h-[1px] rounded-full animate-shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${70 + Math.random() * 30}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* 5. Particle Sprinkle System (Glowing Dots) */}
      <div className="absolute inset-0 z-0">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
          ></div>
        ))}
      </div>

      {/* 6. Circuit Grid Pulses - Replaces horizontal scanline */}
      <svg className="absolute inset-0 w-full h-full opacity-30 z-0">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Horizontal pulses moving along grid lanes */}
        <rect x="-100" y="20%" width="200" height="1" fill="url(#circuitGrad)" className="animate-circuit" style={{ animationDelay: '0s' }} />
        <rect x="-100" y="50%" width="300" height="1" fill="url(#circuitGrad)" className="animate-circuit" style={{ animationDelay: '3s' }} />
        <rect x="-100" y="80%" width="250" height="1" fill="url(#circuitGrad)" className="animate-circuit" style={{ animationDelay: '6s' }} />
        
        {/* Vertical pulses moving along grid lanes */}
        <rect x="30%" y="-100" width="1" height="200" fill="url(#circuitGrad)" className="animate-circuit rotate-90" style={{ animationDelay: '1.5s' }} />
        <rect x="70%" y="-100" width="1" height="300" fill="url(#circuitGrad)" className="animate-circuit rotate-90" style={{ animationDelay: '4.5s' }} />
      </svg>

      {/* Core Glowing Orbs - Aurora Shifted */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen animate-aurora" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-aurora" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      
    </div>
  )
}

export default PremiumBackground
