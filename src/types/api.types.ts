// Ответ от /users/getHistory
export interface HistoryItemApi {
    id: number;
    user_id: number;
    type: number; // 1 — пополнение, 2 — вывод
    sum: string;
    date: string;
}