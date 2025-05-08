<script setup lang="ts">
import BalanceActionCard, { type BalanceCardData } from '@/entities/BalanceActionCard.vue'
import CityIcon from '@/shared/assets/currency/city.webp'

import WalletConnect from '@/features/WalletConnect.vue'
import { transactions } from '@/shared/mock/transactions.ts'
import TransactionCard from '@/entities/TransactionCard.vue'
import UiModal from '@/shared/ui/UiModal.vue'
import { ref } from 'vue'
import WithdrawalModal from '@/features/modals/WithdrawalModal.vue'
import TopUpBalanceModal from '@/features/modals/TopUpBalanceModal.vue'

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
    <div class="title-1">История транзакций</div>
    <TransactionCard v-for="tx in transactions" :key="tx.id" :transaction="tx" />
  </div>
  <UiModal v-model="showWithdrawal" title="Вывести баланс">
    <WithdrawalModal />
  </UiModal>
  <UiModal v-model="showTopUp" title="Пополнить баланс">
    <TopUpBalanceModal />
  </UiModal>
</template>

<style scoped>
.title-1 {
  margin-bottom: 10px;
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
