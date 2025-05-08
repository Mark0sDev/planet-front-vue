<script setup lang="ts">
import TasksBanner from '@/features/TasksBanner.vue'
import { dailyTasks, otherTasks } from '@/shared/mock/tasks.ts'
import TaskCard from '@/entities/TaskCard/TaskCard.vue'
import DailyAction from '@/features/DailyAction.vue'
</script>

<template>
  <div class="tasks-page page">
    <TasksBanner />
    <DailyAction title="Транзакция" buttonText="Пополнить" variant="yellow">
      <template #reward> Награда <span>100 $NEON</span> </template>
    </DailyAction>

    <DailyAction title="Награда" buttonText="Получить" variant="blue">
      <template #reward> Осталось 00:00:00 </template>
    </DailyAction>
    <h2 class="title-1">Ежедневные задания</h2>
    <TaskCard v-for="task in dailyTasks" :key="task.id" :task="task" />
    <h2 class="title-1">Список заданий</h2>
    <TaskCard v-for="task in otherTasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped>
.tasks-page .title-1 {
  margin-bottom: 10px;
}
</style>
