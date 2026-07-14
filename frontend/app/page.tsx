'use client'

import {
  Maximize2,
  Sun,
  RefreshCw,
} from 'lucide-react'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#050505]">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '1400px',
          height: '70%',
          background:
            'radial-gradient(ellipse 100% 70% at 50% 100%, rgba(124,58,237,0.6) 0%, rgba(99,102,241,0.4) 30%, rgba(79,70,229,0.2) 55%, transparent 80%)',
          filter: 'blur(80px)',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 pt-8">
        <div className="flex w-full items-start">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827] px-2 py-2">
            <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
              <Maximize2 size={17} />
            </button>
            <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
              <Sun size={17} />
            </button>
            <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
              <RefreshCw size={17} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
