import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { 
  FolderIcon, 
  MusicalNoteIcon, 
  CameraIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  CalendarIcon,
  PhotoIcon,
  TvIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  PaintBrushIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/solid'
import Finder from './Finder'

interface DockProps {
  onControlCenterToggle?: () => void;
}

const Dock: React.FC<DockProps> = ({ onControlCenterToggle }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [finderOpen, setFinderOpen] = useState(false)
  const [clickedIcon, setClickedIcon] = useState<string | null>(null)

  // 檢測設備類型
  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 處理圖標點擊 - 優化觸發邏輯
  const handleIconClick = (name: string) => {
    setClickedIcon(name)
    
    // 立即處理點擊效果
    if (name === 'Finder') {
      setFinderOpen(true)
    } else if (name === 'Settings') {
      onControlCenterToggle?.()
    } else {
      console.log(`Clicked on ${name}`)
    }
    
    // 清除點擊狀態
    setTimeout(() => setClickedIcon(null), 200)
  }

  // 所有圖標
  const allIcons = [
    { Icon: FolderIcon, name: 'Finder' },
    { Icon: MusicalNoteIcon, name: 'Music' },
    { Icon: CameraIcon, name: 'Camera' },
    { Icon: DocumentTextIcon, name: 'Notes' },
    { Icon: ChatBubbleLeftRightIcon, name: 'Messages' },
    { Icon: MapIcon, name: 'Maps' },
    { Icon: CalendarIcon, name: 'Calendar' },
    { Icon: PhotoIcon, name: 'Photos' },
    { Icon: TvIcon, name: 'TV' },
    { Icon: BookOpenIcon, name: 'Books' },
    { Icon: BuildingStorefrontIcon, name: 'App Store' },
    { Icon: PaintBrushIcon, name: 'Pixelmator Pro' },
    { Icon: Cog6ToothIcon, name: 'Settings' },
    { Icon: PhoneIcon, name: 'Phone' },
    { Icon: EnvelopeIcon, name: 'Email' },
  ]

  // 手機版顯示前4個核心應用（與桌面版前四個一致），桌面版顯示所有
  const dockIcons = isMobile 
    ? [
        { Icon: FolderIcon, name: 'Finder' },
        { Icon: MusicalNoteIcon, name: 'Music' },
        { Icon: CameraIcon, name: 'Camera' },
        { Icon: DocumentTextIcon, name: 'Notes' },
      ]
    : allIcons

  // 避免服務器端渲染不一致
  if (!isClient) {
    return null
  }

  return (
    <>
      <div className={`fixed w-full flex justify-center z-50 ${isMobile ? 'bottom-2' : 'bottom-4'}`}>
        <Transition
          appear={true}
          show={true}
          enter="transition-all duration-500 ease-out delay-300"
          enterFrom="opacity-0 scale-95 translate-y-8"
          enterTo="opacity-100 scale-100 translate-y-0"
        >
          <div className="glass-dock-container flex justify-center items-center gap-2 sm:gap-2 lg:gap-3 py-2 sm:py-3 px-6 sm:px-5 rounded-2xl sm:rounded-3xl">
            {dockIcons.map(({ Icon, name }) => (
              <button
                key={name}
                className={`group relative flex-shrink-0 glass-dock-icon transition-all duration-200 ${
                  clickedIcon === name ? 'scale-90' : 'scale-100 hover:scale-110'
                }`}
                title={name}
                onClick={() => handleIconClick(name)}
              >
                <div className="large-glass-icon w-12 h-12 lg:w-14 lg:h-14 rounded-2xl relative overflow-hidden flex items-center justify-center">
                  {/* 圖標 */}
                  <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white relative z-20 drop-shadow-2xl" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-sm">
                  {name}
                </div>
              </button>
            ))}
          </div>
        </Transition>
      </div>

      {/* Finder 組件 */}
      <Finder 
        isOpen={finderOpen} 
        onClose={() => setFinderOpen(false)} 
      />
    </>
  )
}

export default Dock 