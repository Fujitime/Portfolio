<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div v-if="error">{{ error }}</div>
        <div v-if="post">
          <div class="mb-3">
            <h1>{{ post.title }}</h1>
            <span class="meta-post" v-for="tag in post.tags" :key="tag"
              >#{{ tag }}</span
            >
          </div>
          <div>
            <p class="post-body">{{ post.body }}</p>
          </div>
          <hr />
        </div>
        <div v-else>
          <Loading />
        </div>
        <router-link to="/blogs" class="btn btn-outline-success btn-sm">
          <i class="fas fa-arrow-left me-2"></i>Back to Posts
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { getPost } from "@/composable/getPost";
export default {
  props: ["id"],
  components: {
    Loading,
  },
  setup(props) {
    const { post, error, load } = getPost(props.id);

    load();

    return { post, error };
  },
};
</script>

<style>
.post-body {
  white-space: pre-wrap;
}
</style>
