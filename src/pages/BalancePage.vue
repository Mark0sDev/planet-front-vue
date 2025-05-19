<script setup lang="ts">
import {
  tg,
  initData,
  user_id,
} from '@/utils/telegramUser';

import { onMounted, ref, reactive, computed } from 'vue';
import api from '@/utils/api';
import BalanceActionCard, { type BalanceCardData } from '@/entities/BalanceActionCard.vue';
import type { Transaction } from '@/entities/TransactionCard.vue';
import { useTonWallet } from '@/utils/useTonWallet';
import { tonConnectUI } from '@/utils/tonconnect';

import PageLoader from './PageLoader.vue';
import ConnectWalletBanner from '@/features/ConnectWalletBanner.vue';
import UiButton from '@/shared/ui/UiButton.vue';
import UiDivider from '@/shared/ui/UiDivider.vue';
import UiInput from '@/shared/ui/UiInput.vue';
import SmallTonIcon from '@/shared/assets/icons/ton-vector.svg';
import TransactionCard from '@/entities/TransactionCard.vue';
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'
import axios from 'axios';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { isWalletConnected } = useTonWallet();

const formLoaders = reactive({
  depositTon: false,
  withdrawalTon: false,
});

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null);

const user = ref({
  balance_ton: 0,
  balance_stars: 0,
  balance_payments_ton: 0,
  balance_payments_stars: 0,
  withdrawal_ton: 0
});

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const [userApi, historyApi] = await Promise.all([
      api.post('/users/getUser', { initData, user_id }),
      api.post('/users/getHistory', { initData, user_id })
    ])


    user.value = {
      balance_ton: +userApi.data.balance_ton,
      balance_stars: +userApi.data.balance_stars,
      balance_payments_ton: +userApi.data.balance_payments_ton,
      balance_payments_stars: +userApi.data.balance_payments_stars,
      withdrawal_ton: +userApi.data.withdrawal_ton
    };

    tg.showAlert(historyApi.data.status + '');

  });
};

const balanceActionCards = computed<BalanceCardData[]>(() => [
  {
    id: 1,
    name: 'STARS',
    balance: +user.value.balance_stars,
    payments: +user.value.balance_payments_stars,
    icon: "/icons/stars.svg",
    variant: 'white',
  },
  {
    id: 2,
    name: 'TON',
    balance: +user.value.balance_ton,
    payments: +user.value.balance_payments_ton,
    icon: "/icons/ton.svg",
    variant: 'accent',
  },
]);


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

const showWithdrawalTon = ref<boolean>(false);

const showWithdrawal = ref<boolean>(false);
const showTopUp = ref<boolean>(false);

function handleCardAction(cardId: number) {
  if (cardId === 2) {
    showWithdrawal.value = true;
  } else {
    showTopUp.value = true;
  }
}

const amountDepositTon = ref('');
const wallet_withdrawal = ref('');
const sum_withdrawal = ref('');


const withdrawalFormTon = async () => {
  return await api.post('/users/withdrawalTon', {
    initData,
    user_id,
    wallet_withdrawal: wallet_withdrawal.value,
    sum_withdrawal: sum_withdrawal.value
  });
};

async function withdrawalForm() {
  formLoaders.withdrawalTon = true;

  try {
    const res = await withdrawalFormTon();

    if (res.data.status == 1) {

      const sum = parseFloat(sum_withdrawal.value);

      const current_withdrawal_ton = parseFloat(String(user.value.withdrawal_ton));
      user.value.withdrawal_ton = current_withdrawal_ton + sum;

      user.value.balance_ton -= sum;
      user.value.balance_payments_ton -= sum;

      wallet_withdrawal.value = '';
      sum_withdrawal.value = '';
      showWithdrawalTon.value = true
    }
  } catch {
    tg.showAlert("Withdrawal error, please try again later.");
  } finally {
    formLoaders.withdrawalTon = false;
  }
}


