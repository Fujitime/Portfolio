<template>
  <div>
    <router-link
      v-if="isAdmin || post.isActive"
      :to="{ name: 'ShowPost', params: { slug: post.slug } }"
      class="bg-gray-800 shadow-md rounded-lg p-4 transition duration-300 transform cursor-pointer hover:shadow-xl hover:bg-gray-900 hover:text-blue-500 flex flex-col lg:flex-row"
    >
      <img
        v-if="post.thumbnail"
        :src="post.thumbnail"
        alt="Post Thumbnail"
        class="w-32 h-32 object-cover mr-4 rounded-lg mb-4 lg:w-32 lg:h-32"
      />
      <div class="flex-grow lg:pl-4">
        <h2 class="text-xl font-semibold text-white mb-2">{{ post.title }}</h2>
        <div class="flex flex-wrap">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="mr-2 mb-1 px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <router-link :to="{ name: 'Tag', params: { tag: tag } }">
              #{{ tag }}
            </router-link>
          </span>
        </div>
        <p class="text-gray-300 mt-2 lg:text-left">{{ cleanMetaDescription }}</p>
        <p class="text-gray-400 mt-1 lg:text-left">{{ formattedCreatedAt }}</p>
        <p v-if="isAdmin" class="text-gray-400 mt-1 lg:text-left">Status: {{ post.isActive ? 'Active' : 'Inactive' }}</p>
      </div>
    </router-link>

    <div class="flex mt-4">
      <router-link
        v-if="isAdmin"
        :to="{ name: 'EditPost', params: { id: post.id } }"
        class="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
      >
        Edit Post <i class="fas fa-pencil-alt ml-1"></i>
      </router-link>
      <button
        v-if="isAdmin"
        @click="confirmDelete"
        class="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-md transition duration-300 hover:bg-red-500 hover:text-white ml-2"
      >
        Delete Post <i class="fas fa-trash ml-1"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { projectFirestore } from "@/firebase/config";
import Swal from "sweetalert2";
import { useAuth } from "@/composable/useAuth"; // Import useAuth module

export default {
  props: ["post"],
  setup(props) {
    const { isAdmin } = useAuth(); // Get isAdmin status from useAuth

    const formattedCreatedAt = computed(() => {
      if (props.post.createdAt && props.post.createdAt.seconds) {
        const createdAt = new Date(props.post.createdAt.seconds * 1000);
        const now = new Date();
        const timeDifferenceInSeconds = Math.floor((now - createdAt) / 1000);

        if (timeDifferenceInSeconds < 60) {
          return `${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
          const minutes = Math.floor(timeDifferenceInSeconds / 60);
          return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
          const hours = Math.floor(timeDifferenceInSeconds / 3600);
          return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (timeDifferenceInSeconds < 2592000) {
          const days = Math.floor(timeDifferenceInSeconds / 86400);
          return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else {
          const options = { year: "numeric", month: "long", day: "numeric" };
          return createdAt.toLocaleDateString(undefined, options);
        }
      }
      return "";
    });

    function generateLimitedDescription(text) {
      const words = text.split(" ");
      const limitedDescription = words.slice(0, 15).join(" ");
      return limitedDescription + (words.length > 15 ? "..." : "");
    }

    const metaDescription = computed(() => {
      const description = props.post.metaDescription || props.post.body || "";
      return generateLimitedDescription(description);
    });

    const cleanMetaDescription = computed(() => {
      const description = metaDescription.value;
      const parser = new DOMParser();
      const doc = parser.parseFromString(description, "text/html");
      return doc.documentElement.textContent || "";
    });

    const confirmDelete = async () => {
      if (isAdmin.value && post.value) {
        const result = await Swal.fire({
          title: "Delete Post",
          text: "Are you sure you want to delete this post?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d9534f",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          try {
            await projectFirestore.collection("posts").doc(postId.value).delete();
            await Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Post deleted successfully',
            });

            router.push({ name: "Blogposts" });
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        }
      }
    };


    return {
      formattedCreatedAt,
      cleanMetaDescription,
      confirmDelete,
      isAdmin,
    };
  },
};
</script>

