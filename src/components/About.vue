<template>
  <div class="container bg-slate-800 mx-auto rounded-lg shadow-xl p-5 lg:py-20" id="about">
    <div class="flex flex-col lg:flex-row" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
      <div class="flex-grow mx-0 lg:mx-5">
        <h1 class="text-2xl lg:text-4xl font-bold mb-4" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
          Hello👋
          <span class="text-blue-500"> I'm </span>
          <span class="italic"> Fuji Halim Rabbani </span>
        </h1>
        <p class="text-slate-500 text-sm lg:text-lg mb-4">Also known as Fuji || Waltahh</p>
        <!-- <p class="text-sm lg:text-lg mb-4">
          I'm a web developer (front-end focused), my favorite programming language is JavaScript (NodeJS), and I'm currently learning
          <router-link :to="{ name: 'Skills' }" class="text-sky-500 underline hover:text-sky-500">
            {{ learningSkills }}
            <span v-if="showSeeMore" class="text-xs">(see more)</span>
          </router-link>
        </p>
        <p class="text-sm lg:text-lg  mb-10">I have a dream to collaborate with companies or startups, and my enthusiasm for it drives me to keep learning:)</p> -->
        <p class="text-sm lg:text-lg mb-4" >
          Halo, namaku Fuji Halim Rabbani, biasa dipanggil Fuji. Saat ini aku tertarik dengan budaya negara Jepang dan sedang belajar bahasanya. 
        </p>
        <p class="text-sm lg:text-lg mb-4" >
Di samping itu, saya memiliki keahlian dalam bahasa pemrograman JavaScript dan beberapa pengetahuan tentang alat-alat frontend. Terkadang, saya menulis blog tentang pengalaman sehari-hari saya dan sesekali mengunggah konten di YouTube        </p>
        <!-- <p class="text-sm lg:text-lg mb-4" >
          Di samping itu, aku sedang mempelajari tentang pasar saham. Selain itu, aku juga memiliki minat dalam olahraga sepak bola dan suka berlari. Salam kenal dari aku!
        </p> -->

        <div>
          <SocialMedia/>
        </div>
        <a v-if="isMobile()" href="https://cdn.discordapp.com/attachments/1086608997802577964/1109414776217546782/Fuji_Halim_Rabbani.pdf" class="inline-block p-2 text-md px-3 py-1 my-5 border-2 border-green-100 text-sky-400 " download >Download CV</a>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { projectFirestore } from "@/firebase/config";
import SocialMedia from "@/components/SocialMedia.vue"

export default {
  components: {
    SocialMedia
  },
//   data() {
//     return {
//       isMobile: false,
//       learningSkills: "",
//       showSeeMore: false,
//       error: null,
//     };
  // },
  // setup() {
  //   const learningSkills = ref("");
  //   const showSeeMore = ref(false);
  //   const error = ref(null);

  //   // onMounted(async () => {
  //   //   try {
  //   //     const skillsRef = projectFirestore.collection("skills");
  //   //     const querySnapshot = await skillsRef.where("learning", "==", true).get();

  //   //     if (!querySnapshot.empty) {
  //   //       const skillsList = [];
  //   //       querySnapshot.forEach((doc) => {
  //   //         skillsList.push(doc.data().title);
  //   //       });

  //   //       if (skillsList.length <= 2) {
  //   //         learningSkills.value = skillsList.join(" and ");
  //   //       } else {
  //   //         learningSkills.value = skillsList.slice(0, 2).join(", ");
  //   //         showSeeMore.value = true;
  //   //       }
  //   //     } else {
  //   //       // Jika tidak ada bahasa yang sedang dipelajari, atur pesan kustom
  //   //       error.value = "learn more about programming";
  //   //     }
  //   //   } catch (err) {
  //   //     console.error("Error fetching skills:", err);
  //   //     error.value = "Error fetching skills.";
  //   //   }
  //   // });

  //   return { learningSkills, showSeeMore, error };
  // },
  methods: {
      isMobile() {
          if( screen.width <= 760 ) {
              return true;
          }
          else {
              return false;
          }
      }
  },
};
</script>