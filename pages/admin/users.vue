<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h3>Создать пользователя</h3>
    <el-form-item label="Логин" prop="login" inline-message>
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
        Создать
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head: {
    title: `Создать пользователя | ${process.env.appName}`,
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
            message: "Введите логин",
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
            await this.$store.dispatch("auth/createUser", formData);
            this.$message.success("Новый пользователь добавлен");
            this.controls.login = "";
            this.controls.password = "";
            this.loading = false;
          } catch (error) {
            this.loading = false;
            throw error;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("Submit");
    },
  },
};
</script>

<style lang="scss">
form {
  width: 600px;
}
</style>