async function depositFormTon() {
  formLoaders.depositTon = true;

  try {
    const { data } = await axios.get(`https://www.api-dev.dev/api/getMemo?comment=${user_id}`);

    if (data.comment) {
      const tonAmount = parseFloat(amountDepositTon.value);
      const amountNano = (tonAmount * 1e9).toString();

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: 'UQA-uKB7lRsIzdjVzYCYDOkbPKUMeRZcCgehRHhX7hOwZ5SW',
            amount: amountNano,
            payload: data.comment,
          },
        ],
      };

      await tonConnectUI.sendTransaction(transaction);
    } else {
      tg.showAlert("Deposit error. Please contact the administrator or make a manual transfer.");
    }
  } catch {
    tg.showAlert("The deposit has been canceled.");
  } finally {
    formLoaders.depositTon = false;
  }
}

onMounted(() => {
  getUser();
});
</script>

<template>
  <PageLoader ref="loaderRef" />
  <div class="balance-page page">
    <div class="balance-title title-1">Баланс</div>
    <div class="balance-cards">
      <BalanceActionCard :card="balanceActionCards[1]" @action="handleCardAction">
        <template #description>
          Доступно к выводу:<br />
          <span class="ton">{{ balanceActionCards[1].payments.toFixed(5) }} TON</span>
        </template>
      </BalanceActionCard>

      <BalanceActionCard :card="balanceActionCards[0]" @action="handleCardAction">
        <template #description>
          Доступно к выводу:<br />
          <span class="stars">{{ balanceActionCards[0].payments.toFixed(5) }} STARS</span>
        </template>
      </BalanceActionCard>
    </div>

    <div class="title-1">Кошелек</div>
    <div class="wallet-connect">
      <ConnectWalletBanner />

      <div v-if="isWalletConnected">
        <form @submit.prevent="depositFormTon">
          <UiDivider value="WEB3 Пополнение" />

          <UiInput v-model="amountDepositTon" required tip="Введите сумму TON:" class="input" type="number" step="0.1"
            placeholder="TON" min="0.1" />

          <UiButton class="button" type="submit" :disabled="formLoaders.depositTon"
            style="margin-top: 10px; margin-bottom: 10px;">
            <template v-if="formLoaders.depositTon">
              <span class="spinner" />
            </template>
            <template v-else>
              Пополнить
            </template>
          </UiButton>
        </form>
      </div>

      <UiDivider value="Пополнить вручную" />

      <UiInput :custom="{ type: 'copy' }" tip="Адрес кошелька TON" class="input"
        value="UQA-uKB7lRsIzdjVzYCYDOkbPKUMeRZcCgehRHhX7hOwZ5SW" disabled />
      <UiInput :custom="{ type: 'copy' }" tip="Комментарий (MEMO)" class="input" :value="user_id" disabled />

    </div>

    <div class="title-1">{{ t('withdraw_title') }}</div>
    <div class="wallet-connect">
      <form @submit.prevent="withdrawalForm">
        <div class="withdrawal-modal">
          <div class="inputs">
            <UiInput tip="TON wallet address" v-model="wallet_withdrawal" required="" type="text"
              placeholder="Введите адрес" />
            <UiInput v-model="sum_withdrawal" :custom="{ type: 'max', maxValue: balanceActionCards[1].payments }"
              tip="TON" type="number" step="0.00001" min="0.00001" required="" placeholder="Введите количество" />
          </div>
          <UiButton :disabled="formLoaders.withdrawalTon" class="withdrawal-modal-button" color="blue">
            <template v-if="formLoaders.withdrawalTon">
              <span class="spinner" />
            </template>
            <template v-else>
              Вывести
            </template>
          </UiButton>
          <div class="withdrawal-all-time">
            <span>Выведено за все время:</span>
            <div class="value">
              <span>{{ user.withdrawal_ton.toFixed(5) }}</span>
              <SmallTonIcon class="SmallTonIcon" />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="title-1">{{ t('transactions_history_title') }}</div>
    <TransactionCard v-for="tx in transactions" :key="tx.id" :transaction="tx" />
    <CongratsDialog :text="t('withdrawal_success')" v-model="showWithdrawalTon" />
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

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

.withdrawal-all-time {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
}

.value {
  display: flex;
  align-items: center;

  .SmallTonIcon {
    margin-left: 5px;
  }
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>