<template>
  <div class="bg-gray-900 py-10 pt-40">
    <div class="container mx-auto px-10">
      <router-link
        v-if="isAdmin"
        :to="{ name: 'CreateProject' }" 
        class="inline-flex items-center justify-center px-4 m-5 py-2 border-2 border-green-500 text-green-400 hover:bg-green-600 hover:text-green-100 duration-300"
      >
        <i class="fas fa-plus me-2"></i>Create Project
      </router-link>
      <h1 class="text-3xl font-bold text-center text-white mb-10 keren">My Projects</h1>
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
            <div class="flex flex-col flex-grow  justify-between px-6 py-4">
              <div>
                <div class="font-bold font text-xl mb-2 text-white">
                  {{ project.title }}
                </div>
                <p class="text-gray-400 text-base">{{ project.description }}</p>
              </div>
              <div class="flex justify-end items-center">
                <div class="flex justify-end items-center my-5">
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all ml-2"
                >
                  <i class="fas fa-eye mr-1"></i> View Project
                </a>
                <a
                  v-if="project.linkCode"
                  :href="project.linkCode"
                  target="_blank"
                  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all ml-2"
                >
                  <i class="fas fa-code mr-1"></i> View Code
                </a>
                <button
                  v-if="isAdmin"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all ml-2"
                  @click="confirmDeleteProject(project.id)"
                >
                  <i class="fas fa-trash"></i>
              </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="projects.length === 0"></div>
      <div v-if="loading" class="flex justify-center mt-10">
        <Loading />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'; // Import the ref function from the Vue Composition API
import { useAuth } from "@/composables/useAuth";
import { projectFirestore } from "@/firebase/config";
;
import Loading from "@/components/Loading.vue";
import Swal from "sweetalert2";

const { isAdmin } = useAuth();
const projects = ref([]);
const loading = ref(true);

const fetchProjects = () => {
  const projectsCollection = projectFirestore.collection("projects");

  projectsCollection
    .get()
    .then((querySnapshot) => {
      const fetchedProjects = [];
      querySnapshot.forEach((doc) => {
        const project = {
          id: doc.id,
          ...doc.data(),
        };
        fetchedProjects.push(project);
      });
      projects.value = fetchedProjects; // Update reactive projects data
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    })
    .finally(() => {
      loading.value = false; // Set loading to false when data is fetched
    });
};

const confirmDeleteProject = (projectId) => {
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to delete this project?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProject(projectId);
    }
  });
};

const deleteProject = (projectId) => {
  projectFirestore
    .collection("projects")
    .doc(projectId)
    .delete()
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Project deleted successfully",
      });
      fetchProjects(); // Refresh the projects after deletion
    })
    .catch((error) => {
      console.error("Error deleting project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the project",
      });
    });
};

fetchProjects(); // Fetch projects when the component is mounted
</script>
<style scoped>
/* Import font from Google Fonts */


  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&family=Yatra+One&display=swap');


/* Apply font styles */
.font {
  font-family: 'Ubuntu', sans-serif;
}
.keren{
  font-family: 'Ubuntu', sans-serif;
}

/* ... Gaya lainnya ... */
</style>