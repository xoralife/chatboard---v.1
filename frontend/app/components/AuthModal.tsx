'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../lib/auth-context'

export default function AuthModal() {
  const { login, register, setShowAuthModal } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [mode])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'login') {
        await login(username, password)
      } else {
        await register(username, email, password)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}>
      <div className="relative w-[92%] max-w-[420px] rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0c0c12] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.6)]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-300"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-white">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          {mode === 'login'
            ? 'Sign in to start chatting'
            : 'Register to start your journey'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1c1c24] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#8b7cf6]"
          />

          {mode === 'register' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1c1c24] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#8b7cf6]"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
            className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1c1c24] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#8b7cf6]"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#8b7cf6] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c6de6] disabled:opacity-50"
          >
            {busy ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          {mode === 'login' ? (
            <>
              No account?{' '}
              <button onClick={() => { setMode('register'); setError('') }} className="text-[#8b7cf6] hover:underline">
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button onClick={() => { setMode('login'); setError('') }} className="text-[#8b7cf6] hover:underline">
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
