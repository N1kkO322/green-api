# Тестовое задание на должность "Фронтенд разработчик React"

Пользовательский интерфейс для отправки и получения текстовых сообщений через **GREEN-API** (WhatsApp).  
Интерфейс был стилизован под WA (т.к. можно было выбрать).

## Стек

- React
- TypeScript
- TanStack Router
- Tailwind CSS
- lucide-react (icons)
- Vite

## Setup

Установите зависимости:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Env file

Создайте файл `.env` в корне проекта и скопируйте в него содержимое `.env.example`.

Значение `VITE_API_BASE` — это `apiUrl` инстанса.

После изменения `.env` перезапустите dev-сервер.

## Production

Сборка:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Предпросмотр:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

> !!!!! **ВАЖНО** !!!!!

> Токен хранится в `localStorage`. В продакшене следует использовать куки.

> !!!!! **ВАЖНО** !!!!!
