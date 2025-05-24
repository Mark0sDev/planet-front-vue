<script setup lang="ts">
import { ref, onBeforeUnmount, reactive, onMounted } from 'vue'
import {
  tg,
  initData,
  user_id
} from '@/utils/telegramUser'

import CoinFlipDialog from '@/features/dialogs/CoinFlipDialog.vue'
import api from '@/utils/api'
import PageLoader from './PageLoader.vue'
import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'
import UiButton from '@/shared/ui/UiButton.vue'
import AttackScene, { type AttackSceneProps } from '@/widgets/PlanetPanel/AttackScene.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'
import buyPlanetModal from '@/features/dialogs/buyPlanetModal.vue'
import { createCountdown } from '@/utils/useCountdown'

const SCENE_DURATION_MS = 4500
const DIALOG_DELAY_MS = 300

const planets = [
  {
    id: 1,
    planetDisplayId: 1,
    name: 'Аурелия',
    imageSrc: PlanetImage1,
    income: '4.8%',
    cost: '1 TON',
    cycleTime: '4 ч',
    earned: 0,
  }
]

// Reactive state
const showList = ref(true)
const sceneActive = ref(false)
const showCongratsDialog = ref(false)
const showCongratsDialog2 = ref(false)
const showResult = ref(false)
const modalText = ref('')
const walletUp = ref(false)
const showBuyModal = ref(false)
const selectedPlanetId = ref<number | null>(null)
const attackedPlanetId = ref<number | null>(null)
const planetLevel = ref(-1)

const currentPlanet = ref<Pick<AttackSceneProps, 'currentLevel' | 'planetSrc'>>({
  currentLevel: -1,
  planetSrc: ''
})

const timerId = ref<ReturnType<typeof setTimeout> | null>(null)
const dialogTimerId = ref<ReturnType<typeof setTimeout> | null>(null)

const countdownPerPlanet = ref<Record<number, string>>({})
const planetStates = ref<Record<number, number>>({})
const loaderRef = ref<InstanceType<typeof PageLoader> | null>(null)

const formLoaders = reactive({
  buyPlanet: false,
  attackPlanet: false
})

const AttackPlanetApi = (planetId: number) => api.post('/users/attackPlanet', { initData, user_id, planetId })
const buyPlanetApi = ({ planetId }: { planetId: number }) =>
  api.post('/users/buyPlanet', { initData, user_id, planetId })

const AttackPlanet = async (planetId: number) => {
  formLoaders.attackPlanet = true
  try {
    const attack = await AttackPlanetApi(planetId);

    if (attack.status === 1) {
      alert('Planet attack successful');
    }
  } catch {
    tg.showAlert('Planet attack error, please try again.')
  } finally {
    formLoaders.attackPlanet = false
  }
}

const handlePlanetClick = ({ index, planet }: { index: number; planet: typeof planets[number] }) => {
  if (sceneActive.value) return

  sceneActive.value = true
  showList.value = false
  currentPlanet.value = { currentLevel: index, planetSrc: planet.imageSrc }
  planetLevel.value = -1
  attackedPlanetId.value = planet.planetDisplayId

  AttackPlanet(planet.planetDisplayId)

  setTimeout(() => (planetLevel.value = index), 1000)

  timerId.value = setTimeout(() => {
    showList.value = true
    sceneActive.value = false
  }, SCENE_DURATION_MS)

  dialogTimerId.value = setTimeout(() => {
    showCongratsDialog.value = true
  }, SCENE_DURATION_MS + DIALOG_DELAY_MS)
}

const buyPlanet = ({ index }: { index: number }) => {
  const planet = planets.find(p => p.id === index)
  if (!planet) return

  if (planetStates.value[index] === 0) {
    selectedPlanetId.value = index
    showBuyModal.value = true
  } else {
    handlePlanetClick({ index, planet })
  }
}

