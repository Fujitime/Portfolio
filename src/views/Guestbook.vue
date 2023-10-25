<template>
  <div class="pt-32 mx-5">
    <h1 class="text-3xl font-bold mb-4 ">Guestbook <i class="fas fa-pencil-alt"></i></h1>
    <p class="mb-2">Berikan jejak Anda di guestbook ini. Ceritakan pendapat Anda dalam beberapa kata. <i class="far fa-smile"></i></p>
    <div class="flex justify-end">
      <div v-if="user" class="mb-4">
        <button @click="confirmSignOut" class="bg-red-500 text-white px-4 py-2 mt-2 rounded"><i class="fas fa-sign-out-alt"></i> Sign Out</button>      </div>
      <div v-else>
        <button @click="signInWithGoogle" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"><i class="fab fa-google"></i> Sign In with Google</button>
      </div>
    </div>
    <UserProfile v-if="user" :userProfile="userProfile"/>
    <div :class="containerClass">
      <MessageForm v-if="user" @sendMessage="sendMessage" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div class="">
        <MessageList :messages="messages"/>
      </div>
  
    </div>
  </div>
</template>

<script>
import { db, signInWithGoogle, signOut, auth } from '../firebase/config.js';
import UserProfile from '../components/guestbook/UserProfile.vue';
import MessageForm from '../components/guestbook/MessageForm.vue';
import MessageList from '../components/guestbook/MessageList.vue';
import Swal from "sweetalert2";
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
      lastVisibleMessage: null,
    };
  },
  mounted() {
  this.loadInitialMessages();

  db.collection('messages').orderBy('timestamp', 'desc').get()
    .then(querySnapshot => {
      this.messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        text: this.truncateText(doc.data().text, 43),
        timestamp: doc.data().timestamp.toDate(),
        editing: false,
        editedText: doc.data().text,
      }));
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      this.lastVisibleMessage = lastVisible;
    })
    .catch(error => {
      console.error(error);
    });

  auth.onAuthStateChanged(user => {
    this.user = user;
    if (user) {
      this.getUserProfile(user.uid);
    } else {
      this.userProfile = {};
    }
  });
},
  computed: {
    containerClass() {
      return this.isMobile() ? 'flex justify-center' : 'flex justify-end';
    },
  },  
  methods: {
    isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true
   }
 },
    loadInitialMessages() {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(10) // Mengambil 10 pesan pertama
      .get()
      .then(querySnapshot => {
        this.messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          text: this.truncateText(doc.data().text, 43),
          timestamp: doc.data().timestamp.toDate(),
          editing: false,
          editedText: doc.data().text,
        }));
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.lastVisibleMessage = lastVisible;
      })
      .catch(error => {
        console.error(error);
      });
  },

  loadMoreMessages() {
  if (!this.lastVisibleMessage) {
    return;
  }
  db.collection('messages')
    .orderBy('timestamp', 'desc')
    .startAfter(this.lastVisibleMessage)
    .limit(10)
    .get()
    .then(querySnapshot => {
      const newMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        text: this.truncateText(doc.data().text, 43),
        timestamp: doc.data().timestamp.toDate(),
        editing: false,
        editedText: doc.data().text,
      }));
      this.messages = this.messages.concat(newMessages);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      this.lastVisibleMessage = lastVisible;
    })
    .catch(error => {
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
  if (!this.validateMessage()) {
    return;
  }

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  if (!userId) {
    this.error = 'User is not authenticated';
    return;
  }

  // Periksa apakah pengguna sudah mengirim pesan hari ini
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  db.collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const lastSentTimestamp = userData.lastSentTimestamp;

        if (lastSentTimestamp && lastSentTimestamp.toDate() >= today) {
          this.error = 'You have already sent a message today';
        } else {
          this.error = '';

          // Kirim pesan
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
            })
            .catch((error) => {
              console.error(error);
              this.error = 'Failed to send message. Please try again.';
            });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      this.error = 'Failed to check user data. Please try again.';
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
      this.error = 'Failed to check user data. Please try again.';
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
    confirmSignOut() {
      Swal.fire({
        title: 'Sign Out',
        text: 'Are you sure you want to sign out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, sign me out!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.signOut();
        }
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

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&family=Yatra+One&display=swap');
ul {
  list-style: none;
}
.keren{
  font-family: 'Ubuntu', sans-serif;
}

</style>

