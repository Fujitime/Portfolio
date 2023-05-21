<template>
  <div class="bg-gray-900 py-10 pt-40">
    <div class="container mx-auto px-10">
      <h1 class="text-3xl font-bold text-center text-white mb-10">Projects</h1>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="aos-item"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <div
            class="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl flex flex-col"
          >
            <div class="relative">
              <img
                :src="project.image"
                class="w-full h-48 object-cover rounded-t-lg"
                alt="Project Image"
              />
              <div class="flex absolute right-0 top-0 bg-gray-700 p-2">
                <div
                  v-for="(language, langIndex) in project.languages"
                  :key="langIndex"
                  class=""
                >
                  <img
                    :src="language"
                    class="w-5 h-5 bg-cover mr-2"
                    alt="Language Icon"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col flex-grow justify-between px-6 py-4">
              <div>
                <div class="font-bold text-xl mb-2 text-white">
                  {{ project.title }}
                </div>
                <p class="text-gray-400 text-base">{{ project.description }}</p>
              </div>
              <div class="flex justify-end">
                <a
                  :href="project.link"
                  target="_blank"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="flex justify-center mt-10">
        <Loading />
      </div>
      <div v-else-if="projects.length === 0" class="flex justify-center mt-10">
        <p class="text-gray-400">No projects found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
import Loading from "@/components/Loading.vue";
export default {
  components: {
    Loading,
  },
  name: "Projects",
  data() {
    return {
      projects: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      const projectsCollection = projectFirestore.collection("projects");

      projectsCollection
        .get()
        .then((querySnapshot) => {
          const projects = [];
          querySnapshot.forEach((doc) => {
            const project = {
              id: doc.id,
              ...doc.data(),
            };
            projects.push(project);
          });
          this.projects = projects;
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
