<script setup lang="ts">
import { computed } from 'vue'
import CheckIcon from '@/shared/assets/icons/check.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'

export interface Transaction {
  id: number
  title: string
  date: string
  amount: string
  type: 'income' | 'expense'
  status: 'success' | 'failed'
}

interface TransactionCardProps {
  transaction: Transaction
}

const { transaction } = defineProps<TransactionCardProps>()

const formattedAmount = computed(() => {
  const sign = transaction.type === 'income' ? '+' : '-'
  return `${sign}${transaction.amount}`
})

const amountClass = computed(() => {
  return {
    'income-amount': transaction.type === 'income',
    'expense-amount': transaction.type === 'expense',
  }
})
</script>

<template>
  <div class="transaction-card" :class="[transaction.type, transaction.status]">
    <div class="transaction-info">
      <CheckIcon class="transaction-status" v-if="transaction.status === 'success'" />
      <CloseIcon class="transaction-status" v-else />

      <div class="transaction-texts">
        <div class="transaction-title">{{ transaction.title }}</div>
        <div class="transaction-date">{{ transaction.date }}</div>
      </div>
    </div>

    <div class="transaction-amount" :class="amountClass">
      <span>{{ formattedAmount }}</span>
      <img src="/icons/ton.svg" alt="TON Icon" class="transaction-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.transaction-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 12px;
  color: #ffffff;
  border: 1px solid #32315f;

  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/user-card-bg.png');

  &.income {
    background-image: url('@/shared/assets/bg/level-card-bg.png');
  }

  &.expense {
    background-image: url('@/shared/assets/bg/false-transaction.png');
  }

  &.failed {
    background-image: url('@/shared/assets/bg/user-card-bg.png');
  }
}

.transaction-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.transaction-icon {
  width: 40px;
  height: 40px;
}

.transaction-texts {
  display: flex;
  flex-direction: column;
}

.transaction-title {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3px;
}

.transaction-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.transaction-amount {
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
}

/* Цвет суммы */
.income-amount {
  color: var(--accent);
}
</style>
