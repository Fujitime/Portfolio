<template>
  <div>
    <div class="container mx-auto px-4 py-8 mt-40 lg:py-16">
      <div class="mx-auto max-w-4xl">
        <div class="text-white">
          <div v-if="error" class="text-red-500">{{ error }}</div>
          <div v-else>
            <div v-if="post">
              <div class="mb-6">
                <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="text-gray-400 text-sm"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
              <div>
                <p class="post-body leading-relaxed">{{ post.body }}</p>
              </div>
              <hr class="my-6 border-gray-600" />
            </div>
            <div v-else>
              <Loading />
            </div>
            <router-link
              to="/blogs"
              class="inline-flex items-center justify-center px-4 py-2 border-2 border-green-500 text-green-400 hover:bg-green-600 hover:text-green-100 duration-300"
            >
              <i class="fas fa-arrow-left me-2"></i>Back to Posts
            </router-link>
          </div>
          <section class="comments mt-20" aria-labelledby="comment">
            <div id="disqus_thread"></div>
          </section>
        </div>
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
  mounted() {
    // Load Disqus script dynamically
    const disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = this.post.id.toString();
    };

    const script = document.createElement("script");
    script.src = "https://fujitime.disqus.com/embed.js";
    script.setAttribute("data-timestamp", +new Date());
    document.head.appendChild(script);
  },
};
</script>

<style>
.post-body {
  white-space: pre-wrap;
}
</style>
