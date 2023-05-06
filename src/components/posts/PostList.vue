<template>
  <div v-for="post in posts" :key="post.id">
    <div class="post-preview">
      <PostSingle :post="post" />
    </div>
    <hr />
  </div>
</template>

<script>
import PostSingle from "./PostSingle";
export default {
  props: ["posts"],
  components: {
    PostSingle,
  },
};
</script>

<style></style>
