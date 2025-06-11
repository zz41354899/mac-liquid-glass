import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { 
  WifiIcon, 
  SpeakerWaveIcon,
  MoonIcon,
  SunIcon,
  CameraIcon,
  Cog6ToothIcon,
  SignalIcon 
} from '@heroicons/react/24/outline'

const ControlCenter: React.FC = () => {
  const [brightness, setBrightness] = useState(70)
  const [volume, setVolume] = useState(50)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [focusMode, setFocusMode] = useState(false)

  return (
    <div className="fixed top-4 right-4 w-80 z-40 control-center-container">
      <Transition
        appear={true}
        show={true}
        enter="transition-all duration-500 ease-out delay-200"
        enterFrom="opacity-0 scale-95 translate-y-4"
        enterTo="opacity-100 scale-100 translate-y-0"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-md p-4">
          
          {/* 連接控制 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                wifiEnabled 
                  ? 'bg-blue-500/80 text-white' 
                  : 'bg-white/20 text-white/60'
              }`}
            >
              <WifiIcon className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">Wi-Fi</div>
            </button>
            
            <button
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                bluetoothEnabled 
                  ? 'bg-blue-500/80 text-white' 
                  : 'bg-white/20 text-white/60'
              }`}
            >
              <SignalIcon className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">藍牙</div>
            </button>
            
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                focusMode 
                  ? 'bg-indigo-500/80 text-white' 
                  : 'bg-white/20 text-white/60'
              }`}
            >
              <MoonIcon className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">專注</div>
            </button>
          </div>

          {/* 亮度控制 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <SunIcon className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm">亮度</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full touch-none select-none"
            />
          </div>

          {/* 音量控制 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <SpeakerWaveIcon className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm">音量</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full touch-none select-none"
            />
          </div>

          {/* 快捷按鈕 */}
          <div className="grid grid-cols-3 gap-3">
            <button className="p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105">
              <CameraIcon className="w-6 h-6 mx-auto mb-1 text-white" />
              <div className="text-xs text-white">截圖</div>
            </button>
            
            <button className="p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105">
              <MoonIcon className="w-6 h-6 mx-auto mb-1 text-white" />
              <div className="text-xs text-white">夜覽</div>
            </button>
            
            <button className="p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105">
              <Cog6ToothIcon className="w-6 h-6 mx-auto mb-1 text-white" />
              <div className="text-xs text-white">設定</div>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default ControlCenter 