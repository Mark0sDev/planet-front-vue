<script setup lang="ts">
import { ref, computed } from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import InviteFriendBanner from '@/features/InviteFriendBanner.vue'
import ReferralInfoBanner from '@/features/ReferralInfoBanner.vue'
import ReferralCard from '@/entities/ReferralCard.vue'

import avatar1 from '@/shared/assets/avatars/avatar-1.jpg'
import avatar2 from '@/shared/assets/avatars/avatar-2.jpg'


import type { Referral } from '@/entities/ReferralCard.vue'

const activeTab = ref('tones')

const tabs = [
  { id: 'tones', label: 'tabs.level1' },
  { id: 'referrals', label: 'tabs.level2' },
  { id: 'tokens', label: 'tabs.level3' },
]

const referralsTones: Referral[] = [
  { id: 1, name: 'Tone Master', avatar: avatar1, balance: '0.005' }
]

const referralsReferrals: Referral[] = [
  { id: 3, name: 'Alex Planet', avatar: avatar1, balance: '0.00012' }
]

const referralsTokens: Referral[] = [
  { id: 5, name: 'Token Mike', avatar: avatar2, balance: '10.5' }
]

const currentReferrals = computed(() => {
  if (activeTab.value === 'tones') return referralsTones
  if (activeTab.value === 'referrals') return referralsReferrals
  if (activeTab.value === 'tokens') return referralsTokens
  return []
})


</script>

<template>
  <div class="friends-page page">
    <h2 class="friends-title title-1">Друзья</h2>

    <InviteFriendBanner />
    <ReferralInfoBanner />



    <h2 class="title-1">Ваши рефералы</h2>

    <div class="tabs-switcher">
      <button v-for="tab in tabs" :key="tab.id" :class="['tab', { 'is-active': activeTab === tab.id }]"
        @click="activeTab = tab.id">
        {{ t(tab.label) }}
      </button>
    </div>

    <ReferralCard v-for="referral in currentReferrals" :key="referral.id" :referral="referral" />
  </div>
</template>

<style scoped lang="scss">
.title-1 {
  margin-bottom: 10px;
}

.friends-title {
  text-align: center;
}

.friends-text {
  text-align: center;
  font-size: 16px;
}

.tabs-switcher {
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid #32315f;
  border-radius: 15px;
  position: relative;
  backdrop-filter: blur(4px);
  background-color: rgba(50, 49, 95, 0.1);
  margin-bottom: 15px;
}

.tab {
  flex: 1;
  text-align: center;
  max-width: 100%;
  width: 100%;
  padding: 12px 0;
  font-weight: 500;
  font-size: 13px;
  color: var(--font);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.tab.is-active {
  color: var(--accent);
}

.tab.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: var(--accent);
  border-radius: 6px;
}
</style>