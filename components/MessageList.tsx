'use client'

import { useChatStore } from '@/lib/store'
import { useRef, useEffect } from 'react'
import MessageItem from './MessageItem'
import GhostMessage from './GhostMessage'
import { AnimatePresence } from 'framer-motion'

export default function MessageList() {
  const messages = useChatStore((state) => state.messages)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2 scrollbar-none">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </AnimatePresence>
      <GhostMessage />
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}
