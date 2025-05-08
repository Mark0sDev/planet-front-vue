<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ArrowDownIcon from '@/shared/assets/icons/chevron-down.svg'

interface Flag {
  code: string
  label: string
  src: string
}

enum Language {
  EN = 'en',
  RU = 'ru',
  UA = 'ua',
}

const isOpen = ref<boolean>(false)
const containerRef = ref<HTMLElement | null>(null)

const getFlagUrl = (lang: Language): string => `@/assets/icons/${lang}.svg`

const flags: { code: Language; label: string; src: string }[] = [
  { code: Language.EN, label: 'English', src: getFlagUrl(Language.EN) },
  { code: Language.RU, label: 'Русский', src: getFlagUrl(Language.RU) },
  { code: Language.UA, label: 'Українська', src: getFlagUrl(Language.UA) },
]

const selectedFlag = ref<Flag>(flags[0])

function toggleDropdown(): void {
  isOpen.value = !isOpen.value
}

function selectFlag(flag: Flag): void {
  selectedFlag.value = flag
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent): void {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="select-container" ref="containerRef">
    <button @click="toggleDropdown" class="select-button">
      <img :src="selectedFlag.src" :alt="selectedFlag.label" class="flag-img" />
      <span :class="['arrow', { rotated: isOpen }]">
        <ArrowDownIcon />
      </span>
    </button>

    <transition name="fade-slide">
      <div v-if="isOpen" class="dropdown">
        <div v-for="flag in flags" :key="flag.code" @click="selectFlag(flag)" class="dropdown-item">
          <img :src="flag.src" :alt="flag.label" class="flag-img" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.select-container {
  position: relative;
}

.select-button {
  width: 100%;
  padding: 9px;
  padding-right: 28px;
  border: 1px solid #32315f;
  background: #19243b;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 8px;
}

.flag-img {
  width: 24px;
  height: 16px;
  object-fit: cover;

  img {
    width: 24px;
  }
}

.arrow {
  transition: transform 0.2s ease;
  width: 15px;
  height: 15px;
}

.rotated {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  border: 1px solid #32315f;
  background: #19243b;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  padding: 8px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #141b30;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
