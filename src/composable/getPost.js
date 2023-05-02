import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

export const getPost = (id) => {
  if (typeof id !== "string" || id.length === 0) {
    throw new Error("Invalid id");
  }

  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    const postRef = projectFirestore.collection("posts").doc(id);

    try {
      const res = await postRef.get();

      if (!res.exists) {
        throw new Error("Data not available");
      }

      post.value = {
        ...res.data(),
        id: res.id,
      };
    } catch (err) {
      error.value = err.message;
    }
  };

  const stop = () => {
    const postRef = projectFirestore.collection("posts").doc(id);
    postRef.onSnapshot(() => {});
  };

  return { post, error, load, stop };
};
