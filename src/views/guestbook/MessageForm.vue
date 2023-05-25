<template>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Tulis pesan..." />
      <button type="submit">Kirim</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
  <script>
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
          this.error = 'Pesan tidak boleh kosong';
          return;
        }
  
        this.error = '';
  
        this.$emit('sendMessage', this.newMessage);
        this.newMessage = '';
      },
    },
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  