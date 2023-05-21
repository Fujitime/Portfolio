<template>
  <!-- Page Header -->
  <header class="relative bg-gray-900 pt-32">
    <div
      class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"
    ></div>
    <div class="container relative py-16">
      <div class="mx-auto text-center">
        <h1 class="text-3xl font-bold text-white uppercase tracking-wider">
          All Posts Tag:
        </h1>
        <p class="mt-4 text-lg font-medium text-gray-400">
          Posts with tag "{{ $route.params.tag }}"
        </p>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-10">
    <div class="mx-auto">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-if="postWithTag.length">
        <PostList :posts="postWithTag" />
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList.vue";
import Loading from "@/components/Loading.vue";
import getPosts from "@/composable/getPosts.js";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "Tag",
  components: {
    PostList,
    Loading,
  },
  setup() {
    const route = useRoute();
    const { posts, error, load } = getPosts();
    load();

    const postWithTag = computed(() => {
      return posts.value.filter((p) => p.tags.includes(route.params.tag));
    });

    return { postWithTag, error };
  },
};
</script>
