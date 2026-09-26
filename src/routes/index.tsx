import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '../components/LoginForm'
import { useCredentials } from '../hooks/useCredentials'
import { validateCredentials } from '../lib/api'
import type { Credentials } from '../types/chat'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { save } = useCredentials()

  const handleSubmit = async (creds: Credentials) => {
    await validateCredentials(creds)
    save(creds)
    navigate({ to: '/chat' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(./../public/background.jpg)]">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}
