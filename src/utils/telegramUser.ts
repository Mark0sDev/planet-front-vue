// Расширение глобальных типов Telegram WebApp
interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramInitDataUnsafe {
  user?: TelegramUser;
  start_param?: string;
}

interface WebApp {
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;
  shareMessage?: (messageId: string) => void;
  sendData?: (data: string) => void;
  showAlert?: (message: string) => void;
  // при необходимости можно добавить другие методы
}

interface TelegramNamespace {
  WebApp: WebApp;
}

declare global {
  interface Window {
    Telegram: TelegramNamespace;
  }
}

// Экспортируем WebApp с корректной типизацией
export const tg = window.Telegram.WebApp;

export const initData = tg.initData;
export const user = tg.initDataUnsafe?.user;

export const user_id = user?.id ?? null;
export const first_name = user?.first_name ?? '';
export const last_name = user?.last_name ?? '';
export const username = user?.username ?? '';
export const language_code = user?.language_code ?? 'en';
export const photo_url = user?.photo_url ?? null;
export const startParam = tg.initDataUnsafe?.start_param || 0;
