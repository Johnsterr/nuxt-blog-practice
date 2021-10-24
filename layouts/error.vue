<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">Ошибка 404</h1>
      <nuxt-link to="/">Вернуться на главную страницу</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-layout {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-content {
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-title {
  color: rgb(189, 45, 45);
  margin-bottom: 1rem;
}
</style>
