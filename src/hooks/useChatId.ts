import { useEffect, useState } from 'react'

const KEY = 'chatId'

export function useChatId() {
  const [chatId, setChatIdState] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved) setChatIdState(saved)
  }, [])

  const setChatId = (id: string) => {
    setChatIdState(id)
    if (id) localStorage.setItem(KEY, id)
    else localStorage.removeItem(KEY)
  }

  const clearChatId = () => {
    localStorage.removeItem(KEY)
    setChatIdState('')
  }

  return { chatId, setChatId, clearChatId }
}
