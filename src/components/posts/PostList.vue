<template>
  <div class="flex flex-col gap-6 pt-20 overflow-x-hidden">
    <div
      v-for="post in sortedPosts"
      :key="post.id"
      class="bg-gray-900 rounded-lg shadow-md"
    >
      <PostSingle :post="post" />
    </div>
  </div>
</template>

<script>
import PostSingle from "./PostSingle";
export default {
  props: ["posts"],
  components: {
    PostSingle,
  },
  computed: {
    sortedPosts() {
      // Menggunakan metode slice() untuk membuat salinan array posts
      const sorted = this.posts.slice();
      // Mengurutkan array posts berdasarkan properti waktu (misalnya post.createdAt)
      sorted.sort((a, b) => b.createdAt - a.createdAt);
      return sorted;
    },
  },
};
</script>

<style></style>
