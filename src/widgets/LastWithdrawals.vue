<script setup lang="ts">
import TransactionCard, { type Transaction } from '@/entities/TransactionCard.vue'

const transactions: Transaction[] = [
  {
    id: 1,
    title: 'John Doe',
    date: '2025-04-25',
    amount: '129.01',
    type: 'income',
    status: 'success',
  },
]
</script>

<template>
  <div class="last-withdrawals">
    <h2 class="title title-1">Последние выводы</h2>
    <div class="last-withdrawals-list">
      <TransactionCard v-for="transaction in transactions" :key="transaction.id" :transaction />
    </div>
  </div>
</template>

<style scoped lang="scss">
.last-withdrawals {
  margin-top: 20px;

  .title {
    margin-bottom: 10px;
  }
}
</style>
