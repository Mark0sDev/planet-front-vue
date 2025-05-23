<script setup lang="ts">
import {
  tg,
  user_id,
} from '@/utils/telegramUser';

import { defineProps, reactive, ref, defineEmits } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'
import ConnectWalletBanner from '@/features/ConnectWalletBanner.vue';
import { useTonWallet } from '@/utils/useTonWallet';
import { tonConnectUI } from '@/utils/tonconnect';
import UiDivider from '@/shared/ui/UiDivider.vue';
import UiInput from '@/shared/ui/UiInput.vue';

import axios from 'axios';

interface Props {
  modelValue: boolean
  text?: string
  text2?: string,
  walletUp?: boolean
  status: 'win' | 'lose'
}

const { isWalletConnected } = useTonWallet();

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}

const formLoaders = reactive({
  depositTon: false,
});

const amountDepositTon = ref('');

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
</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div :class="['congrats-modal', props.status]">
      <h2 class="modal-title title-1">{{ props.text }}</h2>
      <p class="modal-text" v-if="props.text2">{{ props.text2 }}</p>

      <div v-if="walletUp">
        <div class="wallet-connect">
          <ConnectWalletBanner />

          <div v-if="isWalletConnected">
            <form @submit.prevent="depositFormTon">
              <UiDivider value="WEB3 Пополнение" />

              <UiInput v-model="amountDepositTon" required tip="Введите сумму TON:" class="input" type="number"
                step="0.1" placeholder="TON" min="0.1" />

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
      </div>
      <UiButton @click="close" color="accent" class="congrats-modal-btn">Продолжить</UiButton>
    </div>
  </UiDialog>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.congrats-modal {
  background: #1e2237;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  max-width: 100%;
  width: 100%;
  border: 1px solid #32315f;
  @include mixins.bg-cover;

  // Добавлено для скролла при переполнении
  max-height: 80vh;
  overflow-y: auto;

  
  position: relative;

  &.win {
    background-image: url('@/shared/assets/bg/level-card-bg.png');
    background-position: 70% bottom;
  }

  &.lose {
    background-image: url('@/shared/assets/bg/false-transaction.png');
    background-position: 70% bottom;
  }

  .modal-title {
    margin-bottom: 12px;
  }
}

.modal-text {
  margin-bottom: 18px;
  font-size: 16px;
  color: white;
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
</style>
