<template>
  <div class="flex flex-col gap-6 pt-20 overflow-x-hidden">
    <div class="flex justify-end">
      <router-link
        v-if="isAdmin"
        :to="{ name: 'CreatePost' }"
        class="flex items-center px-4 py-2 text-sm font-medium text-green-500 border border-green-500 rounded-md transition duration-300 hover:bg-green-500 hover:text-white"
      >
        <i class="fas fa-plus mr-2"></i> Create Post
      </router-link>
    </div>
    <div
      v-for="post in filteredSortedPosts"
      :key="post.id"
      class="bg-gray-900 rounded-lg shadow-md"
    >
      <PostSingle :post="post" />
    </div>
    <div v-if="!isAdmin && filteredSortedPosts.length === 0">
      No posts available.
    </div>
  </div>
</template>

<script>
import PostSingle from "./PostSingle";
import { useAuth } from "@/composables/useAuth"; // Import useAuth module

export default {
  props: ["posts"],
  components: {
    PostSingle,
  },
  computed: {
    filteredSortedPosts() {
      if (this.isAdmin) {
        return this.posts.slice().sort((a, b) => b.createdAt - a.createdAt); // Newest posts first
      } else {
        return this.posts.filter(post => post.isActive).sort((a, b) => b.createdAt - a.createdAt); // Newest active posts first
      }
    },
  },
  setup() {
    const { isAdmin } = useAuth(); // Get isAdmin status from useAuth

    return { isAdmin };
  },
};
</script>

