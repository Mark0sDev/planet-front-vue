<script setup lang="ts">
import StatisticsCard from '@/entities/StatisticsCard.vue'
import UsersIcon from '@/shared/assets/icons/users.svg'
import LightningIcon from '@/shared/assets/icons/lightning.svg'
import PlanetIcon from '@/shared/assets/icons/planet.svg'

import TonIcon from '@/shared/assets/icons/ton.svg'
</script>

<template>
  <div class="statistics">
    <div class="title title-1">Статистика</div>
    <div class="statistics-inner">
      <StatisticsCard value="245 210" color="#763FF1"
        text="Пользователи, которые уже зарабатывают">
        <UsersIcon />
      </StatisticsCard>
      <StatisticsCard value="1583.20" color="#17d686" text="Новых пользователей за 24 часа">
        <LightningIcon />
      </StatisticsCard>
      <StatisticsCard value="326" color="#FBA704" text="Всего куплено планет">
        <PlanetIcon />
      </StatisticsCard>
      <StatisticsCard value="2 903" color="#27aff9" text="Всего выведено TON">
        <TonIcon stroke-width="0" />
      </StatisticsCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics {
  margin-top: 20px;
}

.title {
  margin-bottom: 10px;
}

.statistics-inner {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
