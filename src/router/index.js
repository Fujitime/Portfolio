import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Skills from "@/views/Skills.vue";

import ShowPost from "../views/posts/Show.vue";
import Guestbook from "../views/Guestbook.vue"
import Tag from "../views/posts/Tag.vue";
import BlogPosts from "@/views/BlogPosts.vue";
import Projects from "@/views/Projects.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blogs",
    name: "Blogposts",
    component: BlogPosts,
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
  },

  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/guestbook",
    name: "Guestbook",
    component: Guestbook,
  },
  {
    path: "/posts/:id",
    name: "ShowPost",
    component: ShowPost,
    props: true,
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: Tag,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
