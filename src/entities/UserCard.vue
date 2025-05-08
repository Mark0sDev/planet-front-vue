<script setup lang="ts">
export interface User {
  id: number
  name: string
  score: string
  place: number
  avatar?: string
}

interface UserCardProps {
  user: User
  isMe?: boolean
}

defineProps<UserCardProps>()
</script>

<template>
  <div class="user-card" :class="{ 'is-me': isMe }">
    <div class="user-info">
      <div class="user-place">{{ user.place }}</div>
      <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="user-avatar" />
      <img v-else src="@/shared/assets/avatars/avatar-1.jpg" class="user-avatar" alt="" />
      <div class="user-info-box">
        <div class="user-name">{{ user.name }}{{ isMe ? ' (you)' : '' }}</div>
        <div class="user-tip">1.35М</div>
      </div>
    </div>

    <div class="user-balance">
      {{ user.score }}
      <img src="/icons/ton.svg" alt="TON" class="balance-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #32315f;

  background-image: url('@/shared/assets/bg/user-card-bg.png');
  @include mixins.bg-cover;

  padding: 12px 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  color: #fff;
  transition: background 0.3s ease;
}

/* Стили для моей карточки */
.user-card.is-me {
  background-image: url('@/shared/assets/bg/user-card-me-bg.png');

  .user-balance {
    color: var(--accent);
  }
}

/* Левая часть */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Место */
.user-place {
  font-weight: 700;
  font-size: 16px;
  width: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Аватар */
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #686e8d;
}

/* Имя */
.user-name {
  font-size: 16px;
  font-weight: 400;
}

.user-tip {
  color: rgba(255, 255, 255, 0.7);
}

/* Правая часть */
.user-balance {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: 700;
  color: var(--font);
}

/* Иконка монеты */
.balance-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
