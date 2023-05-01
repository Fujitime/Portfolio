<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h1 class="text-center mb-5">Create new post</h1>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              class="form-control"
              placeholder="Title of post"
              v-model="title"
              required
            />
          </div>
          <div class="form-group">
            <label for="post-body">Body</label>
            <textarea
              id="post-body"
              rows="8"
              class="form-control"
              placeholder="Content of post"
              v-model="body"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="post-tags">Tags : </label>
            <span v-for="tag in tags" :key="tag"># {{ tag }}</span>
            <div class="input-group">
              <input
                id="post-tags"
                type="text"
                class="form-control"
                placeholder="Enter tags"
                v-model="tag"
                @keydown.enter.prevent="handleKeydown"
              />

              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click.prevent="handleKeydown"
                >
                  Add tag
                </button>
              </div>
            </div>
            <span
              v-for="tag in tags"
              :key="tag"
              class="badge badge-secondary mr-1"
            >
              #{{ tag }}
            </span>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

    const handleSubmit = async () => {
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
      };

      const res = await projectFirestore.collection("posts").add(post);

      router.push({
        name: "Home",
      });
    };
    return { title, body, tag, tags, handleKeydown, handleSubmit };
  },
};
</script>

<style></style>
