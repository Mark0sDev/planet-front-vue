<script setup lang="ts">
import { ref } from 'vue'
import { type TaskCardProps } from '@/entities/TaskCard/types.ts'
import UiButton from '@/shared/ui/UiButton.vue'

import { tg, user_id, language_code } from '@/utils/telegramUser'

const { task } = defineProps<TaskCardProps>()

const checkEnabled = ref(task.disabledCheck === false)


const handleGoClick = () => {
  if (task.link) {
    if (task.link == 'story') {
      let msg = 'https://t.me/CivilizationTon_bot/app?startapp=' + user_id;

      const mediaUrl = 'https://www.planetton.app/img/story.png';

      if (language_code === 'ru' || language_code === 'ua') {
        msg += ' 🪐 6% в сутки, получай TON уже сейчас! 💎 #CivilizationTon_bot';
      } else {
        msg += ' 🪐 6% daily, start earning TON now! 💎 #CivilizationTon_bot';
      }


      tg.shareToStory(mediaUrl, {
        text: msg,
        widget_link: {
          url: 'https://t.me/CivilizationTon_bot/app?startapp=' + user_id,
          name: '💎 GO EARN'
        }
      });
      return;
    }
    window.open(task.link, '_blank')
  }

  checkEnabled.value = true
}

const handleCheckClick = () => {
  console.log('Проверка задачи ID:', task.id)
}

</script>

<template>
  <div class="task-card claim-card">
    <div class="task-info">
      <img :src="task.avatar" alt="Task Avatar" class="task-avatar" />
      <div class="task-texts">
        <div class="task-title">{{ task.title }}</div>
        <div class="task-reward" v-if="task.timer">
          {{ task.timer }}
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; width: 33%;">
      <UiButton v-if="task.link" color="yellow" class="task-action" size="sm" @click="handleGoClick">
        Перейти
      </UiButton>

      <UiButton class="task-action" size="sm" :disabled="!checkEnabled" @click="handleCheckClick">
        Проверить
      </UiButton>
    </div>
  </div>
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
</style>
