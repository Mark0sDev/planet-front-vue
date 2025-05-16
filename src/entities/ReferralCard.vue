<script setup lang="ts">
export interface Referral {
  id: number
  name: string
  avatar: string
  balance: string
}

interface ReferralCardProps {
  referral: Referral
}

defineProps<ReferralCardProps>()
</script>

<template>
  <div class="referral-card">
    <img :src="referral.avatar" alt="Avatar" class="referral-avatar" />
    <div class="referral-info">
      <div class="referral-name">
        {{ referral.name }}
      </div>
      <div class="referral-balance">
        {{ referral.balance }}
        <img src="/icons/ton.svg" alt="TON" class="balance-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.referral-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.referral-card {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #32315f;
  @include mixins.bg-cover;
  background-image: url('@/shared/assets/bg/referal-bg.png');
  padding: 10px;
  border-radius: 16px;
  margin-bottom: 12px;
  color: #ffffff;
}

.referral-avatar {
  width: 40px;
  height: 40px;
  border-radius: 7px;
  object-fit: cover;
}

.referral-name {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3px;
}

.referral-balance {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 15px;
  font-weight: 500;
  color: white;
}

.balance-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
