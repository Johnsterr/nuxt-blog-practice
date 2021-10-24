<template>
  <el-card shadow="always" :style="{width: '500px'}">
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h3>Войти в панель администратора</h3>
      <el-form-item label="Ваш логин" prop="login" inline-message>
        <el-input v-model.trim="controls.login"></el-input>
      </el-form-item>
      <el-form-item
        label="Пароль"
        prop="password"
        :style="{marginBottom: '2rem'}"
      >
        <el-input type="password" v-model.trim="controls.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: "empty",
  head: {
    title: `Авторизация | ${process.env.appName}`,
  },
  data() {
    return {
      loading: false,
      controls: {
        login: "",
        password: "",
      },
      rules: {
        login: [
          {
            required: true,
            message: "Введите ваш логин",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur",
          },
          {
            min: 6,
            message: "Пароль должен быть не менее 6 символов",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password,
            };
            await this.$store.dispatch("auth/login", formData);
            this.$router.push("/admin");
          } catch (error) {
            this.loading = false;
            throw error;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    const {message} = this.$route.query;

    switch (message) {
      case "login":
        this.$message.info("Необходимо войти в систему");
        break;
      case "logout":
        this.$message.success("Вы успешно вышли из системы");
        break;
      case "session":
        this.$message.warning(
          "Время сессии истекло, пожалуйста авторизуйтесь снова"
        );
        break;
    }
  },
};
</script>

<style lang="scss"></style>
