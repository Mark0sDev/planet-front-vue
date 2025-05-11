<script setup lang="ts">
import InviteFriendBanner from '@/features/InviteFriendBanner.vue'
import ReferralInfoBanner from '@/features/ReferralInfoBanner.vue'
import ReferralCard from '@/entities/ReferralCard.vue'

import avatar1 from '@/shared/assets/avatars/avatar-1.jpg'

import type { Referral } from '@/entities/ReferralCard.vue'


const referrals: Referral[] = [
  {
    id: 1,
    name: 'Alex Planet',
    avatar: avatar1,
    balance: '0.00012',
  },
];


</script>

<template>
  <div class="friends-page page">
    <h2 class="friends-title title-1">Друзья</h2>
    <p class="friends-text">Зарабатывай вместе с друзьями!</p>

    <InviteFriendBanner />
    <ReferralInfoBanner />

    <h2 class="title-1">Ваши рефералы</h2>
    <ReferralCard v-for="referral in referrals" :key="referral.id" :referral="referral" />
  </div>
</template>

<style scoped lang="scss">
.title-1 {
  margin-bottom: 12px;
}

.friends-title {
  text-align: center;
}

.friends-text {
  text-align: center;
  font-size: 16px;
}
</style>
