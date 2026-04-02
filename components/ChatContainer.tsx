'use client'

import { useChatStore } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'
import LandingView from './LandingView'
import SearchingView from './SearchingView'
import ChatView from './ChatView'

export default function ChatContainer() {
  const status = useChatStore((state) => state.status)

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-zinc-500/30">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex h-full w-full items-center justify-center p-4"
          >
            <LandingView />
          </motion.div>
        )}

        {status === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex h-full w-full items-center justify-center p-4"
          >
            <SearchingView />
          </motion.div>
        )}

        {(status === 'connected' || status === 'disconnected') && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex h-full w-full flex-col p-4"
          >
            <ChatView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
