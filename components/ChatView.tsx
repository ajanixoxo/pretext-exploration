'use client'

import { useChatStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Loader2 } from 'lucide-react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

export default function ChatView() {
  const status = useChatStore((state) => state.status)
  const reset = useChatStore((state) => state.reset)

  return (
    <div className="flex h-full w-full max-w-4xl mx-auto flex-col bg-zinc-950 rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-sm font-medium text-zinc-100">
            Stranger Connected
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors text-xs text-zinc-400 group"
        >
          <LogOut className="h-3.5 w-3.5 group-hover:text-red-400 transition-colors" />
          Disconnect
        </motion.button>
      </header>

      {/* Messages */}
      <MessageList />

      {/* Disconnected Overlay */}
      <AnimatePresence>
        {status === 'disconnected' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-8 text-center"
          >
             <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl shadow-2xl space-y-6 max-w-xs">
                 <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                    <X className="text-zinc-500" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">Stranger Left</h3>
                    <p className="text-sm text-zinc-500">The connection was lost or closed.</p>
                 </div>
                 <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={reset}
                    className="w-full py-3 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors"
                 >
                    Find Someone New
                 </motion.button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <footer className="p-6 bg-zinc-950/50 backdrop-blur-md">
        <ChatInput />
      </footer>
    </div>
  )
}
