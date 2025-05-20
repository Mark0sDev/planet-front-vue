<script setup lang="ts">
import {
  initData,
  user_id,
} from '@/utils/telegramUser';

import avatar1 from '@/shared/assets/avatars/avatar-1.jpg'
import avatar2 from '@/shared/assets/avatars/avatar-2.jpg'
import avatar3 from '@/shared/assets/avatars/avatar-3.jpg'
import avatar4 from '@/shared/assets/avatars/avatar-4.jpg'

import { ref, computed, onMounted, watch } from 'vue'
import type { ReferralFromApi } from '@/types/api.types';
import { useI18n } from 'vue-i18n'
import InviteFriendBanner from '@/features/InviteFriendBanner.vue'
import ReferralInfoBanner from '@/features/ReferralInfoBanner.vue'
import ReferralCard from '@/entities/ReferralCard.vue'
import PageLoader from './PageLoader.vue'
import api from '@/utils/api';

import type { Referral } from '@/entities/ReferralCard.vue'

const { t } = useI18n()

const activeTab = ref('level1')
const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)

const tabs = [
  { id: 'level1', label: 'tabs.level1' },
  { id: 'level2', label: 'tabs.level2' },
  { id: 'level3', label: 'tabs.level3' },
]

const referrals = ref<{ [key: string]: Referral[] }>({
  level1: [],
  level2: [],
  level3: [],
})

const loadedLevels = ref<{ [key: string]: boolean }>({
  level1: false,
  level2: false,
  level3: false,
})

const avatars = [avatar1, avatar2, avatar3, avatar4]

const getUserReferral = async (level: 'level1' | 'level2' | 'level3') => {
  if (loadedLevels.value[level]) return

  await loaderRef.value?.withLoader(async () => {
    const { data } = await api.post('/users/getRefferal', {
      user_id,
      initData,
      level: parseInt(level.replace('level', '')),
    })

    referrals.value[level] = (data as ReferralFromApi[]).map((item) => ({
      id: item.user_id,
      name: item.login || 'No Name',
      avatar: item.avatar_url_telegram || avatars[Math.floor(Math.random() * avatars.length)],
      balance: String(item.deposit_ton || '0'),
    }))

    loadedLevels.value[level] = true
  })
}

const currentReferrals = computed(() => referrals.value[activeTab.value] || [])

watch(activeTab, (tab) => {
  getUserReferral(tab as 'level1' | 'level2' | 'level3')
})

onMounted(() => {
  getUserReferral('level1')
})



</script>

<template>
  <PageLoader ref="loaderRef" />

  <div class="friends-page page">
    <h2 class="friends-title title-1">{{ t('friends_text') }}</h2>

    <InviteFriendBanner />
    <ReferralInfoBanner />

    <h2 class="friends-title title-1 top-1">Реферальная статистика</h2>

    <div class="top-users">

      <div class="top-user-card first-place">

        <div class="user-avatar-wrapper">
          <img :src="avatar1" alt="Avatar" class="user-avatar" />
        </div>
        <div class="user-info">
          <div class="user-name">Alice</div>
          <div class="user-score">1200</div>
        </div>
      </div>


      <div class="top-user-card second-place">
        <div class="user-avatar-wrapper">
          <img :src="avatar2" alt="Avatar" class="user-avatar" />
        </div>
        <div class="user-info">
          <div class="user-name">Bob</div>
          <div class="user-score">950</div>
        </div>
      </div>


      <div class="top-user-card third-place">
        <div class="user-avatar-wrapper">
          <img :src="avatar3" alt="Avatar" class="user-avatar" />
        </div>
        <div class="user-info">
          <div class="user-name">Charlie</div>
          <div class="user-score">900</div>
        </div>
      </div>
    </div>

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


.top-user-card {
  width: 100%;
  height: 87px;

  border-radius: 16px;
  padding: 8px;
  padding-top: 0;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  color: #ffffff;
  border: 1px solid #32315f;

  &.first-place {
    height: 99px;
  }
}

.top-users {
  display: flex;
  align-items: end;
  padding-top: 40px;
  gap: 10px;
  margin-bottom: 12px;
}


/* Аватар */
.user-avatar-wrapper {
  margin-top: -35px;
  position: relative;

  .medal {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -11px;
  }
}

.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

/* Имя */
.user-name {
  font-size: 12px;
  font-weight: 400;
}

/* Счёт */
.user-score {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

/* Корона для первого места */
.crown {
  position: absolute;
  top: -72px;
  width: 49px;
  height: 42px;
}

/* Специальные стили для мест */
.first-place {
  order: 2;
  background-image: url('@/shared/assets/bg/top-user-1.png');

  .user-avatar {
    border: 3px solid #ebc945;
  }
}

.second-place {
  order: 1;
  background-image: url('@/shared/assets/bg/top-user-2.png');

  .user-avatar {
    border: 3px solid #748189;
  }
}

.third-place {
  order: 3;
  background-image: url('@/shared/assets/bg/top-user-3.png');

  .user-avatar {
    border: 3px solid #af7a63;
  }
}
</style>