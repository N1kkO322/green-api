import { useCallback, useEffect, useRef } from 'react'
import {
  sendMessage as apiSend,
  deleteNotification,
  receiveNotification,
} from '../lib/api'
import type { Credentials, Message } from '../types/chat'

export function useGreenApi(
  creds: Credentials | null,
  chatId: string,
  addMessage: (msg: Message) => void,
) {
  const pollRef = useRef(false)

  const send = useCallback(
    async (text: string) => {
      if (!creds || !chatId || !text.trim()) return
      try {
        const data = await apiSend(creds, chatId, text.trim())
        if (data.idMessage) {
          addMessage({
            id: data.idMessage,
            text: text.trim(),
            sender: 'me',
            timestamp: Date.now(),
          })
        }
      } catch (e) {
        console.error('Send error:', e)
      }
    },
    [creds, chatId, addMessage],
  )

  const poll = useCallback(async () => {
    if (!creds) return
    while (pollRef.current) {
      try {
        const data = await receiveNotification(creds)
        if (
          data?.body?.typeWebhook === 'incomingMessageReceived' &&
          data.body.messageData?.typeMessage === 'textMessage'
        ) {
          const text = data.body.messageData.textMessageData.textMessage
          const senderChatId = data.body.senderData.chatId
          if (senderChatId === chatId) {
            addMessage({
              id: data.body.idMessage,
              text,
              sender: 'them',
              timestamp: data.body.timestamp * 1000,
            })
          }
        }
        if (data?.receiptId) {
          await deleteNotification(creds, data.receiptId)
        }
      } catch (e) {
        console.error('Poll error:', e)
      }
      await new Promise((r) => setTimeout(r, 1500))
    }
  }, [creds, chatId, addMessage])

  useEffect(() => {
    if (!creds) return
    pollRef.current = true
    poll()
    return () => {
      pollRef.current = false
    }
  }, [creds, poll])

  return { send }
}
