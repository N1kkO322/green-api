import type { Credentials } from '../types/chat'

const API_BASE = import.meta.env.VITE_API_BASE

// console.log('API_BASE:', API_BASE)

export async function sendMessage(
  creds: Credentials,
  chatId: string,
  message: string,
) {
  const res = await fetch(
    `${API_BASE}/waInstance${creds.idInstance}/sendMessage/${creds.apiToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, message }),
    },
  )
  if (!res.ok) throw new Error(`Send failed: ${res.status}`)
  return res.json()
}

// export async function receiveNotification(creds: Credentials) {
//   const res = await fetch(
//     `${API_BASE}/waInstance${creds.idInstance}/receiveNotification/${creds.apiToken}`,
//   )
//   if (!res.ok) throw new Error(`Receive failed: ${res.status}`)
//   return res.json()
// }

export async function receiveNotification(creds: Credentials) {
  const res = await fetch(
    `${API_BASE}/waInstance${creds.idInstance}/receiveNotification/${creds.apiToken}`,
  )
  if (!res.ok) throw new Error(`Receive failed: ${res.status}`)
  const text = await res.text()
  if (!text.trim()) {
    return null
  }
  return JSON.parse(text)
}

export async function deleteNotification(
  creds: Credentials,
  receiptId: number,
) {
  await fetch(
    `${API_BASE}/waInstance${creds.idInstance}/deleteNotification/${creds.apiToken}/${receiptId}`,
    { method: 'DELETE' },
  )
}

export async function validateCredentials(creds: Credentials): Promise<void> {
  const url = `${API_BASE}/waInstance${creds.idInstance}/getStateInstance/${creds.apiToken}`

  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new Error('Введите корректные данные')
  }

  if (res.status === 401) {
    throw new Error('Неверный token')
  }
  if (res.status === 403) {
    throw new Error('Неверный idInstance')
  }
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`)
  }

  const data = await res.json()
  if (data.stateInstance !== 'authorized') {
    throw new Error(`Инстанс не авторизован ${data.stateInstance}`)
  }
}
