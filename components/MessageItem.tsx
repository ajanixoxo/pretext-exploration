'use client'

import React, { useMemo } from 'react'
import { Message } from '@/lib/store'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { prepareWithSegments } from '@chenglou/pretext'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function MessageItem({ message }: { message: Message }) {
  const isMe = message.sender === 'me'

  // Split text into segments for kinetic animation
  const segments = useMemo(() => {
    try {
      const prepared = prepareWithSegments(message.text, '400 14px Inter') as any
      return prepared.segments as string[]
    } catch (e) {
      return message.text.split(' ')
    }
  }, [message.text])

  const timeString = useMemo(() => {
    return new Date(message.createdAt).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }, [message.createdAt])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex w-full mb-6 px-4 group',
        isMe ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        'flex flex-col gap-1',
        isMe ? 'items-end' : 'items-start'
      )}>
        <motion.div
          layout
          className={cn(
            'relative max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-xl backdrop-blur-md transition-all',
            isMe 
              ? 'bg-[#B19EEF]/20 text-white rounded-tr-none border border-[#B19EEF]/30 shadow-[#B19EEF]/5' 
              : 'bg-zinc-900/60 text-zinc-100 rounded-tl-none border border-white/5 shadow-black/20'
          )}
        >
          <div className="flex flex-wrap gap-x-1.5 gap-y-1">
            {segments.map((segment, segIdx) => (
              <motion.span
                key={segIdx}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 0.4, 
                  delay: segIdx * 0.03,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="inline-block"
              >
                {segment}
              </motion.span>
            ))}
          </div>
          
          {/* Subtle highlight effect for 'me' messages */}
          {isMe && (
            <div className="absolute inset-0 rounded-2xl rounded-tr-none bg-gradient-to-br from-[#B19EEF]/10 to-transparent pointer-events-none" />
          )}
        </motion.div>
        
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1">
          {timeString} • {isMe ? 'You' : 'Stranger'}
        </span>
      </div>
    </motion.div>
  )
}
