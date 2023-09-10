<template>
    <div v-if="isAdmin" class="bg-gray-900 min-h-screen flex items-center justify-center pt-32">
      <div class="w-full p-8">
        <h2 class="text-3xl font-bold mb-8 text-white">Create New Skill</h2>
  
        <form @submit.prevent="createSkill" class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="title" class="block text-white font-semibold mb-2">Title</label>
            <input v-model="title" type="text" id="title" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
  
          <div class="mb-4">
            <label for="image" class="block text-white font-semibold mb-2">Image URL</label>
            <input v-model="image" type="text" id="image" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
  
          <div class="mb-4">
          <label class="block text-white font-semibold mb-2">Learning</label>
          <input type="checkbox" id="learning" class="form-checkbox h-6 w-6 text-blue-600" v-model="learning">
        </div>

        <div class="mb-4">
          <label class="block text-white font-semibold mb-2">Database</label>
          <input type="checkbox" id="database" class="form-checkbox h-6 w-6 text-blue-600" v-model="database">
        </div>

        <div class="mb-4">
          <label class="block text-white font-semibold mb-2">Tools</label>
          <input type="checkbox" id="tools" class="form-checkbox h-6 w-6 text-blue-600" v-model="tools">
        </div>

  
          <div class="mb-4">
            <label for="description" class="block text-white font-semibold mb-2">Description</label>
            <textarea v-model="description" id="description" class="w-full bg-gray-800 text-white rounded px-4 py-2" ></textarea>
          </div>
  
          <div class="flex justify-end mt-4">
            <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Create Skill
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-32">
      <Forbidden />
    </div>
  </template>
  
  <script>
  import { projectFirestore } from "@/firebase/config";
;
  import Forbidden from "@/components/Forbidden.vue";
  import { ref } from "vue";
  import Swal from "sweetalert2";
  import { useRouter } from "vue-router";
  import { useAuth } from "@/composables/useAuth";
  
  export default {
    name: "CreateSkill",
    components: {
      Forbidden,
    },
    setup() {
      const { isAdmin } = useAuth();
      const router = useRouter();
  
      const title = ref("");
      const image = ref("");
      const learning = ref(false);
      const database = ref(false);
      const tools = ref(false);
      const description = ref("");
  
      const createSkill = async () => {
        try {
          await projectFirestore.collection("skills").add({
            title: title.value,
            image: image.value,
            learning: learning.value,
            database: database.value,
            tools: tools.value,
            description: description.value,
          });
  
          // Reset form fields
          title.value = "";
          image.value = "";
          learning.value = false;
          database.value = false;
          tools.value = false;
          description.value = "";
  
          // Display success message using SweetAlert2
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Skill created successfully",
          });
  
          // Redirect to Skills page
          router.push({ name: "Skills" });
        } catch (error) {
          console.error("Error creating skill:", error);
        }
      };
  
      return {
        isAdmin,
        title,
        image,
        learning,
        database,
        tools,
        description,
        createSkill,
      };
    },
  };
  </script>