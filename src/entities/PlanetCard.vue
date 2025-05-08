<script setup lang="ts">
import UiButton from '@/shared/ui/UiButton.vue'

export interface Planet {
  name: string
  imageSrc: string
  income: number
  cost: number
  cycleTime: number
  earned: number
}

const props = defineProps<{
  planet: Planet
  index: number
}>()

const emit = defineEmits<{
  (event: 'action-clicked', payload: { index: number; planet: Planet }): void
}>()

function handleClick() {
  emit('action-clicked', {
    index: props.index,
    planet: props.planet,
  })
}
</script>

<template>
  <div class="planet-card">
    <div class="card-title">{{ planet.name }}</div>
    <div class="card-body">
      <div class="card-image">
        <img :src="planet.imageSrc" alt="planet" />
      </div>
      <div class="card-content">
        <div class="card-line">
          <span>Доходность</span>
          <span>{{ planet.income }}%</span>
        </div>
        <div class="card-line">
          <span>Стоимость</span>
          <span
            >{{ planet.cost }} TON <img src="@/shared/assets/currency/custom-ton.png" alt="ton"
          /></span>
        </div>
        <div class="card-line">
          <span>Время цикла</span>
          <span>{{ planet.cycleTime }}ч</span>
        </div>
        <div class="card-line card-line--accent">
          <span>Заработано</span>
          <span
            >{{ planet.earned }} TON <img src="@/shared/assets/currency/custom-ton.png" alt="ton"
          /></span>
        </div>
      </div>
    </div>
    <UiButton @click="handleClick">Атаковать</UiButton>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;

.planet-card {
  padding: 10px;
  border: 1px solid #32315f;
  border-radius: 10px;
  @include mixins.bg-cover;
  background-position: top right;
  background-image: url('@/shared/assets/bg/planet-card-bg.png');
}

.card-title {
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
</style>
