<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <Navbar />
    <div class="flex-grow">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  beforeMount() {
            console.log('base url: ' + process.env.API_BASE_URL);
            console.log('base url: ' + process.env.VUE_APP_TITLE);
            console.log('base url: ' + process.env.VUE_MY_VAR);
        }
};
</script>

<style>
body {
  background-color: #1f2937;
}
</style>
