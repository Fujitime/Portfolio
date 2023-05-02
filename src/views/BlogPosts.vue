<template>
  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div v-if="error">{{ error }}</div>
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
