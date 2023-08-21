<template>
    <div
      class="container bg-slate-800 mx-auto rounded-lg shadow-xl p-5 lg:py-20"
      id="about"
    >
      <div
        class="flex flex-col lg:flex-row"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <div class="flex-grow mx-0 lg:mx-5">
          <h1
            class="text-2xl lg:text-4xl font-bold mb-4"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            Hello👋
            <span class="text-blue-500"> I'm </span>
            <span class="italic"> Fuji Halim Rabbani </span>
          </h1>
          <p class="text-slate-500 text-sm lg:text-lg mb-4">
            Also known as Fuji || Waltahh
          </p>
          <p class="text-sm lg:text-lg mb-4">
            Saat ini, Saya sedang menempuh pendidikan di SMKN 01 Cisarua, Bandung
            Barat. Saya antusias dalam mengasah keterampilan saya di bidang yang
            saya pilih. Sebagai seorang developer, Saya memiliki minat dalam
            Software Engineering. Saya memiliki pemahaman yang baik tentang
            konsep-konsep dasar dan berusaha untuk menerapkannya dengan sebaik
            mungkin dalam berbagai situasi.
          </p>
          <p class="text-sm lg:text-lg mb-4">
            Saya senang mengikuti perkembangan teknologi terbaru dan memiliki
            keahlian dalam merancang dan mengembangkan aplikasi web yang keren dan
            user-friendly. Saya terus meningkatkan keterampilan saya untuk
            mencapai hasil yang optimal.
          </p>
  
          <p class="text-sm lg:text-lg italic mb-10">
            I have a dream to collaborate with companies or startups. Even though
            I am a beginner, I am very enthusiastic about it. :&#41;
          </p>
          <a
            v-if="isMobile"
            href="https://cdn.discordapp.com/attachments/1086608997802577964/1109414776217546782/Fuji_Halim_Rabbani.pdf"
            class="inline-block text-sky-900 border-2 p-2 text-md"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMobile: false,
      };
    },
    mounted() {
      this.isMobile = this.isMobileDevice();
    },
    methods: {
      isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      },
    },
  };
  </script>
  