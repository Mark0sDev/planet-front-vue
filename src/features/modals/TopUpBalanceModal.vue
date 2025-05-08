<script setup lang="ts">
import ConnectWalletBanner from '@/features/ConnectWalletBanner.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import UiDivider from '@/shared/ui/UiDivider.vue'
import UiInput from '@/shared/ui/UiInput.vue'
</script>

<template>
  <ConnectWalletBanner />
  <UiDivider value="Пополнить вручную" />
  <UiInput
    :custom="{
      type: 'copy',
    }"
    tip="Адрес кошелька TON"
    placeholder="Введите адрес"
    class="input"
    value="0x40afb83b623333a005885758e1bea78d45314642"
  />
  <UiInput
    :custom="{
      type: 'copy',
    }"
    tip="Комментарий (MEMO)"
    placeholder="Введите MEMO"
    error="*Обязательно при переводе укажите комментарий MEMO"
    class="input"
    value="MEMO"
  />
  <UiDivider value="Пополнить другим способом" />
  <UiInput
    :custom="{
      type: 'copy',
    }"
    tip="USDT BEP-20"
    placeholder="Введите адрес"
    error="*USDT будут конвертированы автоматически в $PLANET"
    class="input"
    value="0x40afb83b623333a005885758e1bea78d45314642"
  />
  <UiButton class="button" color="blue">Пополнить</UiButton>
</template>

<style scoped lang="scss">
.button {
  color: var(--font);
}
.input {
  margin-bottom: 20px;
}
</style>
