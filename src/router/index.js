import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Skills from "@/views/Skills.vue";
import ShowPost from "../views/posts/Show.vue";
import CreatePost from "../views/admin/Create.vue";
import Guestbook from "../views/Guestbook.vue";
import Tag from "../views/posts/Tag.vue";
import BlogPosts from "@/views/BlogPosts.vue";
import Projects from "@/views/Projects.vue";
import EditPost from "@/views/admin/EditPost.vue";
import CreateProject from "@/views/admin/CreateProject.vue"; // Import CreateProject component
import CreateSkill from "@/views/admin/CreateSkill.vue"; // Import CreateSkill component
import EditSkill from "@/views/admin/EditSkill.vue"; // Import EditSkill component
import Unauthorized from "@/views/Unauthorized.vue";
import { useAuth } from "@/composables/useAuth";

const { isAdmin, isAuthenticated } = useAuth();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/posts",
    name: "Blogposts",
    component: BlogPosts,
    meta: {
      title: "Blog Posts",
    },
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
    meta: {
      title: "Skills",
    },
  },
  {
    path: "/skill/create",
    name: "CreateSkill",
    component: CreateSkill,
    meta: {
      title: "Create Skill",
      httpStatus: 403,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAdmin.value) {
        next();
      } else {
        next("/unauthorized");
      }
    },
  },
  {
    path: "/skill/edit/:id",
    name: "EditSkill",
    component: EditSkill,
    props: true,
    meta: {
      title: "Edit Skill",
      httpStatus: 403,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAdmin.value) {
        next();
      } else {
        next("/unauthorized");
      }
    },
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      httpStatus: 403,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAdmin.value) {
        next();
      } else {
        next("/unauthorized");
      }
    },
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Edit Post",
      httpStatus: 403,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAdmin.value) {
        next();
      } else {
        next("/unauthorized");
      }
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      title: "Projects",
    },
  },
  {
    path: "/project/create",
    name: "CreateProject",
    component: CreateProject,
    meta: {
      title: "Create Project",
      httpStatus: 403,
      requiresAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      if (isAdmin.value) {
        next();
      } else {
        next("/unauthorized");
      }
    },
  },
  {
    path: "/guestbook",
    name: "Guestbook",
    component: Guestbook,
    meta: {
      title: "Guestbook",
    },
  },
  {
    path: "/posts/:slug",
    name: "ShowPost",
    component: ShowPost,
    props: true,
    meta: {
      title: "View Post",
    },
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: Tag,
    meta: {
      title: "Posts with Tag",
    },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    meta: {
      title: "Access Denied",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title || "Fujitime";
  document.title = pageTitle;
  next();
});

export default router;
