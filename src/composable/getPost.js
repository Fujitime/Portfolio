import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
;

const cache = {};

export const getPost = (slug) => { // Menggunakan slug sebagai parameter
  if (!slug) {
    throw Error("Invalid input: slug cannot be empty");
  }

  const post = ref(null);
  const error = ref(null);

  if (cache[slug]) {
    post.value = cache[slug];
    return { post, error, load: () => {} };
  }

  const load = async () => {
    try {
      const res = await projectFirestore
        .collection("posts")
        .where("slug", "==", slug) // Ubah ini sesuai field yang menyimpan slug
        .get();

      if (res.empty) {
        throw Error("Data not available ᗜ˰ᗜ");
      }

      cache[slug] = {
        ...res.docs[0].data(),
        id: res.docs[0].id,
      };

      post.value = cache[slug];
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
};

export default getPost;
