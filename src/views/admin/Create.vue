<template>
  <div v-if="isAdmin" class="min-h-screen flex items-center justify-center bg-gray-900 text-white py-32">
    <div class="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-md">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <div class="pb-10">
            <label class="block mb-1 font-semibold text-gray-300" for="title">Title</label>
            <input type="text" id="title" name="title" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Title post" v-model="title" required />
          </div>
          
          <div class="mb-6">
            <label class="block mb-1 font-semibold text-gray-300" for="author">Author</label>
            <input type="text" id="author" name="author" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Author name" v-model="author" />
          </div>
    
          <div class="mb-6">
  <label class="block mb-1 font-semibold text-gray-300" for="isActive">Is Active</label>
  <div class="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
    <input
      type="checkbox"
      id="isActive"
      name="isActive"
      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      v-model="isActive"
    />
    <label
      for="isActive"
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
    ></label>
  </div>
  <span class="ml-2 text-white">{{ isActive ? 'Active' : 'Inactive' }}</span>
</div>

          
          <div class="mb-6">
            <label class="block mb-1 font-semibold text-gray-300" for="thumbnailUrl">Thumbnail URL</label>
            <input type="text" id="thumbnailUrl" name="thumbnailUrl" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Thumbnail URL" v-model="thumbnailUrl" />
          </div>
        </div>
        
        <div>
          <div class="pb-10">
            <label class="block mb-1 font-semibold text-gray-300" for="body">Body</label>
            <editor
              id="body"
              name="body"
              v-model="body"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700"
              required
              rows="5"
              api-key="k3riu7se96le6ae0r79hu5iwohe6sdkd0guhnb8cuubuhvdi"
              :init="editorConfig"
            />
          </div>
          
          <div class="mb-6">
            <label class="block mb-1 font-semibold text-gray-300" for="tag">Tags</label>
            <input type="text" id="tag" name="tag" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Input tags" v-model="tag" @keydown.enter.prevent="handleKeydown" />
            <span v-for="tag in tags" :key="tag" class="inline-block px-2 py-1 mt-2 bg-gray-600 rounded-lg"># {{ tag }}</span>
          </div>
          
          <div class="mb-6">
            <label class="block mb-1 font-semibold text-gray-300" for="metaDescription">Meta Description</label>
            <input type="text" id="metaDescription" name="metaDescription" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 bg-gray-700" placeholder="Meta description" v-model="metaDescription" />
          </div>
          
          <button type="submit" class="w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600" @click="handleSubmit">Kirim</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-32">
    <Forbidden/>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Editor from "@tinymce/tinymce-vue";
import { projectFirestore } from "@/firebase/config";
import { useAuth } from "@/composable/useAuth";
import Forbidden from "@/components/Forbidden.vue";
import Swal from 'sweetalert2';
import slugify from 'slugify';

export default {
  name: "CreatePost",
  components: {
    Forbidden,
    Editor,
  },
  setup() {
    const router = useRouter();
    const { isAdmin } = useAuth();
    const isActive = ref(false);
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);
    const metaDescription = ref("");
    const thumbnailUrl = ref("");
    const author = ref(""); 

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, "");
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

    const handleSubmit = async () => {
      if (isAdmin.value) {
        const slug = slugify(title.value, { lower: true }); 
        const post = {
          title: title.value,
          body: body.value,
          tags: tags.value,
          metaDescription: metaDescription.value,
          thumbnail: thumbnailUrl.value,
          createdAt: new Date(),
          slug: slug,
          isActive: isActive.value,
          author: author.value,
        };

        try {
          await projectFirestore.collection("posts").add(post);
          await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Post created successfully',
          });

          router.push({
            name: "Blogposts",
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    };

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
    return {
      isAdmin,
      title,
      body,
      tag,
      tags,
      metaDescription,
      author,
      thumbnailUrl,
      isActive, // Include the Is Active field in the return
      handleKeydown,
      handleSubmit,
      editorConfig,
    };
  },
};
</script>