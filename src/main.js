import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// jquery
import jQuery from "jquery";
window.$ = jQuery;

// fontawesome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// clean blog
import "@/assets/css/clean-blog.css";
createApp(App).use(router).mount("#app");
