<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar class="mb-4" />
    <div class="flex-grow-1 px-3">
      <router-view class="mt-4" />
    </div>
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style></style>
