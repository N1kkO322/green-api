import { useState } from 'react'
import type { Credentials } from '../types/chat'

interface Props {
  onSubmit: (creds: Credentials) => Promise<void>
}

export function LoginForm({ onSubmit }: Props) {
  const [idInstance, setIdInstance] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!idInstance.trim() || !apiToken.trim()) {
      setError('Заполните оба поля')
      return
    }

    setLoading(true)
    try {
      await onSubmit({
        idInstance: idInstance.trim(),
        apiToken: apiToken.trim(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#242625] p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-10 justify-center"
    >
      <h1 className="text-2xl font-bold text-white">
        Войдите в <span className="text-[#21BF62]">GREEN-API</span>
      </h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            idInstance
          </label>

          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="1232423424"
            disabled={loading}
            className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-gray-400 outline-none focus:outline-hidden focus:ring-2 focus:ring-[#3b970200] disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            apiTokenInstance
          </label>
          <input
            type="password"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            placeholder="12w35c3452e342t34"
            disabled={loading}
            className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-gray-400 outline-none focus:outline-hidden focus:ring-2 focus:ring-[#3b970200] disabled:opacity-50 [color-scheme:dark]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#21BF62] text-white p-2 rounded hover:bg-[#1ca354] transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Проверка...' : 'Войти'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}
