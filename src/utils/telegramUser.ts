// src/utils/telegramUser.ts

export const tg = window.Telegram.WebApp;

export const initData = tg.initData || 'test';

export const user = tg.initDataUnsafe?.user;

export const user_id = user?.id || '7981172932';
export const first_name = user?.first_name ?? '';
export const last_name = user?.last_name ?? '';
export const username = user?.username ?? '';
export const language_code = user?.language_code ?? 'en';
