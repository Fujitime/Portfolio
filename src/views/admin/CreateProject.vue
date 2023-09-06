<template>
  <div v-if="isAdmin" class="container mx-auto px-10 py-32">
    <h1 class="text-3xl font-bold text-center text-white mb-10">Create New Project</h1>

    <form @submit.prevent="createProject" class="max-w-md mx-auto">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="mb-4">
            <label for="title" class="block text-white font-bold mb-2">Title</label>
            <input v-model="title" type="text" id="title" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
          <div class="mb-4">
            <label for="image" class="block text-white font-bold mb-2">Image URL</label>
            <input v-model="image" type="text" id="image" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
          <div class="mb-4">
            <label for="linkCode" class="block text-white font-bold mb-2">Project Link Code</label>
            <input v-model="linkCode" type="text" id="linkCode" class="w-full bg-gray-800 text-white rounded px-4 py-2">
          </div>
          <div class="mb-4">
            <label for="link" class="block text-white font-bold mb-2">Project Link</label>
            <input v-model="link" type="text" id="link" class="w-full bg-gray-800 text-white rounded px-4 py-2">
          </div>
        </div>
        <div>
          <div class="mb-4">
            <label for="description" class="block text-white font-bold mb-2">Description</label>
            <textarea v-model="description" id="description" class="w-full bg-gray-800 text-white rounded px-4 py-2" required></textarea>
          </div>
          <div class="mb-4">
            <LanguageSelector :skills="skills" :selectedLanguages="selectedLanguages" />
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <button
          :disabled="isCreating || created"
          type="button"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          @click="confirmCreateProject"
        >
          {{ isCreating ? 'Creating...' : 'Create Project' }}
        </button>
      </div>
    </form>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-32">
    <Forbidden/>
  </div>
</template>

<script>
import Forbidden from "@/components/Forbidden.vue";
import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { projectFirestore } from "@/firebase/config.js";
import Swal from "sweetalert2";
import LanguageSelector from "@/components/LanguageSelector.vue";
import { useRouter } from "vue-router";

export default {
  name: "CreateProject",
  components: {
    LanguageSelector,
    Forbidden,

  },
  setup() {

    const { isAdmin } = useAuth();
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const image = ref("");
    const selectedLanguages = ref([]);
    const skills = ref([]);
    const link = ref("");
    const isCreating = ref(false);
    const created = ref(false);
    const linkCode = ref("");

    const createProject = async () => {
      if (!validateForm()) {
        return;
      }

      isCreating.value = true;

      const newProject = {
        title: title.value,
        description: description.value,
        image: image.value,
        languages: selectedLanguages.value.map((language) => language.image),
        link: link.value,
        linkCode: linkCode.value, // Add linkCode to the new project object
      };

      try {
        await projectFirestore.collection("projects").add(newProject);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project created successfully",
        });

        router.push({ name: "Projects" });
        created.value = true;
      } catch (error) {
        console.error("Error creating project:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while creating the project",
        });
      } finally {
        isCreating.value = false;
      }
    };

    const confirmCreateProject = () => {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to create this project?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Create",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          createProject();
        }
      });
    };

    const validateForm = () => {
      if (!title.value || !description.value || !image.value || selectedLanguages.value.length === 0) {
        Swal.fire("Incomplete Form", "Please fill in all fields and select at least one language", "error");
        return false;
      }

      return true;
    };

    const getSkills = async () => {
      try {
        const querySnapshot = await projectFirestore.collection("skills").get();
        skills.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    onMounted(() => {
      getSkills();
    });

    return {
      isAdmin,
      title,
      description,
      image,
      selectedLanguages,
      skills,
      link,
      isCreating,
      created,
      linkCode, // Add linkCode to the returned properties
      confirmCreateProject,
    };
  },
};
</script>
