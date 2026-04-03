'use client'

import { useChatStore } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import LandingView from '@/components/LandingView'
import SearchingView from '@/components/SearchingView'
import ChatView from '@/components/ChatView'
import { useLiveKit } from '@/hooks/useLiveKit'

export default function ChatContainer() {
  const status = useChatStore((state) => state.status)
  const userId = useChatStore((state) => state.userId)
  const setConnectionData = useChatStore((state) => state.setConnectionData)
  const setError = useChatStore((state) => state.setError)

  // Initialize LiveKit hook
  useLiveKit()

  const isFetchingRef = useRef(false)

  // Matchmaking effect: Fetch token when searching
  useEffect(() => {
    if (status !== 'searching') {
      isFetchingRef.current = false
      return
    }

    if (isFetchingRef.current) return

    const startMatchmaking = async () => {
      isFetchingRef.current = true
      try {
        // For a simple demo/exploration, we use a fixed "lobby" room
        // In a real app, this would be a more complex matchmaking queue
        const roomName = 'pretext-lobby'
        const response = await fetch(`/api/token?room=${roomName}&identity=${userId}`)
        const data = await response.json()
        
        if (data.error) throw new Error(data.error)
        
        setConnectionData(data.url, data.token)
      } catch (err: any) {
        console.error('Matchmaking error:', err)
        setError(err.message || 'Connection failed')
        isFetchingRef.current = false
      }
    }

    startMatchmaking()
  }, [status, userId, setConnectionData, setError])

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
