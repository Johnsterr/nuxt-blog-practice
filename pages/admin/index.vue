<template>
  <div>
    <h1>Аналитика по постам</h1>
    <AnalyticsChart
      title="Количество просмотров"
      :labels="views.labels"
      :data="views.data"
    />

    <AnalyticsChart
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AnalyticsChart from "@/components/admin/AnalyticsChart.vue";

export default {
  layout: "admin",
  middleware: ["admin-auth"],
  components: {
    AnalyticsChart,
  },
  head: {
    title: `Аналитика | ${process.env.appName}`,
  },
  async asyncData({store}) {
    const {views, comments} = await store.dispatch("post/getAnalytics");
    return {views, comments};
  },
};
</script>

<style></style>
