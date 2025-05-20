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

const referralCount1 = ref(0);
const referralIncome1 = ref(0);

const referralCount2 = ref(0);
const referralIncome2 = ref(0);

const referralCount3 = ref(0);
const referralIncome3 = ref(0);

const avatars = [avatar1, avatar2, avatar3, avatar4]

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const response = await api.post('/users/getUser', {
      initData,
      user_id
    });

    const data = response.data;

    referralCount1.value = data.referral_count_level1 || 0;
    referralIncome1.value = data.referral_income_level1 || 0;

    referralCount2.value = data.referral_count_level2 || 0;
    referralIncome2.value = data.referral_income_level2 || 0;

    referralCount3.value = data.referral_count_level3 || 0;
    referralIncome3.value = data.referral_income_level3 || 0;
  });
};

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
  getUser();
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
          <div class="user-name">1 Уровень</div>
          <div class="user-statistic">
            <div class="user-score">{{ referralCount1 }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-users-icon lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>

          <div class="user-statistic">

            <div class="user-score">{{ referralIncome1 }}</div>
            <img src="/icons/ton.svg" style="width: 18px; height: 18px;" />
          </div>
        </div>
      </div>


      <div class="top-user-card second-place">
        <div class="user-avatar-wrapper">
          <img :src="avatar2" alt="Avatar" class="user-avatar" />
        </div>
        <div class="user-info">
          <div class="user-name">2 Уровень</div>
          <div class="user-statistic">

            <div class="user-score">{{ referralCount2 }}</div>

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-users-icon lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>

          <div class="user-statistic">

            <div class="user-score">{{ referralIncome2 }}</div>
            <img src="/icons/ton.svg" style="width: 18px; height: 18px;" />
          </div>
        </div>
      </div>


      <div class="top-user-card third-place">
        <div class="user-avatar-wrapper">
          <img :src="avatar3" alt="Avatar" class="user-avatar" />
        </div>
        <div class="user-info">
          <div class="user-name">3 Уровень</div>
          <div class="user-statistic">

            <div class="user-score">{{ referralCount3 }}</div>

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-users-icon lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>

          <div class="user-statistic">

            <div class="user-score">{{ referralIncome3 }}</div>
            <img src="/icons/ton.svg" style="width: 18px; height: 18px;" />
          </div>
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

.user-statistic {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
}

.top-user-card {
  width: 100%;
  height: 100%;

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
  color: white;
  margin-right: 5px;
}

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

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .user-avatar {
    border: 3px solid #ebc945;
  }
}

.second-place {
  order: 1;
  background-image: url('@/shared/assets/bg/top-user-2.png');

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .user-avatar {
    border: 3px solid #748189;
  }
}

.third-place {
  order: 3;
  background-image: url('@/shared/assets/bg/top-user-3.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .user-avatar {
    border: 3px solid #af7a63;
  }
}
</style>