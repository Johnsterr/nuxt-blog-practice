<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Foot</el-footer>
  </el-container>
</template>

<script>
import NavBar from "@/components/main/Navbar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
