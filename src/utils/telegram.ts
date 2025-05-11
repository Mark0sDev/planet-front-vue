// src/utils/telegram.ts

type TelegramWebApp = {
  initData: string;
  sendData: (data: string) => void;
  close: () => void;
  expand: () => void;
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    onClick: (cb: () => void) => void;
  };
};

const tg = (window as unknown as { Telegram: { WebApp: TelegramWebApp } }).Telegram.WebApp;

export default tg;
