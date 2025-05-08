<script setup lang="ts">
import { referrals } from '@/shared/mock/referals.ts'

import InviteFriendBanner from '@/features/InviteFriendBanner.vue'
import ReferralInfoBanner from '@/features/ReferralInfoBanner.vue'
import ReferralCard from '@/entities/ReferralCard.vue'
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
