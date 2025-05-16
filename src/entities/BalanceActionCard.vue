<script setup lang="ts">

export interface BalanceCardData {
  id: number
  name: string
  balance: string
  icon: string
  variant: 'white' | 'accent'
}

interface BalanceActionCardProps {
  card: BalanceCardData
}

const { card } = defineProps<BalanceActionCardProps>()


</script>

<template>
  <div class="balance-action-card" :class="card.variant">
    <div class="balance-head">
      <img class="balance-icon" :src="card.icon" alt="" />
      <div class="balance-info">
        <div class="balance-name">{{ card.name }}</div>
        <div class="balance-amount">{{ card.balance }}</div>
      </div>
    </div>
    <div class="balance-description">
      <slot name="description"></slot>
    </div>

  </div>
</template>

<style lang="scss">
@use '@/app/styles/mixins' as mixins;

.balance-action-card {
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  padding-bottom: 2px;
  color: #ffffff;
  border: 1px solid #32315f;
  @include mixins.bg-cover;

  &.white {
    background-image: url('@/shared/assets/bg/benefit-1-bg.png');
  }

  &.accent {
    background-image: url('@/shared/assets/bg/benefit-2-bg.png');
  }
}

.balance-icon {
  width: 31px;
  height: 31px;
  border-radius: 50%;
}

.balance-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
  margin-bottom: 10px;
}

.balance-name {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.balance-amount {
  font-size: 15px;
  font-weight: 500;
}

.balance-description {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  margin-right: -10px;
  margin-left: -10px;
  font-weight: 500;

  .ton {
    color: #27aff9;

  }

  .stars {
    color: #FFCD1D;

  }
}
</style>
