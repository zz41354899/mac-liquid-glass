import React, { useState, useEffect } from 'react'
import { 
  ChatBubbleLeftRightIcon,
  MapIcon,
  CalendarIcon,
  PlayIcon,
  FilmIcon,
  BookOpenIcon,
  ShoppingBagIcon,
  PencilIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'

interface DesktopIconsProps {
  isControlCenterOpen?: boolean;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ isControlCenterOpen = false }) => {
  const [isMobile, setIsMobile] = useState(false)

  // 檢測是否為手機設備
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 手機版桌面顯示的圖標（Dock中沒有的）- 使用填充風格
  const desktopIcons = [
    { Icon: ChatBubbleLeftRightIcon, name: 'Messages' },
    { Icon: MapIcon, name: 'Maps' },
    { Icon: CalendarIcon, name: 'Calendar' },
    { Icon: PlayIcon, name: 'Videos' },
    { Icon: FilmIcon, name: 'TV' },
    { Icon: BookOpenIcon, name: 'Books' },
    { Icon: ShoppingBagIcon, name: 'App Store' },
    { Icon: PencilIcon, name: 'Notes' },
    { Icon: Cog6ToothIcon, name: 'Settings' },
  ]

  // 只在手機版顯示，且控制中心關閉時顯示
  if (!isMobile || isControlCenterOpen) {
    return null
  }

  return (
    <div className="absolute top-20 left-4 right-4 z-10">
      <div className="grid grid-cols-4 gap-6 p-4">
        {desktopIcons.map(({ Icon, name }) => (
          <button
            key={name}
            className="group flex flex-col items-center"
            title={name}
          >
            <div className="w-16 h-16 cfz-liquid-glass-rect rounded-2xl hover:scale-105 transition-all duration-200 drop-shadow-lg relative overflow-hidden flex items-center justify-center">
              {/* 使用填充風格圖標 */}
              <Icon className="w-10 h-10 text-white" />
            </div>
            
            {/* 應用名稱 */}
            <span className="text-white text-xs mt-2 text-center drop-shadow-md">
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DesktopIcons 