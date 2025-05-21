export interface ReferralFromApi {
    user_id: number
    login: string | null
    avatar_url_telegram: string | null
    deposit_ton: string | number
}

export interface HistoryItemApi {
    id: number
    user_id: number
    type: number
    sum: string
    date: string
}

export interface LastWithdrawalItem {
    id: number
    user_id: number
    login: string | null
    sum: string
}