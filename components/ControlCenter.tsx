import React, { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { 
  WifiIcon, 
  SpeakerWaveIcon,
  MoonIcon,
  SunIcon,
  CameraIcon,
  ClockIcon,
  CalculatorIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
  const [brightness, setBrightness] = useState(70)
  const [volume, setVolume] = useState(50)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [airdropEnabled, setAirdropEnabled] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const controlCenterRef = useRef<HTMLDivElement>(null);

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

  // 點擊外部關閉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (controlCenterRef.current && !controlCenterRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose, isMobile]);

  // 背景遮罩點擊處理
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 控制功能切換
  const toggleWifi = () => setWifiEnabled(!wifiEnabled);
  const toggleBluetooth = () => setBluetoothEnabled(!bluetoothEnabled);
  const toggleAirdrop = () => setAirdropEnabled(!airdropEnabled);
  const toggleFocus = () => setFocusMode(!focusMode);

  // 亮度控制
  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBrightness(value);
    // 實際應用亮度效果到頁面
    document.documentElement.style.filter = `brightness(${value}%)`;
  };

  // 音量控制
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(value);
  };

  // 手機版關閉按鈕點擊處理
  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  // 防止控制中心內部點擊關閉
  const handleControlCenterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 避免服務器端渲染不一致
  if (!isClient) {
    return null;
  }

  // 手機版直接顯示，桌面版使用動畫
  if (isMobile) {
    return (
      <>        
        {/* 手機版背景遮罩 */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-[70] flex flex-col items-center justify-center"
            onClick={handleOverlayClick}
          >
            {/* 手機版控制中心 */}
            <div 
              ref={controlCenterRef}
              className="w-[90%] max-w-sm p-5 relative cfz-liquid-glass-rect mb-4 z-[71] ios-slide-in mobile-touch-optimize"
              onClick={handleControlCenterClick}
            >
              {/* 頂部快捷控制區 - 2x2網格佈局 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Wi-Fi */}
                <button 
                  onClick={toggleWifi}
                  className={`${wifiEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button mobile-button`}
                >
                  <div className={`${wifiEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                    <WifiIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs">Wi-Fi</span>
                </button>
                
                {/* 藍牙 */}
                <button 
                  onClick={toggleBluetooth}
                  className={`${bluetoothEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button mobile-button`}
                >
                  <div className={`${bluetoothEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 8L18 16L12 22V2L18 8L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs">Bluetooth</span>
                </button>
                
                {/* Airdrop */}
                <button 
                  onClick={toggleAirdrop}
                  className={`${airdropEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button mobile-button`}
                >
                  <div className={`${airdropEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 15.5c.83-2 1.5-3.5 1.5-5.5a7 7 0 0 0-7-7c-2 0-3.5.68-5.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs">Airdrop</span>
                </button>
                
                {/* 專注模式 */}
                <button 
                  onClick={toggleFocus}
                  className={`${focusMode ? 'bg-purple-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button mobile-button`}
                >
                  <div className={`${focusMode ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                    <MoonIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs">Focus</span>
                </button>
              </div>

              {/* 亮度控制 */}
              <div className="cfz-liquid-glass-card rounded-xl px-4 py-3 mb-4">
                <div className="flex items-center text-white mb-2">
                  <span className="text-sm font-medium">Display</span>
                  <span className="text-xs text-white/70 ml-auto">{brightness}%</span>
                </div>
                <div className="flex items-center">
                  <SunIcon className="w-4 h-4 text-white mr-3 opacity-60" />
                  <div className="relative w-full flex items-center">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brightness}
                      onChange={handleBrightnessChange}
                      className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #ffffff ${brightness}%, #ffffff20 ${brightness}%)`
                      }}
                    />
                  </div>
                  <div className="ml-3 text-white flex items-center">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* 音量控制 */}
              <div className="cfz-liquid-glass-card rounded-xl px-4 py-3 mb-4">
                <div className="flex items-center text-white mb-2">
                  <span className="text-sm font-medium">Sound</span>
                  <span className="text-xs text-white/70 ml-auto">{volume}%</span>
                </div>
                <div className="flex items-center">
                  <SpeakerWaveIcon className="w-4 h-4 text-white mr-3 opacity-60" />
                  <div className="relative w-full flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #ffffff ${volume}%, #ffffff20 ${volume}%)`
                      }}
                    />
                  </div>
                  <div className="ml-3 text-white flex items-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* 底部控制按鈕 */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <CalculatorIcon className="w-5 h-5 text-white" />
                </div>
                <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                  <CameraIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* 編輯控制按鈕 */}
              <div className="text-center">
                <span className="text-white/80 text-xs">Edit Controls</span>
              </div>
            </div>

            {/* 手機版關閉按鈕 */}
            <div
              onClick={handleCloseClick}
              className="w-14 h-14 cfz-liquid-glass-rect rounded-full flex items-center justify-center ios-button cursor-pointer z-[72]"
            >
              <XMarkIcon className="w-7 h-7 text-white" />
            </div>
          </div>
        )}
      </>
    )
  }

  // 桌面版使用動畫
  return (
    <>
      <Transition
        show={isOpen}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 scale-95 -translate-y-2"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition-all duration-200 ease-in"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 -translate-y-2"
      >
        <div className="fixed top-9 right-2 w-80 z-[60] pointer-events-none">
          <div 
            ref={controlCenterRef}
            className="float-right p-5 relative cfz-liquid-glass-rect pointer-events-auto"
          >
            {/* 頂部快捷控制區 - 2x2網格佈局 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Wi-Fi */}
              <button 
                onClick={toggleWifi}
                className={`${wifiEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button`}
              >
                <div className={`${wifiEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                  <WifiIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs">Wi-Fi</span>
              </button>
              
              {/* 藍牙 */}
              <button
                onClick={toggleBluetooth}
                className={`${bluetoothEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button`}
              >
                <div className={`${bluetoothEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8L18 16L12 22V2L18 8L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white text-xs">Bluetooth</span>
              </button>
            
              {/* Airdrop */}
              <button
                onClick={toggleAirdrop}
                className={`${airdropEnabled ? 'bg-blue-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button`}
              >
                <div className={`${airdropEnabled ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 15.5c.83-2 1.5-3.5 1.5-5.5a7 7 0 0 0-7-7c-2 0-3.5.68-5.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white text-xs">Airdrop</span>
              </button>
            
              {/* 專注模式 */}
              <button
                onClick={toggleFocus}
                className={`${focusMode ? 'bg-purple-500' : 'bg-white/10'} rounded-xl p-3 flex flex-col items-center justify-center ios-button`}
              >
                <div className={`${focusMode ? 'bg-white/30' : 'bg-gray-500'} rounded-full w-10 h-10 flex items-center justify-center mb-1.5`}>
                  <MoonIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs">Focus</span>
              </button>
            </div>

            {/* 亮度控制 */}
            <div className="cfz-liquid-glass-card rounded-xl px-4 py-3 mb-4">
              <div className="flex items-center text-white mb-2">
                <span className="text-sm font-medium">Display</span>
                <span className="text-xs text-white/70 ml-auto">{brightness}%</span>
              </div>
              <div className="flex items-center">
                <SunIcon className="w-4 h-4 text-white mr-3 opacity-60" />
                <div className="relative w-full flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness}
                    onChange={handleBrightnessChange}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ffffff ${brightness}%, #ffffff20 ${brightness}%)`
                    }}
                  />
                </div>
                <div className="ml-3 text-white flex items-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 音量控制 */}
            <div className="cfz-liquid-glass-card rounded-xl px-4 py-3 mb-4">
              <div className="flex items-center text-white mb-2">
                <span className="text-sm font-medium">Sound</span>
                <span className="text-xs text-white/70 ml-auto">{volume}%</span>
              </div>
              <div className="flex items-center">
                <SpeakerWaveIcon className="w-4 h-4 text-white mr-3 opacity-60" />
                <div className="relative w-full flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ffffff ${volume}%, #ffffff20 ${volume}%)`
                    }}
                  />
                </div>
                <div className="ml-3 text-white flex items-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 底部控制按鈕 */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <CalculatorIcon className="w-5 h-5 text-white" />
              </div>
              <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <ClockIcon className="w-5 h-5 text-white" />
              </div>
              <div className="cfz-liquid-glass-button rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <CameraIcon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* 編輯控制按鈕 */}
            <div className="text-center">
              <span className="text-white/80 text-xs">Edit Controls</span>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default ControlCenter 