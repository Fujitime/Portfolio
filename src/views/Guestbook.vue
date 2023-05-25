<template>
  <div class="pt-32 mx-5">
    <h1 class="text-3xl font-bold mb-4">Guestbook</h1>
    <div class="flex justify-end">
      <div v-if="user" class="mb-4">
        <button @click="signOut" class="bg-red-500 text-white px-4 py-2 mt-2 rounded">Sign Out</button>
      </div>
      <div v-else>
        <button @click="signInWithGoogle" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Sign In with Google</button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <UserProfile v-if="user" :userProfile="userProfile"/>

      <div class="flex justify-center">
        <div class="max-w-sm w-full">
          <MessageForm v-if="user" @sendMessage="sendMessage" />
        </div>
      </div>

      <div>
        <MessageList :messages="messages"/>
      </div>
    </div>
  </div>
</template>

<script>
import { db, signInWithGoogle, signOut, auth } from '../firebase/config.js';
import UserProfile from './guestbook/UserProfile.vue';
import MessageForm from './guestbook/MessageForm.vue';
import MessageList from './guestbook/MessageList.vue';

export default {
  name: 'Guestbook',
  components: {
    UserProfile,
    MessageForm,
    MessageList,
  },
  data() {
    return {
      newMessage: '',
      messages: [],
      user: null,
      userProfile: {},
    };
  },
  mounted() {
    // Dapatkan daftar pesan saat komponen dimuat
    this.getMessages();

    // Langganan perubahan pada koleksi pesan
    db.collection('messages').onSnapshot(() => {
      this.getMessages();
    });

    // Langganan perubahan pada status autentikasi
    auth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.getUserProfile(user.uid);
      } else {
        this.userProfile = {};
      }
    });
  },
  methods: {
    getMessages() {
      // Dapatkan daftar pesan dari Firestore
      db.collection('messages')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
          this.messages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            text: this.truncateText(doc.data().text, 43),
            timestamp: doc.data().timestamp.toDate(), // Tambahkan properti timestamp
            editing: false,
            editedText: doc.data().text,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }
      return text;
    },
    sendMessage() {
      // Pastikan pengguna telah sign in sebelum mengirim pesan
      if (!this.user) {
        return;
      }

      if (this.newMessage.trim() === '') {
        console.error('Message cannot be empty');
        return;
      }

      db.collection('messages')
        .add({
          name: this.userProfile.name,
          text: this.newMessage,
          timestamp: new Date(),
        })
        .then(() => {
          // Reset input pesan
          this.newMessage = '';
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editMessage(message) {
      message.editing = true;
    },
    saveEditedMessage(message) {
      db.collection('messages')
        .doc(message.id)
        .update({
          text: message.editedText,
        })
        .then(() => {
          message.editing = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelEditingMessage(message) {
      message.editing = false;
      message.editedText = message.text;
    },
    deleteMessage(message) {
      db.collection('messages')
        .doc(message.id)
        .delete()
        .catch((error) => {
          console.error(error);
        });
    },
    getUserProfile(userId) {
      db.collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.userProfile = doc.data();
          } else {
            this.createUserProfile(userId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createUserProfile(userId) {
      db.collection('users')
        .doc(userId)
        .set({
          name: this.user.displayName,
          email: this.user.email,
        })
        .then(() => {
          this.userProfile = {
            name: this.user.displayName,
            email: this.user.email,
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editProfile() {
      // Add logic to edit user profile
    },
    signInWithGoogle() {
      signInWithGoogle()
        .then(() => {
          // Sign in successful
        })
        .catch((error) => {
          console.error(error);
        });
    },
    signOut() {
      signOut()
        .then(() => {
          // Sign out successful
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>

