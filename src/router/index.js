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
import CreateProject from "@/views/admin/CreateProject.vue";
import CreateSkill from "@/views/admin/CreateSkill.vue";
import EditSkill from "@/views/admin/EditSkill.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import { useAuth } from "@/composables/useAuth";

const { isAdmin, isAuthenticated } = useAuth();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Fujitime | Home",
    },
  },
  {
    path: "/posts",
    name: "Blogposts",
    component: BlogPosts,
    meta: {
      title: "Fujitime | Posts",
    },
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
    meta: {
      title: "Fujitime | Skills",
    },
  },
  {
    path: "/skill/create",
    name: "CreateSkill",
    component: CreateSkill,
    meta: {
      title: "Fujitime | Create Skill",
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
      title: "Fujitime | Edit Skill",
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
      title: "Fujitime | Create Post",
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
      title: "Fujitime | Edit Post",
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
      title: "Fujitime | Projects",
    },
  },
  {
    path: "/project/create",
    name: "CreateProject",
    component: CreateProject,
    meta: {
      title: "Fujitime | Create Project",
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
      title: "Fujitime | Guestbook",
    },
  },
  {
    path: "/posts/:slug",
    name: "ShowPost",
    component: ShowPost,
    props: true,
    beforeEnter: (to, from, next) => {
      const slug = to.params.slug.toUpperCase();
      const title = slug.replace(/-/g, ' ');
      document.title = title;
      next();
    },
    meta: {
      title: "", // Leave it empty for this route
    },
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: Tag,
    meta: {
      title: "Fujitime | Posts with Tag",
    },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    meta: {
      title: "Fujitime | Access Denied",
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
