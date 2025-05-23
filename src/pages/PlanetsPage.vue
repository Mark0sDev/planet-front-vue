<script setup lang="ts">
import { ref, onBeforeUnmount, reactive, onMounted } from 'vue'
import {
  initData,
  user_id
} from '@/utils/telegramUser';

import api from '@/utils/api';
import PageLoader from './PageLoader.vue'
import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'

import UiButton from '@/shared/ui/UiButton.vue'
import AttackScene, { type AttackSceneProps } from '@/widgets/PlanetPanel/AttackScene.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'
import buyPlanetModal from '@/features/dialogs/buyPlanetModal.vue';

const SCENE_DURATION_MS = 4_500
const DIALOG_DELAY_MS = 300

const attackedPlanetId = ref<number | null>(null)

const showList = ref(true)
const sceneActive = ref(false)
const showCongratsDialog = ref(false);

const formLoaders = reactive({
  buyPlanet: false,
});

const timerId = ref<ReturnType<typeof setTimeout> | null>(null)
const dialogTimerId = ref<ReturnType<typeof setTimeout> | null>(null)

const currentPlanet = ref<Pick<AttackSceneProps, 'currentLevel' | 'planetSrc'>>({
  currentLevel: -1,
  planetSrc: ''
})
const planetLevel = ref(-1)

const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)
const planets = [
  {
    id: 1,
    planetDisplayId: 1,
    name: 'Аурелия',
    imageSrc: PlanetImage1,
    income: '4.8%',
    cost: '1 TON',
    cycleTime: '4 ч',
    earned: '10 TON',
  }
]

const planet1 = ref(0)

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const response = await api.post('/users/getUser', {
      initData,
      user_id
    })
    const data = response.data
    planet1.value = data.planet_1
  })
}

const handlePlanetClick = ({ index, planet }: { index: number; planet: (typeof planets)[number] }) => {
  if (sceneActive.value) return

  sceneActive.value = true
  showList.value = false

  currentPlanet.value = { currentLevel: index, planetSrc: planet.imageSrc }
  planetLevel.value = -1
  attackedPlanetId.value = planet.planetDisplayId

  setTimeout(() => (planetLevel.value = index), 1_000)

  timerId.value = setTimeout(() => {
    showList.value = true
    sceneActive.value = false
  }, SCENE_DURATION_MS)

  dialogTimerId.value = setTimeout(
    () => (showCongratsDialog.value = true),
    SCENE_DURATION_MS + DIALOG_DELAY_MS,
  )
}

onBeforeUnmount(() => {
  if (timerId.value) clearTimeout(timerId.value)
  if (dialogTimerId.value) clearTimeout(dialogTimerId.value)
})

onMounted(() => {
  getUser()
})

const showBuyModal = ref(false)
const selectedPlanetId = ref<number | null>(null)

const buyPlanet = ({ index }: { index: number }) => {
  const planet = planets.find(p => p.id === index)
  if (!planet) return

  if (planet1.value === 0) {
    selectedPlanetId.value = index
    showBuyModal.value = true
  } else {
    handlePlanetClick({ index, planet })
  }
}

const buyPlanetApi = async ({ planetId }: { planetId: number }) => {
  return await api.post('/users/buyPlanet', {
    initData,
    user_id,
    planetId
  });
};


async function handleBuyConfirm() {
  formLoaders.buyPlanet = true;
  try {
    const res = await buyPlanetApi({ planetId: selectedPlanetId.value! });
    if (res.data.status == 1) {
      showBuyModal.value = false;
    }

  } catch (error) {
    console.error(error);
  } finally {
    formLoaders.buyPlanet = false;
  }
}

</script>

<template>
  <PageLoader ref="loaderRef" />
  <div class="page planets-page">
    <transition name="fade-slide" mode="out-in">
      <div v-if="showList" key="planets" class="content">
        <buyPlanetModal @confirm="handleBuyConfirm" v-model="showBuyModal" :loading="formLoaders.buyPlanet" />

        <h2 class="title title-1">Планеты</h2>

        <div class="planets-list">
          <div v-for="planet in planets" :key="planet.id" class="planet-card">
            <div class="card-title">{{ planet.name }}</div>
            <div class="card-body">
              <div class="card-image">
                <img :src="planet.imageSrc" alt="planet" />
              </div>
              <div class="card-content">
                <div class="card-line">
                  <span>Доходность</span>
                  <span>{{ planet.income }}</span>
                </div>
                <div class="card-line">
                  <span>Стоимость</span>
                  <span>{{ planet.cost }} <img src="/icons/ton.svg" alt="ton" /></span>
                </div>
                <div class="card-line">
                  <span>Время цикла</span>
                  <span>{{ planet.cycleTime }}</span>
                </div>
                <div class="card-line card-line--accent">
                  <span>Заработано</span>
                  <span>{{ planet.earned }} <img src="/icons/ton.svg" alt="ton" /></span>
                </div>
              </div>
            </div>
            <UiButton @click="buyPlanet({ index: planet.id })">Атаковать</UiButton>
          </div>
        </div>
      </div>

      <div v-else key="attack" class="attack-wrapper">
        <AttackScene :current-level="planetLevel" :planet-src="currentPlanet.planetSrc" />
      </div>
    </transition>

    <CongratsDialog v-model="showCongratsDialog" text-template="Вы успешно атаковали планету #{{planet}}!"
      :text-params="{ planet: attackedPlanetId ?? '' }" />
  </div>
</template>

<style scoped lang="scss">
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

.planet-card {
  padding: 10px;
  border: 1px solid #32315f;
  border-radius: 10px;
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('@/shared/assets/bg/planet-card-bg.png');
}

.card-title {
  text-align: center;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--font);
}

.card-body {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.card-content {
  max-width: 100%;
  width: 100%;
}

.card-image {
  width: 96px;

  img {
    width: 100%;
  }
}

.card-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  border-radius: 4px;

  &--accent {
    background-color: rgba(108, 234, 241, 0.54);

    span img {
      width: 14px;
      height: 14px;
    }
  }

  span {
    color: var(--font);
    line-height: 20px;

    &:last-child {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 1px;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.attack-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.title {
  margin-bottom: 10px;
  text-align: center;
}

.planets-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
