import { CircleAlert } from 'lucide-react'
import type { Message } from '../types/chat'
import { MessageBubble } from './MessageBubble'

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-[url('/images/background.jpg')] bg-cover bg-center flex flex-col">
      {messages.length === 0 ? (
        <div className="flex bg-[#242625] text-[#F5D08A] text-base p-8 items-center justify-center rounded-lg gap-6">
          <div>
            <CircleAlert size={30} />
          </div>
          <div>
            <b>Отправьте сообщение, чтобы начать чат</b>
          </div>
          <div>
            <CircleAlert size={30} />
          </div>
        </div>
      ) : (
        <>
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </>
      )}
    </div>
  )
}
