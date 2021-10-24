<template>
  <div class="admin-layout">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px">
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/components/admin/AsideMenu.vue";

export default {
  components: {
    AsideMenu,
  },
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

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  height: 100vh;
}
</style>
