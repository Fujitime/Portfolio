<template>
  <div v-for="post in posts" :key="post.id">
    <div class="post-preview">
      <PostSingle :post="post" />
    </div>
    <hr />
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from "vue";
import PostSingle from "./PostSingle";
export default {
  props: ["posts"],
  components: {
    PostSingle,
  },
  setup(props) {
    onMounted(() => {
      onMounted(() => console.log("component mounted"));
      onUnmounted(() => console.log("component unmounted"));
      onUpdated(() => console.log("component updated"));
    });
  },
};
</script>

<style></style>
