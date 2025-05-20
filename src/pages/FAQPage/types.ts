export enum ETabsID {
  GAME = 'game',
  BALANCE = 'balance',
  REFS = 'refs',
  WITHDRAWAL = 'withdrawal',
}

export { };

declare global {
  interface WebApp {
    /**
     * A method that allows sharing a message by message_id
     * (appeared in Bot API ~7.1+).
     */
    shareMessage?: (params: { message_id: string }) => void;
  }
}
