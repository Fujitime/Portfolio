<template>
    <div class="flex items-center justify-center bg-gray-900 pt-32">
      <div class="text-center">
        <img src="@/assets/img/satoko401.jpg" alt="401" class="mx-auto mb-6 max-w-3xl w-full rounded-lg  " />
        <p class="text-white text-lg mb-4">You are not authorized to access this page.</p>
        <router-link to="/" class="text-blue-500 hover:underline">
          <i class="fa fa-arrow-left text-blue-500 mr-2"></i><span class="text-sm text-blue-500">Go back to home</span>
        </router-link>
        <p class="text-white text-sm mt-4">HTTP Status: {{ httpStatus }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from "vue-router";
  
  export default {
    name: "Unauthorized",
    components: {},
    setup() {
      const route = useRoute();
      const httpStatus = route.meta.httpStatus || ""; // Get the HTTP status from route meta
  
      return {
        httpStatus,
      };
    },
  };
  </script>
  
  <style>
  /* Customize the styles if needed */
  </style>
  