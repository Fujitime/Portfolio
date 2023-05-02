import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFirestore.collection("posts").get();

      if (res.empty) {
        throw new Error("No data found");
      }

      const docs = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      posts.value = docs;
    } catch (err) {
      console.error("Error loading posts", err);
      error.value = "Failed to load posts. Please try again later.";
    }
  };

  return { posts, error, load };
};

export default getPosts;
