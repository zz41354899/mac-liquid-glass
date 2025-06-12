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
  PaintBrushIcon
} from '@heroicons/react/24/solid'

const Dock: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // 檢測是否為手機設備
  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 所有圖標 - 使用符合語意的填充風格圖標
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
  ]

  // 手機版只顯示前4個，桌面版顯示所有
  const dockIcons = isMobile ? allIcons.slice(0, 4) : allIcons

  // 避免服務器端渲染不一致
  if (!isClient) {
    return null
  }

  // 臨時調試信息
  console.log('Dock Debug:', {
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'undefined',
    dockIconsLength: dockIcons.length,
    shouldShowFour: isMobile,
    actuallyShowingFour: dockIcons.length === 4
  })

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50">
      <Transition
        appear={true}
        show={true}
        enter="transition-all duration-500 ease-out delay-300"
        enterFrom="opacity-0 scale-95 translate-y-8"
        enterTo="opacity-100 scale-100 translate-y-0"
      >
        <div className="flex justify-center items-center gap-3 md:gap-4 py-4 px-6 cfz-liquid-glass-rect">
          {dockIcons.map(({ Icon, name }) => (
            <button
              key={name}
              className="group relative flex-shrink-0"
              title={name}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#ffffff15] rounded-xl hover:scale-110 transition-all duration-200 drop-shadow-md relative overflow-hidden flex items-center justify-center">
                {/* 使用填充風格圖標 */}
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[#000000cc] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {name}
              </div>
            </button>
          ))}
        </div>
      </Transition>
    </div>
  )
}

export default Dock 