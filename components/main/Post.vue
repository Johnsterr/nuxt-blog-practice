<template>
  <el-card shadow="hover" :body-style="{padding: 0}" class="post">
    <div slot="header" class="post-header">
      <h3>{{ post.title }}</h3>
      <small>
        <i class="el-icon-time"></i>
        {{ post.date | date("date") }}
      </small>
    </div>
    <div class="post-body">
      <img :src="post.imageUrl" alt="post-image" class="post-img" />
    </div>
    <div class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>
      <span>
        <i class="el-icon-chat-dot-round"></i>
        {{ post.comments.length }}
      </span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPost() {
      const id = this.post._id;
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>
