<template>
  <div class="bg-slate-600 min-h-screen flex items-center justify-center">
    <section
      class="max-w-3xl w-full px-4 py-8 bg-slate-700 rounded-lg shadow-lg"
    >
      <h1 class="text-2xl font-bold mb-4 text-white">
        <span class="text-blue-500"> Send me </span>
        a message

        <i class="fas fa-paper-plane text-white text-xl mr-2"></i>
      </h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="mb-4">
          <label class="block font-bold mb-2 text-white" for="name"
            ><i class="fas fa-user"></i> Name</label
          >

          <input
            v-model="name"
            placeholder="....."
            type="text"
            id="name"
            name="name"
            class="w-full px-3 py-2 bg-gray-800 rounded focus:outline-none focus:border-indigo-500 text-white"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-2 text-white" for="email"
            ><i class="fas fa-envelope"></i> Email</label
          >
          <input
            placeholder="example.@gmail.com"
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="w-full px-3 py-2 bg-gray-800 rounded focus:outline-none focus:border-indigo-500 text-white"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block font-bold mb-2 text-white" for="message"
            ><i class="fas fa-comment"></i> Message</label
          >
          <textarea
            placeholder="Hello!"
            v-model="message"
            id="message"
            name="message"
            rows="4"
            class="w-full px-3 py-2 bg-gray-800 rounded focus:outline-none focus:border-indigo-500 text-white"
            required
          ></textarea>
        </div>
        <div v-if="formStatus !== ''" class="mt-4">
          <div
            :class="{
              'bg-green-200 border-green-500': formStatus === 'success',
              'bg-red-200 border-red-500': formStatus === 'error',
              'bg-gray-200 border-gray-500': formStatus === 'loading',
            }"
            class="py-2 px-4 rounded"
          >
            <p class="text-gray-900">
              {{ alertMessage }}
            </p>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :class="{
              'bg-indigo-500 hover:bg-indigo-600': formStatus !== 'loading',
              'bg-gray-500 cursor-not-allowed': formStatus === 'loading',
            }"
            :disabled="formStatus === 'loading'"
            class="btn-kirim text-white font-bold py-2 px-4 rounded"
          >
            <template v-if="formStatus !== 'loading'">
              <i class="fas fa-paper-plane"></i> Submit
            </template>
            <template v-else>
              Loading... <i class="fas fa-spinner fa-spin"></i
            ></template>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxm9c-0uqR24CO7uCiLjffjU32HZ3rMswLLQZNTg1A97lJVfMBHNaLPZxpbMLX_pT0KLQ/exec";

export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      formStatus: "", // possible values: "loading", "success", "error"
    };
  },
  computed: {
    alertClass() {
      if (this.formStatus === "success") {
        return "bg-green-200 border-green-500";
      } else if (this.formStatus === "error") {
        return "bg-red-200 border-red-500";
      } else {
        return "";
      }
    },
    alertMessage() {
      if (this.formStatus === "success") {
        return "Message sent successfully!";
      } else if (this.formStatus === "error") {
        return "Error sending message. Please try again.";
      } else {
        return "";
      }
    },
  },
  methods: {
    submitForm() {
      this.formStatus = "loading";
      const form = new FormData();
      form.append("nama", this.name);
      form.append("email", this.email);
      form.append("pesan", this.message);
      fetch(scriptURL, { method: "POST", body: form })
        .then((response) => {
          this.formStatus = "success";
          this.resetForm();

          console.log("Success!", response);
        })
        .catch((error) => {
          this.formStatus = "error";
          console.error("Error!", error.message);
        });
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>
