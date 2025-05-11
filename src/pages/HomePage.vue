<script setup lang="ts">
import MainDashboard from '@/widgets/MainDashboard.vue'
import MainStatistics from '@/widgets/MainStatistics.vue'
import LastWithdrawals from '@/widgets/LastWithdrawals.vue'
import UiButton from '@/shared/ui/UiButton.vue'

import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

const router = useRouter()

const leaderRouter = () => {
  router.push(AppRoutes.LEADERS)
}

</script>

<template>
  <div class="home-page page">
    <img class="bg-decor ufo" src="@/shared/assets/bg/ufo.webp" alt="" />
    <img class="bg-decor meteor" src="@/shared/assets/bg/metheor.webp" alt="" />

    <div class="page-wrapper">
      <MainDashboard />
      <MainStatistics />
      <div data-v-971a35de="" class="top-users">

        <div data-v-0ca09cec="" data-v-971a35de="" class="top-user-card first-place">
          <img data-v-0ca09cec="" src="/src/shared/assets/icons/crown.png" alt="Crown" class="crown">
          <div data-v-0ca09cec="" class="user-avatar-wrapper"><img data-v-0ca09cec=""
              src="/src/shared/assets/avatars/avatar-1.jpg" alt="Avatar" class="user-avatar">
          </div>


          <div class="content">
            <div class="title">
              Займи место в TOP-100<br /><span>и получай призы</span>
            </div>
            <UiButton style="margin-bottom: 5px; width: 100%;" @click="leaderRouter" color="yellow">
              Test
            </UiButton>
          </div>


        </div>
      </div>
      <LastWithdrawals />


    </div>
  </div>
</template>

<style scoped lang="scss">
.top-user-card.first-place[data-v-0ca09cec] {
  height: 100%;
}

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


.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 8px;

  span {
    color: #eda400;
  }
}

.bg-decor {
  position: absolute;

  &.ufo {
    top: -50px;
    left: -30%;
    animation: lift 1.2s ease-in-out infinite alternate;
  }

  &.meteor {
    top: 30%;
    left: -50px;
    animation: lift 1.6s ease-in-out infinite alternate;
  }
}

.content {
  width: 100%;
}

.page-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
}
</style>
