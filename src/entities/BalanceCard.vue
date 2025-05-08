<script setup lang="ts">
interface BalanceCardProps {
  currency: string
  amount: string
  bg: 'yellow' | 'blue'
}

defineProps<BalanceCardProps>()
</script>

<template>
  <div class="balance-card" :class="bg">
    <div class="balance-info">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <span class="currency">{{ currency }}</span>
    </div>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.balance-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #32315f;
  font-weight: 500;
  @include mixins.bg-cover;

  &.yellow {
    background-image: url('@/shared/assets/bg/city-bg.png');
  }

  &.blue {
    background-image: url('@/shared/assets/bg/ton-bg.png');
  }

  color: #fff;

  .icon {
    width: 22px;
    height: 22px;
  }
  .balance-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .amount {
    font-size: 15px;
  }
}
</style>
