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
import PlanetImage2 from '@/shared/assets/planets/planet-2/level-0.png'
import UiButton from '@/shared/ui/UiButton.vue'
import AttackScene, { type AttackSceneProps } from '@/widgets/PlanetPanel/AttackScene.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'
import buyPlanetModal from '@/features/dialogs/buyPlanetModal.vue'
import { createCountdown } from '@/utils/useCountdown'

const SCENE_DURATION_MS = 4500
const DIALOG_DELAY_MS = 300

type Planet = {
  id: number
  planetDisplayId: number
  name: string
  imageSrc: string
  income: string
  cost: string,
  income_final: string
  cycleTime: string
  earned: number
}

const planets = ref<Planet[]>([
  {
    id: 1,
    planetDisplayId: 1,
    name: 'Аурелия',
    income_final: "1.2 TON",
    imageSrc: PlanetImage1,
    income: '6%',
    cost: '1 TON',
    cycleTime: '4 ч',
    earned: 0,
  },
  {
    id: 2,
    planetDisplayId: 2,
    name: 'Селестия',
    income_final: "126 TON",
    imageSrc: PlanetImage2,
    income: '6%',
    cost: '100 TON',
    cycleTime: '6 ч',
    earned: 0,
  },
])

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

const buyPlanetApi = ({ planetId }: { planetId: number }) =>
  api.post('/users/buyPlanet', { initData, user_id, planetId })


const AttackPlanetApi = (planetId: number) =>
  api.post('/users/attackPlanet', { initData, user_id, planetId })


const AttackPlanet = async (planetId: number) => {
  formLoaders.attackPlanet = true
  try {
    const attack = await AttackPlanetApi(planetId)

    if (attack.data.status === 1) {
      const rawTime = attack.data.time
      const newTime = attack.data.new_date

      if (planetId !== null) {
        createCountdown(rawTime, newTime, (formatted) => {
          countdownPerPlanet.value[planetId] = formatted
        })
      }
    }
  } catch {
    tg.showAlert('Planet attack error, please try again.')
  } finally {
    formLoaders.attackPlanet = false
  }
}


const handlePlanetClick = ({ index, planet }: { index: number; planet: Planet }) => {
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
  const planet = planets.value.find(p => p.id === index)
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

    planets.value.forEach((planet) => {
      const incomeKey = `planet_${planet.id}_income`
      if (incomeKey in data) planet.earned = data[incomeKey]

      const id = planet.id
      planetStates.value[id] = data[`planet_${id}`] || 0

      if (data[`planet_${id}`] !== 0) {
        const rawTime = data[`time_planet_${id}`]
        if (rawTime) {
          const planetTime = new Date(rawTime.replace(/-/g, '/')).getTime()
          if (planetTime > now) {
            createCountdown(data.date, rawTime, (formatted) => {
              countdownPerPlanet.value[id] = formatted
            })
          }
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
  <div class="friends-page page">
    <transition name="fade-slide" mode="out-in">
      <div v-if="showList" key="planets" class="content">
        <buyPlanetModal v-model="showBuyModal" :loading="formLoaders.buyPlanet" @confirm="handleBuyConfirm" />
        <CoinFlipDialog v-model="showResult" :text="modalText" :wallet-up="walletUp" :status="'lose'" />
        <h2 class="title title-1">Планеты</h2>
        <div class="planets-list">
          <div v-for="planet in planets" :key="planet.id" class="planet-card">
            <div class="card-header">
              <div>
                <div class="card-image">
                  <img :src="planet.imageSrc" alt="planet" />
                </div>
                <div class="card-title">{{ planet.name }}</div>
              </div>

              <div class="card-grid-row">
                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" viewBox="0 0 24 24">
                      <line x1="19" x2="5" y1="5" y2="19" stroke="currentColor" stroke-width="2" />
                      <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" stroke-width="2" fill="none" />
                      <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" stroke-width="2" fill="none" />
                    </svg>
                    <span>Доходность</span>
                  </div>
                  <div class="stat-value">{{ planet.income }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" viewBox="0 0 24 24">
                      <path
                        d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
                        fill="currentColor" />
                    </svg>
                    <span>Стоимость</span>
                  </div>
                  <div class="stat-value">{{ planet.cost }}

                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" viewBox="0 0 24 24">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                        fill="currentColor" />
                    </svg>
                    <span>Прибыль</span>
                  </div>
                  <div class="stat-value">{{ planet.income_final }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" viewBox="0 0 24 24">
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"
                        fill="currentColor" />
                    </svg>
                    <span>Время цикла</span>
                  </div>
                  <div class="stat-value">{{ planet.cycleTime }}</div>
                </div>
              </div>
            </div>

            <div class="card-grid-row">
              <div class="stat-item">
                <div class="stat-label">
                  <svg class="stat-icon" viewBox="0 0 24 24">
                    <path
                      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
                      fill="currentColor" />
                  </svg>
                  <span>Заработано</span>
                </div>
                <div class="stat-value">{{ planet.earned }} <img src="/icons/ton.svg" alt="ton" class="ton-icon" />
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
.title {
  text-align: center;
  margin-bottom: 10px;
}

.planets-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.planet-card {
  padding: 10px;
  border: 1px solid #32315f;
  padding-bottom: 2px;
  border-radius: 10px;
  background-image: url('@/shared/assets/bg/planet-card-bg.png');
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-header {
  display: flex;
  align-items: center;

  gap: 10px;
}

.card-image {
  width: 90px;

  img {
    width: 100%;
    border-radius: 6px;
  }
}

.card-title {
  font-size: 18px;

  margin-top: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--font);
}

.card-grid-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
}

.stat-item {
  flex: 1 1 25%;
  min-width: 160px;
  background: rgba(44, 50, 85, 0.65); // более глубокий, единый цвет
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 14px;
  line-height: 1.2;
}

.stat-icon {
  width: 16px;
  height: 16px;
  color: #6ceaf1;
  flex-shrink: 0;
}

.stat-value {
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}


.ton-icon {
  width: 16px;
  height: 16px;
}

.card-line--accent {
  background-color: rgba(108, 234, 241, 0.54);
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: var(--font);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }
}


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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.attack-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .card-grid-row {
    flex-direction: column;
  }

  .stat-item {
    flex: 1 1 100%;
  }
}
</style>
