'use client'

import {
  Maximize2,
  Sun,
  RefreshCw,
  Paperclip,
  ArrowUp,
  Code,
  Rocket,
  Layers,
  Palette,
  UserCircle,
} from 'lucide-react'

const quickActionsRow1 = [
  { icon: Code, label: 'Generate Code' },
  { icon: Rocket, label: 'Launch App' },
  { icon: Layers, label: 'UI Components' },
  { icon: Palette, label: 'Theme Ideas' },
  { icon: UserCircle, label: 'User Dashboard' },
]

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

        <div className="mt-28 flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Ruixen AI
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Build something amazing — just start typing below.
          </p>
        </div>

        <div className="mt-10 w-full max-w-[700px] rounded-2xl border border-white/10 bg-[#0f0f14] p-5 shadow-xl">
          <div className="min-h-[60px]">
            <p className="text-sm text-gray-500">Type your request...</p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <button className="rounded-md p-1.5 text-gray-500 transition-colors hover:text-gray-300">
              <Paperclip size={18} />
            </button>
            <button className="flex items-center justify-center rounded-lg bg-[#1c1c24] p-2.5 text-white transition-colors hover:bg-[#2a2a35]">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-3">
            {quickActionsRow1.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0f0f14] px-4 py-2 text-sm transition-colors hover:bg-[#1a1a22]"
                >
                  <Icon size={16} className="text-gray-300" />
                  <span className="text-[#e8b975]">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
