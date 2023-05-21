<template>
  <div class="container px-4 lg:py-16 pt-20">
    <div class="mx-auto max-w-4xl">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-else>
        <div v-if="posts.length">
          <PostList :posts="posts" />
        </div>
        <div v-else>
          <Loading />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../components/posts/PostList.vue";
import Loading from "../components/Loading.vue";
import getPosts from "../composable/getPosts.js";

export default {
  name: "Blogposts",
  components: {
    PostList,
    Loading,
  },
  setup() {
    const { posts, error, load } = getPosts();
    load();
    return { posts, error };
  },
};
</script>

<style></style>
