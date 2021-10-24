<template>
  <article class="post--width">
    <header class="post-header--block">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ post.date | date }}
        </small>
        <small><i class="el-icon-view"></i> {{ post.views }}</small>
      </div>
      <div class="post-image">
        <img :src="post.imageUrl" alt="post-image" class="post-img" />
      </div>
    </header>
    <main class="post-content">
      <VueMarkdown>{{ post.text }}</VueMarkdown>
    </main>
    <footer>
      <CommentForm
        v-if="canAddComment"
        :postId="post._id"
        @created="createCommentHandler"
      />
      <div v-if="post.comments.length" class="comments">
        <Comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div v-else class="text-center">Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import Comment from "@/components/main/Comment.vue";
import CommentForm from "@/components/main/CommentForm.vue";

export default {
  components: {
    Comment,
    CommentForm,
  },
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`,
    };
  },
  validate({params}) {
    return Boolean(params.id);
  },
  async asyncData({store, params}) {
    const post = await store.dispatch("post/fetchById", params.id);
    await store.dispatch("post/addView", post);
    return {
      post: {...post, views: ++post.views},
    };
  },
  data() {
    return {
      canAddComment: true,
    };
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment);
      this.canAddComment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.post-image img {
  width: 100%;
  height: auto;
}

.post-content {
  margin-bottom: 2rem;
}
</style>
