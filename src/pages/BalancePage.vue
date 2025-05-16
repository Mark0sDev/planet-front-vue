<script setup lang="ts">
import BalanceActionCard, { type BalanceCardData } from '@/entities/BalanceActionCard.vue'

import type { Transaction } from '@/entities/TransactionCard.vue'

import ConnectWalletBanner from '@/features/ConnectWalletBanner.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDivider from '@/shared/ui/UiDivider.vue'
import UiInput from '@/shared/ui/UiInput.vue'

import SmallTonIcon from '@/shared/assets/icons/ton-vector.svg'

import TransactionCard from '@/entities/TransactionCard.vue'
import UiModal from '@/shared/ui/UiModal.vue'
import { ref } from 'vue'

const balanceActionCards = ref<BalanceCardData[]>([
  {
    id: 1,
    name: '$CITY',
    balance: '2.336',
    icon: "/icons/stars.svg",
    variant: 'white',
  },
  {
    id: 2,
    name: 'TON',
    balance: '2.336',
    icon: "/icons/ton.svg",
    variant: 'accent',
  },
])


const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Пополнение',
    date: '2025-04-25',
    amount: '0.005',
    type: 'income',
    status: 'success',
  },
];

const showWithdrawal = ref<boolean>(false)
const showTopUp = ref<boolean>(false)

function handleCardAction(cardId: number) {
  if (cardId === 2) {
    showWithdrawal.value = true
  } else {
    showTopUp.value = true
  }
}

const user_id = 456546;

</script>

<template>

  <div class="balance-page page">
    <div class="balance-title title-1">Баланс</div>
    <div class="balance-cards">

      <BalanceActionCard :card="balanceActionCards[1]" @action="handleCardAction">
        <template #description>
          Доступно к выводу:<br>
          <span class="ton">10</span> TON
        </template>
      </BalanceActionCard>

      <BalanceActionCard :card="balanceActionCards[0]" @action="handleCardAction">
        <template #description>
          Доступно к выводу:<br>
          <span class="stars">10</span> STARS
        </template>
      </BalanceActionCard>
    </div>
    <div class="title-1">Кошелек</div>
    <div class="wallet-connect">
      <ConnectWalletBanner />
      <UiDivider value="Пополнить вручную" />
      <UiInput :custom="{
        type: 'copy',
      }" tip="Адрес кошелька TON" class="input" value="UQA-uKB7lRsIzdjVzYCYDOkbPKUMeRZcCgehRHhX7hOwZ5SW" disabled />
      <UiInput :custom="{
        type: 'copy',
      }" tip="Комментарий (MEMO)" class="input" :value="user_id" disabled />
      <UiDivider value="Пополнить другим способом" />
      <UiInput :custom="{
        type: 'copy',
      }" tip="USDT BEP-20" placeholder="Введите адрес" error="*USDT будут конвертированы автоматически в $PLANET"
        class="input" disabled value="0x" />
      <UiButton class="button" color="blue">Пополнить</UiButton>
    </div>
    <div class="title-1">Кошелек</div>
    <div class="wallet-connect">
      <div class="withdrawal-modal">
        <div class="inputs">
          <UiInput tip="TON wallet address" placeholder="Введите адрес" />
          <UiInput :custom="{
            type: 'max',
            maxValue: 8.9623,
          }" tip="TON" type="number" step="0.1" min="0.1" placeholder="Введите количество" />
        </div>
        <UiButton class="withdrawal-modal-button" color="white">Вывести</UiButton>
        <div class="withdrawal-all-time">
          <span>Выведено за все время:</span>
          <div class="value">
            <span>805</span>
            <SmallTonIcon class="SmallTonIcon" />
          </div>
        </div>
      </div>
    </div>
    <div class="title-1">История транзакций</div>
    <TransactionCard v-for="tx in transactions" :key="tx.id" :transaction="tx" />
  </div>

  <UiModal v-model="showTopUp" title="Пополнить баланс">
    <TopUpBalanceModal />
  </UiModal>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.title-1 {
  margin-bottom: 10px;
  text-align: center;
}

.wallet-connect {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/wallet-connect-bg.jpg');
  border: 1px solid #32315f;
  padding: 12px;
  border-radius: 20px;
  flex: none;
  margin-bottom: 10px;

  p {
    font-weight: 300;

    span {
      color: #28aff9;
      font-weight: 500;
    }

    b {
      color: #f48d96;
    }
  }
}

.wallet-title {
  margin-bottom: 6px;
}

.wallet-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
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


.value {
  display: flex;
  align-items: center;

  .SmallTonIcon {
    margin-left: 5px;
  }
}

.withdrawal-all-time {
  display: flex;

  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
}

.wallet-connect {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/wallet-connect-bg.jpg');
  border: 1px solid #32315f;
  padding: 12px;
  border-radius: 20px;
  flex: none;
  margin-bottom: 10px;

  p {
    font-weight: 300;

    span {
      color: #28aff9;
      font-weight: 500;
    }

    b {
      color: #f48d96;
    }
  }
}

.wallet-title {
  margin-bottom: 6px;
}

.wallet-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}
</style>
