<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center pt-32">
    <div class="w-full p-8" v-if="!loading">
      <router-link
        v-if="isAdmin"
        :to="{ name: 'CreateSkill' }" 
        class="inline-flex items-center justify-center px-4 m-5 py-2 border-2 border-green-500 text-green-400 hover:bg-green-600 hover:text-green-100 duration-300"
      >
        <i class="fas fa-plus me-2"></i>Create Project
      </router-link>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in mySkills"
          data-aos="fade-up"
          :key="skill.id"
          class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
        >
          <img :src="skill.image" class="w-20 h-20 object-contain mb-4" :alt="skill.image" />
          <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
          <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
          <div class="flex justify-between mt-2" v-if="isAdmin">
          <router-link
            :to="{ name: 'EditSkill', params: { id: skill.id } }"
            class="text-blue-500 hover:text-blue-700"
          >
            <i class="fas fa-pencil-alt text-xl m-2"></i>
          </router-link>
          <button @click="deleteSkill(skill.id)" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash-alt text-xl m-2"></i>
          </button>
        </div>
        </div>
      </div>

      <h2 class="text-3xl font-bold my-8 mt-12 text-white">My Database Use</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="skill in databaseSkills"
    data-aos="fade-up"
    :key="skill.id"
    class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
  >
    <img :src="skill.image" class="w-20 h-20 object-contain mb-4" :alt="skill.image" />
    <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
    <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
    <div class="flex justify-between mt-2" v-if="isAdmin">
  <router-link
    :to="{ name: 'EditSkill', params: { id: skill.id } }"
    class="text-blue-500 hover:text-blue-700"
  >
    <i class="fas fa-pencil-alt text-xl m-2"></i>
  </router-link>
  <button @click="deleteSkill(skill.id)" class="text-red-500 hover:text-red-700">
    <i class="fas fa-trash-alt text-xl m-2"></i>
  </button>
</div>

  </div>
</div>

<h2 class="text-3xl font-bold my-8 mt-12 text-white">My Tools</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="skill in toolsSkills"
    data-aos="fade-up"
    :key="skill.id"
    class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
  >
    <img :src="skill.image" class="w-20 h-20 object-contain mb-4" :alt="skill.image"  />
    <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
    <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
    <div class="flex justify-between mt-2" v-if="isAdmin">
  <router-link
    :to="{ name: 'EditSkill', params: { id: skill.id } }"
    class="text-blue-500 hover:text-blue-700"
  >
    <i class="fas fa-pencil-alt text-xl m-2"></i>
  </router-link>
  <button @click="deleteSkill(skill.id)" class="text-red-500 hover:text-red-700">
    <i class="fas fa-trash-alt text-xl m-2"></i>
  </button>
</div>

  </div>
</div>

<h2 class="text-3xl font-bold my-8 mt-12 text-white">Currently Learning</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="skill in learningSkills"
    data-aos="fade-up"
    :key="skill.id"
    class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
  >
    <img :src="skill.image" class="w-20 h-20 object-contain mb-4" :alt="skill.image"  />
    <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
    <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
    <div class="flex justify-between mt-2" v-if="isAdmin">
  <router-link
    :to="{ name: 'EditSkill', params: { id: skill.id } }"
    class="text-blue-500 hover:text-blue-700"
  >
    <i class="fas fa-pencil-alt text-xl m-2"></i>
  </router-link>
  <button @click="deleteSkill(skill.id)" class="text-red-500 hover:text-red-700">
    <i class="fas fa-trash-alt text-xl m-2"></i>
  </button>
</div>

  </div>
</div>



    </div>
    <div class="w-full mx-auto" v-else>
      <div class="text-white">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/config";
;
import Loading from "@/components/Loading.vue";
import Swal from "sweetalert2";
import { useAuth } from "@/composables/useAuth";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      skills: [],
      isAdmin: false,
    };
  },
  computed: {
    mySkills() {
      return this.skills.filter(
        (skill) => !skill.learning && !skill.database && !skill.tools
      );
    },
    databaseSkills() {
      return this.skills.filter((skill) => skill.database);
    },
    learningSkills() {
      return this.skills.filter((skill) => skill.learning);
    },
    toolsSkills() {
      return this.skills.filter((skill) => skill.tools);
    },
  },
  methods: {
    async deleteSkill(skillId) {
      try {
        const { isAdmin } = useAuth();

        if (!isAdmin) {
          Swal.fire("Unauthorized!", "You are not authorized to delete skills.", "error");
          return;
        }

        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await projectFirestore.collection("skills").doc(skillId).delete();
          this.skills = this.skills.filter((skill) => skill.id !== skillId);

          Swal.fire("Deleted!", "Your skill has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    },
  },
  async created() {
    try {
      const snapshot = await projectFirestore.collection("skills").get();
      this.skills = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      this.loading = false;
      this.isAdmin = useAuth().isAdmin;
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  },
};  
</script>