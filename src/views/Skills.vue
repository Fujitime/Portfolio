<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center pt-32">
    <div class="w-full p-8" v-if="!loading">
      <h2 class="text-3xl font-bold mb-8 text-white">My Skills</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in mySkills"
          data-aos="fade-up"
          :key="skill.id"
          class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
        >
          <img :src="skill.image" class="w-20 h-20 object-contain mb-4" />
          <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
          <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold mb-8 mt-12 text-white">My Database Use</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in databaseSkills"
          data-aos="fade-up"
          :key="skill.id"
          class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
        >
          <img :src="skill.image" class="w-20 h-20 object-contain mb-4" />
          <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
          <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold mb-8 mt-12 text-white">My Tools</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in toolsSkills"
          data-aos="fade-up"
          :key="skill.id"
          class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
        >
          <img :src="skill.image" class="w-20 h-20 object-contain mb-4" />
          <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
          <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold mb-8 mt-12 text-white">
        Currently Learning
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in learningSkills"
          data-aos="fade-up"
          :key="skill.id"
          class="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
        >
          <img :src="skill.image" class="w-12 h-12 object-contain mb-4" />
          <h3 class="text-lg font-bold text-white">{{ skill.title }}</h3>
          <p class="text-gray-400 mt-2 text-center">{{ skill.description }}</p>
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
import Loading from "@/components/Loading.vue";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      skills: [],
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
  async created() {
    try {
      const snapshot = await projectFirestore.collection("skills").get();
      this.skills = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      this.loading = false;
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  },
};
</script>
