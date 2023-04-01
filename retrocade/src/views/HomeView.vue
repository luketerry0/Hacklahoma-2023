<template>
  <div class="home">
    <PixiJSCanvas />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PixiJSCanvas from '@/components/PixiJSCanvas.vue';

@Options({
  components: {
    PixiJSCanvas,
  },
})
export default class HomeView extends Vue {}
</script>
