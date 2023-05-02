<template>
  <!-- Page Header -->
  <header>
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1 class="h1">All Posts Tag:</h1>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div v-if="error">{{ error }}</div>
        <div v-if="posts.length">
          <PostList :posts="postWithTag" />
        </div>
        <div v-else>
          <Loading />
        </div>
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
    return { posts, postWithTag, error };
  },
};
</script>
