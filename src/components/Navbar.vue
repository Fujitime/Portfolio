<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <img
          src="@/assets/img/logo.png"
          alt="Fujitime logo"
          style="max-height: 150px"
        />
      </router-link>

      <!-- Hamburger Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="showMenu = !showMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Menu Items -->
      <div
        class="collapse navbar-collapse justify-content-end"
        :class="{ show: showMenu }"
        id="navbarNav"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >🏠 Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'About' }"
              ><i class="fa fa-info-circle"></i> About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Blogposts' }"
              ><i class="fa fa-newspaper"></i> Posts</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Projects' }"
              ><i class="fa fa-folder"></i> Projects</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style></style>
