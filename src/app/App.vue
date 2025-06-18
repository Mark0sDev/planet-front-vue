<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(true)

function openApp() {
  window.location.href = 'https://t.me/CivilizationTon_bot/app' // ← замени на своего бота
}
</script>

<template>
  <div class="app-container">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Приложение обновлено</h2>
        <p>Чтобы попасть, напишите боту <b>/start</b>, или нажмите кнопку ниже</p>
        <button class="open-button" @click="openApp">Открыть приложение</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #1e1f2c, #151729);
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.modal-overlay {
  width: 100%;
  padding: 20px;
  text-align: center;
}

.modal-content {
  background: #1e1f2c;
  border-radius: 20px;
  padding: 30px 20px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.modal-content h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.modal-content p {
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.4;
}

.open-button {
  background: #5c6cff;
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.open-button:hover {
  background: #3d4ae1;
}
</style>
