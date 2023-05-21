import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";

// tailwind
import "./assets/css/output.css";

// fontawesome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const app = createApp(App);
app.use(router);
app.mount("#app");

AOS.init({
  once: true,
});
