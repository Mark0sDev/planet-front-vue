<script setup lang="ts"></script>

<template>
  <div class="referral-info-banner">
    <div class="info-box">
      <h2 class="info-title">
        За прокачку своей <br />
        планеты - ваш <span>реферальный</span> <br />
        <span>процент</span> будет увеличиваться
      </h2>
      <p class="info-description">
        Чем выше уровень вашей планеты - тем больше вы получаете со своих рефералов
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.referral-info-banner {
  margin-top: 10px;
  flex: none;
  width: 100%;
  background-image: url('@/shared/assets/bg/referal-info-bg.jpg');
  border: 1px solid #32315f;
  @include mixins.bg-cover;
  padding: 18px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;
}

.info-box {
  max-width: 276px;
  span {
    color: #27aff9;
  }
}

.info-title {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 7px;
}
.info-description {
  color: rgba(255, 255, 255, 0.7);
  max-width: 225px;
}
</style>
