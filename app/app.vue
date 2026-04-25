<template>
  <div class="app-container">
    <div class="bg-gradient-radial"></div>
    <div class="content-wrapper">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
