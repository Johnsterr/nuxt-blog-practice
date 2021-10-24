<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h2>Добавить комментарий</h2>
    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model="controls.name"></el-input>
    </el-form-item>
    <el-form-item label="Ваш комментарий" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        :rows="3"
        resize="none"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" round :loading="loading">
        Добавить комментарий
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      controls: {
        name: "",
        text: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Введите ваше имя",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "Введите ваш комментарий",
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
          const formData = {
            postId: this.postId,
            name: this.controls.name,
            text: this.controls.text,
          };

          try {
            const newComment = await this.$store.dispatch(
              "comment/create",
              formData
            );
            this.$message.success("Ваш комментарий успешно добавлен");
            this.$emit("created", newComment);
          } catch (error) {
            this.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
