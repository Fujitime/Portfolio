<template>
  <div>
    {{ title }}
    {{ body }}
  </div>

  <!-- Page Header -->
  <header
    class="masthead"
    style="background-image: url('static/img/contact-bg.jpg')"
  >
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="page-heading">
            <h1>Create new post</h1>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <form @submit.prevent="handleSubmit">
          <div class="control-group">
            <div class="form-group floating-label-form-group controls">
              <label>Title</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="title post"
                v-mode="title"
                required
              />
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="control-group">
            <div class="form-group floating-label-form-group controls">
              <label>Body</label>
              <textarea
                rows="5"
                name="message"
                class="form-control"
                placeholder="Input body post"
                v-model="body"
                required
              ></textarea>
              <p class="help-block text-danger"></p>
            </div>
          </div>
          <div class="control-group">
            <div class="form-group floating-label-form-group controls">
              <label>Tags</label>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="input tags"
                v-model="tag"
                @keydown.enter.prevent="handleKeydown"
              />
              <p class="help-block text-danger"></p>
            </div>
            <span v-for="tag in tags" :key="tag"># {{ tag }}</span>
          </div>
          <br />
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  </div>

  <hr />
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
