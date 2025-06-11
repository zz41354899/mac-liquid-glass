import React from 'react'
import { Transition } from '@headlessui/react'
import { 
  HomeIcon, 
  MusicalNoteIcon, 
  CameraIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline'

const Dock: React.FC = () => {
  const dockIcons = [
    { Icon: HomeIcon, name: 'Home' },
    { Icon: MusicalNoteIcon, name: 'Music' },
    { Icon: CameraIcon, name: 'Camera' },
    { Icon: DocumentTextIcon, name: 'Documents' },
    { Icon: Cog6ToothIcon, name: 'Settings' },
  ]

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50">
      <Transition
        appear={true}
        show={true}
        enter="transition-all duration-500 ease-out delay-300"
        enterFrom="opacity-0 scale-95 translate-y-8"
        enterTo="opacity-100 scale-100 translate-y-0"
      >
        <div className="flex justify-center gap-4 py-4 px-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-md">
        {dockIcons.map(({ Icon, name }) => (
          <button
            key={name}
            className="group relative"
            title={name}
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl p-2 hover:scale-105 transition-all duration-200 drop-shadow-md hover:bg-white/20">
              <Icon className="w-full h-full text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
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