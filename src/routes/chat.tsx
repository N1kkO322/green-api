import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ChatHeader } from '../components/ChatHeader'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'
import { Sidebar } from '../components/Sidebar'
import { useChatId } from '../hooks/useChatId'
import { useCredentials } from '../hooks/useCredentials'
import { useGreenApi } from '../hooks/useGreenApi'
import { useMessages } from '../hooks/useMessages'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

function ChatPage() {
  const navigate = useNavigate()
  const { credentials, loaded, clear } = useCredentials()
  const { chatId, setChatId, clearChatId } = useChatId()
  const { messages, addMessage, clearMessages } = useMessages(chatId)
  const { send } = useGreenApi(credentials, chatId, addMessage)

  useEffect(() => {
    if (loaded && !credentials) {
      navigate({ to: '/' })
    }
  }, [loaded, credentials, navigate])

  if (!loaded || !credentials) return null

  const handleLogout = () => {
    clear()
    clearChatId()
    clearMessages()
    navigate({ to: '/' })
  }
  return (
    <div className="flex h-screen bg-[#0b141a] text-[#e9edef]">
      <Sidebar
        chatId={chatId}
        onSetChatId={setChatId}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex flex-col">
        {chatId ? (
          <>
            <ChatHeader title={chatId.replace('@c.us', '')} />
            <MessageList messages={messages} />
            <MessageInput onSend={send} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#8696a0] bg-[url('/images/background.jpg')] bg-cover bg-center">
            <div className="bg-[#242625] p-6 rounded-lg text-white text-lg">
              Введите номер получателя слева, чтобы найти чат
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
