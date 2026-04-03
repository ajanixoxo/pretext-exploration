'use client'

import { useChatStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Hash } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

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
    <div className="relative group max-w-2xl mx-auto w-full">
      {/* Dynamic Glow Effect */}
      <motion.div 
        animate={{ 
          opacity: text ? 0.4 : 0,
          scale: text ? 1 : 0.95 
        }}
        className="absolute -inset-1.5 bg-gradient-to-r from-[#B19EEF]/20 via-[#B19EEF]/10 to-[#B19EEF]/20 rounded-[2rem] blur-xl z-0 pointer-events-none transition-all duration-500"
      />
      
      <div className="relative flex w-full items-end gap-3 rounded-[2rem] bg-zinc-900/40 backdrop-blur-2xl px-6 py-4 border border-white/5 focus-within:border-[#B19EEF]/30 focus-within:ring-1 focus-within:ring-[#B19EEF]/20 transition-all shadow-2xl z-10">
        <textarea
          ref={inputRef}
          rows={1}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 font-medium"
        />
        
        <motion.button
          whileHover={{ 
            scale: text ? 1.05 : 1,
            backgroundColor: text ? '#B19EEF' : '#27272a'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!text.trim()}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
            text.trim() 
              ? "bg-[#B19EEF] text-zinc-950 shadow-[0_0_20px_rgba(177,158,239,0.4)] cursor-pointer" 
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          )}
        >
          <motion.div
            animate={text ? { rotate: [0, -10, 0], x: [0, 2, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Send className="h-5 w-5 fill-current" />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Character Count / Status */}
      <AnimatePresence>
        {text.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-6 right-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest"
          >
            {text.length} chars
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
