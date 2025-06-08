<script setup lang="ts">
import {
  startParam,
  photo_url,
  initData,
  user_id,
  username,
  language_code
} from '@/utils/telegramUser'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import api from '@/utils/api'
import MainDashboard from '@/widgets/MainDashboard.vue'

import StatisticsCard from '@/entities/StatisticsCard.vue'
import UsersIcon from '@/shared/assets/icons/users.svg'
import LightningIcon from '@/shared/assets/icons/lightning.svg'
import PlanetIcon from '@/shared/assets/icons/planet.svg'
import TonIcon from '@/shared/assets/icons/ton.svg'

import PageLoader from './PageLoader.vue'

import { onMounted, ref } from 'vue'

import TransactionCard, { type Transaction } from '@/entities/TransactionCard.vue'
import { type LastWithdrawalItem } from '@/types/api.types'

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)

const usersCount = ref('0')
const withdrawalCount = ref('0')
const withdrawalSum = ref('0')
const buyPlanetCount = ref('0')
const transactions = ref<Transaction[]>([])
const showStories = ref(false)

const currentStoryIndex = ref(0)
const totalStories = ref(0)
const isVisible = ref(true)
const storyRefs = ref<HTMLElement[]>([])

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const userResponse = await api.post('/users/getUser', {
      initData,
      user_id,
      username,
      language_code,
      photo_url,
      startParam
    })


    showStories.value = userResponse.data.check_story === 0

    const { data } = await api.post('/users/getStatistic', {
      initData,
      user_id
    })

    usersCount.value = data.usersCount
    withdrawalCount.value = data.withdrawalCount
    withdrawalSum.value = data.withdrawalSum || 0
    buyPlanetCount.value = data.buyPlanetCount || 0

    transactions.value = data.lastsWithdrawal.map((item: LastWithdrawalItem) => ({
      id: item.id,
      title: item.login || item.user_id,
      amount: item.sum,
      date: new Date().toISOString().slice(0, 10),
      type: 'income'
    }))
  })
}

const updateProgress = () => {
  const bars = document.querySelectorAll('.progress-bar .bar-inner')
  bars.forEach((bar, i) => {
    bar.classList.remove('active')
    if (i === currentStoryIndex.value) {
      bar.classList.add('active')
    }
  })
}

const showStory = (index: number) => {
  if (index < 0 || index >= storyRefs.value.length) return

  storyRefs.value.forEach((el, i) => {
    el.classList.remove('active', 'left', 'right')
    if (i < index) el.classList.add('left')
    else if (i > index) el.classList.add('right')
  })

  storyRefs.value[index].classList.add('active')
  currentStoryIndex.value = index
  updateProgress()
}

const nextStory = () => {
  if (currentStoryIndex.value + 1 < totalStories.value) {
    showStory(currentStoryIndex.value + 1)
  } else {
    closeStories()
  }
}

const prevStory = () => {
  if (currentStoryIndex.value - 1 >= 0) {
    showStory(currentStoryIndex.value - 1)
  }
}

const closeStories = () => {
  api.post('/users/checkStory', {
    initData,
    user_id
  })
  isVisible.value = false
}

onMounted(() => {
  getUser()
  storyRefs.value = Array.from(document.querySelectorAll('.story')) as HTMLElement[]
  totalStories.value = storyRefs.value.length
  if (showStories.value) {
    showStory(0)
  } else {
    isVisible.value = false
  }

})
</script>

