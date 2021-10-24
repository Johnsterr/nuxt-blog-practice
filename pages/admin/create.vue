<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h3 class="mb">Создать новый пост</h3>
    <el-form-item label="Введите название поста" prop="title">
      <el-input v-model="controls.title"></el-input>
    </el-form-item>

    <el-form-item
      label="Текст в формате .md или .html"
      prop="text"
      inline-message
    >
      <el-input
        type="textarea"
        resize="none"
        :rows="10"
        v-model="controls.text"
      ></el-input>
    </el-form-item>

    <el-upload
      class="mb"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетащите картинку <em>или нажмите</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        Файлы с расширением jpg/png
      </div>
    </el-upload>

    <el-button class="mb" type="success" plain @click="previewDialog = true">
      Предпросмотр
    </el-button>

    <el-form-item>
      <el-button type="primary" native-type="submit" round :loading="loading">
        Создать пост
      </el-button>
    </el-form-item>

    <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
      <div :key="controls.text">
        <VueMarkdown>{{ controls.text }}</VueMarkdown>
      </div>
    </el-dialog>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  head: {
    title: `Новый пост | ${process.env.appName}`,
  },
  data() {
    return {
      image: null,
      loading: false,
      previewDialog: false,
      controls: {
        title: "",
        text: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "Текст не должен быть пустым",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleImageChange(file, fileList) {
      this.image = file.raw;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          this.loading = true;

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image,
          };

          try {
            await this.$store.dispatch("post/create", formData);
            this.controls.title = "";
            this.controls.text = "";
            this.image = null;
            this.$refs.upload.clearFiles();
            this.$message.success("Пост создан");
          } catch (error) {
            throw error;
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Загрузите картинку");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 600px;
}
</style>
