<script setup lang="ts">
import { computed } from 'vue'
import { type TaskCardProps, TaskStatus } from '@/entities/TaskCard/types.ts'
import UiButton from '@/shared/ui/UiButton.vue'

const { task } = defineProps<TaskCardProps>()

const buttonText = computed(() => {
  const map = {
    [TaskStatus.START]: 'Start',
    [TaskStatus.CLAIM]: 'Claim',
    [TaskStatus.DONE]: 'Done',
  }
  return map[task.status] || ''
})

const cardClass = computed(() => {
  return {
    'start-card': task.status === TaskStatus.START,
    'claim-card': task.status === TaskStatus.CLAIM,
    'done-card': task.status === TaskStatus.DONE,
  }
})
</script>

<template>
  <div class="task-card" :class="cardClass">
    <div class="task-info">
      <img :src="task.avatar" alt="Task Avatar" class="task-avatar" />

      <div class="task-texts">
        <div class="task-title">{{ task.title }}</div>

        <div class="task-reward">
          <template v-if="task.timer">
            {{ task.timer }}
          </template>
          <template v-else> {{ task.reward }} TON </template>
        </div>
      </div>
    </div>

    <UiButton
      class="task-action"
      :color="task.status === 'claim' ? 'accent' : 'white'"
      :disabled="task.status === 'done'"
      size="sm"
    >
      {{ buttonText }}
    </UiButton>
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
  padding: 5px 10px;
  line-height: 1;
}

.start-card {
  background-image: url('@/shared/assets/bg/user-card-bg.png');
}
.done-card {
  background-image: url('@/shared/assets/bg/referal-bg.png');
}
.claim-card {
  background-image: url('@/shared/assets/bg/level-card-bg.png');
}

.task-action:disabled {
  pointer-events: none;
}
</style>
