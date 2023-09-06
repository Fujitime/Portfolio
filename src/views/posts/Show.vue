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
                <div class="flex justify-between">
                  <div class="text-gray-400">
                    <i class="fas fa-user"></i>
                    {{ post.author || 'Fuji Halim Rabbani' }}
                  </div>
                  <div class="flex items-center text-gray-400">
                    <div class="mr-2">
                      <i class="fas fa-clock"></i>
                    </div>
                    <div>
                      <span>{{ estimatedReadTime(post.body) }}</span>
                      <span class="ml-1 text-sm">min read</span>
                    </div>
                  </div>
                </div>



              </div>
              <div>
                <div class="post-body leading-relaxed" v-html="post.body"></div>
              </div>
              <hr class="my-6 border-gray-600" />
            </div>
            <div v-else>
              <Loading />
            </div>
            <div class="flex flex-initial space-x-5 mx-5">
              <router-link
                to="/posts"
                class="inline-flex items-center justify-center px-4 py-2 border-2 border-green-500 text-green-400 hover:bg-green-600 hover:text-green-100 duration-300"
              >
              <i class="fas fa-arrow-left me-2"></i><span>Back</span><span class="hidden sm:block ml-1"> to Posts</span>
              </router-link>
              <button
                class="inline-flex items-center justify-center px-4 py-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-blue-100 duration-300"
                @click="showDisqus = true"
              >
                <i class="fas fa-comment me-2"></i><span class="hidden sm:block ">View</span><span class="ml-1" >Comments</span>
              </button>
              <div class="relative inline-block text-left dropdown">
                <button
                  class="justify-end py-2"
                  @click="toggleDropdown"
                >
                  <i class="fas fa-share me-2"></i><span class="hidden sm:block">Share</span>
                </button>
                <div v-if="showDropdown" class="origin-top-right flex absolute right-0 mt-2 w-16 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 ring-opacity-5">
                <div class="py-2 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    @click="copyLinkToClipboard"
                    class=" p-3 text-white hover:bg-gray-700 w-full"
                    role="menuitem"
                  >
                    <i class="fas fa-copy text-lg"></i>
                  </button>
                  <button
                    @click="shareOnSocialMedia('facebook')"
                    class=" p-3 text-white hover:bg-gray-700 w-full"
                    role="menuitem"
                  >
                    <i class="fab fa-facebook text-lg"></i>
                  </button>
                  <button
                    @click="shareOnSocialMedia('twitter')"
                    class=" p-3 text-white hover:bg-gray-700 w-full"
                    role="menuitem"
                  >
                    <i class="fab fa-twitter text-lg"></i>
                  </button>
                </div>
              </div>

              </div>
            </div>
            <Disqus v-if="showDisqus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2';
import Loading from "@/components/Loading.vue";
import { getPost } from "@/composables/getPost";
import Disqus from "@/components/Disqus.vue";
import { useRoute } from "vue-router";

export default {
  props: ["id"],
  components: {
    Loading,
    Disqus,
  },
  setup() {
    const route = useRoute();
    const slug = route.params.slug;
    const { post, error, load } = getPost(slug);
    const showDisqus = ref(false);
    const showDropdown = ref(false);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const copyLinkToClipboard = () => {
      const dummyInput = document.createElement("input");
      document.body.appendChild(dummyInput);
      dummyInput.setAttribute("value", window.location.href);
      dummyInput.select();
      document.execCommand("copy");
      document.body.removeChild(dummyInput);

      Swal.fire({
        icon: 'success',
        title: 'Link Copied!',
        showConfirmButton: false,
        timer: 1500
      });
    }

    const estimatedReadTime = (text) => {
      const words = text.split(/\s+/).length; // Split by spaces to count words
      return Math.ceil(words / 250);
    };

    const shareOnSocialMedia = (platform) => {
      const encodedTitle = encodeURIComponent(post.title);
      const encodedUrl = encodeURIComponent(window.location.href);
      let shareLink = "";

      if (platform === "facebook") {
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      } else if (platform === "twitter") {
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      }

      if (shareLink) {
        window.open(shareLink, "_blank");
      }
    };

    // Inside the setup function
    onMounted( () => {
      load(); // Wait for the post to load
    });


    return {
      post,
      error,
      showDisqus,
      showDropdown,
      toggleDropdown,
      estimatedReadTime,
      shareOnSocialMedia,
      copyLinkToClipboard,
    };
  },
};
</script>

<style>
.post-body {
  white-space: pre-wrap;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown .origin-top-right {
  right: 0;
}
</style>
