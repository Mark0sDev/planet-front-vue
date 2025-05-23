<script setup lang="ts">
import {
  startParam,
  photo_url,
  initData,
  user_id,
  username,
  language_code
} from '@/utils/telegramUser'

import api from '@/utils/api';
import MainDashboard from '@/widgets/MainDashboard.vue'

import StatisticsCard from '@/entities/StatisticsCard.vue'
import UsersIcon from '@/shared/assets/icons/users.svg'
import LightningIcon from '@/shared/assets/icons/lightning.svg'
import PlanetIcon from '@/shared/assets/icons/planet.svg'
import TonIcon from '@/shared/assets/icons/ton.svg'

import UiButton from '@/shared/ui/UiButton.vue'
import PageLoader from './PageLoader.vue';

import { useRouter } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'
import { onMounted, ref } from 'vue';

import TransactionCard, { type Transaction } from '@/entities/TransactionCard.vue'
import { type LastWithdrawalItem } from '@/types/api.types'

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null);

const router = useRouter()

const leaderRouter = () => {
  router.push(AppRoutes.LEADERS)
}

const usersCount = ref('0');
const withdrawalCount = ref('0');
const withdrawalSum = ref('0');
const transactions = ref<Transaction[]>([])

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    await api.post('/users/getUser', {
      initData,
      user_id,
      username,
      language_code,
      photo_url,
      startParam
    });

    const { data } = await api.post('/users/getStatistic', {
      initData,
      user_id,
    });

    usersCount.value = data.usersCount;
    withdrawalCount.value = data.withdrawalCount;
    withdrawalSum.value = data.withdrawalSum;

    transactions.value = data.lastsWithdrawal.map((item: LastWithdrawalItem) => ({
      id: item.id,
      title: item.login || item.user_id,
      amount: item.sum,
      date: new Date().toISOString().slice(0, 10),
      type: 'income',
    }))

  });
};

onMounted(() => {
  getUser();
});
</script>


<template>
  <PageLoader ref="loaderRef" />
  <div class="home-page page">
    <img class="bg-decor ufo" src="@/shared/assets/bg/ufo.webp" alt="" />
    <img class="bg-decor meteor" src="@/shared/assets/bg/metheor.webp" alt="" />

    <div class="page-wrapper">
      <MainDashboard />
      <div class="statistics">
        <div class="title title-1">Статистика</div>
        <div class="statistics-inner">
          <StatisticsCard :value="usersCount" color="#763FF1" text="Пользователи, которые уже зарабатывают">
            <UsersIcon />
          </StatisticsCard>
          <StatisticsCard :value="withdrawalCount" color="#17d686" text="Всего выводов">
            <LightningIcon />
          </StatisticsCard>
          <StatisticsCard value="326" color="#FBA704" text="Всего куплено планет">
            <PlanetIcon />
          </StatisticsCard>
          <StatisticsCard :value="withdrawalSum" color="#27aff9" text="Всего выведено TON">
            <TonIcon stroke-width="0" />
          </StatisticsCard>
        </div>
      </div>
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
              Перейти
            </UiButton>
          </div>


        </div>
      </div>
      <div class="last-withdrawals">
        <h2 class="title title-1">Последние выводы</h2>
        <div class="last-withdrawals-list">
          <TransactionCard v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
        </div>
      </div>


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
  padding: 0 8px 8px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  color: #fff;
  border: 1px solid #32315f;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}


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

.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}


.user-name {
  font-size: 12px;
  font-weight: 400;
}

.user-score {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.crown {
  position: absolute;
  top: -72px;
  width: 49px;
  height: 42px;
}

.top-users {
  display: flex;
  align-items: end;
  padding-top: 70px;
  gap: 10px;
  margin-bottom: 12px;
}


.first-place {

  order: 2;
  background-image: url('@/shared/assets/bg/top-user-1.png');
  background-size: cover;

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
