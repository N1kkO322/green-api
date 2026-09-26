import { SendHorizontal } from 'lucide-react'
import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <div className="p-3 bg-[#242625] flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Введите сообщение"
        disabled={disabled}
        className="flex-1 p-2 rounded bg-[#242625]  text-[#e9edef] outline-none disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="px-8 bg-[#21BF62] text-white rounded-lg disabled:opacity-40 hover:bg-[#21BF62] cursor-pointer"
      >
        <SendHorizontal />
      </button>
    </div>
  )
}
