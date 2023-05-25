<template>
  <div class="pt-32">
    <h1>Guestbook</h1>

    <div v-if="user">
      <p>Signed in as: {{ user.displayName }}</p>
      <button @click="signOut">Sign Out</button>
    </div>
    <div v-else>
      <button @click="signInWithGoogle">Sign In with Google</button>
    </div>

    <UserProfile v-if="user" :userProfile="userProfile" @editProfile="editProfile" />

    <MessageForm v-if="user" @sendMessage="sendMessage" />

    <MessageList :messages="messages" @editMessage="editMessage" @deleteMessage="deleteMessage" />
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
    db.collection('messages').onSnapshot((snapshot) => {
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
            text: doc.data().text,
            editing: false,
            editedText: doc.data().text,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendMessage() {
      // Pastikan pengguna telah sign in sebelum mengirim pesan
      if (!this.user) {
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
      // Tambahkan logika untuk mengedit profil pengguna
    },
    signInWithGoogle() {
      signInWithGoogle()
        .then(() => {
          // Sign in berhasil
        })
        .catch((error) => {
          console.error(error);
        });
    },
    signOut() {
      signOut()
        .then(() => {
          // Sign out berhasil
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
