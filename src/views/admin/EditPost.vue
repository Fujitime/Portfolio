<template>
  <div>
    <div v-if="isAdmin && post" class="min-h-screen flex items-center justify-center bg-gray-900 text-white py-32">
      <div class="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-md">
        <div class="pb-10">
          <label class="block mb-1 font-semibold text-gray-300" for="title">Title</label>
          <input required type="text" id="title" name="title" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Title post" v-model="post.title" />
        </div>

        <editor
          id="body"
          name="body"
          v-model="post.body"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700"
          required
          rows="5"
          api-key="k3riu7se96le6ae0r79hu5iwohe6sdkd0guhnb8cuubuhvdi"
          :init="editorConfig"
        />
  <div class="mb-6">
    <label class="block mb-1 font-semibold text-gray-300" for="isActive">Is Active</label>
    <div class="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        v-model="post.isActive"
      />
      <label
        for="isActive"
        class="toggle-label block overflow-hidden h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-transform"
      ></label>
    </div>
    <span class="ml-2 text-white">{{ post.isActive ? 'Active' : 'Inactive' }}</span>
  </div>
        <div class="my-6">
        <label class="block mb-1 font-semibold text-gray-300" for="author">Author</label>
        <input type="text"  id="author" name="author" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Author name" v-model="post.author" />
      </div>

        <div class="my-6">
          <label class="block mb-1 font-semibold text-gray-300" for="tag">Tags</label>
          <input type="text" id="tag" required name="tag" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Input tags" v-model="tag" @keydown.enter.prevent="handleKeydown" />
          <span v-for="tag in post.tags" :key="tag" class="inline-block px-2 py-1 mt-2 bg-gray-600 rounded-lg"># {{ tag }}</span>
        </div>

        <div class="my-6">
          <label class="block mb-1 font-semibold text-gray-300" for="metaDescription">Meta Description</label>
          <input type="text" required id="metaDescription" name="metaDescription" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Meta description" v-model="post.metaDescription" />
        </div>

        <div class="my-6">
          <label class="block mb-1 font-semibold text-gray-300" for="thumbnailUrl">Thumbnail URL</label>
          <input type="text" required id="thumbnailUrl" name="thumbnailUrl" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Thumbnail URL" v-model="post.thumbnail" />
        </div>

        <button type="submit" class="w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600" @click="handleUpdate">Update</button>
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-32">
      <Forbidden />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Editor from "@tinymce/tinymce-vue";
import { useRouter } from "vue-router";
import { projectFirestore } from "@/firebase/config";
import { useAuth } from "@/composables/useAuth";
import Forbidden from "@/components/Forbidden.vue";
import Swal from "sweetalert2";
import slugify from "slugify";

export default {
  name: "EditPost",
  components: {
    Forbidden,
    Editor,
  },
  setup() {
    const router = useRouter();
    const { isAdmin } = useAuth();

    const postId = ref(null);
    const post = ref({
      title: "",
      body: "",
      isActive: false, 
      author : "", 
      tags: [],
      metaDescription: "",
      thumbnail: "",
      slug: "",
      createdAt: null, // Add createdAt field
    });

    onMounted(async () => {
      postId.value = router.currentRoute.value.params.id;
      try {
        const postDoc = await projectFirestore
          .collection("posts")
          .doc(postId.value)
          .get();
        if (postDoc.exists) {
          post.value = postDoc.data();
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    });

    const tag = ref("");
    const editorConfig = {
      height: 500,
      menubar: false,
      plugins: 'autolink directionality code visualblocks visualchars fullscreen image link media codesample  pagebreak nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons',
      toolbar: 'undo redo | formatselect | bold italic underline strikethrough | blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat | pagebreak | emoticons | fullscreen preview save | image media  link anchor codesample |',
      toolbar_sticky: true,
      autosave_ask_before_unload: true,
      autosave_interval: "30s",
      autosave_prefix: "{path}{query}-{id}-",
      autosave_restore_when_empty: false,
      autosave_retention: "2m",
      image_advtab: true,
      importcss_append: true,
      image_caption: true,
      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
      noneditable_noneditable_class: "mceNonEditable",
      toolbar_mode: 'sliding',
      contextmenu: "link image imagetools table",
    };
    const handleKeydown = () => {
      if (post.value && post.value.tags && !post.value.tags.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        post.value.tags.push(tag.value);
      }
      tag.value = "";
    };

    const handleUpdate = async () => {
  if (!isAdmin.value || !post.value) {
    return;
  }

  // Update createdAt time when editing
  const updatedAt = new Date();

  const cleanedTitle = post.value.title.replace(/[^\w\s]/gi, '');
  const modifiedTitle = cleanedTitle.replace(/\s+/g, '-');
  let slug = slugify(modifiedTitle, { lower: true });
  if (!slug) {
    slug = slugify(post.value.title, { lower: true });
  }

  const slugExists = await projectFirestore
    .collection("posts")
    .where("slug", "==", slug)
    .get()
    .then((querySnapshot) => !querySnapshot.empty);

  if (slugExists) {
    slug = `${slug}`;
  }

  try {
    await projectFirestore.collection("posts").doc(postId.value).update({
      ...post.value,
      slug: slug,
      createdAt: updatedAt, // Update createdAt to updatedAt
    });
    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Post updated successfully",
    });

    router.push({ name: "Blogposts" });
  } catch (error) {
    console.error("Error updating document:", error);
  }
};


    return {
      isAdmin,
      post,
      tag,
      handleKeydown,
      handleUpdate,
      editorConfig,
    };
  },
};
</script>