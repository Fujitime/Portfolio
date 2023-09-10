<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-0 transition duration-300 z-50"
    :class="{ 'bg-opacity-100': scrolled }"
  >
    <div class="container mx-auto px-3 py-3 xl:py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="m-5 mx-4">
            <router-link
              :to="{ name: 'Home' }"
              class="flex items-center space-x-1"
            >
              <i class="fas fa-mountain text-4xl text-fuji"></i>
            </router-link>
          </div>
          <div class="hidden sm:block">
            <ul class="flex items-center space-x-5">
              <li>
                <router-link
                  :to="{ name: 'Home' }"
                  class="no-underline text-gray-200 hover:text-gray-400 font-semibold py-1"
                >
                  🏠 Home
                </router-link>
              </li>
              <!-- <li>
                <router-link
                  :to="{ name: 'Skills' }"
                  class="no-underline text-gray-200 hover:text-gray-400 font-semibold py-1"
                >
                  <i class="fa fa-cogs mr-2"></i>
                  Tools
                </router-link>
              </li> -->

              <li>
                <router-link
                  :to="{ name: 'Blogposts' }"
                  class="no-underline text-gray-200 hover:text-gray-400 font-semibold py-1"
                >
                  <i class="fa fa-newspaper"></i> Posts
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'Projects' }"
                  class="no-underline text-gray-200 hover:text-gray-400 font-semibold py-1"
                >
                  <i class="fa fa-folder"></i> Projects
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'Guestbook' }"
                  class="no-underline text-gray-200 hover:text-gray-400 font-semibold py-1"
                >
                <i class="fas fa-pen-square"></i> Guestbook
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="hidden sm:block">
          <ul class="flex items-center space-x-5">
            <li class="flex items-center">
              <a
                href="https://cdn.discordapp.com/attachments/1086608997802577964/1109414776217546782/Fuji_Halim_Rabbani.pdf"
                class="px-3 py-1 border-2 border-green-100 text-sky-400"
                download
              >
                <i class="fas fa-download fa-fw text-sm"></i>
                <span class="text-sm">Download CV</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sm:hidden">
          <a href="#" class="relative px-5 z-30" @click="toggleMobileMenu">
            <p
              class="text-gray-200 font-semibold tracking-wide hover:bg-gray-900 hover:bg-opacity-30 rounded px-2 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-9 w-9"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </p>
          </a>
          <div
            class="fixed top-0 right-0 z-40 h-screen w-full bg-gray-900 transition"
            :class="{
              'invisible opacity-0': !mobileMenuOpen,
              'visible opacity-40': mobileMenuOpen,
            }"
          ></div>
          <div
            class="fixed flex justify-end top-0 right-0 z-50 w-96 px-4 mt-14 transition"
            :class="{
              'invisible opacity-0': !mobileMenuOpen,
              'visible opacity-100': mobileMenuOpen,
            }"
          >
            <ul
              class="flex flex-col bg-gray-300 w-1/2 rounded shadow-lg overflow-hidden lg:shadow-none lg:rounded-none absolute"
            >
              <li class="flex justify-end items-center">
                <div class="p-2" @click="toggleMobileMenu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-10 w-10 text-gray-500 hover:text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </li>

              <li class="flex items-center">
                <router-link
                  :to="{ name: 'Home' }"
                  class="flex flex-1 text-md text-gray-700 hover:bg-gray-200 hover:text-sky-500 font-semibold px-4 py-2"
                >
                  🏠 Home
                </router-link>
              </li>

              <!-- <li class="flex items-center">
                <router-link
                  :to="{ name: 'Skills' }"
                  class="flex flex-1 text-md text-gray-700 hover:bg-gray-200 hover:text-sky-500 font-semibold px-4 py-2"
                >
                  <i class="fa fa-cogs mr-2"></i> Tools
                </router-link>
              </li> -->

              <li class="flex items-center">
                <router-link
                  :to="{ name: 'Blogposts' }"
                  class="flex flex-1 text-md text-gray-700 hover:bg-gray-200 hover:text-sky-500 font-semibold px-4 py-2"
                >
                  <i class="fa fa-newspaper"></i>
                  <span class="pl-2 pb-1"> Posts</span>
                </router-link>
              </li>
              <li class="flex items-center">
                <router-link
                  :to="{ name: 'Projects' }"
                  class="flex flex-1 text-md text-gray-700 hover:bg-gray-200 hover:text-sky-500 font-semibold px-4 py-2"
                >
                  <i class="fa fa-folder"></i>
                  <span class="pl-2 pb-1 top-0">Projects</span>
                </router-link>
              </li>
              <li class="flex items-center">
                <router-link
                  :to="{ name: 'Guestbook' }"
                  class="flex flex-1 text-md text-gray-700 hover:bg-gray-200 hover:text-sky-500 font-semibold px-4 py-2"
                >
                <i class="fas fa-pen-square"></i> 
                  <span class="pl-2 pb-1 top-0">Guestbook</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.css";

.text-fuji {
  color: blue;
}
</style>
