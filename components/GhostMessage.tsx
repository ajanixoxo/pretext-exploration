'use client'

import React, { useMemo } from 'react'
import { useChatStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { prepareWithSegments } from '@chenglou/pretext'

export default function GhostMessage() {
  const ghostMessage = useChatStore((state) => state.ghostMessage)

  const segments = useMemo(() => {
    if (!ghostMessage) return []
    try {
      const prepared = prepareWithSegments(ghostMessage, '400 14px Inter') as any
      return prepared.segments as string[]
    } catch (e) {
      return ghostMessage.split(' ')
    }
  }, [ghostMessage])

  return (
    <AnimatePresence>
      {ghostMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 5 }}
          className="flex w-full mb-6 px-4 justify-start"
        >
          <div className="relative max-w-[80%] rounded-2xl rounded-tl-none px-5 py-3 bg-zinc-900/30 backdrop-blur-xl border border-white/5 ring-1 ring-white/10 shadow-2xl overflow-hidden">
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {segments.map((segment, idx) => (
                <motion.span
                  key={`${idx}-${segment}`}
                  initial={{ opacity: 0, x: -5, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ 
                    duration: 0.3, 
                    delay: idx * 0.05,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 2
                  }}
                  className="text-sm font-medium text-zinc-500/80 italic selection:bg-[#B19EEF]/20"
                >
                  {segment}
                </motion.span>
              ))}
              
              <motion.span
                animate={{ 
                  opacity: [0, 1, 0],
                  scaleY: [0.8, 1.2, 0.8]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block h-4 w-0.5 bg-[#B19EEF]/60 align-middle shadow-[0_0_8px_rgba(177,158,239,0.4)]"
              />
            </div>

            {/* Kinetic decorative pulses */}
            <motion.div 
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                x: [-20, 20, -20]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B19EEF]/5 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
