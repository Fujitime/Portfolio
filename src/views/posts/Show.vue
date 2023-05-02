<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div v-if="error">{{ error }}</div>
        <div v-if="post">
          <div class="mb-3">
            <h1>{{ post.title }}</h1>
            <!-- <button
              class="btn btn-danger"
              @click="handleDelete"
              style="padding: 2px"
            >
              Delete
            </button> -->
            <span class="meta-post" v-for="tag in post.tags" :key="tag"
              >#{{ tag }}</span
            >
          </div>
          <div>
            <p>{{ post.body }}</p>
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
// import { projectFirestore } from "@/firebase/config";
import { getPost } from "@/composable/getPost";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: {
    Loading,
  },
  setup(props) {
    const route = useRouter();
    const { post, error, load } = getPost(props.id);

    load();

    // const handleDelete = async () => {
    //   await projectFirestore.collection("posts").doc(props.id).delete();
    //   route.push({
    //     name: "Home",
    //   });
    // };
    return { post, error };
  },
};
</script>

<style></style>
