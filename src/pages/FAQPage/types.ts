export enum ETabsID {
  GAME = 'game',
  BALANCE = 'balance',
  REFS = 'refs',
  WITHDRAWAL = 'withdrawal',
}

export { };

declare global {
  interface WebApp {

    shareMessage(message_id: string, callback?: (sent: boolean) => void): void
  }
}
