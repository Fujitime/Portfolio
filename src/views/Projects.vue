<template>
  <div class="container py-5">
    <h1 class="text-center fw-bold mb-5">My Projects</h1>
    <div class="row">
      <div
        class="col-lg-4 mb-5"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="card h-100">
          <img :src="project.image" class="card-img-top" alt="Project Image" />
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
          <div class="card-footer">
            <a :href="project.link" class="btn btn-primary">View Project</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [
        {
          title: "Project 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "https://via.placeholder.com/350x200",
          link: "https://example.com/project1",
        },
        {
          title: "Project 2",
          description:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/350x200",
          link: "https://example.com/project2",
        },
        {
          title: "Project 3",
          description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://via.placeholder.com/350x200",
          link: "https://example.com/project3",
        },
      ],
    };
  },
};
</script>
