import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

// Inisialisasi cache dengan objek kosong
const cache = {};

export const getPost = (id) => {
  if (!id) {
    throw Error("Invalid input: id cannot be empty");
  }

  const post = ref(null);
  const error = ref(null);

  // Cek apakah data sudah tersimpan di cache
  if (cache[id]) {
    post.value = cache[id];
    return { post, error, load: () => {} };
  }

  const load = async () => {
    try {
      const res = await projectFirestore.collection("posts").doc(id).get();

      if (!res.exists) {
        throw Error("Data not available ᗜ˰ᗜ");
      }

      // Simpan data ke cache
      cache[id] = {
        ...res.data(),
        id: res.id,
      };

      post.value = cache[id];
    } catch (err) {
      error.value = err.message;
    }
  };
  return { post, error, load };
};

export default getPost;
