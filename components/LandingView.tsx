'use client'

import { useChatStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function LandingView() {
  const setStatus = useChatStore((state) => state.setStatus)

  return (
    <div className="flex max-w-sm flex-col items-center gap-8 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter text-zinc-100">
          Pretext <span className="text-zinc-500">Chat</span>
        </h1>
        <p className="text-lg text-zinc-400">
          Talk to strangers, but better. Anonymous, fast, and animated.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setStatus('searching')}
        className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-lg font-semibold text-black transition-all hover:bg-zinc-200"
      >
        <Zap className="h-5 w-5 fill-current" />
        Start Chatting
        
        {/* Subtle glow effect */}
        <motion.div
           initial={{ opacity: 0 }}
           whileHover={{ opacity: 0.15 }}
           className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </motion.button>

      <div className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
        No account required • Instant Connect
      </div>
    </div>
  )
}
