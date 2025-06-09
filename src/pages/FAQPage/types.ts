export enum ETabsID {
  GAME = 'game',
  BALANCE = 'balance',
  REFS = 'refs',
}

export { };

declare global {
  interface WebApp {
    shareMessage(message_id: string, callback?: (sent: boolean) => void): void
  }
}
