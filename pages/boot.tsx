import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ControlCenter from '../components/ControlCenter'
import Dock from '../components/Dock'
import HeaderBar from '../components/HeaderBar'

const HomePage: React.FC = () => {
  const [showMain, setShowMain] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true)
    }, 3000) // 3 秒 boot 動畫
    return () => clearTimeout(timer)
  }, [])

  // Add body scroll lock when control center is open on mobile
  useEffect(() => {
    if (isControlCenterOpen) {
      // Only apply these classes on mobile devices
      if (window.innerWidth < 768) {
        document.body.classList.add('overflow-hidden')
        // Important: we only apply pointer-events-none to the main content, not the body
        document.querySelector('main')?.classList.add('pointer-events-none')
      }
    } else {
      document.body.classList.remove('overflow-hidden')
      document.querySelector('main')?.classList.remove('pointer-events-none')
    }
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.querySelector('main')?.classList.remove('pointer-events-none')
    }
  }, [isControlCenterOpen])

  const toggleControlCenter = () => {
    setIsControlCenterOpen(!isControlCenterOpen)
  }

  // Close control center when clicking outside on mobile
  const handleMainClick = () => {
          if (isControlCenterOpen && window.innerWidth < 768) {
      setIsControlCenterOpen(false)
    }
  }

  return (
    <>
      <Head>
        <title>macOS Desktop</title>
        <meta name="description" content="macOS style desktop with liquid glass effects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/apple.svg" />
      </Head>

      {/* 單一畫面切換兩層區塊的透明度 */}
      <main className="relative min-h-screen overflow-hidden bg-black text-white" onClick={handleMainClick}>
        {/* Boot 畫面 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            showMain ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img src="/apple.svg" alt="Apple Logo" className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] mb-10 opacity-90" />
          <div className="w-[200px] h-[8px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-[load_2s_linear_forwards]" />
          </div>
        </div>

        {/* 主畫面 */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out transform ${
            showMain ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* 背景圖片 */}
          <div
            className="absolute inset-0 bg-cover bg-center object-cover w-full h-full responsive-wallpaper"
            style={{
              filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
            }}
          />
          {/* macOS Sonoma 風格光暈漸層 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f8ff]/30 via-transparent to-[#fff1e6]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 pointer-events-none" />
          <div className="relative z-10">
            <HeaderBar onToggleControlCenter={toggleControlCenter} />
            <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
            <Dock />
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
