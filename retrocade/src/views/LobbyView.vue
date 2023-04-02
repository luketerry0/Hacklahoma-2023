<template>
  <div class="about">
    <h1>Join Lobby by going to  {{address}}</h1>
  </div>

  <router-link to="/game">Start Game!</router-link>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const address = ref<string>("http://" +  process.env.VUE_APP_IPV4_ADDRESS + ":8080/c");

</script>
