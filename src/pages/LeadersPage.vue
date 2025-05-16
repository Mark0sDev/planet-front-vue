<script setup lang="ts">
import { ref } from 'vue'
import { myUser, top3Users, topUsers } from '@/shared/mock/leaders.ts'

import UserCard from '@/entities/UserCard.vue'
import TabsSwitcher, { type TabItem } from '@/features/TabsSwitcher.vue'
import TopUserCard from '@/entities/TopUserCard.vue'

const activeTab = ref<TabItem['id']>('tones')

const tabs = [
  { id: 'tones', label: 'Тоны' },
  { id: 'referrals', label: 'Рефералы' },
  { id: 'tokens', label: 'Токены' },
]
</script>

<template>
  <div class="leaders-page page">
    <h2 class="leaders-title text-center title-1">Мой рейтинг</h2>
    <UserCard :user="myUser" :is-me="true" />
    <TabsSwitcher :tabs="tabs" v-model="activeTab" />
    <div class="top-users">
      <TopUserCard v-for="user in top3Users" :key="user.id" :user="user" />
    </div>
    <h2 class="leaders-title title-1">Топ пользователей</h2>
    <UserCard v-for="user in topUsers" :key="user.id" :user="user" />
  </div>
</template>

<style scoped>
.leaders-title {
  margin-bottom: 12px;
}

.top-users {
  display: flex;
  align-items: end;
  padding-top: 70px;
  gap: 10px;
  margin-bottom: 12px;
}

.text-center {
  text-align: center;
}
</style>
