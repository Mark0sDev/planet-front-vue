<template>
  <div class="timer">Новый раунд через: {{ seconds }}s</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ startFrom?: number }>()
const seconds = ref(props.startFrom ?? 5)
let intervalId: number

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (seconds.value > 0) seconds.value--
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
.timer {
  text-align: center;
  font-size: 14px;
  margin: 16px 0;
}
</style>
