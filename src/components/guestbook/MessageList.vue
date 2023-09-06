<template>
   <div class="bg-gray-900">
    <ul class="mb-4">
      <li v-for="message in displayedMessages" :key="message.id" class="mb-4">
        <div @mouseenter="highlightedMessage = message.id" @mouseleave="highlightedMessage = null">
          <span :class="['bg-gray-800', {'bg-blue-700': highlightedMessage === message.id}] + ' text-white px-4 py-2 rounded-t-lg rounded-br-lg max-w-sm'">
            <strong class="font-bold">{{ message.name }}:</strong> {{ truncateText(message.text) }}
            <br>
            <small class="text-gray-400 italic">{{ formatDate(message.timestamp) }}</small>
          </span>
          <hr class="my-2 border-gray-700">
        </div>
      </li>
    </ul>

    <nav class="flex justify-center">
      <ul class="flex space-x-2">
        <li v-for="page in totalPages" :key="page" :class="{'text-blue-500 font-bold': page === currentPage}">
          <button @click="setCurrentPage(page)" class="px-2 py-1 rounded">{{ page }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      highlightedMessage: null,
      
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.messages.length / this.itemsPerPage);
    },
    displayedMessages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.messages.slice(startIndex, endIndex);
    },
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    truncateText(text) {
      if (text.length > 43) {
        return text.slice(0, 43) + '...';
      }
      return text;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
  },
};
</script>

<style>
/* Add CSS styling if needed */
</style>
