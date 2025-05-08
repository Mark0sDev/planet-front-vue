<script setup lang="ts">
import { computed } from 'vue'

export interface TopUser {
  id: number
  name: string
  avatar: string
  score: string
  place: number
}

interface TopUserCardProps {
  user: TopUser
}

const { user } = defineProps<TopUserCardProps>()

const placeClass = computed(() => {
  switch (user.place) {
    case 1:
      return 'first-place'
    case 2:
      return 'second-place'
    case 3:
      return 'third-place'
    default:
      return ''
  }
})
</script>

<template>
  <div class="top-user-card" :class="placeClass">
    <img v-if="user.place === 1" src="@/shared/assets/icons/crown.png" alt="Crown" class="crown" />

    <div class="user-avatar-wrapper">
      <img :src="user.avatar" alt="Avatar" class="user-avatar" />
      <img
        v-if="user.place === 1"
        src="@/shared/assets/icons/medal-1.png"
        alt="medal"
        class="medal"
      />
      <img
        v-else-if="user.place === 2"
        src="@/shared/assets/icons/medal-2.png"
        alt="medal"
        class="medal"
      />
      <img
        v-else-if="user.place === 3"
        src="@/shared/assets/icons/medal-3.png"
        alt="medal"
        class="medal"
      />
    </div>

    <div class="user-info">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-score">
        {{ user.score }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

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
  @include mixins.bg-cover;

  &.first-place {
    height: 99px;
  }
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
