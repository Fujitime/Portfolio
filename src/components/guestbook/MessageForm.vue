<template>
  <form @submit.prevent="sendMessage" class="mb-4 bg-gray-900 p-4 rounded-lg">
    <div class="flex">
      <input v-model="newMessage" placeholder="Write a message..." class="flex-1 border border-gray-300 bg-gray-800 focus:outline-none focus:border-indigo-500 text-white rounded px-4 py-2 mr-2" />
      <button :disabled="isSending || isButtonDisabled" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </div>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </form>
</template>

<script>
import { db, auth } from '@/firebase/config.js';
import Swal from "sweetalert2"; // Import SweetAlert
export default {
  data() {
    return {
      newMessage: '',
      error: '',
      isSending: false,
      isButtonDisabled: false,
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
      if (!this.validateMessage() || this.isSending) {
        return;
      }

      this.isSending = true;
      this.isButtonDisabled = true; 
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      if (!userId) {
        this.error = 'User is not authenticated';
        this.isSending = false;
        this.isButtonDisabled = false;
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      db.collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            const lastSentTimestamp = userData.lastSentTimestamp ? userData.lastSentTimestamp.toDate() : null;

            if (lastSentTimestamp >= today) {
              this.error = 'You have already sent a message today';
              this.isSending = false;
              this.isButtonDisabled = false;
            } else {
              this.error = '';

              const userName = user.displayName || 'Anonymous';

              db.collection('messages')
              .add({
                name: userName,
                text: this.newMessage,
                timestamp: new Date(),
              })
              .then(() => {
                this.newMessage = '';
                this.updateLastSentTimestamp(userId, today);
                Swal.fire({ // Show SweetAlert on success
                  title: 'Message Sent',
                  text: 'Thank you for sending your message!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                setTimeout(() => {
                  this.isSending = false;
                  this.isButtonDisabled = false;
                }, 5000);
              })
                .catch((error) => {
                  console.error(error);
                  this.error = 'Failed to send message. Please try again.';
                  this.isSending = false;
                  this.isButtonDisabled = false;
                });
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.error = 'Failed to check user data. Please try again.';
          this.isSending = false;
          this.isButtonDisabled = false;
        });
    },
    updateLastSentTimestamp(userId, today) {
      db.collection('users')
        .doc(userId)
        .set({ lastSentTimestamp: today }, { merge: true })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

