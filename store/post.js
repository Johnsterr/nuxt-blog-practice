export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get("/api/post/admin");
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async fetch({commit}) {
    try {
      return await this.$axios.$get("/api/post");
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`);
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async update({commit}, {id, text}) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {text});
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async create({commit}, {title, text, image}) {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      formData.append("image", image, image.name);

      return await this.$axios.$post("/api/post/admin", formData);
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`);
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`);
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async addView({commit}, {_id, views}) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views});
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
  async getAnalytics({commit}) {
    try {
      return await this.$axios.$get("/api/post/admin/get/analytics");
    } catch (error) {
      commit("setError", error, {root: true});
      throw error;
    }
  },
};
