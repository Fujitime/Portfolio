<template>
  <form @submit.prevent="sendMessage">
    <input v-model="newMessage" placeholder="Write a message..." />
    <button type="submit">Send</button>
    <p v-if="error" class="error">{{ error }}</p>
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
    sendMessage() {
      if (this.newMessage.trim() === '') {
        this.error = 'Message cannot be empty';
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
          this.newMessage = ''; // Reset the message input field
        })
        .catch((error) => {
          console.error(error);
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
