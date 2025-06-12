import React, { useState, useEffect } from 'react'
import { WifiIcon, Battery100Icon, Cog6ToothIcon } from '@heroicons/react/24/outline'

interface HeaderBarProps {
  onToggleControlCenter: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onToggleControlCenter }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // 獲取當前時間
  const getCurrentTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }
    return now.toLocaleDateString('en-US', options)
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-8 px-4 flex items-center justify-between text-xs text-white z-[40] transform transition-all duration-700 ease-out ${
      isMounted ? 'translate-y-0 opacity-100' : 'translate-y-[-20px] opacity-0 delay-100'
    }`}>
      {/* 左側選單 */}
      <div className="flex items-center gap-4">
        {/* Apple Logo */}
        <div className="w-4 h-4 flex items-center justify-center">
          <img src="/apple.svg" alt="Apple" className="w-3 h-3 opacity-80" />
        </div>
        
        {/* 選單項目 */}
        <div className="flex items-center gap-4 font-medium">
          <span className="hover:text-white cursor-pointer transition-colors">Finder</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden sm:inline">File</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden md:inline">Edit</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden lg:inline">View</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden lg:inline">Window</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden xl:inline">Help</span>
        </div>
      </div>

      {/* 右側狀態列 */}
      <div className="flex items-center gap-3">
        <span className="font-medium">{getCurrentTime()}</span>
        <WifiIcon className="w-4 h-4" />
        <Battery100Icon className="w-4 h-4" />
        <button 
          onClick={onToggleControlCenter} 
          className="p-1.5 hover:bg-white/10 rounded-md transition-all relative z-[45]"
          aria-label="Control Center"
        >
          <Cog6ToothIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}

export default HeaderBar 