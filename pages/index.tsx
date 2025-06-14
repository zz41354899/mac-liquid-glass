import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ControlCenter from '../components/ControlCenter'
import Dock from '../components/Dock'
import HeaderBar from '../components/HeaderBar'
import DesktopIcons from '../components/DesktopIcons'

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 3000) // 開機動畫時間 3 秒

    return () => clearTimeout(timer)
  }, [])



  const toggleControlCenter = () => {
    setIsControlCenterOpen(!isControlCenterOpen)
  }

  const closeControlCenter = () => {
    setIsControlCenterOpen(false)
  }

  return (
    <>
      <Head>
        <title>macOS Desktop</title>
        <meta name="description" content="macOS style desktop with liquid glass effects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/apple.svg" />
      </Head>

      {isLoaded ? (
        // ✅ 主畫面內容
        <main 
          className="relative min-h-screen overflow-hidden opacity-100 transition-opacity duration-1000 ease-out"
        >
          {/* 背景圖片 - 響應式背景 */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat object-cover w-full h-full responsive-wallpaper"
            style={{
              filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
            }}
          />

          {/* macOS Sonoma 風格光暈漸層 - 靜態 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f8ff]/30 via-transparent to-[#fff1e6]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 pointer-events-none" />

          {/* macOS UI 元件 */}
          <div className="relative z-10">
            <HeaderBar onToggleControlCenter={toggleControlCenter} />
            <DesktopIcons isControlCenterOpen={isControlCenterOpen} />
            <ControlCenter isOpen={isControlCenterOpen} onClose={closeControlCenter} />
            <Dock onControlCenterToggle={toggleControlCenter} />
          </div>


        </main>
      ) : (
        // 🖥️ 開機畫面
        <div className="bg-black min-h-screen flex flex-col items-center justify-center transition-opacity duration-700">
          <img src="/apple.svg" alt="Apple Logo" className="w-32 h-32 mb-4 opacity-80" />
          <div className="w-[150px] h-[6px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-[load_2s_linear_forwards]" />
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
