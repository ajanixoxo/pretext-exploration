'use client'

import { useChatStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Send, Hash } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function ChatInput() {
  const [text, setText] = useState('')
  const addMessage = useChatStore((state) => state.addMessage)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!text.trim()) return
    addMessage(text.trim(), 'me')
    setText('')
    
    // Auto-focus back to input
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <div className="flex w-full items-end gap-3 rounded-3xl bg-zinc-900 px-5 py-3 border border-zinc-800 focus-within:border-zinc-500/50 transition-all shadow-xl">
      <textarea
        ref={inputRef}
        rows={1}
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="max-h-32 flex-1 resize-none bg-transparent py-1 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSend}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-black hover:bg-zinc-300"
      >
        <Send className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
