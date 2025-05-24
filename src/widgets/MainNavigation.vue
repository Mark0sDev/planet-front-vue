<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NAVIGATION } from '@/app/router/navigation.ts'
import MiniGameIcon from '@/shared/assets/icons/minigame.svg'
import TonIcon from '@/shared/assets/icons/ton-vector.svg'
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
      <div v-if="isEarnButton(item.path)" class="earn-content">
        <div class="earn-circle">
          <component 
            :is="item.icon" 
            class="earn-icon" 
          />
        </div>
        <span class="earn-text">{{ item.label }}</span>
      </div>
      
      <template v-else>
        <component 
          :is="item.icon" 
          :class="['nav-icon', { 'no-fill': item.icon === MiniGameIcon }]" 
        />
        <span>{{ item.label }}</span>
      </template>
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

  svg path {
    transition: all 0.2s;
  }

  span {
    margin-top: 6px;
  }

  &.active {
    color: var(--accent);

    svg:not(.no-fill) path {
      fill: #6ceaf1;
    }
  }

  // Стили для кнопки "Заработать"
  &.earn-button {
    width: 80px;
    
    .earn-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -10px;
    }
    
    .earn-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6ceaf1 0%, #4facfe 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(108, 234, 241, 0.3);
      
      .earn-icon {
        width: 24px;
        height: 24px;
        
        path {
          fill: #ffffff !important;
        }
      }
    }
    
    .earn-text {
      color: var(--accent);
      font-weight: 600;
      margin-top: 4px;
      font-size: 11px;
    }

    &.active {
      .earn-circle {
        background: linear-gradient(135deg, #5dd9e0 0%, #3d9bfd 100%);
        box-shadow: 0 2px 12px rgba(93, 217, 224, 0.4);
      }
      
      .earn-text {
        color: var(--accent);
      }
    }
  }
}</style>