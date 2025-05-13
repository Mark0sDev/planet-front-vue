<script setup lang="ts">
import ConnectWalletBanner from '@/features/ConnectWalletBanner.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDivider from '@/shared/ui/UiDivider.vue'
import UiInput from '@/shared/ui/UiInput.vue'
</script>
<template>
  <div class="wallet-connect">
    <ConnectWalletBanner />
    <UiDivider value="Пополнить вручную" />
    <UiInput :custom="{
      type: 'copy',
    }" tip="Адрес кошелька TON" placeholder="Введите адрес" class="input" value="0x" disabled />
    <UiInput :custom="{
      type: 'copy',
    }" tip="Комментарий (MEMO)" placeholder="Введите MEMO" error="*Обязательно при переводе укажите комментарий MEMO"
      class="input" value="MEMO" disabled />
    <UiDivider value="Пополнить другим способом" />
    <UiInput :custom="{
      type: 'copy',
    }" tip="USDT BEP-20" placeholder="Введите адрес" error="*USDT будут конвертированы автоматически в $PLANET"
      class="input" disabled value="0x" />
    <UiButton class="button" color="blue">Пополнить</UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

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
