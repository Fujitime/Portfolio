<template>
  <div>
    <div class="text-2xl font-bold mb-1">
      <p class="mb-2"> <i class="fas fa-user"></i> {{ userProfile.name }}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Add CSS styling if needed */
</style>
