<script setup lang="ts">
import api from '@/utils/api'
import { ref, onMounted } from 'vue'
import { initData, user_id } from '@/utils/telegramUser'
import PageLoader from './PageLoader.vue'
import UiButton from '@/shared/ui/UiButton.vue'
import { type Task, TaskStatus } from '@/entities/TaskCard/types.ts'
import inviteFriendsAvatar from '@/shared/assets/avatars/avatar-1.jpg'
import TasksStory from '@/shared/assets/avatars/avatar-3.jpg'
import TaskCard from '@/entities/TaskCard/TaskCard.vue'
import { useI18n } from 'vue-i18n'
import { createCountdown } from '@/utils/useCountdown'

const { t } = useI18n()

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)
declare function show_8998929(): Promise<void>

const adsTimer = ref('')
const storyBlockTimer = ref('')

interface TaskFromApi {
  id: number
  user_id: number
  tasks_id: number
}

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const response = await api.post('/users/getUser', {
      initData,
      user_id
    })

    const data = response.data
    const now = data.date
    const adsRawTime = data.check_ads_1
    const storyRawTime = data.check_story_tasks

    if (adsRawTime && adsRawTime > now) {
      createCountdown(now, adsRawTime, (formatted) => {
        adsTimer.value = formatted
      })
    }

    if (storyRawTime && storyRawTime > now) {
      createCountdown(now, storyRawTime, (formatted) => {
        storyBlockTimer.value = formatted
      })
    }
  })
}

const adsSuccess = () =>
  api.post('/users/adsSuccess', { initData, user_id })

async function adsClaim() {
  await show_8998929()
  const ads = await adsSuccess()
  const rawTime = ads.data.time
  const newTime = ads.data.new_date

  createCountdown(rawTime, newTime, (formatted) => {
    adsTimer.value = formatted
  })
}

const dailyTasks = ref<Task[]>([
  {
    id: 2,
    title: 'Пригласить 5 друзей',
    avatar: TasksStory,
    status: TaskStatus.CLAIM,
    timer: 'Награда: 0.001 TON',
    checkButton: true,
    disabledCheck: false
  }
])

const getTasks = async () => {
  await loaderRef.value?.withLoader(async () => {
    const { data } = await api.post('/users/getTasks', {
      initData,
      user_id,
    })

    const completedTaskIds = (data.tasks as TaskFromApi[]).map(task => task.tasks_id)

    dailyTasks.value = dailyTasks.value.filter(
      (task) => !completedTaskIds.includes(task.id)
    )
  })
}

onMounted(() => {
  getUser()
  getTasks()
})
</script>

<template>
  <PageLoader ref="loaderRef" />

  <div class="tasks-page page">
    <div class="tasks-banner">
      <div class="tasks-banner-inner">
        <h2 class="banner-title title-1">{{ t('nav.tasks') }}</h2>
        <p v-html="t('tasks.banner_text')"></p>
      </div>
    </div>

    <h2 class="title-1">{{ t('tasks.every_day_tasks_title') }}</h2>

    <div class="daily-action-card balance-action-card">
      <div class="card-head">
        <div class="card-icon">
          <img src="/icons/ton.svg" alt="" />
        </div>
        <div class="card-head-inner">
          <div class="card-title">{{ t('tasks.tasks_ads') }}</div>
          <div class="task-title" v-html="t('tasks.tasks_ads_desc')"></div>
        </div>
      </div>
      <UiButton class="card-button yellow" @click="adsClaim" :disabled="!!adsTimer" size="sm">
        <template v-if="adsTimer">{{ adsTimer }}</template>
        <template v-else>{{ t('tasks.ads_button') }}</template>
      </UiButton>
    </div>

    <h2 class="title-1">{{ t('tasks.osnova_tasks') }}</h2>

    <TaskCard :task="{
      id: 1,
      title: 'Опубликовать историю Telegram',
      avatar: inviteFriendsAvatar,
      status: TaskStatus.CLAIM,
      checkButton: true,
      link: 'story',
      timer: 'Награда: 0.001 TON',
      disabledCheck: true
    }" :blockTimer="storyBlockTimer" />

    <TaskCard v-for="task in dailyTasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped>
.tasks-page .title-1 {
  margin-bottom: 10px;
}

.balance-action-card {
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  padding-bottom: 2px;
  color: #ffffff;
  border: 1px solid #32315f;
  background-image: url('@/shared/assets/bg/benefit-2-bg.png');
}

.daily-action-card {
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  margin-bottom: 12px;
  transition: background 0.3s;
  border: 1px solid #32315f;
}

.tasks-banner {
  flex: none;
  width: 100%;
  background-image: url('@/shared/assets/bg/tasks-banner-bg.jpg');
  border: 1px solid #32315f;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 18px;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 31px 22px;
}

.tasks-banner p {
  font-size: 12px;
  font-weight: 300;
}

.tasks-banner-inner {
  max-width: 214px;
}

.banner-title {
  margin-bottom: 6px;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.card-icon {
  flex: none;
  width: 31px;
  height: 31px;
}

.card-title {
  font-size: 15px;
  font-weight: 500;
}

.task-title {
  font-size: 13px;
  margin-bottom: 8px;
  margin-top: 5px;
  font-weight: 500;
}

.card-button {
  margin-bottom: 10px;
}
</style>
