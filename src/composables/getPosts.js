import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
;
import { useSlugify } from "@/composables/slugify"; // Import the useSlugify composables

export const getPosts = (filterBy) => {
  const { customSlugify } = useSlugify(); // Use the customSlugify function

  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let res;
      if (filterBy) {
        res = await projectFirestore
          .collection("posts")
          .where("category", "==", filterBy)
          .get();
      } else {
        // Jika tidak ada filter, ambil semua data
        res = await projectFirestore.collection("posts").get();
      }

      if (res.empty) {
        throw new Error("No data found");
      }

      const docs = res.docs.map((doc) => {
        const data = doc.data();
        const slug = customSlugify(data.title); // Generate slug from the title
        return {
          ...data,
          id: doc.id,
          slug: slug, // Assign the slug to the document
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
