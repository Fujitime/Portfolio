<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post">
    <p></p>

    <!-- Page Header -->
    <header
      class="masthead"
      style="background-image: url('{{post.image_url}}')"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>{{ post.title }}</h1>
              <button
                class="btn btn-danger"
                @click="handleDelete"
                style="padding: 2px"
              >
                Delete
              </button>
              <span class="meta-post" v-for="tag in post.tags" :key="tag"
                >#{{ tag }}</span
              >
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <p>
              {{ post.body }}
            </p>
          </div>
        </div>
      </div>
    </article>

    <hr />
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { projectFirestore } from "@/firebase/config";
import { getPost } from "@/composable/getPost";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: {
    Loading,
  },
  setup(props) {
    const route = useRouter;
    const { post, error, load } = getPost(props.id);

    load();

    const handleDelete = async () => {
      await projectFirestore.collection("posts").doc(props.id).delete();
      route.push({
        name: "Home",
      });
    };
    return { post, error, handleDelete };
  },
};
</script>

<style></style>
