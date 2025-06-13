<script setup lang="ts">
import { ref } from 'vue'
import { type TaskCardProps } from '@/entities/TaskCard/types.ts'
import UiButton from '@/shared/ui/UiButton.vue'
import { initData, tg, user_id, language_code } from '@/utils/telegramUser'
import api from '@/utils/api'

const props = defineProps<TaskCardProps & { blockTimer?: string }>()
const emit = defineEmits<{
  (e: 'taskChecked', id: number): void
}>()

const checkEnabled = ref(props.task.disabledCheck === false)
const visible = ref(true)

const handleGoClick = () => {
  if (props.task.link) {
    setTimeout(() => {
      checkEnabled.value = true
    }, 3000)

    if (props.task.link === 'story') {
      let msg = 'https://t.me/CivilizationTon_bot/app?startapp=' + user_id
      const mediaUrl = 'https://www.planetton.app/story.png'

      if (language_code === 'ru' || language_code === 'ua') {
        msg += ' 🪐 6% в сутки, получай TON уже сейчас! 💎 #CivilizationTon_bot'
      } else {
        msg += ' 🪐 6% daily, start earning TON now! 💎 #CivilizationTon_bot'
      }

      tg.shareToStory(mediaUrl, {
        text: msg,
        widget_link: {
          url: 'https://t.me/CivilizationTon_bot/app?startapp=' + user_id,
          name: '💎 GO EARN'
        }
      })
      return
    }

    window.open(props.task.link, '_blank')
  }
}

const localBlockTimer = ref(props.blockTimer)

const handleCheckClick = async () => {
  try {
    const response = await api.post('/users/checkTasks', {
      initData,
      user_id,
      id: props.task.id,
    })

    const data = response.data
    if (data.status == 1) {
      if (props.task.id != 1) {
        localBlockTimer.value = 'test';
      }
      if (props.task.id != 1) {
        visible.value = false
        setTimeout(() => {
          emit('taskChecked', props.task.id)
        }, 300)
      }
    }

  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
  }
}

</script>

<template>
  <transition name="fade-slide">
    <div v-if="visible" class="task-card claim-card">
      <div class="task-info">
        <img :src="task.avatar" alt="Task Avatar" class="task-avatar" />
        <div class="task-texts">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-reward" v-if="task.timer">{{ task.timer }}</div>
        </div>
      </div>

      <div v-if="blockTimer" class="block-timer">
        {{ blockTimer }}
      </div>

      <div v-else-if="task.checkButton" style="display: flex; flex-direction: column; width: 33%;">
        <UiButton v-if="task.link" color="yellow" class="task-action" size="sm" @click="handleGoClick">
          Перейти
        </UiButton>

        <UiButton class="task-action" size="sm" :disabled="!checkEnabled" @click="handleCheckClick">
          Проверить
        </UiButton>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mixins.bg-cover;
  padding: 9px 10px;
  border-radius: 16px;
  margin-bottom: 12px;
  color: #ffffff;
  border: 1px solid #32315f;
  transition: all 0.3s ease;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 12px;
}

.task-texts {
  display: flex;
  flex-direction: column;
}

.task-title {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
}

.task-reward {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
}

.task-action {
  width: auto;
  color: black;
  padding: 5px 10px;
  line-height: 1;
}

.task-action+.task-action {
  margin-top: 10px;
}

.claim-card {
  background-image: url('@/shared/assets/bg/level-card-bg.png');
}

.task-action:disabled {
  pointer-events: none;
  opacity: 0.6;
}

.block-timer {
  width: 33%;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
