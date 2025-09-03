## Bank App Front — клиентское приложение

Интерфейс интернет-банка на базе Webpack и Redom. Поддерживает авторизацию, работу со счетами, валютами и карту банкоматов.

### Технологии
- **Сборка**: Webpack 5, Babel
- **UI**: Redom, Bootstrap
- **Маршрутизация**: Navigo
- **Линтинг/форматирование**: ESLint, Prettier
- **Прочее**: dotenv-webpack (переменные окружения)

### Требования
- Установлены Node.js и npm

### Установка
```bash
npm i   # либо npm install
```

### Тесты
```bash
npm run test   # запуск тестов jest
npm run cy:run   # запуск тестов cypress
```

### Переменные окружения
Проект использует `dotenv-webpack`. Создайте файл `.env` в корне проекта и укажите значения:

```env
# URL API бэкенда, обязательный
API_URL=http://localhost:3000

# URL Websocket бэкенда, обязательный
WS_URL=ws://localhost:3000

# Ключ API Яндекс.Карт (опционально, но рекомендуется)
YMAPS_API_KEY=ваш_ключ
```

- `API_URL` используется всеми модулями API (`/login`, `/accounts`, `/create-account`, `/account/:id`, `/transfer-funds`, `/currencies`, `/all-currencies`, `/currency-buy`, `/banks`).
- `YMAPS_API_KEY` используется страницей `ATMs` для загрузки Яндекс.Карт. При отсутствии ключа карта может загружаться с ограничениями.

### Скрипты
```bash
npm run dev    # запуск dev-сервера (порт 8080), HMR, historyApiFallback
npm run build  # production-сборка в каталог dist
npm run lint   # проверка ESLint
npm run lint:fix # автоисправление
npm run test # тесты jest
npm run cy:run # тесты cypress
```

### Маршруты приложения
- `/login` — вход
- `/accounts` — список счетов, сортировка и создание нового счета
- `/accounts/:id` — информация по счету
- `/accounts/:id/history` — история транзакций
- `/currencies` — валютные кошельки, обмен, динамика
- `/atms` — карта банкоматов (Яндекс.Карты)

### Быстрый старт разработки
```bash
# 1) Установите зависимости
npm i

# 2) Создайте .env
cp .env.example .env  # если есть, либо создайте вручную
# Заполните API_URL и опционально YMAPS_API_KEY

# 3) Запустите dev-сервер
npm run dev
# Приложение будет доступно по http://localhost:8080
```

### Сборка
```bash
npm run build
# Результат в каталоге dist/
```

### Структура проекта (основное)
```
bank-app-front/
  ├─ src/
  │  ├─ api/                # работа с API (Auth, Accounts, Banks, Currencies)
  │  ├─ components/         # компонентные блоки (карточки, формы, графики)
  │  ├─ pages/              # страницы (Accounts, AccountInfo, Currencies, ATMs, ...)
  │  ├─ ui/                 # UI-элементы (Button, Input, Select, Skeletons)
  │  ├─ utils/              # утилиты
  │  ├─ index.js            # точка входа, роутинг
  │  └─ index.scss          # глобальные стили
  ├─ webpack.config.js
  ├─ eslint.config.mjs
  └─ index.html
```

### Яндекс.Карты (страница ATMs)
- Скрипт API Яндекс.Карт подключается динамически при открытии `/atms`.
- Ключ берётся из `YMAPS_API_KEY` (если указан). Карта инициализируется с центром на Москву.
- Для отображения банкоматов можно расширить страницу, подгружая список точек через `src/api/Banks.js` и добавляя `Placemark` на карту.

### Примечания
- При ошибках API на страницах выводятся сообщения пользователю, а детали — в консоль (уровень `console.error`).
- Навигация реализована через Navigo с `historyApiFallback` (настроен в devServer), поэтому прямые переходы на маршруты работают в dev-режиме. 