const handleBuyConfirm = async () => {
  const planetId = selectedPlanetId.value!
  formLoaders.buyPlanet = true
  try {
    const res = await buyPlanetApi({ planetId })

    if (res.data.status === 1) {
      planetStates.value[planetId] = 1
      attackedPlanetId.value = planetId

      createCountdown(res.data.time, res.data.new_time, (formatted) => {
        countdownPerPlanet.value[planetId] = formatted
      })

      showCongratsDialog2.value = true
    } else {
      showResult.value = true
      modalText.value = 'Недостаточно TON на балансе'
      walletUp.value = true
    }
  } catch (error) {
    tg.showAlert('Error: ' + error)
  } finally {
    formLoaders.buyPlanet = false
    showBuyModal.value = false
  }
}

const getUser = async () => {
  await loaderRef.value?.withLoader(async () => {
    const { data } = await api.post('/users/getUser', { initData, user_id })

    const now = new Date(data.date.replace(/-/g, '/')).getTime()

    planets.forEach((planet) => {
      const incomeKey = `planet_${planet.id}_income`
      if (incomeKey in data) planet.earned = data[incomeKey]

      const id = planet.id
      planetStates.value[id] = data[`planet_${id}`] || 0

      const rawTime = data[`time_planet_${id}`]
      if (rawTime) {
        const planetTime = new Date(rawTime.replace(/-/g, '/')).getTime()
        if (planetTime > now) {
          createCountdown(data.date, rawTime, (formatted) => {
            countdownPerPlanet.value[id] = formatted
          })
        }
      }
    })
  })
}

onMounted(() => {
  getUser()
})

onBeforeUnmount(() => {
  if (timerId.value) clearTimeout(timerId.value)
  if (dialogTimerId.value) clearTimeout(dialogTimerId.value)
})
</script>

<template>
  <PageLoader ref="loaderRef" />
  <div class="page planets-page">
    <transition name="fade-slide" mode="out-in">
      <div v-if="showList" key="planets" class="content">
        <buyPlanetModal v-model="showBuyModal" :loading="formLoaders.buyPlanet" @confirm="handleBuyConfirm" />
        <CoinFlipDialog v-model="showResult" :text="modalText" :wallet-up="walletUp" :status="'lose'" />
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
                  <span>{{ planet.earned }} TON <img src="/icons/ton.svg" alt="ton" /></span>
                </div>
              </div>
            </div>
            <UiButton class="planet_button"
              :disabled="formLoaders.attackPlanet || (countdownPerPlanet[planet.id] && countdownPerPlanet[planet.id] !== '00:00:00')"
              @click="buyPlanet({ index: planet.id })">
              <template v-if="formLoaders.attackPlanet">
                <span class="spinner" />
              </template>
              <template v-else-if="countdownPerPlanet[planet.id] && countdownPerPlanet[planet.id] !== '00:00:00'">
                {{ countdownPerPlanet[planet.id] }}
              </template>
              <template v-else>
                {{ planetStates[planet.id] === 0 ? 'Купить' : 'Атаковать' }}
              </template>
            </UiButton>
          </div>
        </div>
      </div>
      <div v-else key="attack" class="attack-wrapper">
        <AttackScene :current-level="planetLevel" :planet-src="currentPlanet.planetSrc" />
      </div>
    </transition>

    <CongratsDialog v-model="showCongratsDialog" text-template="Вы успешно атаковали планету #{{planet}}!"
      :text-params="{ planet: attackedPlanetId ?? '' }" />
    <CongratsDialog v-model="showCongratsDialog2" text-template="Вы купили #{{planet}}!"
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

.planet_button {
  margin-top: 7px;
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
  text-transform: uppercase;
  color: var(--font);
}

.card-body {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.card-image {
  width: 96px;

  img {
    width: 100%;
  }
}

.card-content {
  width: 100%;
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
  transition: opacity 0.4s ease, transform 0.4s ease;
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
