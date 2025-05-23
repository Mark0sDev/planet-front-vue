<script setup lang="ts">
import {
  user_id,
} from '@/utils/telegramUser';

import { defineProps, defineEmits } from 'vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDialog from '@/shared/ui/UiDialog.vue'


import UiDivider from '@/shared/ui/UiDivider.vue';
import UiInput from '@/shared/ui/UiInput.vue';

interface Props {
  modelValue: boolean
  text?: string
  text2?: string,
  walletUp?: boolean
  status: 'win' | 'lose'
}


const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

function close() {
  emit('update:modelValue', false)
}

</script>

<template>
  <UiDialog :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div :class="['congrats-modal', props.status]">
      <h2 class="modal-title title-1">{{ props.text }}</h2>
      <p class="modal-text" v-if="props.text2">{{ props.text2 }}</p>

      <div v-if="walletUp">
        <div class="wallet-connect">

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
</style>
