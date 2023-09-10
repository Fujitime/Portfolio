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
/* Scrollbar Track */
::-webkit-scrollbar {
  width: 12px;
  background-color: #111827; /* Dark background color */
}

/* Scrollbar Thumb */
::-webkit-scrollbar-thumb {
  background-color: #1E40AF; /* Blue thumb color */
  border-radius: 10px; /* Rounded thumb */
  border: 3px solid #111827; /* Dark border */
  transition: background-color 0.3s ease, border 0.3s ease; /* Smooth transition */
}

/* Scrollbar Thumb on Hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #ffcc00; /* Yellow thumb color on hover */
  border: 3px solid #1E40AF; /* Blue border on hover */
}

/* Scrollbar Track on Hover */
::-webkit-scrollbar:hover {
  width: 16px; /* Wider scrollbar on hover */
  background-color: #0E253E; /* Darker background color on hover */
}

/* Scrollbar Track on Active */
::-webkit-scrollbar:active {
  background-color: #111827; /* Dark background color when scrolling */
}

/* Scrollbar Corner */
::-webkit-scrollbar-corner {
  background-color: #111827; /* Dark corner color */
}

/* Scrollbar Track on Dragging */
::-webkit-scrollbar-thumb:active {
  background-color: #ffcc00; /* Yellow thumb color when dragging */
  border: 3px solid #ffcc00; /* Yellow border when dragging */
}

/* Scrollbar Animation */
@keyframes scroll-pulse {
  0% {
    background-color: #1E40AF;
    border: 3px solid #111827;
  }
  50% {
    background-color: #ffcc00;
    border: 3px solid #ffcc00;
  }
  100% {
    background-color: #1E40AF;
    border: 3px solid #111827;
  }
}

/* Apply animation to scrollbar thumb on hover */
::-webkit-scrollbar-thumb:hover {
  animation: scroll-pulse 3s infinite;
}


</style>
