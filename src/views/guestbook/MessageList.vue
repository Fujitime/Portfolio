<template>
  <ul>
    <li v-for="message in messages" :key="message.id">
      <strong>{{ message.name }}:</strong>
      <span v-if="message.editing">
        <input v-model="message.editedText" />
        <button @click="saveEditedMessage(message)">Save</button>
        <button @click="cancelEditingMessage(message)">Cancel</button>
      </span>
      <span v-else>
        {{ message.text }}
        <button @click="editMessage(message)">Edit</button>
        <button @click="deleteMessage(message)">Delete</button>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editMessage(message) {
      message.editing = true;
    },
    saveEditedMessage(message) {
      this.$emit('save-edited-message', message);
    },
    cancelEditingMessage(message) {
      message.editing = false;
      message.editedText = message.text;
    },
    deleteMessage(message) {
      this.$emit('delete-message', message);
    },
  },
};
</script>

<style>
/* Add CSS styling if needed */
</style>
