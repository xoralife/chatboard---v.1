'use client'

import { useState } from 'react'
import {
  Maximize,
  Sun,
  RotateCw,
  Paperclip,
  ArrowUp,
  Code,
  Rocket,
  Layers,
  Palette,
  CircleUserRound,
  Monitor,
  FilePlus,
  Image,
  LogOut,
  MessageSquare,
} from 'lucide-react'
import { useAuth } from './lib/auth-context'
import AuthModal from './components/AuthModal'

const quickActionsRow1 = [
  { icon: Code, label: 'Generate Code' },
  { icon: Rocket, label: 'Launch App' },
  { icon: Layers, label: 'UI Components' },
  { icon: Palette, label: 'Theme Ideas' },
  { icon: CircleUserRound, label: 'User Dashboard' },
]

const quickActionsRow2 = [
  { icon: Monitor, label: 'Landing Page' },
  { icon: FilePlus, label: 'Upload Docs' },
  { icon: Image, label: 'Image Assets' },
]

export default function Home() {
  const { user, logout, showAuthModal, setShowAuthModal } = useAuth()
  const [input, setInput] = useState('')

  const requireAuth = (action: () => void) => {
    if (!user) { setShowAuthModal(true); return }
    action()
  }

  const handleSend = () => {
    if (!input.trim()) return
    requireAuth(() => { setInput('') })
  }
  const handlePillClick = (_label: string) => requireAuth(() => {})

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#050508] selection:bg-purple-500/30">
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2" style={{ bottom: '-40%', width: '140vw', height: '90vh' }}>
        <div
          className="animate-glow-pulse h-full w-full"
          style={{
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #8b7cf6 0%, #6d4fe0 25%, #4c3aa8 45%, #1a1040 65%, transparent 75%)',
            filter: 'blur(60px)',
            opacity: 0.9,
          }}
        />
      </div>

      <nav className="fixed left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="flex items-center gap-1 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0d0d12] p-1">
          <button aria-label="Maximize" className="flex h-9 w-9 items-center justify-center rounded-lg text-[#d1d5db] transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            <Maximize size={16} />
          </button>
          <button aria-label="Toggle theme" className="flex h-9 w-9 items-center justify-center rounded-lg text-[#d1d5db] transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            <Sun size={16} />
          </button>
          <button aria-label="Refresh" className="flex h-9 w-9 items-center justify-center rounded-lg text-[#d1d5db] transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            <RotateCw size={16} />
          </button>
        </div>
      </nav>

      {user && (
        <nav className="fixed right-4 top-4 z-20 sm:right-6 sm:top-6">
          <div className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0d0d12] px-3 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8b7cf6] text-[10px] font-bold text-white">
              {user.username[0].toUpperCase()}
            </span>
            <span className="text-sm text-gray-300">{user.username}</span>
            <button onClick={logout} aria-label="Logout" className="ml-1 rounded-md p-1 text-gray-500 transition-colors hover:text-red-400">
              <LogOut size={14} />
            </button>
          </div>
        </nav>
      )}

      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4" style={{ minHeight: '100vh' }}>
        <div className="flex flex-col items-center" style={{ marginTop: '-5vh' }}>
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Xora AI
          </h1>
          <p className="mt-3 text-center text-base font-normal text-gray-400">
            {user ? `Hello, ${user.username} — just start typing below.` : 'Build something amazing — just start typing below.'}
          </p>
        </div>

        <div className="mx-auto mt-10 w-[92%] max-w-[700px] rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(12,12,18,0.85)] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:mt-12">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Type your request..."
            rows={2}
            className="w-full resize-none bg-transparent text-[15px] text-white placeholder-[#6b7280] outline-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <button aria-label="Attach file" className="text-[#9ca3af] transition-colors duration-150 hover:text-gray-300">
              <Paperclip size={18} />
            </button>
            <button
              aria-label="Send message"
              onClick={handleSend}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1c1c24] text-white transition-colors duration-150 hover:bg-[#2a2a35]"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-2 md:gap-3">
          <div className="flex flex-wrap justify-center gap-3">
            {quickActionsRow1.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  aria-label={action.label}
                  onClick={() => handlePillClick(action.label)}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0c0c12] px-4 py-2 text-sm transition-all duration-150 hover:border-[rgba(255,255,255,0.25)] hover:bg-[#14141c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Icon size={14} className="text-[#e5e7eb]" />
                  <span className="text-[13px] font-medium text-[#e0ac6f]">{action.label}</span>
                </button>
              )
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {quickActionsRow2.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  aria-label={action.label}
                  onClick={() => handlePillClick(action.label)}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0c0c12] px-4 py-2 text-sm transition-all duration-150 hover:border-[rgba(255,255,255,0.25)] hover:bg-[#14141c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <Icon size={14} className="text-[#e5e7eb]" />
                  <span className="text-[13px] font-medium text-[#e0ac6f]">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal />}
    </main>
  )
}
