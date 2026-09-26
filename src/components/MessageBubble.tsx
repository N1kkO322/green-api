import type { Message } from '../types/chat'

export function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === 'me'

  const time = new Date(message.timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div>
        <div
          className={`max-w-md px-4 py-2 rounded-lg text-base flex ${
            isMe
              ? 'bg-[#134D37] rounded-br-none'
              : 'bg-[#444444] rounded-bl-none'
          }`}
        >
          <div>{message.text}</div>
          <div
            className={`text-xs text-[#8696a0] flex items-end ml-3 ${
              isMe ? 'text-right' : 'text-left'
            }`}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  )
}
