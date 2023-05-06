<template>
  <div class="container py-5">
    <h1 class="text-center fw-bold mb-5">Projects</h1>
    <div class="row">
      <div
        class="col-lg-4 mb-5"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="card h-100">
          <img :src="project.image" class="card-img-top" alt="Project Image" />
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
          <div class="card-footer">
            <a :href="project.link" target="_blank" class="btn btn-primary"
              >View Project</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [
        {
          title: "Bio-card",
          description:
            "Saya membuat bio card menggunakan API Github untuk menampilkan repository saya, API Osu untuk menampilkan skor terbaik saya, dan API Youtube untuk menampilkan video terakhir yang diunggah.",
          image: "https://i.ibb.co/nBK8k48/Screenshot-223.png",
          link: "https://fujitimebiocard.netlify.app/",
        },
        {
          title: "Single Page Apllication",
          description:
            "Menggunakan React dengan mengakses News API. Memungkinkan pengguna untuk menemukan berita terbaru dari berbagai sumber berita, seperti CNN, BBC, dan The New York Times.",
          image: "https://i.ibb.co/9rfP7cr/Screenshot-220.png",
          link: "https://my-first-cra.netlify.app/",
        },
        {
          title: "Bookshelf App",
          description:
            "Mengkelola buku yang telah dibaca dengan menyimpan data pada local storage, Membuat Aplikasi Back-End sederhana dengan javascript.",
          image: "https://i.ibb.co/SRnmK1B/Screenshot-221.png",
          link: "https://fuji-bookshelf.netlify.app/",
        },
        {
          title: "Zenplayers",
          description:
            "Saya menambahkan fitur dark mode pada music player yang telah di-fork dari akun Github iyanfatur1412.",
          image: "https://i.ibb.co/9HLr4r4/Screenshot-222.png",
          link: "https://fujitime.github.io/zenplayers/",
        },
        {
          title: "WeebsBlogger",
          description:
            "Membuat blog menggunakan Laravel dengan menerapkan fitur login dan menerapkan CRUD pada Dashboard dengan Authorization",
          image: "https://i.ibb.co/DD7fPhL/weebsblogger.png",
          link: "https://github.com/Fujitime/WeebsBlogger",
        },
        {
          title: "Contact App",
          description:
            "Aplikasi kontak menggunakan Express.js dan EJS sebagai templating engine-nya. Memungkinkan pengguna untuk menambah, mengedit, dan menghapus kontak dari daftar kontak mereka.",
          image: "https://i.ibb.co/sC6GZcb/Screenshot-77-1.png",
          link: "https://github.com/Fujitime/Contact-app",
        },
      ],
    };
  },
};
</script>
