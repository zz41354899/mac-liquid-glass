import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ControlCenter from '../components/ControlCenter'
import Dock from '../components/Dock'

const HomePage: React.FC = () => {
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true)
    }, 3000) // 3 秒 boot 動畫
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>macOS Desktop</title>
        <meta name="description" content="macOS style desktop with liquid glass effects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/apple.svg" />
      </Head>

      {/* 單一畫面切換兩層區塊的透明度 */}
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        {/* Boot 畫面 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            showMain ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img src="/apple.svg" alt="Apple Logo" className="w-32 h-32 mb-10 opacity-80" />
          <div className="w-[150px] h-[6px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-[load_2s_linear_forwards]" />
          </div>
        </div>

        {/* 主畫面 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showMain ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 背景圖片 */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat object-cover w-full h-full backdrop-blur-md"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1690321607902-d97c4b909a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
          <div className="relative z-10">
            <ControlCenter />
            <Dock />
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
