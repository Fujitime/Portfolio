<template>
    <div>
      <h2>Profile</h2>
      <p>Name: {{ userProfile.name }}</p>
      <p>Email: {{ userProfile.email }}</p>
      <button @click="editProfile">Edit Profile</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userProfile: {
        type: Object,
        required: true,
      },
    },
    methods: {
      editProfile() {
        // Tambahkan logika untuk mengedit profil pengguna
        this.$emit('editProfile');
      },
    },
  };
  </script>
  
  <style>
  /* Tambahkan CSS styling jika diperlukan */
  </style>
  