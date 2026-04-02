'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function SearchingView() {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Pulsing radar effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 2], opacity: [0.3, 0.1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border-2 border-white/40"
        />
        <motion.div
           animate={{ scale: [1, 1.3, 1.6], opacity: [0.2, 0.05, 0] }}
           transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
           className="absolute inset-0 rounded-full border-2 border-white/20"
        />

        <div className="relative rounded-full bg-zinc-900 p-8">
           <Search className="h-8 w-8 text-white animate-pulse" />
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Looking for someone...
        </h2>
        <p className="text-sm text-zinc-500 animate-pulse font-mono uppercase tracking-[0.2em]">
          Connecting to Global Pool
        </p>
      </div>

      <div className="text-xs text-zinc-700 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
        Tip: Be friendly and respectful
      </div>
    </div>
  )
}
