<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NAVIGATION } from '@/app/router/navigation.ts'
import { AppRoutes } from '@/app/router/router.ts'
import api from '@/utils/api'
import { initData, user_id } from '@/utils/telegramUser'

const { t } = useI18n()
const route = useRoute()

const allTaskIds = ref<number[]>([2, 3, 4, 5, 6, 7, 8, 9, 10])
const tasksCount = ref(0)

interface TaskFromApi {
  id: number
  user_id: number
  tasks_id: number
}

const getTasks = async () => {
  const { data } = await api.post('/users/getTasks', {
    initData,
    user_id,
  })

  const completedTaskIds = (data.tasks as TaskFromApi[]).map(task => task.tasks_id)
  const remainingTasks = allTaskIds.value.filter(id => !completedTaskIds.includes(id))

  tasksCount.value = remainingTasks.length
}

function isActive(path: string) {
  return route.path === path
}

function isEarnButton(path: string) {
  return path === AppRoutes.PLANETS || path === AppRoutes.MINIGAME
}

function isPlanets(path: string) {
  return path === AppRoutes.PLANETS
}

function isMiniGame(path: string) {
  return path === AppRoutes.MINIGAME
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in NAVIGATION"
      :key="item.path"
      :to="item.path"
      :class="{
        active: isActive(item.path),
        'earn-button': isEarnButton(item.path),
        'planets-button': isPlanets(item.path),
        'minigame-button': isMiniGame(item.path)
      }"
      class="nav-item"
    >
      <div v-if="isEarnButton(item.path)" class="earn-content">
        <div class="earn-circle">
          <component :is="item.icon" class="earn-icon" />
          <span
            v-if="item.path === AppRoutes.MINIGAME"
            class="new-badge"
          >
            NEW
          </span>
        </div>
        <span class="earn-text">{{ t(item.label) }}</span>
      </div>

      <template v-else>
        <div class="nav-icon-wrapper">
          <component :is="item.icon" class="nav-icon" />
          <span
            v-if="item.path === AppRoutes.TASKS && tasksCount > 0"
            class="task-badge"
          >
            {{ tasksCount }}
          </span>
        </div>
        <span>{{ t(item.label) }}</span>
      </template>
    </router-link>
  </nav>
</template>

<style lang="scss">
.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  background: rgba(30, 34, 55, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 -4px 15px rgba(255, 255, 255, 0.05);
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  padding: 0 10px;
  padding-bottom: 6px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--font);
  text-decoration: none;
  font-size: 12px;
  height: 100%;
  padding-top: 5px;
  padding-bottom: 12px;
  width: 64px;
  position: relative;
  transition: all 0.2s;

  svg path {
    transition: all 0.2s;
  }

  span {
    margin-top: 6px;
  }

  &.active {
    color: var(--accent);

    svg path {
      fill: #6ceaf1;
    }
  }

  &.earn-button {
    width: 80px;

    .earn-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -10px;
    }

    .earn-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .earn-icon {
        width: 24px;
        height: 24px;

        path {
          fill: #ffffff !important;
        }
      }
    }

    .earn-text {
      color: var(--font);
      font-weight: normal;
      margin-top: 4px;
      font-size: 12px;
    }

    &.active .earn-text {
      color: var(--accent);
    }
  }

  &.planets-button .earn-circle {
    background: linear-gradient(135deg, #6ceaf1 0%, #4facfe 100%);
  }

  &.planets-button.active .earn-circle {
    background: linear-gradient(135deg, #5dd9e0 0%, #3d9bfd 100%);
  }

  &.minigame-button .earn-circle {
    background: linear-gradient(135deg, #c86ef1 0%, #814dfd 100%);
  }

  &.minigame-button.active .earn-circle {
    background: linear-gradient(135deg, #a74de0 0%, #6b3dfd 100%);
  }
}

.nav-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: #ff5f5f;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 999px;
  line-height: 1;
  min-width: 18px;
  text-align: center;
}

.new-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ff47e0;
  color: #fff;
  font-size: 9px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 6px;
  text-transform: uppercase;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>
