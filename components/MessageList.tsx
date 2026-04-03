'use client'

import { useChatStore } from '@/lib/store'
import { useRef, useEffect } from 'react'
import MessageItem from './MessageItem'
import GhostMessage from './GhostMessage'
import { AnimatePresence, motion } from 'framer-motion'

export default function MessageList() {
  const messages = useChatStore((state) => state.messages)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 space-y-2 scrollbar-none custom-scrollbar">
      <AnimatePresence initial={false} mode="popLayout">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <MessageItem message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
      <GhostMessage />
      <div ref={bottomRef} className="h-12" />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(177, 158, 239, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(177, 158, 239, 0.2);
        }
      `}</style>
    </div>
  )
}
