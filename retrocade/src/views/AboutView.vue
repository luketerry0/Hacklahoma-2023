<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log(process.env.VUE_APP_IPV4_ADDRESS)
})
</script>