<template>
  <PageLoader ref="loaderRef" />
  <div v-if="isVisible && showStories" class="story-container">
    <div class="progress-bar">
      <div v-for="(_, i) in totalStories" :key="i" class="bar">
        <div class="bar-inner" :class="{ active: i === currentStoryIndex }"></div>
      </div>
    </div>

    <div class="story">
      <div class="story-wrapper">
        <h2 class="story-title">{{ t('story.aboutTitle') }}</h2>
        <p class="story-subtitle">{{ t('story.aboutSubtitle') }}</p>

        <div class="story-features">
          <div class="feature-card ton">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-play-icon lucide-play">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.feature1.title') }}</h3>
              <p>{{ t('story.feature1.text') }}</p>
            </div>
          </div>

          <div class="feature-card planet">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.feature2.title') }}</h3>
              <p>{{ t('story.feature2.text') }}</p>
            </div>
          </div>

          <div class="feature-card passive">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down">
                <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
                <path d="m16 19 3 3 3-3" />
                <path d="M18 12h.01" />
                <path d="M19 16v6" />
                <path d="M6 12h.01" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.feature3.title') }}</h3>
              <p>{{ t('story.feature3.text') }}</p>
            </div>
          </div>

          <div class="feature-card passive">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-clipboard-list-icon lucide-clipboard-list">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.feature4.title') }}</h3>
              <p>{{ t('story.feature4.text') }}</p>
            </div>
          </div>
        </div>

        <div class="story-footer">
          <p>{{ t('story.footer1') }}</p>
        </div>
      </div>
    </div>

    <div class="story">
      <div class="story-wrapper">
        <h2 class="story-title">{{ t('story.refTitle') }}</h2>
        <p class="story-subtitle">{{ t('story.refSubtitle') }}</p>

        <div class="story-features">
          <div class="feature-card ton">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-users-icon lucide-users">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.refFeature1.title') }}</h3>
              <p>{{ t('story.refFeature1.text') }}</p>
            </div>
          </div>

          <div class="feature-card planet">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-receipt-icon lucide-receipt">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 17.5v-11" />
              </svg>
            </div>
            <div class="story_text">
              <h3>{{ t('story.refFeature2.title') }}</h3>
              <p>{{ t('story.refFeature2.text') }}</p>
            </div>
          </div>
        </div>

        <div class="story-footer">
          <p>{{ t('story.footer2') }}</p>
        </div>
      </div>
    </div>

    <div class="story">
      <div class="story-wrapper">
        <h2 class="story-title">{{ t('story.ctaTitle') }}</h2>
        <p class="story-subtitle">{{ t('story.ctaSubtitle') }}</p>
        <div>
          <a href="/planets" style="width: 100%;" class="story-btn">
            {{ t('story.ctaBuy') }}
          </a>
          <a href="/balance" style="margin-top: 10px; width: 100%;" class="story-btn next">
            {{ t('story.ctaTopUp') }}
          </a>
        </div>
      </div>
    </div>

    <div class="story-buttons">
      <button v-if="currentStoryIndex > 0" class="story-btn" @click="prevStory">
        PREV
      </button>
      <button class="story-btn next" @click="nextStory">NEXT</button>
    </div>


  </div>

  <div class="home-page page">
    <img class="bg-decor ufo" src="@/shared/assets/bg/ufo.webp" alt="" />
    <img class="bg-decor meteor" src="@/shared/assets/bg/metheor.webp" alt="" />
    <div class="page-wrapper">
      <MainDashboard />
      <div class="statistics">
        <div class="title title-1">{{ t('statistics.title') }}</div>
        <div class="statistics-inner">
          <StatisticsCard :value="usersCount" color="#763FF1" :text="t('statistics.users')">
            <UsersIcon />
          </StatisticsCard>
          <StatisticsCard :value="withdrawalCount" color="#17d686" :text="t('statistics.totalWithdrawals')">
            <LightningIcon />
          </StatisticsCard>
          <StatisticsCard :value="buyPlanetCount" color="#FBA704" :text="t('statistics.totalPlanetsBought')">
            <PlanetIcon />
          </StatisticsCard>
          <StatisticsCard :value="withdrawalSum" color="#27aff9" :text="t('statistics.totalTonWithdrawn')">
            <TonIcon stroke-width="0" />
          </StatisticsCard>
        </div>
      </div>
      <div class="last-withdrawals">
        <h2 class="title title-1">{{ t('statistics.latestWithdrawals') }}</h2>
        <div class="last-withdrawals-list">
          <TransactionCard v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.story-title {
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  color: white;
}

.story-subtitle {
  text-align: center;

  font-size: 15px;
  margin-bottom: 16px;
}

.story-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid #27aff9;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}


.story_text {
  text-align: left;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #27aff9, #147aa3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle img {
  width: 26px;
  height: 26px;
  filter: drop-shadow(0 0 2px #000);
}

.feature-card h3 {
  margin: 0;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
}

.feature-card p {
  margin: 2px 0 0;
  font-size: 13px;
  color: #b5b5b5;
}

.story-footer {
  text-align: center;
  font-size: 14px;
  color: white;
  margin-top: 12px;
}

.story-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(13, 17, 23, 0.95);
  color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-bar {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  gap: 4px;
  z-index: 10;
}

.bar {
  flex: 1;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  border-radius: 2px;
}

.bar-inner {
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.bar-inner.active {
  background-color: white;
}

.story {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 35px 20px;
  text-align: center;
  font-size: 24px;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.6s ease;

}

.story.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 1;
}

.story.left {
  opacity: 0;
  transform: translateX(-100%);
}

.story.right {
  opacity: 0;
  transform: translateX(100%);
}

.story-buttons {
  position: absolute;
  bottom: 30px;
  width: 90%;
  display: flex;
  gap: 10px;
  justify-content: center;
  z-index: 10;
}

.story-btn {
  flex: 1;
  padding: 15px;
  background: #27aff9;

  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background 0.2s ease;

}

.story-btn.next {
  background-color: white;
  color: black
}



.home-page {
  z-index: 0;
  position: relative;
}

.page-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
}

.bg-decor {
  position: absolute;

  &.ufo {
    top: -50px;
    left: -30%;
    animation: lift 1.2s ease-in-out infinite alternate;
  }

  &.meteor {
    top: 30%;
    left: -50px;
    animation: lift 1.6s ease-in-out infinite alternate;
  }
}

.statistics {
  margin-top: 20px;
  margin-bottom: 15px;
}

.title {
  margin-bottom: 10px;
}

.statistics-inner {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}

.last-withdrawals {
  margin-top: 20px;
}
</style>
