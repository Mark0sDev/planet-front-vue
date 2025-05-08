import type { Transaction } from '@/entities/TransactionCard.vue'

export const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Пополнение',
    date: '2025-04-25',
    amount: '0.005',
    type: 'income',
    status: 'success',
  },
  {
    id: 2,
    title: 'Вывод средств',
    date: '2025-04-24',
    amount: '0.002',
    type: 'expense',
    status: 'success',
  },
  {
    id: 3,
    title: 'Пополнение',
    date: '2025-04-23',
    amount: '0.010',
    type: 'income',
    status: 'success',
  },
  {
    id: 4,
    title: 'Вывод средств',
    date: '2025-04-22',
    amount: '0.001',
    type: 'expense',
    status: 'failed',
  },
  {
    id: 5,
    title: 'Пополнение',
    date: '2025-04-21',
    amount: '0.003',
    type: 'income',
    status: 'success',
  },
]
