import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#242625] py-8 px-16 flex flex-col gap-8 justify-center rounded-lg  items-center">
        <h1 className="text-6xl font-bold text-[#21BF62]">404</h1>
        <p className="text-lg text-[#8696a0]">Страница не найдена</p>
        <Link
          to="/"
          className="px-4 py-2 bg-[#21BF62] text-white rounded hover:bg-[#1a914b] transition"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
