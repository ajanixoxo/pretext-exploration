'use client'

import { Message } from '@/lib/store'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function MessageItem({ message }: { message: Message }) {
  const isMe = message.sender === 'me'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        'flex w-full mb-4 px-4',
        isMe ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm',
          isMe 
            ? 'bg-zinc-800 text-white rounded-tr-none border border-white/10' 
            : 'bg-zinc-100 text-black rounded-tl-none dark:bg-zinc-200 dark:text-black'
        )}
      >
        {message.text}
      </div>
    </motion.div>
  )
}
