<script setup lang="ts">
import BalanceActionCard, { type BalanceCardData } from '@/entities/BalanceActionCard.vue'
import CityIcon from '@/shared/assets/currency/city.webp'
import type { Transaction } from '@/entities/TransactionCard.vue'

import WalletConnect from '@/features/WalletConnect.vue'

import outBalance from '@/features/outBalance.vue'

import TransactionCard from '@/entities/TransactionCard.vue'
import UiModal from '@/shared/ui/UiModal.vue'
import { ref } from 'vue'


const balanceActionCards: BalanceCardData[] = [
  {
    id: 1,
    name: '$CITY',
    balance: '2.336',
    buttonLabel: 'Пополнить',
    icon: CityIcon,
    variant: 'white',
  },
  {
    id: 2,
    name: 'TON',
    balance: '2.336',
    buttonLabel: 'Вывести',
    icon: "/icons/ton.svg",
    variant: 'accent',
  },
]

const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Пополнение',
    date: '2025-04-25',
    amount: '0.005',
    type: 'income',
    status: 'success',
  },

]

const showWithdrawal = ref<boolean>(false)
const showTopUp = ref<boolean>(false)

function handleCardAction(cardId: number) {
  if (cardId === 2) {
    showWithdrawal.value = true
  } else {
    showTopUp.value = true
  }
}
</script>

<template>
  <div class="balance-page page">
    <div class="balance-title title-1">Баланс</div>
    <div class="balance-cards">
      <BalanceActionCard :card="balanceActionCards[0]" @action="handleCardAction">
        <template #description>
          Получи 0.005 TON <br />
          за приглашенного друга
        </template>
      </BalanceActionCard>
      <BalanceActionCard :card="balanceActionCards[1]" @action="handleCardAction">
        <template #description>
          Получи <span>0.005 TON</span> <br />
          за приглашенного друга
        </template>
      </BalanceActionCard>
    </div>
    <div class="title-1">Кошелек</div>
    <WalletConnect />
    <div class="title-1">Кошелек</div>
    <outBalance />
    <div class="title-1">История транзакций</div>
    <TransactionCard v-for="tx in transactions" :key="tx.id" :transaction="tx" />
  </div>

  <UiModal v-model="showTopUp" title="Пополнить баланс">
    <TopUpBalanceModal />
  </UiModal>
</template>

<style scoped>
.title-1 {
  margin-bottom: 10px;
  text-align: center;
}



.balance-title {
  text-align: center;
}

.balance-cards {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
