import React, { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  FolderIcon,
  DocumentIcon,
  PhotoIcon,
  MusicalNoteIcon,
  FilmIcon,
  DocumentTextIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline'

interface FinderProps {
  isOpen: boolean;
  onClose: () => void;
}

const Finder: React.FC<FinderProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPath, setCurrentPath] = useState('k-luin')
  const [clickedItem, setClickedItem] = useState<number | null>(null)
  const finderRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // 檢測設備類型 - 更精確的響應式斷點
  useEffect(() => {
    setIsClient(true)
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1200)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // 點擊外部關閉 - 修復點擊bug
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && overlayRef.current && event.target === overlayRef.current) {
        onClose()
      }
    }

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose, isMobile])

  // ESC鍵關閉
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  // 背景遮罩點擊處理 - 修復點擊bug
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  // 防止Finder內部點擊關閉
  const handleFinderClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // 處理文件夾點擊動畫
  const handleFolderClick = (index: number) => {
    setClickedItem(index)
    setTimeout(() => setClickedItem(null), 200)
    // 這裡可以添加文件夾打開邏輯
  }

  // 側邊欄項目 - 參考真實macOS Finder
  const sidebarItems = [
    { name: 'Favourites', type: 'header' },
    { name: 'AirDrop', icon: '📡', type: 'item' },
    { name: 'Recents', icon: '🕒', type: 'item' },
    { name: 'Applications', icon: '📱', type: 'item' },
    { name: 'Desktop', icon: '🖥️', type: 'item' },
    { name: 'Documents', icon: '📄', type: 'item' },
    { name: 'Downloads', icon: '⬇️', type: 'item' },
    { name: 'Movies', icon: '🎬', type: 'item' },
    { name: 'Music', icon: '🎵', type: 'item' },
    { name: 'Pictures', icon: '🖼️', type: 'item' },
    { name: 'iCloud Drive', type: 'header' },
    { name: 'Desktop', icon: '☁️', type: 'item' },
    { name: 'Documents', icon: '☁️', type: 'item' },
    { name: 'Locations', type: 'header' },
    { name: 'k-luin', icon: '💻', type: 'item', active: true },
  ]

  // 文件夾數據 - 參考真實macOS Finder
  const folders = [
    { name: 'Applications', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Downloads', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Documents', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Desktop', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Pictures', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Music', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Public', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Movies', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Untouched', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'Creative Cloud Files', icon: FolderIcon, color: 'text-blue-400' },
    { name: 'OneDrive - k-luin.com', icon: FolderIcon, color: 'text-blue-400' },
  ]

  // 避免服務器端渲染不一致
  if (!isClient) {
    return null
  }

  // 手機版全屏顯示
  if (isMobile) {
    return (
      <>
        <Transition
          show={isOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div 
            ref={overlayRef}
            className="fixed inset-0 finder-overlay z-[80] flex flex-col"
            onClick={handleOverlayClick}
          >
            {/* 手機版Finder */}
            <div 
              ref={finderRef}
              className="w-full h-full macos-finder-mobile m-0 rounded-none flex flex-col"
              onClick={handleFinderClick}
            >
              {/* 頂部工具欄 */}
              <div className="flex items-center justify-between p-4 border-b border-black/10 bg-white/5">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={onClose}
                    className="w-8 h-8 macos-finder-button rounded-full flex items-center justify-center active:scale-90 transition-transform duration-150"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-700" />
                  </button>
                  <h1 className="text-gray-800 font-medium text-lg">Finder</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="w-8 h-8 macos-finder-button rounded-xl flex items-center justify-center active:scale-90 transition-transform duration-150"
                  >
                    {viewMode === 'grid' ? 
                      <ListBulletIcon className="w-4 h-4 text-gray-700" /> :
                      <Squares2X2Icon className="w-4 h-4 text-gray-700" />
                    }
                  </button>
                </div>
              </div>

              {/* 主要內容區域 */}
              <div className="flex-1 p-4 overflow-y-auto bg-white/95">
                <div className={viewMode === 'grid' ? 
                  "grid grid-cols-3 gap-3" : 
                  "space-y-2"
                }>
                  {folders.map((folder, index) => (
                    <button
                      key={index}
                      onClick={() => handleFolderClick(index)}
                      className={`${viewMode === 'grid' ? 
                        "flex flex-col items-center p-4 macos-finder-item rounded-2xl" :
                        "flex items-center p-3 macos-finder-item rounded-xl"
                      } active:scale-95 transition-all duration-200 ${
                        clickedItem === index ? 'scale-95 bg-blue-100' : ''
                      }`}
                    >
                      <folder.icon className={`${viewMode === 'grid' ? 'w-8 h-8 mb-2' : 'w-6 h-6 mr-3'} ${folder.color}`} />
                      <span className={`text-gray-800 text-sm font-medium ${viewMode === 'grid' ? 'text-center' : ''}`}>
                        {folder.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </>
    )
  }

  // 平板版適中顯示
  if (isTablet) {
    return (
      <>
        <Transition
          show={isOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
                      <div 
              ref={overlayRef}
              className="finder-overlay-container"
              onClick={handleOverlayClick}
            >
              <div 
                ref={finderRef}
                className="finder-window-tablet"
                onClick={handleFinderClick}
              >
              {/* 簡化的側邊欄 */}
              <div className="w-40 macos-finder-sidebar border-r border-gray-300/50 flex flex-col rounded-l-2xl">
                <div className="p-3 border-b border-gray-300/50">
                  <h2 className="text-gray-700 font-medium text-sm">Finder</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 bg-gray-100/80">
                  {sidebarItems.slice(0, 10).map((item, index) => (
                    <div key={index}>
                      {item.type === 'header' ? (
                        <div className="px-2 py-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                          {item.name}
                        </div>
                      ) : (
                        <button className={`w-full flex items-center px-2 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                          item.active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200/80 active:scale-95'
                        }`}>
                          <span className="mr-2 text-sm">{item.icon}</span>
                          <span className="truncate">{item.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 主要內容區域 */}
              <div className="flex-1 flex flex-col bg-white">
                {/* 工具欄 */}
                <div className="flex items-center justify-between p-3 border-b border-gray-300/50">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors active:scale-90" 
                      onClick={onClose}
                    ></button>
                    <button className="w-5 h-5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors active:scale-90"></button>
                    <button className="w-5 h-5 rounded-full bg-green-500 hover:bg-green-600 transition-colors active:scale-90"></button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                      <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                      <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all duration-200 active:scale-90 ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <Squares2X2Icon className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-all duration-200 active:scale-90 ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    >
                      <ListBulletIcon className="w-4 h-4 text-gray-700" />
                    </button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                      <MagnifyingGlassIcon className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* 路徑欄 */}
                <div className="px-4 py-2 border-b border-gray-300/50 bg-gray-50/80">
                  <div className="text-gray-700 text-sm">{currentPath}</div>
                </div>

                {/* 文件網格 */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className={viewMode === 'grid' ? 
                    "grid grid-cols-5 gap-3" : 
                    "space-y-1"
                  }>
                    {folders.map((folder, index) => (
                      <button
                        key={index}
                        onClick={() => handleFolderClick(index)}
                        className={`${viewMode === 'grid' ? 
                          "flex flex-col items-center p-3 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all duration-200" :
                          "flex items-center p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200"
                        } active:scale-95 ${
                          clickedItem === index ? 'scale-95 bg-blue-100' : ''
                        }`}
                      >
                        <folder.icon className={`${viewMode === 'grid' ? 'w-10 h-10 mb-2' : 'w-5 h-5 mr-3'} ${folder.color}`} />
                        <span className={`text-gray-800 text-sm font-medium ${viewMode === 'grid' ? 'text-center' : ''}`}>
                          {folder.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </>
    )
  }

  // 桌面版窗口顯示 - 修復居中問題
  return (
    <>
      <Transition
        show={isOpen}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div 
          ref={overlayRef}
          className="finder-overlay-container"
          onClick={handleOverlayClick}
        >
          <div 
            ref={finderRef}
            className="finder-window-centered"
            onClick={handleFinderClick}
          >
            {/* 側邊欄 - 參考真實macOS Finder */}
            <div className="w-52 macos-finder-sidebar border-r border-gray-300/50 flex flex-col rounded-l-2xl">
              {/* 側邊欄標題 */}
              <div className="p-4 border-b border-gray-300/50">
                <h2 className="text-gray-700 font-medium text-sm">Finder</h2>
              </div>
              
              {/* 側邊欄項目 */}
              <div className="flex-1 overflow-y-auto p-2 bg-gray-100/80">
                {sidebarItems.map((item, index) => (
                  <div key={index}>
                    {item.type === 'header' ? (
                      <div className="px-2 py-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                        {item.name}
                      </div>
                    ) : (
                      <button className={`w-full flex items-center px-2 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                        item.active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200/80 active:scale-95'
                      }`}>
                        <span className="mr-2 text-sm">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 主要內容區域 */}
            <div className="flex-1 flex flex-col bg-white">
              {/* 工具欄 - 參考真實macOS Finder */}
              <div className="flex items-center justify-between p-3 border-b border-gray-300/50">
                <div className="flex items-center space-x-2">
                  <button 
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors active:scale-90" 
                    onClick={onClose}
                  ></button>
                  <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors active:scale-90"></button>
                  <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors active:scale-90"></button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                    <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all duration-200 active:scale-90 ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    <Squares2X2Icon className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all duration-200 active:scale-90 ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    <ListBulletIcon className="w-4 h-4 text-gray-700" />
                  </button>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors active:scale-90">
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* 路徑欄 */}
              <div className="px-4 py-2 border-b border-gray-300/50 bg-gray-50/80">
                <div className="text-gray-700 text-sm">{currentPath}</div>
              </div>

              {/* 文件網格 - 參考真實macOS Finder */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className={viewMode === 'grid' ? 
                  "grid grid-cols-6 gap-4" : 
                  "space-y-1"
                }>
                  {folders.map((folder, index) => (
                    <button
                      key={index}
                      onClick={() => handleFolderClick(index)}
                      className={`${viewMode === 'grid' ? 
                        "flex flex-col items-center p-3 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all duration-200" :
                        "flex items-center p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-all duration-200"
                      } active:scale-95 ${
                        clickedItem === index ? 'scale-95 bg-blue-100' : ''
                      }`}
                    >
                      <folder.icon className={`${viewMode === 'grid' ? 'w-12 h-12 mb-2' : 'w-5 h-5 mr-3'} ${folder.color}`} />
                      <span className={`text-gray-800 text-sm font-medium ${viewMode === 'grid' ? 'text-center' : ''}`}>
                        {folder.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default Finder 