<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NAVIGATION } from '@/app/router/navigation.ts'
import MiniGameIcon from '@/shared/assets/icons/minigame.svg'

import { AppRoutes } from '@/app/router/router.ts'

const route = useRoute()

function isActive(path: string) {
  return route.path === path
}

function isEarnButton(path: string) {
  return path === AppRoutes.PLANETS
}
</script>

<template>
  <nav class="bottom-nav">
    <router-link 
      v-for="item in NAVIGATION" 
      :key="item.path" 
      :to="item.path" 
      :class="{ 
        active: isActive(item.path),
        'earn-button': isEarnButton(item.path)
      }"
      class="nav-item"
    >
      <component 
        :is="item.icon" 
        :class="[
          'nav-icon', 
          { 
            'no-fill': item.icon === MiniGameIcon,
            'earn-icon': isEarnButton(item.path)
          }
        ]" 
      />

      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<style lang="scss">
.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  background: rgba(30, 34, 55, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 -4px 15px rgba(255, 255, 255, 0.05);
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  padding: 0 10px;
  padding-bottom: 6px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--font);
  text-decoration: none;
  font-size: 12px;
  height: 100%;
  padding-top: 5px;
  padding-bottom: 12px;
  width: 64px;
  position: relative;
  transition: all 0.2s;
  border-radius: 12px;

  svg path {
    transition: all 0.2s;
  }

  span {
    margin-top: 6px;
    transition: all 0.2s;
  }

  &.active {
    color: var(--accent);

    svg:not(.no-fill) path {
      fill: #6ceaf1;
    }
  }

  // Стили для кнопки "Заработать"
  &.earn-button {
    background: linear-gradient(135deg, #6ceaf1 0%, #4facfe 100%);
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(108, 234, 241, 0.3);
    
    span {
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .earn-icon path {
      fill: #ffffff !important;
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(108, 234, 241, 0.4);
    }

    &.active {
      background: linear-gradient(135deg, #5dd9e0 0%, #3d9bfd 100%);
      color: #ffffff;
      
      span {
        color: #ffffff;
      }
    }
  }
}</style>