import { useEffect, useState } from 'react'
import type { Message } from '../types/chat'

const KEY = 'messages'
const MAX = 100

export function useMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!chatId) {
      setMessages([])
      return
    }
    const raw = localStorage.getItem(`${KEY}:${chatId}`)
    if (raw) {
      try {
        setMessages(JSON.parse(raw))
      } catch {
        localStorage.removeItem(`${KEY}:${chatId}`)
      }
    } else {
      setMessages([])
    }
  }, [chatId])

  useEffect(() => {
    if (!chatId) return
    const trimmed = messages.slice(-MAX)
    localStorage.setItem(`${KEY}:${chatId}`, JSON.stringify(trimmed))
  }, [messages, chatId])

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }

  const clearMessages = () => {
    if (chatId) localStorage.removeItem(`${KEY}:${chatId}`)
    setMessages([])
  }

  return { messages, addMessage, clearMessages }
}
