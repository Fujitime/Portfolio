<template>
  <router-link
    :to="{ name: 'ShowPost', params: { id: post.id } }"
    class="block hover:text-blue-500"
  >
    <h2 class="text-xl font-semibold text-gray-100 mb-2">{{ post.title }}</h2>
    <p class="text-gray-300">{{ snippet }}</p>
    <div class="flex flex-wrap mt-3">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="mr-2 mb-2 px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
      >
        <router-link :to="{ name: 'Tag', params: { tag: tag } }"
          >#{{ tag }}</router-link
        >
      </span>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["post"],
  setup(props) {
    const snippet = computed(() => {
      if (props.post.body) {
        return props.post.body.substring(0, 50) + "...";
      }
      return "";
    });
    return { snippet };
  },
};
</script>

<style></style>
