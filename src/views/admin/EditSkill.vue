<template>
    <div v-if="isAdmin && skill" class="bg-gray-900 min-h-screen flex items-center justify-center pt-32">
      <div class="w-full p-8">
        <h2 class="text-3xl font-bold mb-8 text-white">Edit Skill</h2>
  
        <form @submit.prevent="updateSkill" class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="title" class="block text-white font-semibold mb-2">Title</label>
            <input v-model="editedSkill.title" type="text" id="title" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
  
          <div class="mb-4">
            <label for="image" class="block text-white font-semibold mb-2">Image URL</label>
            <input v-model="editedSkill.image" type="text" id="image" class="w-full bg-gray-800 text-white rounded px-4 py-2" required>
          </div>
  
          <div class="mb-4">
            <label class="block text-white font-semibold mb-2">Learning</label>
            <input type="checkbox" id="learning" class="toggle-checkbox" v-model="editedSkill.learning">
          </div>
  
          <div class="mb-4">
            <label class="block text-white font-semibold mb-2">Database</label>
            <input type="checkbox" id="database" class="toggle-checkbox" v-model="editedSkill.database">
          </div>
  
          <div class="mb-4">
            <label class="block text-white font-semibold mb-2">Tools</label>
            <input type="checkbox" id="tools" class="toggle-checkbox" v-model="editedSkill.tools">
          </div>
  
          <div class="mb-4">
            <label for="description" class="block text-white font-semibold mb-2">Description</label>
            <textarea v-model="editedSkill.description" id="description" class="w-full bg-gray-800 text-white rounded px-4 py-2" required></textarea>
          </div>
  
          <div class="flex justify-end mt-4">
            <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Update Skill
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
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useAuth } from "@/composable/useAuth";

export default {
  name: "EditSkill",
  components: {
    Forbidden,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { isAdmin } = useAuth();
    const router = useRouter();

    const editedSkill = ref({
        title: "",
        image: "",
        learning: false,    // Make sure these are properly initialized
        database: false,    // with default values
        tools: false,       // (false in this case)
        description: "",
      });


    const skill = ref(null);

    const fetchSkill = async () => {
      try {
        const skillRef = projectFirestore.collection("skills").doc(props.id);
        const doc = await skillRef.get();
        if (doc.exists) {
          skill.value = doc.data();
          editedSkill.value = {
            title: skill.value.title,
            image: skill.value.image,
            learning: skill.value.learning,
            database: skill.value.database,
            tools: skill.value.tools,
            description: skill.value.description,
          };
        } else {
          console.error("Skill not found");
        }
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    };

    onMounted(() => {
      fetchSkill();
    });

    const updateSkill = async () => {
      try {
        await projectFirestore.collection("skills").doc(props.id).update({
          title: editedSkill.value.title,
          image: editedSkill.value.image,
          learning: editedSkill.value.learning,
          database: editedSkill.value.database,
          tools: editedSkill.value.tools,
          description: editedSkill.value.description,
        });

        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Skill updated successfully",
        });

        router.push({ name: "Skills" });
      } catch (error) {
        console.error("Error updating skill:", error);
      }
    };

    return {
      isAdmin,
      skill,
      editedSkill,
      updateSkill,
    };
  },
};
</script>
