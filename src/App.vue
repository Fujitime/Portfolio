<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <Navbar />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer />
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
  
  
};
</script>

<style>
body {
  background-color: #1f2937;
}
html{
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
}

html::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}

.no-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
}

.no-scrollbar::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}

</style>
