<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'
import CopyButton from '@/shared/ui/CopyButton.vue'
</script>

<template>
  <div class="wallet-connect">
    <div class="wallet-title title-1">Подключить кошелек</div>
    <p><b>*</b>Переведите сумму <span>от 0.1 TON</span> на этот кошелёк</p>

    <div class="wallet-buttons">
      <UiButton color="accent">Подключить кошелек</UiButton>
      <CopyButton />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.wallet-connect {
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/wallet-connect-bg.jpg');
  border: 1px solid #32315f;
  padding: 29px 22px;
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
