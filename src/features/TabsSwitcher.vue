<script setup lang="ts">
export interface TabItem {
  id: string
  label: string
}

interface TabsSwitcherProps {
  tabs: TabItem[]
  modelValue: string
  centered?: boolean
}

interface TabsSwitcherEmits {
  (e: 'update:modelValue', value: string): void
}

defineProps<TabsSwitcherProps>()
defineEmits<TabsSwitcherEmits>()
</script>

<template>
  <div class="tabs-switcher" :class="{ centered }">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab', { 'is-active': tab.id === modelValue }]"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.tabs-switcher {
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid #32315f;
  border-radius: 15px;
  position: relative;
  backdrop-filter: blur(4px);
  background-color: rgba(50, 49, 95, 0.1);

  &.centered {
    justify-content: center;
    gap: 0px;
    .tab {
      min-width: 90px;
      width: auto;
      flex: none;
    }
  }
}

/* Одна вкладка */
.tab {
  flex: 1;
  text-align: center;
  max-width: 100%;
  width: 100%;
  padding: 12px 0;
  font-weight: 500;
  font-size: 13px;
  color: var(--font);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

/* Активная вкладка */
.tab.is-active {
  color: var(--accent);
}

/* Нижняя линия под активной вкладкой */
.tab.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 3px;
  background-color: var(--accent);
  border-radius: 6px;
}
</style>
