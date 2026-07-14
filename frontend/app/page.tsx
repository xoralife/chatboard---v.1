'use client'

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
    </main>
  )
}
