<template>
  <form @submit.prevent="sendMessage" class="mb-4 bg-gray-900 p-4 rounded-lg">
    <div class="flex">
      <input v-model="newMessage" placeholder="Write a message..." class="flex-1 border border-gray-300 bg-gray-800 focus:outline-none focus:border-indigo-500 text-white rounded px-4 py-2 mr-2" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </div>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </form>
</template>

<script>
import { db, auth } from '@/firebase/config.js';

export default {
  data() {
    return {
      newMessage: '',
      error: '',
    };
  },
  methods: {
    validateMessage() {
      if (this.newMessage.trim() === '') {
        this.error = 'Message cannot be empty';
        return false;
      }
      if (this.newMessage.trim().split(' ').length > 500) {
        this.error = 'Message cannot exceed 500 words';
        return false;
      }
      return true;
    },
    sendMessage() {
      if (!this.validateMessage()) {
        return;
      }

      this.error = '';

      const user = auth.currentUser;
      const userName = user ? user.displayName : 'Anonymous';

      db.collection('messages')
        .add({
          name: userName,
          text: this.newMessage,
          timestamp: new Date(),
        })
        .then(() => {
          this.newMessage = '';
        })
        .catch((error) => {
          console.error(error);
          this.error = 'Failed to send message. Please try again.';
        });
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
