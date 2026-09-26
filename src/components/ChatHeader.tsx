export function ChatHeader({ title }: { title: string }) {
  return (
    <header className="h-16 px-4 flex items-center bg-[#242625] border-b border-[#222d34]">
      <span className="font-medium">
        Телефон: <span className="text-[#21BF62]">+{title}</span>
      </span>
    </header>
  )
}
