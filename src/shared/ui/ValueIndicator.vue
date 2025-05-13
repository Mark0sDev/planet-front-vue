<template>
  <div class="value-indicator" :class="directionClass">
    <span class="value">{{ value }}</span>
  </div>
</template>

<style scoped lang="scss">
.value-indicator {
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: inherit;
}

.value {
  margin-right: 4px;
}

.arrow {
  font-size: 10px;
  line-height: 1;
}

.positive {
  color: #17d686; // зелёный
}

.negative {
  color: #f44336; // красный
}
</style>
