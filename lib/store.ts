import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type Message = {
  id: string
  text: string
  sender: "me" | "other"
  createdAt: number
}

interface ChatState {
  status: 'idle' | 'searching' | 'connected' | 'disconnected'
  messages: Message[]
  ghostMessage: string | null
  roomId: string | null
  userId: string
  
  // Actions
  setStatus: (status: ChatState['status']) => void
  addMessage: (text: string, sender: 'me' | 'other') => void
  setGhostMessage: (text: string | null) => void
  setRoomId: (roomId: string | null) => void
  reset: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  status: 'idle',
  messages: [],
  ghostMessage: null,
  roomId: null,
  // Generate a persistent userId for the session
  userId: typeof window !== 'undefined' ? 
    (localStorage.getItem('chat_user_id') || uuidv4()) : uuidv4(),
    
  setStatus: (status) => set({ status }),
  
  addMessage: (text, sender) => set((state) => ({
    messages: [...state.messages, {
      id: uuidv4(),
      text,
      sender,
      createdAt: Date.now()
    }]
  })),
  
  setGhostMessage: (ghostMessage) => set({ ghostMessage }),
  
  setRoomId: (roomId) => set({ roomId }),
  
  reset: () => set({
    status: 'idle',
    messages: [],
    ghostMessage: null,
    roomId: null
  })
}))

// Ensure userId is saved if we're on the client
if (typeof window !== 'undefined' && !localStorage.getItem('chat_user_id')) {
  localStorage.setItem('chat_user_id', useChatStore.getState().userId)
}
