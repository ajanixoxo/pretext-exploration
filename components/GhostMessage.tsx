'use client'

import { useChatStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export default function GhostMessage() {
  const ghostMessage = useChatStore((state) => state.ghostMessage)

  return (
    <AnimatePresence>
      {ghostMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex w-full mb-4 px-4 justify-start"
        >
          <div className="max-w-[80%] rounded-2xl rounded-tl-none px-4 py-2 text-sm leading-relaxed bg-zinc-200/50 text-black/60 italic dark:bg-zinc-800/30 dark:text-zinc-500/80 border border-white/5 backdrop-blur-sm shadow-sm ring-1 ring-white/10">
            {ghostMessage}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="ml-1 inline-block h-4 w-1 bg-zinc-400 align-middle"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
