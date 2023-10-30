<template>
  <div>
    <div
      class="bg-fixed min-h-screen flex items-center justify-start overflow-hidden background-image"
      :class="{ 'bg-loaded': imageLoaded }"
    >
      <div class="text-white text-left px-4 xl:mr-auto lg:mx-auto">
        <h2
          class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          data-aos="zoom-in-right"
        >
          Fuji <span class="text-blue-500"> Halim </span>
          Rabbani
        </h2>
        <h3
          class="ml-4 text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          data-aos="fade-in-right"
        >
          I'm
          <span
            class="typing-effect inline-block"
            ref="typingElement"
          >
          <VueWriter
              :array="textArray"
              :iterations="0"
              :typeSpeed="70"
              :eraseSpeed="50"
              :delay="1000"
              :intervals="200"
              :start="2000"
              :caret="'custom-cursor'"
            />
        </span>
        </h3>

        <a
          href="mailto:fujihalimrabani1601@gmail.com"
          class="mt-8 inline-block text-white border-2 px-4 py-2 text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="flex items-center justify-center">
            <i class="fas fa-envelope-open-text text-white text-xl mr-2"></i>
            <span class="text-white font-semibold"
              >Contact<span class="text-blue-500"> Me! </span>
            </span>
          </div>
        </a>
      </div>
    </div>
    <AboutMe id="about" />
    <ContactMe id="contacts" />
  </div>
</template>

<script>
import VueWriter from "vue-writer"; // Import the vue-writer component
import AboutMe from "../components/About.vue";
import ContactMe from "../components/Contact.vue";

export default {
  components: {
    VueWriter, // Register the VueWriter component
    AboutMe,
    ContactMe,
  },
  data() {
    return {
      imageLoaded: false,
      textArray: ["Web Developer", "Front-end Developer"],
    };
  },
  mounted() {
    this.preloadImage();
  },
  methods: {
    preloadImage() {
      const image = new Image();
      image.src = "@/assets/img/background.png";

      image.onload = () => {
        this.imageLoaded = true;
      };
    },
  },
};
</script>

<style scoped>
.background-image {
  position: relative;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url("@/assets/img/background.png");
  background-size: cover;
  background-position: center;
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
}

.background-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  z-index: -1;
}</style>
