<script setup lang="ts">
import { ref, onBeforeUnmount, reactive, onMounted, computed } from 'vue'
import {
  tg,
  initData,
  user_id
} from '@/utils/telegramUser'
import tonSvg from '@/shared/assets/images/icons/ton.svg?url';

import CoinFlipDialog from '@/features/dialogs/CoinFlipDialog.vue'
import api from '@/utils/api'
import PageLoader from './PageLoader.vue'
import PlanetImage1 from '@/shared/assets/planets/planet-1/level-0.png'
import PlanetImage2 from '@/shared/assets/planets/planet-2/level-0.png'
import PlanetImage3 from '@/shared/assets/planets/planet-3/level-0.png'

import UiButton from '@/shared/ui/UiButton.vue'
import AttackScene, { type AttackSceneProps } from '@/widgets/PlanetPanel/AttackScene.vue'
import CongratsDialog from '@/features/dialogs/CongratsDialog.vue'
import buyPlanetModal from '@/features/dialogs/buyPlanetModal.vue'
import { createCountdown } from '@/utils/useCountdown'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const SCENE_DURATION_MS = 4500
const DIALOG_DELAY_MS = 300

type Planet = {
  id: number
  planetDisplayId: number
  name: string
  imageSrc: string
  income: string
  cost: string
  claim: string
  income_final: string
  cycleTime: string
  earned: number
  pin: boolean
  freeze: boolean
  hoot: boolean,
  limited: boolean,
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
    claim: "0.01 TON",
    cycleTime: '4 ч',
    earned: 0,
    pin: false,
    freeze: false,
    hoot: false,
    limited: false
  },
  {
    id: 2,
    planetDisplayId: 2,
    name: 'Селестия',
    income_final: "126 TON",
    imageSrc: PlanetImage2,
    income: '6%',
    cost: '100 TON',
    claim: "1.5 TON",
    cycleTime: '6 ч',
    earned: 0,
    pin: false,
    freeze: false,
    hoot: true,
    limited: false
  },
  {
    id: 3,
    planetDisplayId: 3,
    name: 'Орианна',
    income_final: "72 TON",
    imageSrc: PlanetImage3,
    income: '4%',
    cost: '50 TON',
    claim: "0.5 TON",
    cycleTime: '6 ч',
    earned: 0,
    pin: true,
    freeze: false,
    hoot: false,
    limited: true
  },
])


const sortedPlanets = computed(() =>
  planets.value.slice().sort((a, b) => {
    if (a.pin === b.pin) return 0
    return a.pin ? -1 : 1
  })
)

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

  if (planetStates.value[index] === 0 && !planet.freeze) {
    selectedPlanetId.value = index
    showBuyModal.value = true
  } else if (!planet.freeze) {
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
      modalText.value = t('minigame.insufficient_balance')
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
          const planetTime = new Date(rawTime.replace(/-/g, '/')).getTime() + 2000

          if (planetTime > now) {
            const adjustedTime = new Date(planetTime)
            const pad = (n: number) => n.toString().padStart(2, '0')
            const formattedAdjusted =
              adjustedTime.getFullYear() + '-' +
              pad(adjustedTime.getMonth() + 1) + '-' +
              pad(adjustedTime.getDate()) + ' ' +
              pad(adjustedTime.getHours()) + ':' +
              pad(adjustedTime.getMinutes()) + ':' +
              pad(adjustedTime.getSeconds())

            createCountdown(data.date, formattedAdjusted, (formatted) => {
              countdownPerPlanet.value[id] = formatted
            })
          }
        }
      }

    })
  })
}

const boughtPlanet = computed(() => {
  return planets.value.find(p => p.id === attackedPlanetId.value || p.planetDisplayId === attackedPlanetId.value)
})

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

        <h2 class="title title-1">{{ t('planet.title') }}</h2>

        <div class="planets-list">
          <div v-for="planet in sortedPlanets" :key="planet.id" class="planet-card">
            <div v-if="planet.limited" class="label-limited">LIMITED</div>
            <div v-if="planet.hoot" class="label-hot">HOT</div>
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
                    <span>{{ t('planet.income') }}</span>
                  </div>
                  <div class="stat-value">{{ planet.income }}</div>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 3h12l4 6-10 13L2 9Z" />
                      <path d="M11 3 8 9l4 13 4-13-3-6" />
                      <path d="M2 9h20" />
                    </svg>
                    <span>{{ t('planet.cost') }}</span>
                  </div>
                  <div class="stat-value">{{ planet.cost }}</div>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <svg class="stat-icon" viewBox="0 0 24 24">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                        fill="currentColor" />
                    </svg>
                    <span>{{ t('planet.profit') }}</span>
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
                    <span>{{ t('planet.cycle_time') }}</span>
                  </div>
                  <div class="stat-value">{{ planet.cycleTime }}</div>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="stat-icon">
                      <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
                      <path d="M18 12h.01" />
                      <path d="M19 22v-6" />
                      <path d="m22 19-3-3-3 3" />
                      <path d="M6 12h.01" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                    <span>{{ t('planet.claim') }}</span>
                  </div>
                  <div class="stat-value">{{ planet.claim }}</div>
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
                  <span>{{ t('planet.earned') }}</span>
                </div>
                <div class="stat-value">
                  {{ planet.earned }}
                  <img :src="tonSvg" alt="ton" class="ton-icon" />
                </div>
              </div>

              <UiButton class="planet_button"
                :disabled="planet.freeze || formLoaders.attackPlanet || (countdownPerPlanet[planet.id] && countdownPerPlanet[planet.id] !== '00:00:00')"
                @click="buyPlanet({ index: planet.id })">

                <template v-if="planet.freeze">
                  99 PLANET
                </template>
                <template v-else-if="formLoaders.attackPlanet">
                  <span class="spinner" />
                </template>
                <template v-else-if="countdownPerPlanet[planet.id] && countdownPerPlanet[planet.id] !== '00:00:00'">
                  {{ countdownPerPlanet[planet.id] }}
                </template>
                <template v-else>
                  {{ planetStates[planet.id] === 0 ? t('planet.buy') : t('planet.attack') }}
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

    <CongratsDialog v-model="showCongratsDialog" :text-template="t('congrats.attack', {
      name: boughtPlanet?.name,
      time: boughtPlanet?.cycleTime,
      reward: boughtPlanet?.claim
    })" :text-params="{}" :show-extra-button="true" />

    <CongratsDialog v-model="showCongratsDialog2" :text-template="t('congrats.buy', {
      name: boughtPlanet?.name,
      time: boughtPlanet?.cycleTime,
      reward: boughtPlanet?.claim
    })" :text-params="{}" :show-extra-button="true" />

  </div>
</template>

<style scoped lang="scss">
.page {
  padding-bottom: 120px;
}

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
  position: relative;
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

.label-hot {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff4d4f;
  color: #ffffff;
  padding: 4px 6px;
  border-radius: 6px;
  font-weight: 600;
  transform: rotate(-10deg);
}

.label-limited {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #7939e9;
  color: #ffffff;
  padding: 4px 6px;
  border-radius: 6px;
  font-weight: 600;
  transform: rotate(-10deg);
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
  background: rgba(44, 50, 85, 0.65);
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
