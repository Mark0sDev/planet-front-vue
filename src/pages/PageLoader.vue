<template>
    <div v-if="isLoading" class="loader-container">
        <img src="/icons/loader.png" alt="Loading..." class="loader-img" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isLoading = ref(false);

// Тип: функция без параметров, возвращающая промис без результата
const withLoader = async (callback: () => Promise<void>) => {
    try {
        isLoading.value = true;
        await callback();
    } finally {
        isLoading.value = false;
    }
};

defineExpose({
    isLoading,
    withLoader,
});
</script>


<style scoped>
.loader-container {
    background-color: #151729;
}

.loader-img {
    width: 100px;
    height: auto;
    animation: jump 1s infinite;
}

@keyframes jump {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}
</style>
