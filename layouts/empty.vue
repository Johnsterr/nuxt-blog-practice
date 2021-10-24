<template>
  <div class="empty-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  watch: {
    error(value) {
      this.$message.error(value.response.data.message);
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

<style lang="scss">
.empty-layout {
  padding-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
