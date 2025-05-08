<script setup lang="ts"></script>

<template>
  <div class="tasks-banner">
    <div class="tasks-banner-inner">
      <h2 class="banner-title title-1">Задания</h2>
      <p>
        Lorem ipsum dolor sit amet, <br />
        consectetur adipisci elit, sed.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/mixins' as mixins;
.tasks-banner {
  flex: none;
  width: 100%;
  background-image: url('@/shared/assets/bg/tasks-banner-bg.jpg');
  border: 1px solid #32315f;
  @include mixins.bg-cover;
  padding: 18px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 31px 22px;

  p {
    font-size: 12px;
    font-weight: 300;
  }
}

.tasks-banner-inner {
  max-width: 214px;
}

.banner-title {
  margin-bottom: 6px;
}
</style>
