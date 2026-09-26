import { Search } from 'lucide-react'
import { useState } from 'react'

interface Props {
  chatId: string
  onSetChatId: (id: string) => void
  onLogout: () => void
}

export function Sidebar({ chatId, onSetChatId, onLogout }: Props) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleSearch = () => {
    const clean = phone.replace(/\D/g, '')
    if (clean.length < 10) {
      setError('Введите номер корректно')
      return
    }
    setError('')
    onSetChatId(`${clean}@c.us`)
    setPhone('')
  }

  return (
    <aside className="w-80 bg-[#242625] border-r border-[#222222] p-4 flex flex-col">
      <div className="flex flex-col justify-between gap-4">
        <h2 className="text-lg font-semibold">Чаты</h2>

        <label className="text-xs">Введите номер получателя (без +)</label>
        <div className="flex gap-2 mb-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="79991234567"
            maxLength={11}
            className="flex-1 p-2 rounded-lg bg-[#0000] border border-[#fff] text-[#e9edef] outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="px-3 bg-[#21BF62] text-white rounded hover:bg-[#1a914b] cursor-pointer"
          >
            <Search />
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

      <div className="mt-auto h-[48px] bg-[#242625] flex gap-2 justify-center border-t-1 border-[#181818]">
        <button
          onClick={onLogout}
          className="text-sm text-[#8696a0] hover:text-[#e9edef] cursor-pointer pt-[16px]"
        >
          <b>Выйти</b>
        </button>
      </div>
    </aside>
  )
}
