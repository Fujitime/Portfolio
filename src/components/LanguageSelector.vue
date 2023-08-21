<template>
  <div>
    <label for="languages" class="block text-white font-bold mb-2">Languages</label>
    <div class="flex space-x-2">
      <select v-model="selectedLanguage" id="languages" class="w-full bg-gray-800 text-white rounded px-4 py-2">
        <option value="" disabled>Select a language</option>
        <option v-for="skill in skills" :key="skill.id" :value="skill.image">
          <span class="flex items-center">
            <img :src="skill.image" alt="Skill Image" class="w-6 h-6 mr-2">
            {{ skill.title }}
          </span>
        </option>
      </select>
      <button @click="addLanguage" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
    <div v-for="(language, index) in selectedLanguages" :key="index" class="mt-2">
      <span class="flex items-center">
        <img :src="language.image" alt="Language Image" class="w-6 h-6 mr-2">
        {{ findSkillTitle(language.image) }}
        <button @click="removeLanguage(index)" class="text-red-500 ml-2">
          <i class="fas fa-trash"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LanguageSelector",
  props: {
    skills: Array,
    selectedLanguages: Array,
  },
  setup(props) {
    const selectedLanguage = ref("");

    const addLanguage = () => {
      const selectedSkill = findSkillByImage(selectedLanguage.value);
      if (selectedSkill && !props.selectedLanguages.some(lang => lang.image === selectedSkill.image)) {
        props.selectedLanguages.push(selectedSkill);
        selectedLanguage.value = "";
      }
    };

    const removeLanguage = index => {
      props.selectedLanguages.splice(index, 1);
    };

    const findSkillByImage = image => {
      return props.skills.find(skill => skill.image === image);
    };

    const findSkillTitle = image => {
      const skill = findSkillByImage(image);
      return skill ? skill.title : "";
    };

    return {
      selectedLanguage,
      addLanguage,
      removeLanguage,
      findSkillTitle,
    };
  },
};
</script>
