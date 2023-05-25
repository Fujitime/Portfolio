<template>
    <div class="pt-32 max-w-full mx-5 bg-dark-900 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold mb-2">
            <i class="fas fa-pencil-alt"></i> Guestbook
          </h1>
          <div v-if="user" class="">
            <button @click="signOut" class="text-blue-500 hover:text-blue-600 py-5">
              <i class="fas fa-sign-out-alt fa-lg"></i><span class="text-sky-800">Logout</span>
            </button>
          </div>
  
          <div v-else>
            <button
              @click="signInWithGoogle"
              class="bg-sky-900 hover:bg-red-600 text-white rounded py-2 px-4 mt-2"
            >
              <i class="fab fa-google mr-2"></i>Sign In with Google
            </button>
          </div>
        </div>
        <div class="text-right">
          <div v-if="user" class="text-sm">
            <p class="mb-1"><i class="fa-solid fa-user"></i></p>
            <p class="text-sm font-semibold">{{ userProfile.name }}</p>
            <p class="text-sm font-semibold">{{ userProfile.email }}</p>
          </div>
        </div>
      </div>
  
      <form @submit.prevent="sendMessage" v-if="user" class="mb-4">
        <input
          v-model="newMessage"
          placeholder="Tulis pesan..."
          class="w-full px-3 py-2 bg-gray-800 rounded focus:outline-none focus:border-indigo-500 text-white"
        />
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-4 mt-2"
        >
          <i class="fas fa-paper-plane mr-2"></i>Kirim
        </button>
      </form>
  
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
          class="border-b border-gray-300 py-2"
        >
          <strong>{{ message.name }}:</strong>
          <span v-if="message.editing">
            <input
              v-model="message.editedText"
              class="px-3 py-2 bg-gray-800 rounded focus:outline-none focus:border-indigo-500 text-white"
            />
            <button
              @click="saveEditedMessage(message)"
              class="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2"
            >
              <i class="fas fa-save"></i>
            </button>
            <button
              @click="cancelEditingMessage(message)"
              class="bg-gray-500 hover:bg-gray-600 text-white rounded py-1 px-2"
            >
              <i class="fas fa-times"></i>
            </button>
          </span>
          <span v-else>
            {{ message.text }}
            <button
              @click="editMessage(message)"
              class="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="deleteMessage(message)"
              class="bg-red-500 hover:bg-red-600 text-white rounded py-1 px-2"
>
<i class="fas fa-trash"></i>
</button>
</span>
</li>
</ul>

  </div>
</template>
<script>
import { ref } from "vue";
import { db, signInWithGoogle, signOut, auth } from "../firebase/config.js";

export default {
  name: "Guestbook",
  data() {
    return {
      newMessage: "",
      messages: [],
      user: null,
      userProfile: {},
    };
  },
  mounted() {
    this.getMessages();
    db.collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      this.getMessages();
    });
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
      db.collection("messages")
        .orderBy("timestamp", "desc")
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
      if (!this.user) {
        return;
      }
      if (this.newMessage.trim() === "") {
        return;
      }
      db.collection("messages")
        .add({
          name: this.userProfile.name,
          text: this.newMessage,
          timestamp: new Date(),
        })
        .then(() => {
          this.newMessage = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editMessage(message) {
      message.editing = true;
    },
    saveEditedMessage(message) {
      if (message.editedText.trim() === "") {
        return;
      }
      db.collection("messages")
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
      db.collection("messages")
        .doc(message.id)
        .delete()
        .catch((error) => {
          console.error(error);
        });
    },
    getUserProfile(userId) {
      db.collection("users")
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
      db.collection("users")
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
  